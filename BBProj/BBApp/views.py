from datetime import datetime, date, timedelta
from django.utils.dateformat import DateFormat
from django.shortcuts import render, redirect
from .models import Product, BarrowProduct, Review, ReviewResult, Payment, Deposit, CustomerService
from django.http import HttpResponse
from .serializers import ProductLikeSerializer, ProductSerializer, BarrowProductSerializer, ReviewSerializer, ReviewResultSerializer, DepositSerializer, PaymentSerializer, CustomerServiceSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from accounts.models import User
from django.db.models import Q

# Create your views here.

def home(request):
    products = Product.objects.filter()
    return render(request, '')

# 장바구니 넣기
# get 요청이 오면 주소값에서 pk값을 가져옴(path-variable)
# 파라미터로 받는 username으로 user 객체를 가져옴
# product에 있는 like_users 컬럼에 user 객체가 있는지 확인
# 있다면 지워주고 저장
# 없다면 추가해주고 저장
# product  객체를 시리얼라이저에 담아 response로 보냄
class ProductLikeDetail(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        if product.like_users.filter(pk=obj.pk).exists():
            product.like_users.remove(obj)
            product.save()
        else:
            product.like_users.add(obj)
            product.save()
        serializer = ProductLikeSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 내 장바구니(리스트)) 조회
# 파라미터로 받아온 username으로 user 객체를 조회함
# user 객체가 좋아요 누른 product들을 조회함
# 이 product들을 전부 시리얼라이저에 담아 response로 보내줌
class ProductLikeList(APIView):
    def get(self, request):
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        products = obj.like_products.all()
        serializers = ProductSerializer(products, many=True)
        return Response(serializers.data)


class ProductList(APIView):
    # 물품 관련
    # GET 요청 : 물품 목록들(리스트) 조회
    # barrow_available_end 컬럼의 값이 오늘을 포함한다면 필터링을 통해 해당하는 product들을 가져와줌
    # product들을 시리얼라이저에 담아 response로 보내줌
    def get(self, request, format=None):
        products = Product.objects.filter(barrow_available_end__range=[date.today(), date.today() + timedelta(weeks=500)]).values().all()
        serializers = ProductSerializer(products, many=True)
        return Response(serializers.data)
    
    # POST 요청 : 물품 빌려주기 작성
    # 파라미터로 받아온 username을 이용해서 user 객체를 가져옴
    # post의 body 부분에 쓰여있는 데이터를 ProductSerializer로 감싸 가져옴
    # 만약 입력값이 유효하다면 owner 컬럼에 가져온 user 객체를 넣어주고 저장, 201 Response 보내줌
    # 유효하지 않다면 400 에러 발생
    def post(self, request): #빌려주기 작성
        print(request.data)
        print(request.data['owner'])
        obj = User.objects.get(username=eval(request.data['owner'])['username'])
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetail(APIView):
    # pk값을 이용해 product 객체 가져오는 함수
    def get_object(self, pk):
        product = get_object_or_404(Product, pk=pk)
        return product

    # GET 요청 : get_object 함수 이용해 product 객체 가져옴
    # 객체 정보를 시리얼라이저에 담아 response로 보내줌
    def get(self, request, pk, format=None): #디테일뷰
        product = self.get_object(pk)
        serializer = ProductLikeSerializer(product)
        return Response(serializer.data)

    # DELETE 요청 : get_object 함수 이용해 product 객체 가져옴
    # 객체를 삭제하고 response 보내줌
    def delete(self, request, pk, format=None): #삭제
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT(수정) 요청 : get_object 함수 이용해 product 객체 가져옴
    # put 요청 보낸 data를 ProductSerializer로 감싸 가져옴
    # 유효한 값이라면 저장해주고 해당값을 response로 보내줌
    # 유효하지 않다면 404 에러로 response로 보내줌
    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


# 빌리기
# 파라미터로 받아온 username을 이용해 user 객체를 가져옴
# post 요청의 body 값의 data를 BarrowProductSerializer로 감싸 가져옴
# 주소값에서 product의 pk값을 가져와 product 객체를 가져옴
# 시리얼라이저 정보가 유효하다면 user 컬럼에 가져온 user 객체를, product 컬럼에 가져온 product 객체를 넣어주고 저장해줌
# product의 is_barrowed 컬럼의 값을 True로 바꿔주고 저장해줌

