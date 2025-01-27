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
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

# Step 1: Get the required credentials
consumer_key = os.getenv('MPESA_CONSUMER_KEY', 'FSS5KGCemj2ToKq6l091N9SgQQJm9dqZ62wSdKU1kVmCiXuj')
consumer_secret = os.getenv('MPESA_CONSUMER_SECRET', 'Zr1mGxk76jgHLh9RxfUWcHldfCjlfQn04G9niB3VxogWtcuipkmX5Umj9VEEXc6D')
shortcode = os.getenv('MPESA_SHORTCODE', '174379')
lipa_na_mpesa_online_passkey = os.getenv('MPESA_PASSKEY', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919')
callback_url = os.getenv('MPESA_CALLBACK_URL', 'https://rk-energies-u9cj.onrender.com/backendapi/mpesa-callback/')

# Step 2: Generate the access token
def generate_access_token(consumer_key, consumer_secret):
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    r = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    json_response = r.json()
    access_token = json_response['access_token']
    return access_token

# Step 3: Make the STK push request
def stk_push_request(access_token, shortcode, lipa_na_mpesa_online_passkey, phone_number, amount, callback_url):
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((shortcode + lipa_na_mpesa_online_passkey + timestamp).encode()).decode('utf-8')
    
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    
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
        "AccountReference": "RK ENERGIES",
        "TransactionDesc": "Fuel Payment" 
    }
    
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()

