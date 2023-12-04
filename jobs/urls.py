"""
Imports for Job URLs
"""
from django.urls import path
from .views import JobList, JobDetail

urlpatterns = [
    path("jobs/", JobList.as_view()),
    path("jobs/<int:pk>/", JobDetail.as_view()),
]
