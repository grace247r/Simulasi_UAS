from rest_framework import serializers
from Ecommerce.models import Produk, Keranjang, ItemKeranjang, Checkout


class ProdukSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produk
        fields = '__all__'


class KeranjangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keranjang
        fields = '__all__'


class ItemKeranjangSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemKeranjang
        fields = '__all__'


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = '__all__'
