from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ReminderPost

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email']

class ReminderPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReminderPost
        fields = ['id', 'event_title', 'event_description', 'event_date', 'event_time', 'event_category']

