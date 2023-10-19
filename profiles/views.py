from django.http import Http404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class ProfileList(APIView):
    """
    View to handle HTTP GET requests for retrieving a list of
    profiles from the Profile Model, returning them as a JSON response.
    Permissions ensure only logged in users can see profile list
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True, context={'request': request})
        return Response(serializer.data)


class ProfileDetail(APIView):
    """
    Retrieve details of a single profile based on its primary key (pk) from
    the Profile model, or raise a 404 error if it does no exist.

    Defines a get method to handle HTTP requests and a put method to handle
    updates to profile info.

    serializer_class explicitly set to render form in preview.

    permission_classes set for isAurthenticated and IsOwnerOrReadOnly ensures user making the
    request has the correct permissions.
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            profile = Profile.objects.get(pk=pk)
            self.check_object_permissions(self.request, profile)
            return profile
        except Profile.DoesNotExist:
            raise Http404

    def get(self,request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

