"""
Imports for JobTests
"""
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Job
from rest_framework import status
from rest_framework.test import APITestCase
from .serializers import JobSerializer


class JobListViewTests(APITestCase):
    def setUp(self):
        """
        Automatically runs before every test method
        """
        testuser1 = User.objects.create_user(
            username="testuser1", password="testpw1234"
        )
        testuser2 = User.objects.create_user(
            username="testuser2", password="testpw1234"
        )

    def test_logged_in_user_can_retrieve_all_jobs(self):
        """
        Test that a user can retrieve a list of all jobs.

        This test checks if a user, after logging in, can successfully
        retrieve a list of all jobs.
        It creates a sample job in the database and then sends a GET request
        to the jobs endpoint to fetch the list of jobs. The test verifies
        that the HTTP response status is 200 (OK)
        """
        testuser1 = User.objects.get(username="testuser1")
        testuser2 = User.objects.get(username="testuser2")
        Job.objects.create(
            owner=testuser1,
            job_type="Service",
            job_details="test details",
            status="Pending",
            assigned_to=testuser2,
        )
        response = self.client.get("/jobs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_job(self):
        """
        Test that a logged-in user can create a job.

        This test checks if a user, after logging in, can successfully
        create a new job with specific details. It verifies that the job
        is created in the database and that the HTTP response status is
        201 (Created).
        """
        self.client.login(username="testuser1", password="testpw1234")
        testuser2 = User.objects.get(username="testuser2")
        response = self.client.post(
            "/jobs/",
            {
                "job_type": "Major Service",
                "job_details": "test details",
                "status": "Pending",
                "assigned_to": testuser2.id,
            },
        )
        count = Job.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_logged_out_user_cannot_create_job(self):
        """
        Test that a logged-out user cannot create a job, by verifying
        with a HTTP 403 Forbidden status.
        """
        testuser2 = User.objects.get(username="testuser2")
        response = self.client.post(
            "/jobs/",
            {
                "job_type": "Service",
                "job_details": "test details",
                "status": "Pending",
                "assigned_to": testuser2,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class JobDetailViewTests(APITestCase):
    def setUp(self):
        """
        Automatically runs before every test method
        """
        testuser1 = User.objects.create_user(
            username="testuser1", password="testpw1234"
        )
        testuser2 = User.objects.create_user(
            username="testuser2", password="testpw1234"
        )
        Job.objects.create(
            pk=1,
            owner=testuser1,
            job_type="Major Service",
            job_details="test details",
            status="Pending",
            assigned_to=testuser2,
        )
        Job.objects.create(
            pk=2,
            owner=testuser2,
            job_type="Minor Service",
            job_details="more test details",
            status="Pending",
            assigned_to=testuser2,
        )

    def test_user_can_retrieve_job_with_valid_job_id(self):
        """
        Tests a user can retrieve all the job details using the correct id
        Verified with a HTTP 200 status.
        """
        response = self.client.get("/jobs/1/")
        self.assertEqual(response.data["owner"], "testuser1")
        self.assertEqual(response.data["job_type"], "Major Service")
        self.assertEqual(response.data["job_details"], "test details")
        self.assertEqual(response.data["status"], "Pending")
        self.assertEqual(response.data["assigned_to"], 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_retrieve_job_with_invalid_id(self):
        """
        Tests a user cannot retrieve any job details using an incorrect id
        Verified with a HTTP 404 status.
        """
        response = self.client.get("/jobs/101/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_cannot_update_job_card_they_dont_own(self):
        """
        Tests a user can't update job details on a job card they don't own.
        Verified with a HTTP 403 status.
        """
        self.client.login(username="testuser1", password="testpw1234")
        response = self.client.put(
            "/jobs/2/",
            {"job_details": "NEW TEST DETAILS", "assigned_to": 2},
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class JobUpdateTest(APITestCase):
    def setUp(self):
        """
        Automatically runs before every test method
        """
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )

        self.client.login(username="testuser", password="testpassword")

        self.job = Job.objects.create(
            owner=self.user,
            job_type="Major Service",
            job_details="Initial job details",
            status="Pending",
            assigned_to=self.user,
        )

    def test_user_can_update_own_job_card(self):
        """
        Tests a user can update a job card they own
        Verified with a HTTP 200 OK status.
        """
        updated_data = {
            "job_type": "Minor Service",
            "job_details": "Updated job details",
            "status": "Pending",
            "assigned_to": self.job.assigned_to.id,
        }

        url = f"/jobs/{self.job.id}/"
        response = self.client.put(url, updated_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.job.refresh_from_db()

        self.assertEqual(self.job.job_type, "Minor Service")
        self.assertEqual(self.job.job_details, "Updated job details")
        self.assertEqual(self.job.status, "Pending")
        self.assertEqual(self.job.owner, self.user)

    def tearDown(self):
        self.user.delete()
        self.job.delete()
