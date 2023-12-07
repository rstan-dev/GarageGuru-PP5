"""
Imports for Profile Serializers
"""
from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializes specific Profile model fields into JSON data.
    get_is_owner method checks if the user making the request is the
    owner of the profile.
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        """
        Determines if the request user is the owner of the comment.
        """
        request = self.context["request"]
        return request.user == obj.owner

    # Format with only date
    display_created_at = serializers.DateTimeField(
        source="created_at", format="%Y-%m-%d", read_only=True
    )
    # Format with date and time
    display_updated_at = serializers.DateTimeField(
        source="updated_at", format="%Y-%m-%d %H:%M:%S", read_only=True
    )

    class Meta:
        model = Profile
        fields = [
            "id",
            "owner",
            "name",
            "bio",
            "image",
            "display_created_at",
            "display_updated_at",
            "is_owner",
        ]
