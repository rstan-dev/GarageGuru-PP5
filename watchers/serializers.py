"""
Imports for Watch Serializers
"""
from django.db import IntegrityError
from rest_framework import serializers
from watchers.models import Watch


class WatchSerializer(serializers.ModelSerializer):
    """
    Serializer for the Watch model
    The create method handles the unique constraint on 'owner' and 'watch'
    """

    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Watch
        fields = ["id", "owner", "created_at", "job"]

    def create(self, validated_data):
        """
        Create and return a new instance based on the validated data.

        This method overrides the default `create` method to handle the
        creation of new instances with the provided validated data. If the
        creation process encounters an IntegrityError, typically indicating
        a potential duplicate record, the method raises a custom
        ValidationError.
        """
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                {"detail": "possible duplicate"}
            )
