from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    station = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username
    
class espPayload(models.Model):
    fuel = models.FloatField()
    phone= models.IntegerField()
    amount = models.FloatField()
    fuelstation = models.CharField()
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
       return (
        f"fuel: {self.fuel}, amount: {self.amount}, "
        f"phone: {self.phone}"
        )

    