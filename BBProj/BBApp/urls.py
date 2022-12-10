from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from BBApp import views

from rest_framework.routers import SimpleRouter
from .views import ProductList, ProductDetail, ProductLikeDetail

from rest_framework.routers import SimpleRouter

product_router = SimpleRouter(trailing_slash=False)


urlpatterns = [
    #GET : 물품 리스트 조회, POST : 빌려주기 작성
    path('product/', ProductList.as_view()),

                #path('nbproduct/', NotBarrowedProductList.as_view()),
                #path('today_available/', views.TodayAvailableList.as_view()),

    #pk값에 해당하는 product 정보 조회(디테일)
    path('product/<int:pk>/', ProductDetail.as_view()),

    #pk값에 해당하는 product 장바구니에 넣고 빼기
    path('product/<int:pk>/like/', ProductLikeDetail.as_view()),
    #pk값에 해당하는 product 빌리기
    path('product/<int:pk>/borrow/', views.CreateBarrowProduct.as_view()), #빌리기
    #pk값에 해당하는 product의 모든 빌린 날짜 정보 조회 - 프론트의 캘린더 작성시 필요
    path('barrowedinfo/<int:pk>/', views.BarrowedInfoList.as_view()),
    #내가 빌린 내역 조회
    path('mypage/borrow/', views.MyBarrowProductList.as_view()),
    #내가 빌려준 내역 조회
    path('mypage/myproduct/', views.MyProductList.as_view()),
    #내가 장바구니에 넣은 내역 조회
    path('mypage/likeproducts/', views.ProductLikeList.as_view()),
    #내 리뷰 결과 조회
    path('mypage/reviewresult/', views.MyReviewResult.as_view()),
                #path('search/', include(product_router.urls)),
    #pk값에 해당하는 barrowProduct 반납하기
    path('return/<int:pk>/', views.ReturnProduct.as_view()),
    #pk값에 해당하는 barrowProduct 리뷰 작성하기
    path('review/<int:pk>/', views.LeaveReview.as_view()),
    #검색하기
    path('search/', views.SearchProduct.as_view()),
    #신청내역 수락/거절
    path('mypage/myproduct/accept/<int:pk>/', views.AcceptBarrowProduct.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
