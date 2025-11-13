from rest_framework import generics, status
from Ecommerce.models import Produk, Keranjang, ItemKeranjang, Checkout
from .serializers import ProdukSerializer, KeranjangSerializer, ItemKeranjangSerializer, CheckoutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# ---------- PRODUK ----------
class ProdukListCreateView(generics.ListCreateAPIView):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer


class ProdukDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer


# ---------- KERANJANG ----------
class KeranjangListCreateView(generics.ListCreateAPIView):
    queryset = Keranjang.objects.all()
    serializer_class = KeranjangSerializer


class KeranjangDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Keranjang.objects.all()
    serializer_class = KeranjangSerializer


# ---------- ITEM KERANJANG ----------
class ItemKeranjangListCreateView(generics.ListCreateAPIView):
    queryset = ItemKeranjang.objects.all()
    serializer_class = ItemKeranjangSerializer


class ItemKeranjangDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemKeranjang.objects.all()
    serializer_class = ItemKeranjangSerializer


# ---------- CHECKOUT ----------
class CheckoutListCreateView(generics.ListCreateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer


class CheckoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer

class RegisterAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({"error": "Username and password required."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Membuat user dan token
        user = User.objects.create_user(username=username, password=password)
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    def post(self, request):
        print("=== DATA MASUK ===")
        print(request.data)  

        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"error": "Username dan password harus diisi."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
