document.addEventListener('DOMContentLoaded', () => {
    // Sample services data
    const services = [
        {
            id: 1,
            name: "Love Reading",
            description: "Gain insight into your love life, relationships, and romantic future with this in-depth tarot reading.",
            price: 45,
            duration: "30 minutes"
        },
        {
            id: 2,
            name: "Career Reading",
            description: "Discover opportunities and challenges in your professional life with this career-focused tarot session.",
            price: 55,
            duration: "45 minutes"
        },
        {
            id: 3,
            name: "Health Reading",
            description: "Explore energetic influences on your health and wellbeing with this compassionate tarot reading.",
            price: 50,
            duration: "30 minutes"
        },
        {
            id: 4,
            name: "Full Life Reading",
            description: "Comprehensive reading covering all aspects of your life - love, career, health, and spiritual growth.",
            price: 75,
            duration: "60 minutes"
        },
        {
            id: 5,
            name: "Past Life Reading",
            description: "Explore your past lives and how they influence your current journey with this specialized reading.",
            price: 65,
            duration: "45 minutes"
        },
        {
            id: 6,
            name: "Spiritual Guidance",
            description: "Connect with your spiritual team and receive messages from your guides through tarot and intuition.",
            price: 60,
            duration: "45 minutes"
        }
    ];

    const serviceCardsContainer = document.getElementById('service-cards');

    // Display services
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-image">🃏</div>
            <div class="service-details">
                <h3>${service.name}</h3>
                <p class="service-price">$${service.price} • ${service.duration}</p>
                <p>${service.description}</p>
                <button class="btn add-to-cart" data-id="${service.id}">Add to Cart</button>
            </div>
        `;
        serviceCardsContainer.appendChild(card);
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.getAttribute('data-id'));
            const service = services.find(s => s.id === serviceId);
            
            addToCart({
                id: service.id,
                name: service.name,
                price: service.price,
                type: 'service',
                quantity: 1
            });
        });
    });
});