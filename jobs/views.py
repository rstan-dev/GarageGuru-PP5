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
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            job = Job.objects.get(pk=pk)
            self.check_object_permissions(self.request, job)
            return job
        except Job.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        job = self.get_object(pk)
        serializer = JobSerializer(
            job,
            context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        job = self.get_object(pk)
        serializer = JobSerializer(
            job,
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        job = job = Job.objects.get(pk=pk)
        job.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )







