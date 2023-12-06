"""
Imports for WatchersTests
"""
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from jobs.models import Job
from .models import Watch
from .serializers import WatchSerializer
from rest_framework import status


class WatchModelTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        """
        Automatically runs before every test method
        """
        cls.testuser = User.objects.create_user(username="testuser", password="testpw1234")
        cls.test_job = Job.objects.create(
            owner=cls.testuser,
            job_type="MOT",
            job_details="test details",
            status="Pending",
            assigned_to=cls.testuser,
        )

    def test_watch_creation(self):
        """
        Test a user can watch a job.
        """
        watch = Watch.objects.create(owner=self.testuser, job=self.test_job)
        self.assertIsNotNone(watch.created_at)
        self.assertEqual(Watch.objects.count(), 1)