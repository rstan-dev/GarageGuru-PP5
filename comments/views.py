from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Comment
from . serializers import CommentSerializer, CommentDetailSerializer


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
    filter_backends = [
        DjangoFilterBackend
    ]
    filterset_fields = [
        'job'
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, edit or delete a comment according to comment id and
    if the owner is logged in.
    """
    serializer_class = CommentDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Comment.objects.all()
