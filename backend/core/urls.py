from django.urls import path
from . import views

urlpatterns = [
    path("csrf/", views.csrf, name="csrf"),
    path("health/", views.health, name="health"),
    path("contact/", views.contact, name="contact"),
    path("ideas/", views.ideas, name="ideas"),
    path("ideas/<int:idea_id>/report/", views.report_idea, name="report-idea"),
]
