"""
Imports for Comment Views
"""
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReplyOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer, CommentDetailSerializer


class CommentList(generics.ListCreateAPIView):
    """
    View to retrieve a list of comments or create a new comment using the
    perform_create function.
    serializer_class renders form.
    permission_classes requires users to be logged in to leave a
    comment
    """

    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["job"]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        Optionally restricts the returned comments to be only top-level
        comments for a given job, unless specified otherwise.

        If 'parent' param is provided, filter by parent ID (for replies)

        By default, show only top-level comments (parent is None)
        """
        queryset = super().get_queryset()
        parent = self.request.query_params.get("parent")
        if parent is not None:
            queryset = queryset.filter(parent_id=parent)
        else:
            queryset = queryset.filter(parent__isnull=True)
        return queryset


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, edit or delete a comment according to comment id and
    if the owner is logged in.
    """

    serializer_class = CommentDetailSerializer
    permission_classes = [IsOwnerOrReplyOwnerOrReadOnly]
    queryset = Comment.objects.all()
