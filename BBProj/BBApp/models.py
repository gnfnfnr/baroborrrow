from io import open_code
from django.db import models
from accounts.models import User

# Create your models here.
class Product(models.Model):
    #빌려준 사람
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='myproducts', blank=True, null=True)
    #장바구니에 넣은 사람
    like_users = models.ManyToManyField(User, related_name='like_products', blank=True)
    #물품 이름
    product_name = models.CharField(max_length=256)
    #정가
    list_price = models.IntegerField()
    #보증금
    deposit = models.IntegerField()
    #대여비
    rental_fee = models.IntegerField()
    #설명
    explanation = models.TextField()
    #상태
    condition = models.IntegerField()
    #도로명주소
    address = models.TextField()
    #상세주소
    detail_address =  models.TextField()
    #시/도
    local_city = models.CharField(max_length=64, blank=True, null=True)
    #구/군
    local_gu = models.CharField(max_length=64, blank=True, null=True)
    #사진
    product_photo = models.ImageField(blank=True, null=True, upload_to='product_photo')
    #대여가능기간 시작
    barrow_available_start = models.DateField()
    #대여가능기간 끝
    barrow_available_end = models.DateField()
    #대여 방식
    barrow_method = models.CharField(max_length=256)
    #활성화 비활성화
    is_activate = models.BooleanField(default=True)
    #대여중인지 아닌지
    is_barrowed = models.BooleanField(default=False)

    def __str__(self):
        return self.product_name

class BarrowProduct(models.Model):
    #빌린 사람
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='myborrowproducts', blank=True, null=True)
    #물품 id
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='barrowed', blank=True, null=True)
    #빌리는 기간 시작
    barrow_start = models.DateField()
    #빌리는 기간 끝
    barrow_end = models.DateField()
    #반납되었는지 여부-빌린 사람
    is_return_user = models.BooleanField(default=False)
    #반납되었는지 여부-빌려준 사람
    is_return_owner = models.BooleanField(default=False)
    #리뷰되었는지 여부
    is_reviewed = models.BooleanField(default=False)
    #빌려주는 사람이 수락했는지 여부
    is_accepted = models.BooleanField(null=True, blank=True, default=None)
    #결제되었는지 여부
    is_payed = models.BooleanField(default=False)

class Review(models.Model):
    #작성자
    writer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mywritereviews', blank=True, null=True)
    #빌린물품
    barrow_product = models.ForeignKey(BarrowProduct, on_delete=models.CASCADE, related_name='productreview', blank=True, null=True)
    #거래자
    trader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='myreviews', blank=True, null=True)
    #항목1
    q_1 = models.IntegerField()
    #항목2
    q_2 = models.IntegerField()
    #항목3
    q_3 = models.IntegerField()
    #항목4
    q_4 = models.IntegerField()
    #항목5
    q_5 = models.IntegerField()

class ReviewResult(models.Model):
    #유저
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'myreviewresult', blank=True, null=True)
    #항목1 - 평균점수
    av_q1 = models.IntegerField()
    #항목2 - 평균점수
    av_q2 = models.IntegerField()
    #항목3 - 평균점수
    av_q3 = models.IntegerField()
    #항목4 - 평균점수
    av_q4 = models.IntegerField()
    #항목5 - 평균점수
    av_q5 = models.IntegerField()
    #리뷰 개수
    review_count = models.IntegerField(default = 0)


class Deposit(models.Model):
    #취소 시각
    canceled_at = models.DateTimeField()
    ## 취소된 금액 관련
    approved_cancel_amount_tax_free = models.IntegerField()
    approved_cancel_amount_total = models.IntegerField()
    approved_cancel_amount_vat = models.IntegerField()
    ## 남은 취소 가능 금액 관련
    cancel_available_amount_tax_free = models.IntegerField()
    cancel_available_amount_total = models.IntegerField()
    cancel_available_amount_vat = models.IntegerField()

class Payment(models.Model):
    barrow_product = models.ForeignKey(BarrowProduct, on_delete=models.CASCADE, null=True, blank=True)
    deposit = models.ForeignKey(Deposit, on_delete=models.CASCADE, null=True, blank=True)
    cid = models.CharField(max_length=512)
    total_amount = models.IntegerField()
    var_amount = models.IntegerField()
    tax_free_amount = models.IntegerField()
    tid = models.CharField(max_length=512)
    aid = models.CharField(max_length=512)
    created_at = models.DateTimeField()
    approved_at = models.DateTimeField()

class CustomerService(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'myInquiry', blank=True, null=True)
    title = models.CharField(max_length=256)
    content = models.TextField()
    created_at = models.DateTimeField()