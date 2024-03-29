from rest_framework import generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import ReminderPost
from .serializers import ReminderPostSerializer


class ReminderPostListCreateAPIView(generics.ListCreateAPIView):
    queryset = ReminderPost.objects.all()
    serializer_class = ReminderPostSerializer


class ReminderPostRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReminderPost.objects.all()
    serializer_class = ReminderPostSerializer
    lookup_field = "pk"
