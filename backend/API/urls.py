from django.urls import path
from . import views

urlpatterns = [
    # Produk
    path('produk/', views.ProdukListCreateView.as_view(), name='produk-list'),
    path('produk/<int:pk>/', views.ProdukDetailView.as_view(), name='produk-detail'),

    # Keranjang
    path('keranjang/', views.KeranjangListCreateView.as_view(), name='keranjang-list'),
    path('keranjang/<int:pk>/', views.KeranjangDetailView.as_view(), name='keranjang-detail'),

    # Item Keranjang
    path('item-keranjang/', views.ItemKeranjangListCreateView.as_view(), name='item-keranjang-list'),
    path('item-keranjang/<int:pk>/', views.ItemKeranjangDetailView.as_view(), name='item-keranjang-detail'),

    # Checkout
    path('checkout/', views.CheckoutListCreateView.as_view(), name='checkout-list'),
    path('checkout/<int:pk>/', views.CheckoutDetailView.as_view(), name='checkout-detail'),

    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('user/', views.UserView.as_view(), name='user'),
]
