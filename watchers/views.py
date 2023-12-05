"""
Imports for Watch Views
"""
from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Watch
from .serializers import WatchSerializer


class WatchList(generics.ListCreateAPIView):
    """
    View to retrieve a list of watched items or create a new watch item
    using the perform_create function.
    serializer_class renders form.
    permission_classes requires users to be logged in to watch an item
    """

    serializer_class = WatchSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Watch.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WatchDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve or delete a watch item according to watch id and
    if the owner is logged in.
    """

    serializer_class = WatchSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Watch.objects.all()
