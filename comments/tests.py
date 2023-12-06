"""
Imports for CommentTests
"""
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from jobs.models import Job
from .models import Comment
from .serializers import CommentSerializer
import datetime
from rest_framework import status


class CommentModelTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        """
        Automatically runs before every test method
        """
        testuser1 = User.objects.create_user(
            username="testuser1", password="testpw1234"
        )
        testuser2 = User.objects.create_user(
            username="testuser2", password="testpw1234"
        )
        test_job = Job.objects.create(
            owner=testuser1,
            job_type="MOT",
            job_details="test details",
            status="Pending",
            assigned_to=testuser2,
        )
        Comment.objects.create(
            owner=testuser1, job=test_job, comment_detail="Test comment"
        )

    def test_comment_content(self):
        """
        Test the content of a comment is as expected
        """
        comment = Comment.objects.get(id=1)
        expected_owner = f"{comment.owner}"
        expected_job = f"{comment.job.job_type}"
        expected_comment_detail = f"{comment.comment_detail}"
        self.assertEquals(expected_owner, "testuser1")
        self.assertEquals(expected_job, "MOT")
        self.assertEquals(expected_comment_detail, "Test comment")

    def test_created_at(self):
        """
        Test the CommentModel created date of a comment is valid
        """
        comment = Comment.objects.get(id=1)
        self.assertTrue(isinstance(comment.created_at, datetime.datetime))

    def test_updated_at(self):
        """
        Test the CommentModel updated date of a comment is valid
        """
        comment = Comment.objects.get(id=1)
        self.assertTrue(isinstance(comment.updated_at, datetime.datetime))

    def test_str_representation(self):
        """
        Test the CommentModel string representation of a comment is valid
        """
        comment = Comment.objects.get(id=1)
        self.assertEquals(str(comment), "Test comment")

    def test_logged_in_user_can_retrieve_a_comment_they_created(self):
        """
        Test a logged in user can retrieve a comment by its ID
        """
        self.client.login(username="testuser1", password="testpw1234")
        comment = Comment.objects.get(comment_detail="Test comment")
        response = self.client.get(f"/comments/{comment.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_retrieve_a_comment_they_didnt_create(self):
        """
        Test a logged in user can retrieve a comment by its ID
        """
        self.client.login(username="testuser2", password="testpw1234")
        comment = Comment.objects.get(comment_detail="Test comment")
        response = self.client.get(f"/comments/{comment.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_a_comment(self):
        """
        Test a logged in user can create a comment associated with a
        specific job.
        It verifies that the comment is created in the database and that the
        HTTP response status is 201 (Created).
        It also verifies there is a comment object with a specific
        comment_detail.
        """
        self.client.login(username="testuser1", password="testpw1234")
        data = {
            "owner": User.objects.get(username="testuser1").id,
            "job": Job.objects.first().id,
            "comment_detail": "New Test Comment",
        }
        response = self.client.post("/comments/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            Comment.objects.filter(
                comment_detail="New Test Comment"
            ).count(),
            1,
        )

    def test_logged_out_user_cannot_create_a_comment(self):
        """
        Test a logged-out user is unable to create a comment.
        It verifies that the that the response status is 403 FORBIDDEN
        or 401 UNAUTHORIZED.
        It also verifies there is no comment object with that specific
        comment_detail.
        """
        data = {
            "owner": User.objects.get(username="testuser1").id,
            "job": Job.objects.first().id,
            "comment_detail": "Another Test Comment",
        }
        response = self.client.post("/comments/", data)
        self.assertIn(
            response.status_code,
            [status.HTTP_403_FORBIDDEN, status.HTTP_401_UNAUTHORIZED],
        )
        self.assertEqual(
            Comment.objects.filter(
                comment_detail="Another Test Comment"
            ).count(),
            0,
        )

class CommentReply(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Create users, job, and comment as in your existing tests
        """
        Automatically runs before every test method
        """
        testuser1 = User.objects.create_user(
            username="testuser1", password="testpw1234"
        )
        testuser2 = User.objects.create_user(
            username="testuser2", password="testpw1234"
        )
        test_job = Job.objects.create(
            owner=testuser1,
            job_type="MOT",
            job_details="test details",
            status="Pending",
            assigned_to=testuser2,
        )
        cls.parent_comment = Comment.objects.create(owner=testuser1, job=test_job, comment_detail="Test comment")

    def test_reply_creation(self):
        """
        Test a user can create a reply to an existing comment and the reply
        is associated with the parent comment.
        """
        self.client.login(username="testuser1", password="testpw1234")

        # Data for creating a reply
        reply_data = {
            "comment_detail": "Test reply",
            "job": Job.objects.first().id,
            "parent": self.parent_comment.id  # Ref to the parent comment
        }

        response = self.client.post("/comments/", reply_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Fetch the created reply and verify its content and association
        reply = Comment.objects.get(comment_detail="Test reply")
        self.assertEqual(reply.comment_detail, "Test reply")
        self.assertEqual(reply.parent.id, self.parent_comment.id)

