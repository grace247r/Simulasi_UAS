from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('produk/', views.produk_list, name='produk-list'),
]
