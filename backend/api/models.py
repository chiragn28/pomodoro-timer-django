from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    
    # Add this if you want email as the username field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username

class Task(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class TimerSetting(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    work_duration = models.IntegerField(default=25)
    short_break = models.IntegerField(default=5)
    long_break = models.IntegerField(default=15)
    sound_preference = models.CharField(max_length=100, default='check.mp3')
    background_preference = models.CharField(max_length=100, default='background.jpg')