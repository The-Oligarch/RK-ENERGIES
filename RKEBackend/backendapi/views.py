from django.http import HttpResponse,JsonResponse
from django.contrib.auth import login, authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.shortcuts import render, redirect
from backend.models import CustomUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from rest_framework.views import APIView
from backend.models import espPayload
from django.views.decorators.csrf import csrf_exempt 
from dotenv import load_dotenv
import os
import requests
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from backend.models import CustomUser
from django.shortcuts import get_object_or_404
load_dotenv()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = request.data
        
        username = data['username']
        email = data.get('email')
        password = data['password']
        station = data['station']

        if CustomUser.objects.filter(username=username).exists():
            return Response({"detail": "User already exists. Log in"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            station=station
        )
        user.save()
        return Response({"detail": "User created successfully!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def users(request):
    if request.method == 'GET':
        users = CustomUser.objects.all().values('id', 'username', 'email', 'password', 'station')
        return Response(users, status=status.HTTP_200_OK)

    if request.method == 'POST':
        try:
            data = request.data
            username = data['username']
            email = data.get('email')
            password = data['password']
            station = data['station']

            if CustomUser.objects.filter(username=username).exists():
                return Response({"detail": "User already exists. Log in"}, status=status.HTTP_400_BAD_REQUEST)

            user = CustomUser.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                station=station
            )
            user.save()
            return Response({"detail": "User created successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([AllowAny])
def edit_user(request, pk):
    try:
        data = request.data
        user = get_object_or_404(CustomUser, pk=pk)
        user.username = data['username']
        user.email = data['email']
        user.password = make_password(data['password']) if data['password'] else user.password
        user.station = data['station']
        user.save()

        return Response({"detail": "User updated successfully!"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

@permission_classes([AllowAny])
class espPayloadHandling(APIView):
    def get(self, request, *args, **kwargs):
        # Handle GET request here
        return JsonResponse({"message": "Success"})

    


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def users(request):
    if request.method == 'GET':
        users = CustomUser.objects.all().values('id', 'username', 'email', 'password', 'station')
        return Response(users, status=status.HTTP_200_OK)

    if request.method == 'POST':
        try:
            data = request.data
            username = data['username']
            email = data.get('email')
            password = data['password']
            station = data['station']

            if CustomUser.objects.filter(username=username).exists():
                return Response({"detail": "User already exists. Log in"}, status=status.HTTP_400_BAD_REQUEST)

            user = CustomUser.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                station=station
            )
            user.save()
            return Response({"detail": "User created successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([AllowAny])
def edit_user(request, pk):
    try:
        data = request.data
        user = get_object_or_404(CustomUser, pk=pk)
        user.username = data['username']
        user.email = data['email']
        user.password = make_password(data['password']) if data['password'] else user.password
        user.station = data['station']
        user.save()

        return Response({"detail": "User updated successfully!"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        if isinstance(request.data, dict) and '_content' not in request.data:
                data = request.data
                
        else:
            # Convert QueryDict to a dictionary
            data = dict(request.data)
            print("QueryDict Data:", data)
            
            
            data_json = data.get('_content', '') 
            print(data_json)
            data_json = data_json[0].replace("\r\n", "") 
            data = json.loads(data_json)  
        username = data.get('username')
        password = data.get('password')
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate refresh and access tokens
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response({
                'refresh': str(refresh),
                'access': str(access),
                'user': {
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_stations(request):
    try:
        # Get unique stations from CustomUser model
        stations = CustomUser.objects.values_list('station', flat=True).distinct()
        # Convert to list and remove any None values
        stations_list = list(filter(None, stations))
        return Response(stations_list, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
