from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    """
    Serializes specific Job model fields into JSON data.

    assigned_to variable returns username dropdown.

    validate_image uses validation function to manage image size.

    get_is_owner method checks if the user making the request is the owner of
    the profile.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        allow_null=True
    )

    def validate_image(self, value):
        "check if file size is greater than 2mb"
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2mb!'
            )
        if value.image.width > 2048:
            raise serializers.ValidationError(
                'Image width larger than 2048px!'
            )
        if value.image.height > 2048:
            raise serializers.ValidationError(
                'Image height larger than 2048px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Job
        fields = [
            'id', 'owner', 'assigned_to', 'job_type',
            'job_details', 'status', 'created_at', 'updated_at',
            'image', 'is_owner', 'image_filter',
        ]