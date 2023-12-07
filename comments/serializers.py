"""
Imports for CommentSerializer
"""
from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model
    Adds three extra fields for is_owner, profile id and profile image, when
    returning each comment.

    Adds parent field for handling the id of the parent comment
    Adds replies field for handling replies to specific comments
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(
        source="owner.profile.image.url"
    )

    parent = serializers.PrimaryKeyRelatedField(
        queryset=Comment.objects.all(), required=False
    )
    replies = serializers.SerializerMethodField(method_name="get_replies")

    def get_is_owner(self, obj):
        """
        Determines if the request user is the owner of the comment.
        """
        request = self.context["request"]
        return request.user == obj.owner

    def get_created_at(self, obj):
        """
        Provides a human-readable representation of the comment's creation
        time.
        """
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        """
        Provides a human-readable representation of the comment's updated
        time.
        """
        return naturaltime(obj.updated_at)

    def get_replies(self, obj):
        """
        Serialize replies without nesting further replies
        Only get replies for top-level comments
        No nested replies
        """
        if obj.parent is None:
            replies = Comment.objects.filter(parent=obj)
            return CommentReplySerializer(
                replies, many=True, context=self.context
            ).data
        return []

    class Meta:
        """
        Comment model fields
        """

        model = Comment
        fields = [
            "id",
            "owner",
            "job",
            "comment_detail",
            "created_at",
            "updated_at",
            "is_owner",
            "profile_id",
            "profile_image",
            "parent",
            "replies",
        ]


class CommentDetailSerializer(CommentSerializer):
    """
    Comment Detail Serializer ensures a comment is always associated
    with a specific job
    """

    job = serializers.ReadOnlyField(source="job.id")


class CommentReplySerializer(serializers.ModelSerializer):
    """
    Simplified serializer for replies, excludes parent and replies to avoid
    further nesting
    """

    reply_id = serializers.IntegerField(source="id", read_only=True)
    reply_owner = serializers.ReadOnlyField(source="owner.username")
    reply_comment_detail = serializers.ReadOnlyField(source="comment_detail")
    reply_created_at = serializers.SerializerMethodField()
    reply_updated_at = serializers.SerializerMethodField()

    def get_reply_created_at(self, obj):
        """
        Provides a human-readable representation of the reply's creation
        time.
        """
        return naturaltime(obj.created_at)

    def get_reply_updated_at(self, obj):
        """
        Provides a human-readable representation of the reply's updated
        time.
        """
        return naturaltime(obj.updated_at)

    class Meta:
        """
        Comment model fields
        """

        model = Comment
        fields = [
            "reply_id",
            "reply_owner",
            "reply_comment_detail",
            "reply_created_at",
            "reply_updated_at",
            "parent",
        ]