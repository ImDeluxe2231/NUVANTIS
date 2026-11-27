import json
from django.test import TestCase
from django.urls import reverse
from .models import ContactSubmission, Idea, IdeaReport


class PublicApiTests(TestCase):
    def test_contact_submission_is_persisted(self):
        response = self.client.post(
            reverse("contact"),
            data=json.dumps({
                "name": "Persona de prueba",
                "email": "persona@example.com",
                "phone": "999999999",
                "description": "Necesitamos organizar un proceso interno.",
                "preferred_contact": "email",
                "privacy_consent": True,
            }),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactSubmission.objects.count(), 1)

    def test_new_idea_requires_moderation(self):
        response = self.client.post(
            reverse("ideas"),
            data=json.dumps({
                "text": "Quiero automatizar un reporte operativo.",
                "category": "Procesos",
                "author_mode": "anonymous",
            }),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Idea.objects.get().status, "pending")
        self.assertEqual(self.client.get(reverse("ideas")).json()["results"], [])

    def test_approved_idea_can_be_reported(self):
        idea = Idea.objects.create(text="Necesito integrar dos sistemas.", category="Innovación", status="approved")
        response = self.client.post(
            reverse("report-idea", args=[idea.pk]),
            data=json.dumps({"reason": "Revisar contenido"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(IdeaReport.objects.count(), 1)

    def test_public_forms_require_csrf(self):
        from django.test import Client

        client = Client(enforce_csrf_checks=True)
        url = reverse("ideas")
        payload = {"text": "Validar el flujo de moderación.", "category": "Procesos"}
        self.assertEqual(client.post(url, payload, content_type="application/json").status_code, 403)
        token = client.get(reverse("csrf")).json()["token"]
        response = client.post(url, payload, content_type="application/json", HTTP_X_CSRFTOKEN=token)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Idea.objects.get().status, "pending")

    def test_repeated_contact_writes_are_limited(self):
        from unittest.mock import patch

        with patch("core.views.time", return_value=98765):
            for _ in range(8):
                response = self.client.post(reverse("contact"), {}, content_type="application/json")
                self.assertEqual(response.status_code, 400)
            response = self.client.post(reverse("contact"), {}, content_type="application/json")
        self.assertEqual(response.status_code, 429)
        self.assertGreater(int(response["Retry-After"]), 0)
        self.assertFalse(ContactSubmission.objects.exists())
