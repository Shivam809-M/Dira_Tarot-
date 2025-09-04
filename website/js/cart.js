document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.querySelector('.empty-cart');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart'));

    // Display cart items
    function displayCart() {
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartSummary.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">${item.type === 'service' ? '🃏' : '🔮'}</div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item-remove" data-index="${index}">×</div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Calculate totals
        const shipping = 5.99;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + shipping).toFixed(2)}`;

        // Add event listeners
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart[index].quantity++;
                updateCart();
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });

        document.querySelectorAll('.cart-item-quantity input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    cart[index].quantity = newQuantity;
                    updateCart();
                }
            });
        });
    }

    // Update cart in localStorage and refresh display
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your purchase! In a real implementation, this would redirect to a payment gateway.');
        localStorage.setItem('cart', JSON.stringify([]));
        cart = [];
        updateCart();
    });

    // Initial display
    displayCart();
});