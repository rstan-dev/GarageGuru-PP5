from django.contrib.auth.models import User
from .models import Job
from rest_framework import status
from rest_framework.test import APITestCase


class JobListViewTests(APITestCase):
    def setUp(self):
        testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')

    def test_user_can_retrieve_all_jobs(self):
        testuser1 = User.objects.get(username='testuser1')
        testuser2 = User.objects.get(username='testuser2')
        Job.objects.create(
            owner=testuser1,
            job_type='Service',
            job_details='test details',
            status='Pending',
            assigned_to=testuser2
        )
        response = self.client.get('/jobs/')
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK)
        print(response.data)
        print(len(response.data))