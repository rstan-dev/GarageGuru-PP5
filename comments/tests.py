from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from jobs.models import Job
from .models import Comment
import datetime

class CommentModelTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')
        test_job = Job.objects.create(
            owner=testuser1,
            job_type='MOT',
            job_details='test details',
            status='Pending',
            assigned_to=testuser2
        )
        Comment.objects.create(owner=testuser1, job=test_job, comment_detail='Test comment')

    def test_comment_content(self):
        """
        Test the content of a comment is as expected
        """
        comment = Comment.objects.get(id=1)
        expected_owner = f'{comment.owner}'
        expected_job = f'{comment.job.job_type}'
        expected_comment_detail = f'{comment.comment_detail}'
        self.assertEquals(expected_owner, 'testuser1')
        self.assertEquals(expected_job, 'MOT')
        self.assertEquals(expected_comment_detail, 'Test comment')

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
        self.assertEquals(str(comment), 'Test comment')


