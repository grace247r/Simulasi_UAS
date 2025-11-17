# TODO: Fix Checkout Page Data Display

## Tasks

- [x] Update import in checkout.js to include getCart from produkService.js
- [x] Replace cartAPI.getCart() with getCart() in useEffect
- [x] Update display fields to use mapped properties (item.name, item.price, item.quantity, item.image)
- [x] Ensure subtotal calculation uses item.price \* item.quantity
- [x] Test the checkout page to verify data appears correctly without NaN
