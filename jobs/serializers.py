from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    """
    Serializes specific Job model fields into JSON data.
    get_is_owner method checks if the user making the request is the owner of the profile.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    assigned_to = serializers.StringRelatedField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Job
        fields = [
            'id', 'owner', 'assigned_to', 'job_type',
            'job_details', 'status', 'created_at', 'updated_at',
            'image', 'is_owner'
        ]
