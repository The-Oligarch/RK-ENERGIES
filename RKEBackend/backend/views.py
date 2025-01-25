from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
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
load_dotenv()


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

            

            if None in [phone, amount, fuel]:
                return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

            payload = espPayload.objects.create(
                phone=phone,
                amount=amount,
                fuel=fuel,
                
            )

            return Response(
                {
                    "message": "espPayload saved successfully",
                    "payload_id": payload.id,
                    "fuel": payload.fuel,
                    "amount": payload.amount,
                    "phone": payload.phone
                
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
                    
                    "created_at": payload.created_at.isoformat() if hasattr(payload, 'created_at') else None,
                }
                for payload in payloads
            ]

            return Response(payload_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
