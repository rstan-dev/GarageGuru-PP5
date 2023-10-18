from django.db import models
from django.contrib.auth.models import User
from .choices import (
    JOB_TYPE_CHOICES,
    STATUS_CHOICES
)


class Job(models.Model):
    """
    Job model relates to a specific owner / user instance.
    A default image is set to reference image.url.

    Choices are defined for job_type and status.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_owner')
    assigned_to = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="assigned_to")

    job_type = models.CharField(max_length=75, choices=JOB_TYPE_CHOICES, default='Placeholder')
    job_details = models.TextField(blank=True)
    status = models.CharField(max_length=75, choices=STATUS_CHOICES, default='Pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    image = models.ImageField(
        upload_to='images/',
        default='../default_job',
        blank=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
