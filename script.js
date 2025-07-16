document.addEventListener('DOMContentLoaded', () => {
    // Cuenta regresiva para el cumpleaños
    const birthdayDate = new Date('July 23, 2025 00:00:00').getTime(); // **¡IMPORTANTE: Cambia esta fecha a la fecha real del cumpleaños de tu mamá!**
    const countdownElement = document.getElementById('countdown');

    if (countdownElement) {
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = birthdayDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "¡Feliz Cumpleaños, Mamá Edith!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <span>${days} Días</span>
                <span>${hours} Horas</span>
                <span>${minutes} Minutos</span>
                <span>${seconds} Segundos</span>
            `;
        }, 1000);
    }

    // Animación de aparición al hacer scroll
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3, // Cuando el 30% del elemento sea visible
        rootMargin: "0px 0px -50px 0px" // Un poco antes de llegar al final del viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Dejar de observar una vez que ha aparecido
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Manejo del formulario de mensajes (solo front-end, necesitaría un backend real)
    const wishForm = document.querySelector('.wish-form');
    const messagesDisplay = document.getElementById('messages-display');

    if (wishForm && messagesDisplay) {
        // Cargar mensajes existentes (simulado con localStorage)
        let messages = JSON.parse(localStorage.getItem('momBirthdayMessages')) || [];
        
        const renderMessages = () => {
            if (messages.length === 0) {
                messagesDisplay.innerHTML = '<p class="placeholder-message">¡Sé el primero en dejar un lindo mensaje para mamá!</p>';
                return;
            }
            messagesDisplay.innerHTML = '';
            messages.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message-item');
                messageDiv.innerHTML = `
                    <p><strong>${msg.name}:</strong></p>
                    <p>${msg.message}</p>
                    <small>${new Date(msg.timestamp).toLocaleDateString()} ${new Date(msg.timestamp).toLocaleTimeString()}</small>
                `;
                messagesDisplay.prepend(messageDiv); // Añadir el nuevo mensaje al principio
            });
        };

        renderMessages();

        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            if (name && message) {
                const newMessage = {
                    name,
                    message,
                    timestamp: new Date().toISOString()
                };
                messages.push(newMessage);
                localStorage.setItem('momBirthdayMessages', JSON.stringify(messages)); // Guardar en localStorage
                renderMessages(); // Volver a renderizar para mostrar el nuevo mensaje
                wishForm.reset(); // Limpiar el formulario
                alert('¡Tu mensaje ha sido enviado! (Este es un envío simulado)');
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});