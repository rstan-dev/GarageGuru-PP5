"""
Imports for Profile Views
"""
from django.http import Http404
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class ProfileList(generics.ListAPIView):
    """
    List all profiles using generics ListView
    Permissions ensure only logged in users can see profile list
    Pagination is disabled for this view to return all profiles.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        """
        Overrides list method to return all profiles without pagination
        to display all assigned_users in the frontend.
        """
        queryset = Profile.objects.all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    View all profiles if logged in
    Edit a profile if owner is logged in or view profile if
    not the owner.
    Utilises the generics RetrieveUpdateAPI view.
    """

    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
