from rest_framework import status, permissions, generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Job
from .serializers import JobSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend


class CustomPagination(PageNumberPagination):
    """
    View to add a count of all status types to pagination data
    """
    def get_paginated_response(self, data):
        # Gets the total counts for each status according to filter set
        request = self.request
        filtered_queryset = request.filtered_queryset if hasattr(request, 'filtered_queryset') else Job.objects.all()
        status_counts = filtered_queryset.values('status').annotate(total=Count('status')).order_by()
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
    pagination_class = CustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = [
        'owner__username',
        'job_type',
        'job_details',
        'assigned_to__username',
        'status',
        'id',
    ]
    ordering_fields = [
        'created_at',
        'updated_at',
        'due_date',
    ]
    filterset_fields = [
        'owner__username',
        'assigned_to__username',
    ]

    def get_queryset(self):
        queryset = Job.objects.all().annotate(comment_count=Count('comments'))
        # Apply the filters from the filter backends manually
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        # Assign the filtered queryset to the request for use in pagination
        self.request.filtered_queryset = queryset
        return queryset

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

