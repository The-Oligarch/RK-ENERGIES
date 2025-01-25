from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    station = models.CharField(max_length=100, blank=True, null=True)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser',
    )

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

    