from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializes specific Profile model fields into JSON data.
    get_is_owner method checks if the user making the request is the owner of the profile.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    # Format with only date
    created_at = serializers.DateTimeField(format="%Y-%m-%d")
    # Format with date and time
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'name', 'bio', 'image', 'created_at', 'updated_at', 'is_owner'
        ]