from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model
    Adds three extra fields for is_owner, profile id and profile image, when returning each comment.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')


    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        return naturaltime(obj.updated_at)

    class Meta:
        model = Comment
        fields = [
            'id', 'owner', 'job', 'comment_detail', 'created_at', 'updated_at',
            'is_owner', 'profile_id', 'profile_image',
        ]


class CommentDetailSerializer(CommentSerializer):
    """
    Comment Detail Serializer ensures a comment is always associated
    with a specific job
    """
    job = serializers.ReadOnlyField(source='job.id')
