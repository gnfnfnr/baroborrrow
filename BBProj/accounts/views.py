from re import search
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser

from .serializers import AccountSerializer, UserLocationSerializer
from .models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from accounts import serializers
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from django.http import HttpResponse


@csrf_exempt
def account_list(request):
   
    if request.method == 'GET':
        query_set = User.objects.all()
        serializer = AccountSerializer(query_set, many=True)
        #return JsonResponse(serializer.data)
        return HttpResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(data=data)
        #print(serializer)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse({'message':serializer}, status=201)
        return HttpResponse(serializer.errors, status=400)


@csrf_exempt
def account(request):

    if request.method =='GET':
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        serializer = AccountSerializer(obj)
        return JsonResponse(serializer.data, safe=False)



@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search_username = data['data']['username']
        obj  = User.objects.get(username=search_username)
        serializer = AccountSerializer(obj)
        if data['data']['password'] == obj.password:
            return JsonResponse(serializer.data, status=200)
        else:
            return HttpResponse(status=400)

class UserLocation(APIView):
    def post(self, request):
        username = request.GET.get('username', None)
        user  = User.objects.get(username=username)
        location_city = request.data['location_city']
        location_gu = request.data['location_gu']
        user.location_city = location_city
        user.location_gu = location_gu
        user.save()
        return Response(status=status.HTTP_201_CREATED)

class ChangeUserName(APIView):
    def post(self, request):
        username = request.GET.get('username', None)
        user  = User.objects.get(username=username)
        nickname = request.data['nickname']
        location_city = request.data['location_city']
        location_gu = request.data['location_gu']
        user.nickname = nickname
        user.location_city = location_city
        user.location_gu = location_gu
        user.save()
        return Response(status=status.HTTP_201_CREATED)