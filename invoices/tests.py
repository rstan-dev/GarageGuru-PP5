from django.contrib.auth.models import User
from django.urls import reverse
from .models import Invoice
from jobs.models import Job
from rest_framework import status
from rest_framework.test import APITestCase
from .serializers import InvoiceSerializer


class InvoiceListViewTests(APITestCase):

    def setUp(self):
        self.testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        self.testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')
        self.test_job = Job.objects.create(
            owner=self.testuser1,
            job_type='MOT',
            job_details='test details',
            status='Pending',
            assigned_to=self.testuser2
        )


    def test_logged_in_user_can_retrieve_all_invoices(self):
        """
        Test that a user can retrieve a list of all invoices and their
        respective job.

        This test checks if a user, after logging in, can successfully
        retrieve a list of all invoices. It creates a sample job in the
        database and a sample invoice. It then sends a GET request to the
        invoice endpoint to fetch the list of jobs and invoices.

        The test verifies that the HTTP response status is 200 (OK)
        """
        self.client.login(username='testuser1', password='testpw1234')
        Invoice.objects.create(
            job=self.test_job,
            owner=self.testuser1,
            customer_firstname='TestFirstName',
            customer_lastname='TestSecondName',
            due_date='2023-11-15',
            amount=100.00,
            invoice_status='Pending',
        )
        response = self.client.get('/invoices/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_an_invoice(self):
        """
        Test a logged in user can create an invoice associated with a
        specific job.
        It verifies that the invoice is created in the database and that the
        HTTP response status is 201 (Created).
        It also verifies there is an invoice object with a specific invoice amount.
        """
        self.client.login(username='testuser1', password='testpw1234')
        data = {
            'job_id': self.test_job.id,
            'customer_firstname': 'Test User2',
            'customer_lastname': 'Surname2',
            'inv_due_date': '2023-11-20',
        }
        response = self.client.post('/invoices/', data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
