from django.contrib import admin
from .models import Produk, Keranjang, ItemKeranjang, Checkout

@admin.register(Produk)
class ProdukAdmin(admin.ModelAdmin):
    list_display = ('id', 'nama', 'harga', 'stok')
    search_fields = ('nama',)

@admin.register(Keranjang)
class KeranjangAdmin(admin.ModelAdmin):
    list_display = ('id', 'tanggal_dibuat')

@admin.register(ItemKeranjang)
class ItemKeranjangAdmin(admin.ModelAdmin):
    list_display = ('id', 'keranjang', 'produk', 'jumlah')

@admin.register(Checkout)
class CheckoutAdmin(admin.ModelAdmin):
    list_display = ('id', 'keranjang', 'total_harga', 'tanggal_checkout')
