from django.db import models
from django.contrib.auth.models import User
from jobs.models import Job


class Comment(models.Model):
    """
    Comment model, related to User and Job.
    Parent self reference allows for replies to comments.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, related_name="comments", on_delete=models.CASCADE)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    comment_detail = models.TextField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.comment_detail
