from django.shortcuts import render

from django.shortcuts import render
from django.http import HttpResponse
from .models import Produk

# Homepage sederhana
def homepage(request):
    return HttpResponse("<h1>Welcome to EcoShop 🌿</h1><p>Tempat belanja ramah lingkungan!</p>")

# Contoh view untuk menampilkan daftar produk (opsional)
def produk_list(request):
    produk = Produk.objects.all()
    output = "<h1>Daftar Produk</h1><ul>"
    for p in produk:
        output += f"<li>{p.nama} - Rp{p.harga}</li>"
    output += "</ul>"
    return HttpResponse(output)
