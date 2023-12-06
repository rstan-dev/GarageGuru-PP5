"""
Imports for Invoice Model
"""
from django.db import models
from django.contrib.auth.models import User
from jobs.models import Job
import datetime
from .choices import (
    STATUS_CHOICES,
)


class Invoice(models.Model):
    """
    Invoice model, related to User and Job
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.OneToOneField(
        Job,
        related_name="invoice",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    customer_firstname = models.CharField(max_length=200)
    customer_lastname = models.CharField(max_length=200)
    customer_email = models.EmailField(blank=True)
    customer_phone = models.CharField(
        max_length=100,
        verbose_name="Enter customer's phone number",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(default=datetime.date.today, blank=True)
    amount = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default="0",
    )
    invoice_status = models.CharField(
        max_length=75, choices=STATUS_CHOICES, default="Pending"
    )

    class Meta:
        """
        Orders invoices by most recently created date
        """

        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.id} {self.customer_firstname} {self.customer_lastname}"
        )
