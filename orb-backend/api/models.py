from django.db import models

class ReminderPost(models.Model):
    event_title = models.CharField(max_length=100)
    event_description = models.TextField()
    event_date = models.DateField()
    event_time = models.TimeField()
    EVENT_CATEGORIES = [
        ('Work', 'Work'),
        ('Personal', 'Personal'),
        ('Health', 'Health'),
    ]
    event_category = models.CharField(max_length=100, choices=EVENT_CATEGORIES)
    
    
    def __str__(self):
        return self.event_title
