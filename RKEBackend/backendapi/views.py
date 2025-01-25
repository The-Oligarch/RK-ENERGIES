
from django.http import HttpResponse,JsonResponse
from django.contrib.auth import login, authenticate

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

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
import json
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
from  backend.models import User
load_dotenv()


    
@permission_classes([AllowAny])
class UserView(View):
    def get(self, request):
        users = User.objects.all().values('id', 'username', 'email', 'password', 'station')
        return JsonResponse(list(users), safe=False)

    @method_decorator(csrf_exempt)
    def post(self, request):
        data = json.loads(request.body)
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            station=data['station']
        )
        return JsonResponse({'id': user.id, 'username': user.username, 'email': user.email, 'password': user.password, 'station': user.station})

    @method_decorator(csrf_exempt)
    def put(self, request):
        data = json.loads(request.body)
        user = get_object_or_404(User, id=data['id'])
        user.username = data['username']
        user.email = data['email']
        user.password = data['password']
        user.station = data['station']
        user.save()
        return JsonResponse({'id': user.id, 'username': user.username, 'email': user.email, 'password': user.password, 'station': user.station})
    
@permission_classes([AllowAny])
class espPayloadHandling(APIView):
    def post(self, request, *args, **kwargs):
        try:
            
            if isinstance(request.data, dict) and '_content' not in request.data:
                data = request.data
                print("Parsed as JSON:", data)
            else:
                
                data = dict(request.data)
                print("QueryDict Data:", data)
                
                
                data_json = data.get('_content', '')  
                print(data_json)
                data_json = data_json[0].replace("\r\n", "")  
                data = json.loads(data_json) 
                print("Extracted Data:", data)
            
          
            
            phone = data.get('phone')
            amount = data.get('amount')
            fuel = data.get('fuel')
            fuelstation = data.get('fuelstation')

            

            if None in [phone, amount, fuel, fuelstation]:
                return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

            payload = espPayload.objects.create(
                phone=phone,
                amount=amount,
                fuel=fuel,
                fuelstation=fuelstation
            )

            return Response(
                {
                    "message": "espPayload saved successfully",
                    "payload_id": payload.id,
                    "fuel": payload.fuel,
                    "amount": payload.amount,
                    "phone": payload.phone,
                    "fuelstation": payload.fuelstation
                
                },
                status=status.HTTP_201_CREATED,
            )

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, *args, **kwargs):
        try:
            
            payloads = espPayload.objects.all()

            payload_data = [
                {
                    "payload_id": payload.id,
                    "fuel": payload.fuel,
                    "amount": payload.amount,
                    "phone": payload.phone,
                    "fuelstation": payload.fuelstation,
                    "created_at": payload.created_at.isoformat() if hasattr(payload, 'created_at') else None,
                }
                for payload in payloads
            ]

            return Response(payload_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            



@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = request.data
        
        first_name = data['firstName']
        last_name = data['lastName']
        email = data.get('email')
        password = data['password']
        station = data['station']

        # Check if the user already exists
        if User.objects.filter(username=email).exists():
            return Response({"detail": "User already exists. Log in"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create(
            username=email,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=make_password(password),
            station=station  
        )
        user.save()
        
        return Response({"detail": "User created successfully!"}, status=status.HTTP_201_CREATED)
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

