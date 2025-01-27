from django.urls import path
from .views import (
    register, users, edit_user, login, get_stations,
    espPayloadHandling, MpesaCallbackHandler, PaymentStatus,
    TransactionList  # Import TransactionList view
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('register/', register, name='register'),
    path('users/', users, name='users'),
    path('users/<int:pk>/', edit_user, name='edit_user'),
    path('login/', login),
    path('stations/', get_stations, name='get_stations'),
    path('esppayload/', espPayloadHandling.as_view(), name='esppayload'),
    path('mpesa-callback/', MpesaCallbackHandler.as_view(), name='mpesa-callback'),
    path('payment-status/', PaymentStatus.as_view(), name='payment-status'),
    path('transactions/', TransactionList.as_view(), name='transactions'),
]
