from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('reminders/', views.ReminderPostListCreateAPIView.as_view(), name="reminder-post-create"),
    path('reminders/<int:pk>/', views.ReminderPostRetrieveUpdateDestroyAPIView.as_view(), name="update")
]

urlpatterns = format_suffix_patterns(urlpatterns)
