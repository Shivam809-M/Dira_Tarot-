document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bookingData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value,
        status: 'Pending'
    };

    try {
        const response = await fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        if (response.ok) {
            const result = await response.json();
            showConfirmation(result);
            document.getElementById('booking-form').reset();
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        alert('Error submitting booking. Please try again later.');
        console.error('Booking error:', error);
    }
});

function showConfirmation(booking) {
    const modal = document.getElementById('confirmation-modal');
    const message = `Thank you, ${booking.name}! Your ${booking.service} is booked for ${new Date(booking.date).toLocaleDateString()} at ${booking.time}. A confirmation has been sent to ${booking.email}.`;
    
    document.getElementById('confirmation-message').textContent = message;
    modal.style.display = 'flex';

    document.getElementById('close-confirmation').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}