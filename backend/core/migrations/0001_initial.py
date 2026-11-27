from django.db import migrations, models
import django.core.validators
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="ContactSubmission",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, verbose_name="nombre")),
                ("company", models.CharField(blank=True, max_length=160, verbose_name="empresa")),
                ("email", models.EmailField(max_length=254, verbose_name="correo")),
                ("phone", models.CharField(max_length=9, validators=[django.core.validators.RegexValidator("^\\d{9}$", "Ingresa un número peruano de 9 dígitos.")], verbose_name="WhatsApp")),
                ("service", models.CharField(blank=True, max_length=120, verbose_name="servicio o necesidad")),
                ("description", models.TextField(max_length=3000, verbose_name="descripción")),
                ("preferred_contact", models.CharField(choices=[("email", "Correo"), ("whatsapp", "WhatsApp")], default="email", max_length=10, verbose_name="medio preferido")),
                ("privacy_consent", models.BooleanField(default=False, verbose_name="consentimiento")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="fecha de envío")),
                ("reviewed_at", models.DateTimeField(blank=True, null=True, verbose_name="fecha de revisión")),
            ],
            options={"verbose_name": "consulta", "verbose_name_plural": "consultas", "ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Idea",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("text", models.CharField(max_length=300, verbose_name="idea")),
                ("category", models.CharField(choices=[("Procesos", "Procesos"), ("Datos", "Datos"), ("Atención", "Atención"), ("Innovación", "Innovación")], max_length=20, verbose_name="categoría")),
                ("author_mode", models.CharField(choices=[("named", "Con nombre"), ("anonymous", "Anónimo"), ("avatar", "Avatar")], default="anonymous", max_length=12, verbose_name="identificación")),
                ("display_name", models.CharField(blank=True, max_length=80, verbose_name="nombre visible")),
                ("status", models.CharField(choices=[("pending", "Pendiente"), ("approved", "Aprobada"), ("needs_changes", "Necesita corrección"), ("rejected", "Rechazada")], db_index=True, default="pending", max_length=20, verbose_name="estado")),
                ("moderation_note", models.CharField(blank=True, max_length=300, verbose_name="nota de moderación")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="fecha de envío")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="última actualización")),
            ],
            options={"verbose_name": "idea", "verbose_name_plural": "ideas", "ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="IdeaReport",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("reason", models.CharField(blank=True, max_length=300, verbose_name="motivo")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="fecha")),
                ("reviewed", models.BooleanField(default=False, verbose_name="revisado")),
                ("idea", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="reports", to="core.idea")),
            ],
            options={"verbose_name": "reporte de idea", "verbose_name_plural": "reportes de ideas", "ordering": ["-created_at"]},
        ),
    ]
