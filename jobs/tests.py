from django.contrib.auth.models import User
from .models import Job
from rest_framework import status
from rest_framework.test import APITestCase


class JobListViewTests(APITestCase):

    def setUp(self):
        testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')

    def test_user_can_retrieve_all_jobs(self):
        """
        Test that a user can retrieve a list of all jobs.

        This test checks if a user, after logging in, can successfully retrieve a list of all jobs.
        It creates a sample job in the database and then sends a GET request to the jobs endpoint
        to fetch the list of jobs. The test verifies that the HTTP response status is 200 (OK)
        """
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

    def test_logged_in_user_can_create_job(self):
        """
        Test that a logged-in user can create a job.

        This test checks if a user, after logging in, can successfully
        create a new job with specific details. It verifies that the job
        is created in the database and that the HTTP response status is
        201 (Created).
        """
        self.client.login(username='testuser1', password='testpw1234')
        testuser2 = User.objects.get(username='testuser2')
        response = self.client.post(
            '/jobs/',
            {
                'job_type': 'Major Service',
                'job_details': 'test details',
                'status': 'Pending',
                'assigned_to': testuser2.id
            }
        )
        count = Job.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED)

    def test_logged_out_user_cannot_create_job(self):
        """
        Test that a logged-out user cannot create a job, by verifying
        with a HTTP 403 Forbidden status.
        """
        testuser2 = User.objects.get(username='testuser2')
        response = self.client.post(
            '/jobs/',
            {
                'job_type': 'Service',
                'job_details': 'test details',
                'status': 'Pending',
                'assigned_to': testuser2
            }
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class JobDetailViewTests(APITestCase):
    def setUp(self):
        testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')
        Job.objects.create(
            owner=testuser1,
            job_type='Major Service',
            job_details='test details',
            status='Pending',
            assigned_to=testuser2
        )
        Job.objects.create(
            owner=testuser2,
            job_type='Minor Service',
            job_details='more test details',
            status='Pending',
            assigned_to=testuser2
        )

    def test_can_retrieve_job_using_valid_id(self):
        response = self.client.get('/jobs/1/')
        self.assertEqual(response.data['owner'], 'testuser1')
        self.assertEqual(response.data['job_type'], 'Major Service')
        self.assertEqual(response.data['job_details'], 'test details')
        self.assertEqual(response.data['status'], 'Pending')
        self.assertEqual(response.data['assigned_to'], 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
