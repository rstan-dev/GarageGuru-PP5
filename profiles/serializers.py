from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializes specific Profile model fields into JSON data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'name', 'bio', 'image', 'created_at', 'updated_at', 'is_owner'
        ]