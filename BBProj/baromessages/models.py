from django.db import models
from accounts.models import User
from BBApp.models import Product


# Create your models here.
class MessageRoom(models.Model):
    #member 1
    member1 = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='mycreatemessage')
    #member 2
    member2 = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='myproductmessage')
    #product
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    #안읽은사람 (member1이면 1, member2면 2, 다 읽은 상태면 0)
    unread = models.IntegerField(default=0)
    #생성시간
    created_at = models.DateTimeField(auto_now_add=True)
    #마지막 채팅 시간
    last_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    #마지막 채팅
    last_message = models.CharField(max_length=1000, blank=True, null=True)
    #상태(첫 채팅이 갔는지 안갔는지)
    status = models.BooleanField(default=False)


class Message(models.Model):
    #채팅방
    room = models.ForeignKey(MessageRoom, on_delete=models.CASCADE, blank=True, null=True)
    #내용
    text = models.CharField(max_length=1000)
    #사진
    message_photo = models.ImageField(blank=True, null=True, upload_to='message_photo')
    #보내는사람(member1이면 1, member2면 2)
    sender = models.IntegerField()
    #보낸시간
    send_at = models.DateTimeField(auto_now_add=True)