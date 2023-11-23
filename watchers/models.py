from django.db import models
from django.contrib.auth.models import User
from jobs.models import Job


class Watch(models.Model):
    """
    Watch model, related to 'owner' and 'job'.
    'owner' is a User instance and 'job' is a Job instance.
    'unique_together' makes sure a user can't watch the same job twice.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, related_name='watch',
                             on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = [['owner', 'job']]

    def __str__(self):
        return f'{self.owner} {self.job}'

