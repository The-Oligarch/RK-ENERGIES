from django.urls import path
from .views import register, users, edit_user, login, get_stations,espPayloadHandling

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('register/', register, name='register'),
    path('users/', users, name='users'),
    path('users/<int:pk>/', edit_user, name='edit_user'),
    path('login/', login),
    path('stations/', get_stations, name='get_stations'),
    path('esppayload/', espPayloadHandling.as_view(), name='payload'),
]
