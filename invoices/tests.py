from django.contrib.auth.models import User
from django.urls import reverse
from .models import Invoice
from jobs.models import Job
from rest_framework import status
from rest_framework.test import APITestCase
from .serializers import InvoiceSerializer


class InvoiceListViewTests(APITestCase):

    def setUp(self):
        testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')
        test_job = Job.objects.create(
            owner=testuser1,
            job_type='MOT',
            job_details='test details',
            status='Pending',
            assigned_to=testuser2
        )
        Invoice.objects.create(
            job=test_job,
            owner=testuser1,
            customer_firstname='TestFirstName',
            customer_lastname='TestSecondName',
            due_date='2023-11-15',
            amount=100.00,
            invoice_status='Pending',
        )

    def test_logged_in_user_can_retrieve_all_invoices(self):
        """
        Test that a user can retrieve a list of all invoices and their respective job.

        This test checks if a user, after logging in, can successfully retrieve a list of all invoices.
        It creates a sample job in the database and a sample invoice.  It then sends a GET request to the jobs endpoint
        to fetch the list of jobs and invoices.

        The test verifies that the HTTP response status is 200 (OK)
        """
        self.client.login(username='testuser1', password='testpw1234')
        response = self.client.get('/invoices/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
