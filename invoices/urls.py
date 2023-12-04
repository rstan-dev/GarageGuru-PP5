"""
Imports for Invoice URLs
"""
from django.urls import path
from .views import InvoiceList, InvoiceDetail

urlpatterns = [
    path("invoices/", InvoiceList.as_view()),
    path("invoices/<int:pk>/", InvoiceDetail.as_view()),
]
