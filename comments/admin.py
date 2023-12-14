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
        "id",
        "owner",
        "comment_detail",
        "created_at",
        "updated_at",
    )
    list_display_links = ("id", "owner", "comment_detail",)
