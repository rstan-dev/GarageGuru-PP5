"""
Admin module for the comments app
"""
from django.contrib import admin
from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """
    Register admin for the comments app
    """

    list_display = (
        "created_at",
        "updated_at",
        "owner",
    )
    list_display_links = ("owner",)
