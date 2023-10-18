from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Job
from .serializers import JobSerializer


class JobList(APIView):
    """
    View to handle HTTP GET requests for retrieving a list of
    jobs from the Job Model, returning them as a JSON response.

    HTTP POST request creates a new job instance

    serializer_class renders form

    permission_classes requires users to be logged in to create or upate
    job card.
    """
    serializer_class = JobSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = JobSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class JobDetail(APIView):
    """
    Retrieve details of a single job based on its primary key (pk) from
    the Job model, or raise a 404 error if it does no exist.

    Defines a get method to handle HTTP requests and a put method to handle
    updates to Job card.

    serializer_class explicitly set to render form in preview.

    permission_classes set for IsOwnerOrReadOnly ensures user making the
    request has the correct permissions.
    """
    serializer_class = JobSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, request, pk):
        try:
            job = Job.objects.get(pk=pk)
            self.check_object_permissions(self.request, job)
            serializer = JobSerializer(job, context={'request': request})
            return Response(serializer.data)
        except Job.DoesNotExist:
            raise Http404








