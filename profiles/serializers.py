"""
Imports for Profile Serializers
"""
from django.contrib.humanize.templatetags.humanize import naturaltime
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
    display_updated_at = serializers.SerializerMethodField(read_only=True)

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

    def get_display_updated_at(self, obj):
        """
        Provides a human-readable representation of the object's updated time.
        """
        return naturaltime(obj.updated_at)

    def validate_image(self, value):
        "check if file size is greater than 2mb"
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError("Image size larger than 2mb!")
        if value.image.width > 2048:
            raise serializers.ValidationError(
                "Image width larger than 2048px!"
            )
        if value.image.height > 2048:
            raise serializers.ValidationError(
                "Image height larger than 2048px!"
            )
        return value

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
