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
import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime
import base64

# Step 1: Get the required credentials
consumer_key = 'YOUR_CONSUMER_KEY'
consumer_secret = 'YOUR_CONSUMER_SECRET'
shortcode = 'YOUR_SHORTCODE'
lipa_na_mpesa_online_passkey = 'YOUR_PASSKEY'
phone_number = 'PHONE_NUMBER_TO_CHARGE'
amount = 'AMOUNT_TO_CHARGE'
callback_url = 'http://127.0.0.1:8000/callback/'

# Step 2: Generate the access token
def generate_access_token(consumer_key, consumer_secret):
    api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    access_token = response.json()['access_token']
    return access_token

# Step 3: Make the STK push request
def stk_push_request(access_token, shortcode, lipa_na_mpesa_online_passkey, phone_number, amount, callback_url):
    api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {'Authorization': 'Bearer {}'.format(access_token)}
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((shortcode + lipa_na_mpesa_online_passkey + timestamp).encode('utf-8')).decode('utf-8')
    
    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": shortcode,
        "PhoneNumber": phone_number,
        "CallBackURL": callback_url,
        "AccountReference": "YourAccountReference",
        "TransactionDesc": "Payment for goods"
    }
    
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()

if __name__ == '__main__':
    access_token = generate_access_token(consumer_key, consumer_secret)
    response = stk_push_request(access_token, shortcode, lipa_na_mpesa_online_passkey, phone_number, amount, callback_url)
    print(json.dumps(response, indent=4))


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

@method_decorator(csrf_exempt, name='dispatch')
class espPayloadHandling(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            print("Parsed as JSON:", data)

            phone = data.get('phone')
            amount = data.get('amount')
            fuel = data.get('fuel')
            fuelstation = data.get('fuelstation')
            status_value = data.get('status', 0)  

            if None in [phone, amount, fuel, fuelstation]:
                return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

            payload = espPayload.objects.create(
                phone=phone,
                amount=amount,
                fuel=fuel,
                fuelstation=fuelstation,
                status=status_value  
            )

            return Response(
                {
                    "message": "espPayload saved successfully",
                    "payload_id": payload.id,
                    "fuel": payload.fuel,
                    "amount": payload.amount,
                    "phone": payload.phone,
                    "fuelstation": payload.fuelstation,
                    "status": payload.status
                },
                status=status.HTTP_201_CREATED
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
                    "status": payload.status
                }
                for payload in payloads
            ]

            return Response(payload_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
