from rest_framework.serializers import ModelSerializer
from .models import Product, BarrowProduct, Review, ReviewResult, Payment, Deposit, CustomerService
from accounts.serializers import UserLikeSerializer, UserBasicSerializer
from rest_framework import serializers

#빌려주기
class ProductSerializer(ModelSerializer):
    owner = UserBasicSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'owner', 'product_name', 'list_price', 'deposit', 'rental_fee', 'explanation', 'condition', 'address', 'detail_address', 'local_city', 'local_gu', 'product_photo', 'barrow_available_start', 'barrow_available_end', 'barrow_method']

class ProductLikeSerializer(ModelSerializer):
    like_users = UserLikeSerializer(read_only=True, many=True)
    owner = UserBasicSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'owner', 'product_name', 'like_users', 'list_price', 'deposit', 'rental_fee', 'explanation', 'condition', 'address', 'detail_address', 'product_photo', 'barrow_available_start', 'barrow_available_end', 'barrow_method']

#빌리기
class BarrowProductSerializer(ModelSerializer):
    
    user = UserBasicSerializer(required=False, read_only=True)
    product = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Product.objects.all()
    )
    class Meta:
        model = BarrowProduct
        fields = [
            'id', 'user', 'product', 'barrow_start', 'barrow_end', 'is_return_user', 'is_return_owner', 'is_reviewed', 'is_accepted', 'is_payed'
        ]
        #extra_kwargs = {"user": {"required": False, "allow_null": True}, "product": {"required": False, "allow_null": True}}


class ReviewSerializer(ModelSerializer):
    writer = UserBasicSerializer(required=False, read_only=True)
    barrow_product = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Product.objects.all(), required=False
    )
    trader = UserBasicSerializer(required=False, read_only=True)
    class Meta:
        model = Review
        fields = [
            'writer', 'barrow_product', 'trader', 'q_1', 'q_2', 'q_3', 'q_4', 'q_5'
        ]


class ReviewResultSerializer(ModelSerializer):
    user = UserBasicSerializer(required=False, read_only=True)
    class Meta:
        model = ReviewResult
        fields = [
            'user', 'av_q1', 'av_q2', 'av_q3', 'av_q4', 'av_q5', 'review_count'
        ]


class DepositSerializer(ModelSerializer):
    class Meta:
        model = Deposit
        fields = [
            'canceled_at', 'approved_cancel_amount_tax_free', 'approved_cancel_amount_total', 'approved_cancel_amount_vat', 'cancel_available_amount_tax_free', 'cancel_available_amount_total', 'cancel_available_amount_vat'
        ]

class PaymentSerializer(ModelSerializer):
    barrow_product = BarrowProductSerializer(required=False, read_only=True)
    deposit = DepositSerializer()
    class Meta:
        model = Payment
        fields = [
            'barrow_product', 'deposit', 'cid', 'total_amount', 'var_amount', 'tax_free_amount', 'tid', 'aid', 'created_at', 'approved_at'
        ]
class CustomerServiceSerializer(ModelSerializer):
    user = UserBasicSerializer(required=False, read_only=True)
    class Meta:
        model = CustomerService
        fields = [
            'id', 'user', 'title', 'content', 'created_at'
        ]