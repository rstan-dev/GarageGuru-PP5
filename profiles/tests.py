from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Profile
from rest_framework import status
from .serializers import ProfileSerializer


class ProfileListViewTests(APITestCase):

    def setUp(self):
        self.testuser1 = User.objects.create_user(username='testuser1', password='testpw1234')
        self.testuser2 = User.objects.create_user(username='testuser2', password='testpw1234')

    def test_logged_in_user_can_retrieve_all_profiles(self):
        """
        Test that a user can retrieve a list of all profiles.

        This test checks if a user, after logging in, can successfully retrieve a list of all profiles.

        It creates 2 users in the database, which utilises the post_save
        signal to create 2 profile instances. It then sends a GET request
        to the profiles endpoint to fetch the list of profiles.
        The test verifies there are 2 objects in the databse and that the
        HTTP response status is 200 (OK)
        """
        self.client.login(username='testuser1', password='testpw1234')

        response = self.client.get('/profiles/')
        count = Profile.objects.count()
        self.assertEqual(count, 2)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK)
