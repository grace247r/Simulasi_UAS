from rest_framework import generics, status
from Ecommerce.models import Produk, Keranjang, ItemKeranjang, Checkout
from .serializers import ProdukSerializer, KeranjangSerializer, ItemKeranjangSerializer, CheckoutSerializer, UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response


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