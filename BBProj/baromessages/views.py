from django.shortcuts import render
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from BBApp.models import Product
from accounts.models import User
from .models import Message, MessageRoom
from .serializers import *
from rest_framework import status
from django.db.models import Q


# Create your views here.
#채팅방 생성 또는 이미 있으면 되돌려주기
class MessageRoomCreate(APIView):
    def get(self, request, ppk):
        product = get_object_or_404(Product, pk=ppk)
        username = request.GET.get('username', None)
        m1  = User.objects.get(username=username)
        m2 = product.owner
        if MessageRoom.objects.filter(product=product, member1=m1, member2=m2).exists():
            #print(1111111111111111111111111111111111)
            messageroom = MessageRoom.objects.filter(product=product, member1=m1, member2=m2)
            #print(messageroom.unread)
            serializer = MessageRoomSerializer(messageroom, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            messageroom = MessageRoom(member1=m1, member2=m2, product=product, unread=0)
            messageroom.save()
            serializer = MessageRoomSerializer(messageroom)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

#채팅방 목록 보여주기
class MessageRoomList(APIView):
    def get(self, request):
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        q = Q()
        q = Q(member1=obj, status=True) | Q(member2=obj, status=True) 
        messagerooms = MessageRoom.objects.filter(q)
        serializers = MessageRoomSerializer(messagerooms, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

#채팅방 입장하기(그 채팅방 메세지 전부 주기)
class MessageRoomDetail(APIView):
    def get(self, request, rpk):
        messageroom = get_object_or_404(MessageRoom, pk=rpk)
        messages = Message.objects.filter(room=messageroom)
        #내가 누군지 파악하고 unread 바꿔줘야함!!
        user = request.GET.get('user', None)
        if user == "1":
            if messageroom.unread == 1:
                messageroom.unread = 0
        elif user == "2":
            if messageroom.unread == 2:
                messageroom.unread = 0
        messageroom.save()
        serializers = MessageSerializer(messages, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


    #메세지 보내기
    def post(self, request, rpk):
        messageroom = get_object_or_404(MessageRoom, pk=rpk)
        messageroom.status = True
        print(request.data['text'])
        messageroom.last_message = request.data['text']
        if request.data['sender'] == '1':
            messageroom.unread = 2
        elif request.data['sender'] == '2':
            messageroom.unread = 1
        serializer = MessageSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(room=messageroom)
            #시간 추가하는 방법 알아보기
            messageroom.last_at = serializer['send_at']
            messageroom.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

