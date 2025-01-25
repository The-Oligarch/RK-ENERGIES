from django.db import models

# Create your models here.
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

    