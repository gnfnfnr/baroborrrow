from rest_framework.serializers import ModelSerializer
from .models import Message, MessageRoom
from accounts.serializers import UserLikeSerializer, UserBasicSerializer
from BBApp.models import Product
from rest_framework import serializers
from BBApp.serializers import ProductSerializer

class MessageRoomSerializer(ModelSerializer):
    member1 = UserBasicSerializer(read_only=True)
    member2 = UserBasicSerializer(read_only=True)
    product = ProductSerializer(
        many=False, required=False
    )
    class Meta:
        model = MessageRoom
        fields = ['id', 'member1', 'member2', 'product', 'unread', 'last_at', 'last_message']


class MessageSerializer(ModelSerializer):
    room = MessageRoomSerializer(required=False)
    class Meta:
        model = Message
        fields = ['id', 'room', 'text', 'message_photo', 'sender', 'send_at']