class CreateBarrowProduct(APIView):
    def post(self, request, pk): #빌리기 정보 저장
        print(request.data['user']['username'])
        obj  = User.objects.get(username=request.data['user']['username'])
        serializer = BarrowProductSerializer(data=request.data)
        product = get_object_or_404(Product, pk=pk)
        print(serializer)
        if serializer.is_valid():
            serializer.save(user=obj, product=product, is_accepted=None)
            #product.is_barrowed = True
            #product.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#신청 내역 수락/거절
class AcceptBarrowProduct(APIView):
    def get(self, request, pk):
        accept = request.GET.get('accept')
        obj = BarrowProduct.objects.filter(pk=pk)
        if accept == 'yes':
            obj.is_accepted = True
        elif accept == 'no':
            obj.is_accepted = False
        obj.save()
        return Response(status=status.HTTP_200_OK)



#빌린 내역
class MyBarrowProductList(APIView): 
    def get(self, request): #get요청일경우
        username = request.GET.get('username', None) # 파라미터로 username가져온다  
        obj  = User.objects.get(username=username) # 가져온 username으로 User객체를 가져와 obj에 저장
        queryset = BarrowProduct.objects.filter(user=obj)#user(빌린사람)와 obj가 일치하도록 BorrowProduct 객체를 필터링 한 후 queryset에 저장한다
        serializer = BarrowProductSerializer(queryset, many=True)#이러한 queryset들을 시리얼라이저에 담는다
        #이때 Serialize란 ? 직렬화 !! 쿼리셋이나 파이썬 객체 같은 복잡한 객체들을 RestAPi에서 사용할
        # json과 같은 형태로 변환 해주는 어댑터 같은 역할!!

        return Response(serializer.data) #serializer의 data를 response

#빌려준 내역
class MyProductList(APIView):
    def get(self, request):#get요청일 경우
        username = request.GET.get('username', None)#파라미터로 username을 가져온다
        obj  = User.objects.get(username=username)#가져온 username으로 User객체를 가져와 obj에 저장
        queryset = Product.objects.filter(owner = obj)#owner(빌려준 사람)와 obj가 일치하도록 Product객체를 필터링
        serializer = ProductSerializer(queryset, many=True)#이러한 queryset들을 시리얼라이저에 저장
        return Response(serializer.data)#저장한 serializer의 data를 response

# 내 리뷰 결과 조회(프로필 조회)
# 파라미터로 가져온 username을 이용해 user 객체를 가져옴
# ReviewResult 객체 중 user 컬럼이 가져온 user와 동일한 객체를 가져옴
# review result 객체를 시리얼라이저에 감싸 response를 보내줌
class MyReviewResult(APIView):
    def get(self, request):
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        review_result = ReviewResult.objects.get(user = obj)
        serializer = ReviewResultSerializer(review_result)
        return Response(serializer.data)


# 등록되어 있는 물품의 빌린 날짜를 모두 반환하는 함수 - 프론트의 캘린더 속 가능 날짜와 불가능 날짜 표시에 사용
# 주소값의 pk를 이용하여 product를 가져옴
# BarrowProduct 객체 중 product 컬럼이 가져온 product 객체와 동일한 BarrowProduct를 필터링해줌
# 필터링된 BarrowProduct들을 시리얼라이저에 감싸 response 보내줌

class BarrowedInfoList(APIView):
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    #캘린더 (level=c, m(myproduct))
    def get(self, request, pk):
        level = request.GET.get('level', None)
        product = self.get_object(pk)
        if level == 'c':
            queryset = BarrowProduct.objects.filter(product=product, is_accepted=True, is_payed=True)
            serializer = BarrowProductSerializer(queryset, many=True)
            return Response(serializer.data)
        elif level == 'm':
            queryset = BarrowProduct.objects.filter(product=product)
            serializer = BarrowProductSerializer(queryset, many=True)
            return Response(serializer.data)

