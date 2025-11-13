from django.db import models
from django.contrib.auth.models import User
from decimal import Decimal

class Produk(models.Model):
    nama = models.CharField(max_length=100)
    deskripsi = models.TextField(default="no description available")
    harga = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    stok = models.IntegerField(default=0)
    foto = models.ImageField(upload_to='produk/', blank=True, null=True)

    def __str__(self):
        return self.nama


class Keranjang(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='keranjangs', null=True, blank=True)
    tanggal_dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # jika ada user tampilkan username, kalau tidak tampilkan id
        if self.user:
            return f"Keranjang {self.user.username}"
        return f"Keranjang #{self.pk}"

    def total_harga(self):
        total = Decimal('0.00')
        for item in self.items.all():  # related_name di ItemKeranjang adalah 'items'
            total += item.subtotal()
        return total


class ItemKeranjang(models.Model):
    keranjang = models.ForeignKey(Keranjang, on_delete=models.CASCADE, related_name='items')
    produk = models.ForeignKey(Produk, on_delete=models.CASCADE)
    jumlah = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.jumlah}x {self.produk.nama}"

    def subtotal(self):
        return (self.produk.harga or Decimal('0.00')) * self.jumlah


class Checkout(models.Model):
    keranjang = models.OneToOneField(Keranjang, on_delete=models.CASCADE, related_name='checkout')
    total_harga = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    tanggal_checkout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Checkout {self.id}"
