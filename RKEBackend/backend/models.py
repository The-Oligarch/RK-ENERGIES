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
    phone = models.CharField(max_length=15, verbose_name='Phone Number')
    amount = models.CharField(max_length=10, verbose_name='Amount')
    fuel = models.CharField(max_length=10, verbose_name='Fuel Type')
    fuelstation = models.CharField(max_length=50, verbose_name='Fuel Station')
    status = models.IntegerField(default=0, verbose_name='Status')  # 0: initial, 1: initiated, 2: success, 3: failed
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated At')
    mpesa_receipt = models.CharField(max_length=20, null=True, blank=True, verbose_name='M-Pesa Receipt')
    transaction_date = models.CharField(max_length=20, null=True, blank=True, verbose_name='Transaction Date')

    class Meta:
        verbose_name = 'ESP Payload'
        verbose_name_plural = 'ESP Payloads'

    def __str__(self):
        return f"{self.phone} - {self.amount} - {self.status}"