class CustomerServiceCenter(APIView):
    def get_object(self, pk):
        customerService = get_object_or_404(CustomerService, pk=pk)
        return customerService

    def get(self, request, pk):
        obj = self.get_object(pk)
        serializer = CustomerServiceSerializer(obj)
        return Response(serializer.data)
        
    

class CustomerServiceList(API):
    def get(self, request):
        queryset = CustomerService.objects.all()
        serializer = CustomerServiceSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        serializer = CustomerServiceSerializer(data=reqeust.data)
        if serializer.is_valid():
            serializer.save(user=obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 반납하기
# 주소값에 있는 pk를 이용하여 BarrowProduct 객체를 가져옴
# 파라미터로 전달받은 username을 이용하여 user 객체를 가져옴
# barrow_product 객체의 user 컬럼값이 가져온 user 객체와 동일하다면
# barrow_product 객체의 is_return 컬럼을 True로 바꿔주고
# barrow_product 객체의 product 컬럼의 is_barrowed 컬럼을 False로 바꿔주고 저장해줌

class ReturnProduct(APIView):
    def get_object(self, pk):
        barrow_product_object = get_object_or_404(BarrowProduct, pk=pk)
        return barrow_product_object

    def get(self, request, pk):
        barrow_product = self.get_object(pk)
        username = request.GET.get('username', None)
        obj  = User.objects.get(username=username)
        if (barrow_product.user == obj): #빌린 사람 반납
            barrow_product.is_return_user = True
            barrow_product.save()
            serializer = BarrowProductSerializer(barrow_product)
            return Response(serializer.data)
        elif (barrow_product.product.owner == obj):
            barrow_product.is_return_owner = True
            if (barrow_product.is_return_user == True):
                barrow_product.product.is_barrowed = False
                barrow_product.product.save()
            barrow_product.save()
            serializer = BarrowProductSerializer(barrow_product)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
        


class LeaveReview(APIView):
    def get_object(self, pk):
        barrow_product_object = get_object_or_404(BarrowProduct, pk=pk)
        return barrow_product_object

    # 리뷰결과(평균) 저장
    # 인자로 받아온 serializer 값의 trader 컬럼의 username 값을 이용하여 user 객체를 가져옴
    # 만약 ReviewResult 객체들 중 user 컬럼값이 가져온 user 객체와 동일한것이 존재하지 않는다면
    #     if 문 실행 -> 해당 user에 대한 ReviewResult값 생성 (가져온 q1 ~ q5 값 가져와서 넣어주기)
    #     ReviewResult 객체의 review_count 값을 하나 올려줌

    # 존재하지 않는다면
    #     else 문 실행 ->  user 컬럼이 user 객체인 ReviewResult 객체 가져옴
    #     입력 받아온 q1 ~ q5 값을 기존값과 함께 평균내주는 작업해줌
    #     ReviewResult 객체의 review_count 값을 하나 올려줌
    def calculate_average(self, serializer):
        #print(serializer['trader'])
        user = User.objects.get(username=serializer['trader']['username'])
        print(user)
        is_exist = ReviewResult.objects.filter(user=user).exists()
        print(ReviewResult.objects.filter(user=user))
        print(is_exist)
        
        #아직 없을때
        if (is_exist == False):
            #print("11111111111111111111111")
            review_result = ReviewResult(user=user, av_q1=serializer['q_1'], av_q2=serializer['q_2'], av_q3=serializer['q_3'], av_q4=serializer['q_4'], av_q5=serializer['q_5'])
            review_result.review_count += 1
            review_result.save()
        #이미 있을때
        else :
            #print("11111122222222222222222222111111")
            review_result = ReviewResult.objects.get(user=user)
            review_count = review_result.review_count
            #print(review_count)
            ######### 모델 변경 필요(integer -> float 등으로)
            review_result.av_q1 = (review_result.av_q1 * review_count + serializer['q_1']) / (review_count + 1)
            review_result.av_q2 = (review_result.av_q2 * review_count + serializer['q_2']) / (review_count + 1)
            review_result.av_q3 = (review_result.av_q3 * review_count + serializer['q_3']) / (review_count + 1)
            review_result.av_q4 = (review_result.av_q4 * review_count + serializer['q_4']) / (review_count + 1)
            review_result.av_q5 = (review_result.av_q5 * review_count + serializer['q_5']) / (review_count + 1)
            review_result.review_count += 1
            review_result.save()


    #리뷰 데이터값 받아오는 부분
    # 파라미터에서 받아온 username을 이용해 user 객체를 가져옴
    # post 요청의 body 값의 data를 ReviewSerializer로 감싸 가져옴
    # 주소값에 있는 pk 값을 이용하여 barrowproduct 객체를 가져옴
    # 만약 시리얼라이저가 유효하다면 writer 컬럼(작성자)에 가져온 user 객체를, trader 컬럼(상대방)에 BarrowProduct의 product 컬럼의 owner 객체를,
    # barrow_product 컬럼에 가져온 barrowproduct 객체를 넣어주고 저장해줌
    # 저장된 시리얼라이저값을 calculate_average 함수로 보내 처리해줌
    # barrowproduct 객체의 is_reviewed 컬럼을 True로 바꿔주고 저장해줌
    def post(self, request, pk):
        obj  = User.objects.get(username=request.data['writer']['username'])
        serializer = ReviewSerializer(data=request.data)
        barrow_product = self.get_object(pk)
        #print(serializer)
        if serializer.is_valid():
            serializer.save(writer=obj, trader=barrow_product.product.owner, barrow_product=barrow_product)
            self.calculate_average(serializer.data)
            barrow_product.is_reviewed=True
            barrow_product.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    
# 검색!!!
# 파라미터에서 keyword값 가져와 저장, 없으면 None
# 파라미터에서 status값 가져와 저장, 없으면 None
# 파라미터에서 method값 가져와 저장, 없으면 None
# Q 객체 사용하여
# 만약 keyword 존재하면 product_name 컬럼에 keyword가 포함되는것들 필터링되도록 함
# 만약 status 존재하고
# 0이라면 is_barrowed가 False인 것
# 1이라면 오늘 바로 빌릴 수 있는 것 필터링되도록 함
# 만약 method 존재하고
# 0이라면 barrow_method가 대면인것
# 1이라면 barrow_method가 비대면인것 필터링되도록 함
# 이 조건들에 모두 해당되는 객체가 필터링되도록 함
# serializer에 감싸서 response 보냄
class SearchProduct(APIView):
    def get(self, request):
        keyword = request.GET.get('keyword', None)
        localCity = request.GET.get('localCity', None)
        localGu = request.GET.get('localGu', None)
        status = request.GET.get('status', None)
        method = request.GET.get('method', None)

        q = Q()
        if keyword:
            q &= Q(product_name__contains=keyword)

        if status:
            if status == "0":
                q &= Q(is_barrowed=False)
            elif status == "1":
                q &= Q(barrow_available_start__range=[date.today() - timedelta(weeks=500), date.today()])
                q &= Q(barrow_available_end__range=[date.today(), date.today() + timedelta(weeks=500)])
                q &= Q(is_barrowed=False)

        if localCity:
            q &= Q(local_city__contains=localCity)

        if localGu:
            q &= Q(local_gu__contains=localGu)

        if method:
            if method == "0":
                q &= Q(barrow_method='대면')
            elif method == "1":
                q &= Q(barrow_method='비대면')

        products = Product.objects.filter(q)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class CreatePayment(APIView):
    def post(self, request, pk): #빌리기 정보 저장
        print(request.data['user']['username'])
        obj = BarrowProduct.objects.get(pk=pk)
        username = request.GET.get('username', None)
        user  = User.objects.get(username=username)

        depositserializer = DepositSerializer(data=request.data['deposit'])
        if depositserializer.is_valid():
            deposit = depositserializer.save()
        paymentserializer = PaymentSerializer(data=request.data)
        if user == obj.user:
            if paymentserializer.is_valid():
                paymentserializer.save(barrow_product = obj, deposit=deposit)
                return Response(paymentserializer.data, status=status.HTTP_201_CREATED)
        return Response(paymentserializer.errors, status=status.HTTP_400_BAD_REQUEST)