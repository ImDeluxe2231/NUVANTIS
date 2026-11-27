from django.core.validators import RegexValidator
from django.db import models


class ContactSubmission(models.Model):
    PREFERRED_CHOICES = [("email", "Correo"), ("whatsapp", "WhatsApp")]

    name = models.CharField("nombre", max_length=120)
    company = models.CharField("empresa", max_length=160, blank=True)
    email = models.EmailField("correo")
    phone = models.CharField(
        "WhatsApp",
        max_length=9,
        validators=[RegexValidator(r"^\d{9}$", "Ingresa un número peruano de 9 dígitos.")],
    )
    service = models.CharField("servicio o necesidad", max_length=120, blank=True)
    description = models.TextField("descripción", max_length=3000)
    preferred_contact = models.CharField(
        "medio preferido", max_length=10, choices=PREFERRED_CHOICES, default="email"
    )
    privacy_consent = models.BooleanField("consentimiento", default=False)
    created_at = models.DateTimeField("fecha de envío", auto_now_add=True)
    reviewed_at = models.DateTimeField("fecha de revisión", null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "consulta"
        verbose_name_plural = "consultas"

    def __str__(self) -> str:
        return f"{self.name} — {self.created_at:%Y-%m-%d}"


class Idea(models.Model):
    CATEGORY_CHOICES = [
        ("Procesos", "Procesos"),
        ("Datos", "Datos"),
        ("Atención", "Atención"),
        ("Innovación", "Innovación"),
    ]
    AUTHOR_MODE_CHOICES = [
        ("named", "Con nombre"),
        ("anonymous", "Anónimo"),
        ("avatar", "Avatar"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pendiente"),
        ("approved", "Aprobada"),
        ("needs_changes", "Necesita corrección"),
        ("rejected", "Rechazada"),
    ]

    text = models.CharField("idea", max_length=300)
    category = models.CharField("categoría", max_length=20, choices=CATEGORY_CHOICES)
    author_mode = models.CharField(
        "identificación", max_length=12, choices=AUTHOR_MODE_CHOICES, default="anonymous"
    )
    display_name = models.CharField("nombre visible", max_length=80, blank=True)
    status = models.CharField(
        "estado", max_length=20, choices=STATUS_CHOICES, default="pending", db_index=True
    )
    moderation_note = models.CharField("nota de moderación", max_length=300, blank=True)
    created_at = models.DateTimeField("fecha de envío", auto_now_add=True)
    updated_at = models.DateTimeField("última actualización", auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "idea"
        verbose_name_plural = "ideas"

    def __str__(self) -> str:
        return self.text[:70]


class IdeaReport(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="reports")
    reason = models.CharField("motivo", max_length=300, blank=True)
    created_at = models.DateTimeField("fecha", auto_now_add=True)
    reviewed = models.BooleanField("revisado", default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "reporte de idea"
        verbose_name_plural = "reportes de ideas"

    def __str__(self) -> str:
        return f"Reporte #{self.pk} — Idea #{self.idea_id}"
