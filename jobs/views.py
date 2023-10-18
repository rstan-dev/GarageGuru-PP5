from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer


class JobList(APIView):
    """
    View to handle HTTP GET requests for retrieving a list of
    jobs from the Job Model, returning them as a JSON response.
    """
    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True, context={'request': request})
        return Response(serializer.data)

