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
        "created_at",
        "updated_at",
        "job_type",
        "owner",
        "assigned_to",
        "status",
    )
    list_display_links = ("job_type",)
