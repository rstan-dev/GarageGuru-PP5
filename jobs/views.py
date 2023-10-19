from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Job
from .serializers import JobSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class JobList(generics.ListCreateAPIView):
    """
    View to retrieve a list of jobs or create a new job using the
    perform_create function.
    serializer_class renders form.
    permission_classes requires users to be logged in to create a
    job card.
    """
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Job.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, edit or delete a job card according to job id and
    if the owner is logged in.
    """
    serializer_class = JobSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Job.objects.all()
