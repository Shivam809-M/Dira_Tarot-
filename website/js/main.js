// Initialize cart if not exists
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = count;
    });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('show');
        });
    }
});

// Add to cart function (used by both services and products)
function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === item.type);
    
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation
    alert(`${item.name} has been added to your cart!`);
}