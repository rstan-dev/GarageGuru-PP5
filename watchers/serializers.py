from django.db import IntegrityError
from rest_framework import serializers
from watchers.models import Watch


class WatchSerializer(serializers.ModelSerializer):
    """
    Serializer for the Watch model
    The create method handles the unique constraint on 'owner' and 'watch'
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Watch
        fields = [
            'id', 'owner', 'created_at', 'job'
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })