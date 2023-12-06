"""
Imports for Job Views
"""
from rest_framework import status, permissions, generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Job
from .serializers import JobSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from django.db.models import Count, Subquery, OuterRef
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend


class CustomPagination(PageNumberPagination):
    """
    View to add a count of all status types to pagination data
    """

    def get_paginated_response(self, data, status_counts=None):
        return Response(
            {
                "status_counts": status_counts or {},
                "count": self.page.paginator.count,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": data,
            }
        )


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
        "owner__username",
        "job_type",
        "job_details",
        "assigned_to__username",
        "status",
        "id",
    ]
    ordering_fields = [
        "created_at",
        "updated_at",
        "due_date",
    ]
    filterset_fields = [
        "owner__username",
        "assigned_to__username",
    ]

    def list(self, request, *args, **kwargs):
        """
        Retrieve a list of objects and return them in a paginated format.

        This method overrides the default `list` method to provide custom
        functionality in retrieving and serializing data. It first filters
        the queryset based on the provided request parameters. Then, it
        applies pagination to the filtered queryset. If pagination is applied,
        a paginated response is returned with the serialized data and
        additional metadata, such as status counts.
        """
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            status_counts = self.calculate_status_counts(queryset)
            return self.paginator.get_paginated_response(
                serializer.data, status_counts=status_counts
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def calculate_status_counts(self, queryset):
        """
        Calculates the number of jobs with a specific status
        """
        # First, get a distinct set of job IDs from the filtered queryset
        distinct_jobs = queryset.values("id").distinct()

        # Then, count the statuses within this distinct set
        status_counts = (
            Job.objects.filter(id__in=Subquery(distinct_jobs.values("id")))
            .values("status")
            .annotate(total=Count("status"))
            .order_by()
        )

        return {item["status"]: item["total"] for item in status_counts}

    def get_queryset(self):
        """
        Retrieve and filter the queryset for Jobs.

        This method overrides the default `get_queryset` to apply custom
        filtering and annotations to the Job objects. It starts by fetching
        all Job objects and annotating each with a count of its related
        comments. The queryset is then ordered by the creation date of the
        jobs in descending order.

        The method also supports additional filtering based on a 'watched_by'
        query parameter. If 'watched_by' is provided, the method filters the
        jobs to include only those being watched by the specified user.
        """
        queryset = (
            Job.objects.all()
            .annotate(comment_count=Count("comments"))
            .order_by("-created_at")
        )
        watched_by = self.request.query_params.get("watched_by", None)

        if watched_by is not None:
            # Filter jobs based on whether they are being watched by
            # a given user
            queryset = queryset.filter(
                watch__owner__id=watched_by
            ).distinct()

        # Apply the filters from the filter backends manually
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(
                self.request, queryset, self
            )
        # Assign the filtered queryset to the request for use
        # in pagination
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

    def get_queryset(self):
        # Annotate the queryset with comment_count
        return Job.objects.annotate(comment_count=Count("comments"))
