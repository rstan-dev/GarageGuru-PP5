from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Job
from .serializers import JobSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    """
    View to add a count of all status types to pagination data
    """
    def get_paginated_response(self, data):
        # Gets the total counts for each status
        status_counts = Job.objects.values('status').annotate(total=Count('status')).order_by()
        print(f"Status Counts: {status_counts}")
        status_counts_dict = {item['status']: item['total'] for item in status_counts}

        return Response({
            'status_counts': status_counts_dict,  # Include the counts
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })


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
    pagination_class = CustomPagination

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

