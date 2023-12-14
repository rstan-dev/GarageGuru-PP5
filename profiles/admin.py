"""
Admin module for the profiles app
"""
from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """
    Register admin for the profiles app
    """

    list_display = (
        "id",
        "owner",
        "name",
        "created_at",
        "updated_at",
    )
    list_display_links = ("id", "owner",)
