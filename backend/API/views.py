from rest_framework import generics, status
from Ecommerce.models import Produk, Keranjang, ItemKeranjang, Checkout
<<<<<<< HEAD
from .serializers import ProdukSerializer, KeranjangSerializer, ItemKeranjangSerializer, CheckoutSerializer, UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response

=======
from .serializers import ProdukSerializer, KeranjangSerializer, ItemKeranjangSerializer, CheckoutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
>>>>>>> b4f75fb0362651c58ec80a3105b0e60fa4ddda34

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

<<<<<<< HEAD
class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Kalau pakai JWT
            from rest_framework_simplejwt.tokens import RefreshToken
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username
            })
        else:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)


class UserView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
=======
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
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> b4f75fb0362651c58ec80a3105b0e60fa4ddda34
