from rest_framework import serializers
from Ecommerce.models import Produk, Keranjang, ItemKeranjang, Checkout
from django.contrib.auth import get_user_model
from rest_framework import serializers


class ProdukSerializer(serializers.ModelSerializer):
    harga = serializers.DecimalField(
        max_digits=10, decimal_places=2, coerce_to_string=False
    )
    rating = serializers.FloatField(default=0.0)
    reviews = serializers.IntegerField(default=0)

    class Meta:
        model = Produk
        fields = '__all__'



class KeranjangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keranjang
        fields = '__all__'


class ItemKeranjangSerializer(serializers.ModelSerializer):
    # Ini akan meng-include detail produk lengkap
    produk_detail = ProdukSerializer(source='produk', read_only=True)

    class Meta:
        model = ItemKeranjang
        fields = ['id', 'keranjang', 'produk', 'jumlah', 'produk_detail']
        read_only_fields = ['keranjang']


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    


