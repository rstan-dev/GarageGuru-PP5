"""
Imports for InvoiceTests
"""
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Invoice
from jobs.models import Job
from rest_framework import status
from rest_framework.test import APITestCase
from .serializers import InvoiceSerializer


class InvoiceListViewTests(APITestCase):
    def setUp(self):
        """
        Automatically runs before every test method
        """
        self.testuser1 = User.objects.create_user(
            username="testuser1", password="testpw1234"
        )
        self.testuser2 = User.objects.create_user(
            username="testuser2", password="testpw1234"
        )
        self.test_job = Job.objects.create(
            owner=self.testuser1,
            job_type="MOT",
            job_details="test details",
            status="Pending",
            assigned_to=self.testuser2,
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
        self.client.login(username="testuser1", password="testpw1234")
        Invoice.objects.create(
            job=self.test_job,
            owner=self.testuser1,
            customer_firstname="TestFirstName",
            customer_lastname="TestSecondName",
            due_date="2023-11-15",
            amount=100.00,
            invoice_status="Pending",
        )
        response = self.client.get("/invoices/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_an_invoice(self):
        """
        Test a logged in user can create an invoice associated with a
        specific job.
        It verifies that the invoice is created in the database and that the
        HTTP response status is 201 (Created).
        It also verifies there is an invoice object with a specific invoice
        amount.
        """
        self.client.login(username="testuser1", password="testpw1234")
        data = {
            "job_id": self.test_job.id,
            "customer_firstname": "Test User2",
            "customer_lastname": "Surname2",
            "inv_due_date": "2023-11-20",
            "amount": "101.00",
        }
        response = self.client.post("/invoices/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Invoice.objects.filter(amount="101.00").count(), 1)

    def test_logged_out_user_cannot_create_an_invoice(self):
        """
        Test a logged-out user is unable to create an invoice.
        It verifies that the that the response status is 403 FORBIDDEN
        or 401 UNAUTHORIZED.
        """
        data = {
            "job_id": self.test_job.id,
            "customer_firstname": "Test User2",
            "customer_lastname": "Surname2",
            "inv_due_date": "2023-11-20",
            "amount": "101.00",
        }
        response = self.client.post("/invoices/", data)
        self.assertIn(
            response.status_code,
            [status.HTTP_403_FORBIDDEN, status.HTTP_401_UNAUTHORIZED],
        )


class InvoiceDetailViewTests(APITestCase):
    def setUp(self):
        """
        Automatically runs before every test method
        """
        self.testuser1 = User.objects.create_user(
            username="testuser1", password="testpw1234"
        )
        self.testuser2 = User.objects.create_user(
            username="testuser2", password="testpw1234"
        )
        self.test_job = Job.objects.create(
            owner=self.testuser1,
            job_type="MOT",
            job_details="test details",
            status="Pending",
            assigned_to=self.testuser2,
        )
        self.invoice = Invoice.objects.create(
            job=self.test_job,
            owner=self.testuser1,
            customer_firstname="TestFirstName",
            customer_lastname="TestSecondName",
            due_date="2023-11-15",
            amount=100.00,
            invoice_status="Pending",
        )

    def test_user_can_retrieve_invoice_with_valid_invocie_id(self):
        """
        Tests a logged-in user can retrieve all the invoice details using
        the correct id verified with a HTTP 200 status.
        """
        self.client.login(username="testuser1", password="testpw1234")
        response = self.client.get("/invoices/1/")
        self.assertEqual(response.data["inv_owner"], "testuser1")
        self.assertEqual(
            response.data["customer_firstname"], "TestFirstName"
        )
        self.assertEqual(
            response.data["customer_lastname"], "TestSecondName"
        )
        self.assertEqual(response.data["inv_due_date"], "2023-11-15")
        self.assertEqual(response.data["amount"], "100.00")
        self.assertEqual(response.data["invoice_status"], "Pending")

    def test_user_cannot_retrieve_invoice_with_invalid_id(self):
        """
        Tests a user cannot retrieve any invoice details using an incorrect
        id verified with a HTTP 404 status.
        """
        response = self.client.get("/invoices/101/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_cannot_update_invoice_they_dont_own(self):
        """
        Tests a user can't update invoice details they don't own.
        Verified with a HTTP 403 status.
        """
        self.client.login(username="testuser2", password="testpw1234")
        response = self.client.put(
            "/invoices/1/",
            {"customer_firstname": "UPDATED FIRST NAME"},
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_update_own_invoice(self):
        """
        Tests a user can update an invoice that they created
        Verified with a HTTP 200 OK status.
        """
        self.client.login(username="testuser1", password="testpw1234")
        updated_data = {
            "customer_firstname": "Updated_FirstName",
            "customer_lastname": "UpdatedSecondName",
            "inv_owner": "test_user1",
            "job_id": "1",
            "inv_due_date": "2023-11-15",
            "invoice_status": "Pending",
        }

        url = f"/invoices/{self.invoice.id}/"
        response = self.client.put(url, updated_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
