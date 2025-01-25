from django.urls import path
from . import views

from .views import register
from .views import UserView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('register/', register, name="register"),
    path('login/', views.login),
    path('users/', UserView.as_view(), name='user-list'),
    
    
]