if __name__ == '__main__':
    access_token = generate_access_token(consumer_key, consumer_secret)
    response = stk_push_request(access_token, shortcode, lipa_na_mpesa_online_passkey, '254722111111', '1', callback_url)
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

            # Store the payload
            payload = espPayload.objects.create(
                phone=phone,
                amount=amount,
                fuel=fuel,
                fuelstation=fuelstation,
                status=status_value
            )

            # Format phone number for M-Pesa (add country code if needed)
            if phone.startswith('0'):
                phone_number = '254' + phone[1:]
            else:
                phone_number = phone

            try:
                # Generate access token
                access_token = generate_access_token(consumer_key, consumer_secret)
                
                # Initiate STK push
                stk_response = stk_push_request(
                    access_token=access_token,
                    shortcode=shortcode,
                    lipa_na_mpesa_online_passkey=lipa_na_mpesa_online_passkey,
                    phone_number=phone_number,
                    amount=float(amount),
                    callback_url=callback_url
                )
                
                # Update payload with M-Pesa response
                payload.status = 1  # Payment initiated
                payload.save()

                return Response(
                    {
                        "message": "espPayload saved and payment initiated",
                        "payload_id": payload.id,
                        "fuel": payload.fuel,
                        "amount": payload.amount,
                        "phone": payload.phone,
                        "fuelstation": payload.fuelstation,
                        "status": payload.status,
                        "mpesa_response": stk_response
                    },
                    status=status.HTTP_201_CREATED
                )

            except Exception as mpesa_error:
                # If M-Pesa request fails, still return success for storage but with error info
                return Response(
                    {
                        "message": "espPayload saved but payment initiation failed",
                        "payload_id": payload.id,
                        "fuel": payload.fuel,
                        "amount": payload.amount,
                        "phone": payload.phone,
                        "fuelstation": payload.fuelstation,
                        "status": payload.status,
                        "mpesa_error": str(mpesa_error)
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


@method_decorator(csrf_exempt, name='dispatch')
class MpesaCallbackHandler(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            # Log the raw request body for debugging
            print("M-Pesa Callback Raw Data:", request.body.decode('utf-8'))
            
            data = json.loads(request.body)
            print("M-Pesa Callback Parsed Data:", json.dumps(data, indent=2))
            
            # Extract the payment details from callback
            body = data.get('Body', {})
            stkCallback = body.get('stkCallback', {})
            result_code = stkCallback.get('ResultCode')
            
            # Get merchant request ID for tracking
            merchant_request_id = stkCallback.get('MerchantRequestID')
            checkout_request_id = stkCallback.get('CheckoutRequestID')
            
            # Get callback metadata
            callback_metadata = stkCallback.get('CallbackMetadata', {})
            items = callback_metadata.get('Item', [])
            
            # Initialize variables
            amount = None
            mpesa_receipt_number = None
            transaction_date = None
            phone_number = None
            
            # Extract values from metadata items
            for item in items:
                name = item.get('Name')
                value = item.get('Value')
                
                if name == 'Amount':
                    amount = value
                elif name == 'MpesaReceiptNumber':
                    mpesa_receipt_number = value
                elif name == 'TransactionDate':
                    transaction_date = value
                elif name == 'PhoneNumber':
                    phone_number = str(value)
            
            # Format phone number to match our stored format
            if phone_number and phone_number.startswith('254'):
                phone_number = '0' + phone_number[3:]
            
            print(f"Processing payment for phone: {phone_number}, amount: {amount}, receipt: {mpesa_receipt_number}")
            
            # Get the latest pending transaction for this phone number
            try:
                payload = espPayload.objects.filter(
                    phone=phone_number,
                    status=1  # Payment initiated
                ).latest('created_at')
                
                if result_code == 0:  # Success
                    payload.status = 2  # Payment successful
                    print(f"Payment successful for {phone_number}")
                else:
                    payload.status = 3  # Payment failed
                    print(f"Payment failed for {phone_number}")
                
                # Save additional M-Pesa details
                payload.mpesa_receipt = mpesa_receipt_number
                payload.transaction_date = transaction_date
                payload.save()
                
                return Response({
                    "ResultCode": 0,
                    "ResultDesc": "Callback processed successfully"
                }, status=status.HTTP_200_OK)
                
            except espPayload.DoesNotExist:
                print(f"No pending transaction found for {phone_number}")
                return Response(
                    {
                        "ResultCode": 1,
                        "ResultDesc": "No pending transaction found"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
                
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {str(e)}")
            return Response(
                {
                    "ResultCode": 1,
                    "ResultDesc": "Invalid JSON format"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"Error processing callback: {str(e)}")
            return Response(
                {
                    "ResultCode": 1,
                    "ResultDesc": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

from django.db.models import Q, Sum
from datetime import datetime, timedelta
from django.utils import timezone

@method_decorator(csrf_exempt, name='dispatch')
class PaymentStatus(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            phone = request.GET.get('phone')
            if not phone:
                return Response(
                    {"error": "Phone number is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                payload = espPayload.objects.filter(
                    phone=phone
                ).latest('created_at')
                
                response = {
                    "status": payload.status,
                    "message": "Payment successful" if payload.status == 2 else "Payment failed" if payload.status == 3 else "Payment pending"
                }
                
                return Response(response, status=status.HTTP_200_OK)
                
            except espPayload.DoesNotExist:
                return Response(
                    {"error": "No transaction found"},
                    status=status.HTTP_404_NOT_FOUND
                )
                
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@method_decorator(csrf_exempt, name='dispatch')
class TransactionList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Get filter parameters
        status = request.query_params.get('status')
        search = request.query_params.get('search', '').strip()
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        # Base queryset
        transactions = espPayload.objects.all()
        
        # Apply filters
        if status is not None:
            transactions = transactions.filter(status=status)
            
        if search:
            transactions = transactions.filter(
                Q(phone__icontains=search) |
                Q(fuelstation__icontains=search) |
                Q(mpesa_receipt__icontains=search)
            )
            
        if start_date:
            try:
                start_date = datetime.strptime(start_date, '%Y-%m-%d').replace(tzinfo=timezone.utc)
                transactions = transactions.filter(created_at__gte=start_date)
            except ValueError:
                pass
                
        if end_date:
            try:
                end_date = datetime.strptime(end_date, '%Y-%m-%d').replace(hour=23, minute=59, second=59, tzinfo=timezone.utc)
                transactions = transactions.filter(created_at__lte=end_date)
            except ValueError:
                pass
        
        # Order by most recent first
        transactions = transactions.order_by('-created_at')
        
        # Calculate totals
        total_amount = sum(float(t.amount) for t in transactions)
        total_transactions = transactions.count()
        
        # Group by fuel type
        fuel_totals = {}
        for t in transactions:
            if t.fuel not in fuel_totals:
                fuel_totals[t.fuel] = {'count': 0, 'amount': 0}
            fuel_totals[t.fuel]['count'] += 1
            fuel_totals[t.fuel]['amount'] += float(t.amount)
        
        # Serialize the data
        data = {
            'transactions': [{
                'id': t.id,
                'phone': t.phone,
                'amount': t.amount,
                'fuel': t.fuel,
                'fuelstation': t.fuelstation,
                'status': t.status,
                'created_at': t.created_at,
                'mpesa_receipt': t.mpesa_receipt,
                'transaction_date': t.transaction_date
            } for t in transactions],
            'summary': {
                'total_amount': total_amount,
                'total_transactions': total_transactions,
                'fuel_totals': fuel_totals
            }
        }
        
        return Response(data)

from django.db.models.functions import TruncDate, ExtractHour
from django.db.models import Count, Sum, Avg
from django.db.models import Case, When, Cast, FloatField

@method_decorator(csrf_exempt, name='dispatch')
class DashboardData(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            # Get all successful transactions
            transactions = espPayload.objects.filter(status=2)
            
            # Today's metrics
            today = timezone.now().date()
            today_transactions = transactions.filter(created_at__date=today)
            
            # Safely calculate total sales
            try:
                total_sales = sum(float(t.amount) for t in today_transactions if t.amount and t.amount.replace('.', '').isdigit())
            except (ValueError, AttributeError):
                total_sales = 0
                
            transaction_count = today_transactions.count()
            
            # Safely calculate average
            try:
                average_transaction = total_sales / transaction_count if transaction_count > 0 else 0
            except (ValueError, ZeroDivisionError):
                average_transaction = 0
            
            today_stats = {
                'total_sales': total_sales,
                'transaction_count': transaction_count,
                'average_transaction': average_transaction
            }
            
            # Last 7 days trend
            last_7_days = timezone.now() - timedelta(days=7)
            daily_trend = transactions.filter(
                created_at__gte=last_7_days
            ).annotate(
                date=TruncDate('created_at')
            ).values('date').annotate(
                total=Count('id')
            ).annotate(
                amount=Sum(
                    Case(
                        When(amount__regex=r'^\d*\.?\d+$', then=Cast('amount', FloatField())),
                        default=0,
                        output_field=FloatField(),
                    )
                )
            ).order_by('date')
            
            # Fuel type distribution
            fuel_distribution = transactions.values('fuel').annotate(
                count=Count('id'),
                total_amount=Sum(
                    Case(
                        When(amount__regex=r'^\d*\.?\d+$', then=Cast('amount', FloatField())),
                        default=0,
                        output_field=FloatField(),
                    )
                )
            ).order_by('-count')
            
            # Peak hours analysis
            peak_hours = transactions.annotate(
                hour=ExtractHour('created_at')
            ).values('hour').annotate(
                count=Count('id')
            ).order_by('-count')
            
            # Station performance
            station_performance = transactions.values('fuelstation').annotate(
                total_sales=Sum(
                    Case(
                        When(amount__regex=r'^\d*\.?\d+$', then=Cast('amount', FloatField())),
                        default=0,
                        output_field=FloatField(),
                    )
                ),
                transaction_count=Count('id')
            ).annotate(
                average_transaction=Case(
                    When(transaction_count__gt=0, 
                          then=models.F('total_sales') / models.F('transaction_count')),
                    default=0,
                    output_field=FloatField(),
                )
            ).order_by('-total_sales')
            
            # Recent transactions
            recent_transactions = transactions.order_by('-created_at')[:5].values(
                'created_at', 'phone', 'amount', 'fuel', 'fuelstation', 'mpesa_receipt'
            )
            
            return Response({
                'today_stats': today_stats,
                'daily_trend': list(daily_trend),
                'fuel_distribution': list(fuel_distribution),
                'peak_hours': list(peak_hours),
                'station_performance': list(station_performance),
                'recent_transactions': list(recent_transactions)
            })
            
        except Exception as e:
            print(f"Dashboard Error: {str(e)}")  # Add logging for debugging
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
