from django.contrib import admin
from .models import ContactSubmission, Idea, IdeaReport


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "company", "email", "service", "created_at", "reviewed_at")
    list_filter = ("service", "preferred_contact", "created_at")
    search_fields = ("name", "company", "email", "description")
    readonly_fields = ("created_at",)


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    list_display = ("text", "category", "author_mode", "status", "created_at")
    list_filter = ("status", "category", "author_mode")
    search_fields = ("text", "display_name")
    readonly_fields = ("created_at", "updated_at")
    actions = ["approve"]

    @admin.action(description="Aprobar ideas seleccionadas")
    def approve(self, request, queryset):
        queryset.update(status="approved", moderation_note="")


@admin.register(IdeaReport)
class IdeaReportAdmin(admin.ModelAdmin):
    list_display = ("idea", "reason", "reviewed", "created_at")
    list_filter = ("reviewed", "created_at")
    search_fields = ("idea__text", "reason")
