from django.urls import path
from jobs import views

urlpatterns = [
    path('jobs/', views.JobList.as_view()),
    path('jobs/<int:pk>/', views.JobDetail.as_view())
]