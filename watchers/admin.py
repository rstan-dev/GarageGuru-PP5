"""
Imports for Watch Admin
"""
from django.contrib import admin
from .models import Watch


@admin.register(Watch)
class WatchAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "job", "created_at")
    list_display_links = ("id", "owner", "job")
