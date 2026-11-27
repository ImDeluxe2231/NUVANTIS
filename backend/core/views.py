import json
import re
from functools import wraps
from time import time

from django.core.cache import cache

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.core.exceptions import RequestDataTooBig
from django.views.decorators.http import require_http_methods

from .models import ContactSubmission, Idea, IdeaReport


def _payload(request: HttpRequest) -> dict:
    try:
        data = json.loads(request.body or "{}")
    except RequestDataTooBig as exc:
        raise ValidationError("La solicitud supera el tamaño permitido.") from exc
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        raise ValidationError("El cuerpo de la solicitud no contiene JSON válido.") from exc
    if not isinstance(data, dict):
        raise ValidationError("La solicitud debe contener un objeto JSON.")
    return data


def _error(message: str | list[str], status: int = 400) -> JsonResponse:
    messages = message if isinstance(message, list) else [message]
    return JsonResponse({"ok": False, "errors": messages}, status=status)


def limit_writes(bucket: str, maximum: int, window: int = 60):
    def decorate(view):
        @wraps(view)
        def wrapped(request, *args, **kwargs):
            if request.method == "POST":
                address = request.META.get("REMOTE_ADDR", "unknown")
                now = int(time())
                key = f"public-write:{bucket}:{address}:{now // window}"
                cache.add(key, 0, timeout=window + 1)
                try:
                    attempts = cache.incr(key)
                except ValueError:
                    return _error("No pudimos procesar el envío. Inténtalo nuevamente.", 503)
                if attempts > maximum:
                    response = _error("Hay demasiados envíos. Inténtalo en un momento.", 429)
                    response["Retry-After"] = str(window - now % window)
                    return response
            return view(request, *args, **kwargs)

        return wrapped

    return decorate


@require_http_methods(["GET"])
def health(_: HttpRequest) -> JsonResponse:
    return JsonResponse({"ok": True, "service": "nuvantis-api"})


@require_http_methods(["GET"])
def csrf(request: HttpRequest) -> JsonResponse:
    response = JsonResponse({"token": get_token(request)})
    response["Cache-Control"] = "no-store"
    return response


@require_http_methods(["POST"])
@limit_writes("contact", 8)
def contact(request: HttpRequest) -> JsonResponse:
    try:
        data = _payload(request)
    except ValidationError as exc:
        return _error(exc.messages)

    errors = []
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    phone = re.sub(r"\s", "", str(data.get("phone", "")))
    description = str(data.get("description", "")).strip()
    consent = data.get("privacy_consent") is True

    if not name:
        errors.append("Ingresa tu nombre.")
    try:
        validate_email(email)
    except ValidationError:
        errors.append("Revisa el formato de tu correo.")
    if not re.fullmatch(r"9\d{8}", phone):
        errors.append("Revisa el número de contacto.")
    if len(description) < 12:
        errors.append("Describe brevemente tu necesidad.")
    if not consent:
        errors.append("Revisa el consentimiento antes de continuar.")
    if errors:
        return _error(errors)

    submission = ContactSubmission(
        name=name,
        company=str(data.get("company", "")).strip(),
        email=email,
        phone=phone,
        service=str(data.get("service", "")).strip(),
        description=description,
        preferred_contact=str(data.get("preferred_contact", "email")),
        privacy_consent=True,
    )
    try:
        submission.full_clean()
    except ValidationError as exc:
        return _error(exc.messages)
    submission.save()
    return JsonResponse(
        {"ok": True, "id": submission.pk, "message": "Consulta recibida."}, status=201
    )


@require_http_methods(["GET", "POST"])
@limit_writes("ideas", 10)
def ideas(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        queryset = Idea.objects.filter(status="approved")
        category = request.GET.get("category", "").strip()
        query = request.GET.get("q", "").strip()
        if category:
            queryset = queryset.filter(category=category)
        if query:
            queryset = queryset.filter(Q(text__icontains=query) | Q(display_name__icontains=query))
        results = [
            {
                "id": idea.pk,
                "text": idea.text,
                "category": idea.category,
                "author_mode": idea.author_mode,
                "display_name": idea.display_name if idea.author_mode != "anonymous" else "",
                "created_at": idea.created_at.isoformat(),
            }
            for idea in queryset[:100]
        ]
        return JsonResponse({"ok": True, "results": results})

    try:
        data = _payload(request)
    except ValidationError as exc:
        return _error(exc.messages)

    text = str(data.get("text", "")).strip()
    category = str(data.get("category", "Innovación")).strip()
    author_mode = str(data.get("author_mode", "anonymous")).strip()
    if not text:
        return _error("Escribe una idea antes de continuar.")
    if len(text) > 300:
        return _error("La idea no puede superar los 300 caracteres.")
    if re.search(r"(correo|tel[eé]fono|whatsapp|direcci[oó]n)", text, re.IGNORECASE):
        return _error("Revisa el contenido de tu nota antes de volver a enviarla.")
    if category not in dict(Idea.CATEGORY_CHOICES):
        return _error("Selecciona una categoría válida.")
    if author_mode not in dict(Idea.AUTHOR_MODE_CHOICES):
        return _error("Selecciona una forma de identificación válida.")

    idea = Idea(
        text=text,
        category=category,
        author_mode=author_mode,
        display_name=str(data.get("display_name", "")).strip() if author_mode != "anonymous" else "",
    )
    try:
        idea.full_clean()
    except ValidationError as exc:
        return _error(exc.messages)
    idea.save()
    return JsonResponse(
        {
            "ok": True,
            "id": idea.pk,
            "status": idea.status,
            "message": "Idea recibida y pendiente de revisión.",
        },
        status=201,
    )


@require_http_methods(["POST"])
@limit_writes("report_idea", 15)
def report_idea(request: HttpRequest, idea_id: int) -> JsonResponse:
    try:
        idea = Idea.objects.get(pk=idea_id, status="approved")
        data = _payload(request)
    except Idea.DoesNotExist:
        return _error("La idea no está disponible.", status=404)
    except ValidationError as exc:
        return _error(exc.messages)

    report = IdeaReport.objects.create(
        idea=idea, reason=str(data.get("reason", "")).strip()[:300]
    )
    return JsonResponse(
        {"ok": True, "id": report.pk, "message": "Reporte recibido."}, status=201
    )
