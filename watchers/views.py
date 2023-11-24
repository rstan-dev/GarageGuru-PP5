from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Watch
from . serializers import WatchSerializer


class WatchList(generics.ListCreateAPIView):
    serializer_class = WatchSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Watch.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WatchDetail(generics.RetrieveDestroyAPIView):
    serializer_class = WatchSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Watch.objects.all()

