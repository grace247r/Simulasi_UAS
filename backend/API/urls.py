from django.urls import path
from . import views

urlpatterns = [
    # Produk
    path('produk/', views.ProdukListCreateView.as_view(), name='produk-list'),
    path('produk/<int:pk>/', views.ProdukDetailView.as_view(), name='produk-detail'),

    # Keranjang
    path('keranjang/', views.KeranjangListCreateView.as_view(), name='keranjang-list'),

    # Item Keranjang
    path('item-keranjang/', views.ItemKeranjangListCreateView.as_view(), name='item-keranjang-list'),
    path('item-keranjang/<int:pk>/', views.ItemKeranjangDetailView.as_view(), name='item-keranjang-detail'),

    # Checkout
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('checkout/<int:pk>/', views.CheckoutDetailView.as_view(), name='checkout-detail'),

    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
]
