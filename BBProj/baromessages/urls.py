from django.urls import path, include
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('<int:ppk>/', MessageRoomCreate.as_view()), 
    path('', MessageRoomList.as_view()),
    path('detail/<int:rpk>', MessageRoomDetail.as_view()),
 ]
