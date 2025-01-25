from django.urls import path
from .views import register, users, edit_user,login
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('backendapi/register/', register, name='register'),
    path('backendapi/users/', users, name='users'),
    path('backendapi/users/<int:pk>/', edit_user, name='edit_user'),
    path('login/', login),
]


