"""
Imports for Invoice Admin
"""
from django.contrib import admin
from .models import Invoice


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    """
    Register admin fields for Invocie Model
    """

    list_display = (
        "id",
        "customer_firstname",
        "customer_lastname",
        "amount",
        "invoice_status",
        "created_at",
        "updated_at",
        "owner",
    )
    list_display_links = ("id", "customer_firstname")
