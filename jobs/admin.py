"""
Admin module for the comments app
"""
from django.contrib import admin
from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    """
    Register admin for the jobs app
    """

    list_display = (
        "id",
        "job_type",
        "created_at",
        "updated_at",
        "owner",
        "assigned_to",
        "status",
    )
    list_display_links = ("id", "job_type",)
