"""
Imports for ProfileTests
"""
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Profile
from rest_framework import status
from .serializers import ProfileSerializer


class ProfileListViewTests(APITestCase):
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

    def test_logged_in_user_can_retrieve_all_profiles(self):
        """
        Test that a user can retrieve a list of all profiles.

        This test checks if a user, after logging in, can successfully retrieve
        a list of all profiles.

        It creates 2 users in the database, which utilises the post_save
        signal to create 2 profile instances. It then sends a GET request
        to the profiles endpoint to fetch the list of profiles.
        The test verifies there are 2 objects in the databse and that the
        HTTP response status is 200 (OK)
        """
        self.client.login(username="testuser1", password="testpw1234")

        response = self.client.get("/profiles/")
        count = Profile.objects.count()
        self.assertEqual(count, 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_out_user_cannot_retrieve_any_profiles(self):
        """
        Test that a user cannot view any profiles if not logged in.

        The test verifies that no profiles are displayed with a
        HTTP response status 403 (Forbidden)
        """

        response = self.client.get("/profiles/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ProfileDetailViewTests(APITestCase):
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

    def test_logged_in_user_can_view_profile_with_valid_id(self):
        """
        Tests a logged in user can view profile by id.
        Verified with a HTTP 200 status if valid.
        """
        self.client.login(username="testuser1", password="testpw1234")
        profile = Profile.objects.get(owner=self.testuser1)
        response = self.client.get(f"/profiles/{profile.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_cannot_view_profile_with_invalid_id(self):
        """
        Tests a logged in user can't view a profile by id that does not exist.
        Verified with a HTTP 404 status if not found.
        """
        self.client.login(username="testuser1", password="testpw1234")
        profile = Profile.objects.get(owner=self.testuser1)
        response = self.client.get(f"/profiles/101/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_logged_out_user_cannot_view_any_profiles(self):
        """
        Tests a logged out user can't view any profiles by id.
        The test verifies that no profiles are displayed with a
        HTTP response status 403 (Forbidden)
        """
        profile = Profile.objects.get(owner=self.testuser1)
        response = self.client.get(f"/profiles/{profile.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_user_can_update_own_profile(self):
        """
        Tests a logged-in user can update their own profile details.
        Verified with a HTTP 200 status.
        """
        self.client.login(username="testuser1", password="testpw1234")

        profile = Profile.objects.get(owner=self.testuser1)
        response = self.client.put(
            f"/profiles/{profile.id}/",
            {"name": "Updated Name", "bio": "Updated Bio"},
        )
        profile.refresh_from_db()
        self.assertEqual(profile.name, "Updated Name")
        self.assertEqual(profile.bio, "Updated Bio")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_cannot_update_a_different_profile(self):
        """
        Tests a logged-in user cannot update another users' profile.
        Verified with a HTTP 403 status (Forbidden).
        """
        self.client.login(username="testuser1", password="testpw1234")

        profile1 = Profile.objects.get(owner=self.testuser1)
        profile2 = Profile.objects.get(owner=self.testuser2)
        response = self.client.put(
            f"/profiles/{profile2.id}/",
            {"name": "Updated Name", "bio": "Updated Bio"},
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
