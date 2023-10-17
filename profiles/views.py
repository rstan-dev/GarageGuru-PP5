from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile


class ProfileList(APIView):
    """
    View to handle HTTP GET requests for retrieving a list of
    profiles from the Profile Model, returning them as a JSON response.
    """
    def get(self, request):
        profiles = Profile.objects.all()
        return Response(profiles)


