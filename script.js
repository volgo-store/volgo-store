let cart = [];

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    showNotification(`${name} berhasil ditambahkan ke keranjang!`);
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItems.innerHTML = ""; // Kosongkan daftar sebelum menambahkan ulang

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            ${item.name} - Rp ${item.price.toLocaleString()}
            <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
        `;
        cartItems.appendChild(li);
    });

    totalPriceElement.textContent = total.toLocaleString();
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Fungsi untuk menampilkan halaman checkout
function showCheckout() {
    if (cart.length > 0) {
        document.querySelector('.cart').style.display = 'none';
        document.getElementById('checkout-section').style.display = 'block';
    } else {
        alert('Keranjang Anda kosong!');
    }
}

// Fungsi kembali ke toko
document.getElementById('back-to-store').addEventListener('click', function () {
    document.getElementById('checkout-section').style.display = 'none';
    document.querySelector('.cart').style.display = 'block';
    updateCart();
});

// Fungsi untuk menangani pengiriman formulir checkout
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Di sini Anda bisa mengirim data ke server atau menampilkan ringkasan pesanan, dll.
    alert(`Terima kasih, ${name}! Pesanan Anda sedang diproses.`);

    // Kosongkan keranjang setelah checkout
    cart = [];
    updateCart();

    // Kembali ke halaman produk
    document.getElementById('checkout-section').style.display = 'none';
    document.querySelector('.cart').style.display = 'block';
});
