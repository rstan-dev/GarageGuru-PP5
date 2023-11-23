from django.urls import path
from watchers import views

urlpatterns = [
    path('watchers/', views.WatchList.as_view()),
    path('watchers/<int:pk>/', views.WatchDetail.as_view())
]