"""
Imports for User Profile Serializers
"""
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class UserProfileSerializer(UserDetailsSerializer):
    """
    Serializer for user profiles.

    This serializer extends the UserDetailsSerializer to include additional
    fields specific to the user's profile. It is used to serialize user data along
    with their profile information.
    """

    profile_id = serializers.ReadOnlyField(source="profile.id")
    profile_image = serializers.ReadOnlyField(source="profile.image.url")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ("profile_id", "profile_image")
