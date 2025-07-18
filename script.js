document.addEventListener('DOMContentLoaded', () => {
    // **¡IMPORTANTE: Cambia esta fecha a la fecha real del cumpleaños de tu mamá!**
    // La fecha actual es 17 de julio de 2025
    const birthdayDate = new Date('July 16, 2025 00:00:00').getTime(); 
    
    const countdownElement = document.getElementById('countdown');
    const heroSection = document.querySelector('.hero');
    const confettiColors = ['#fce77d', '#ff9f43', '#f870ba', '#a0ced9', '#adf7b6', '#d4af37'];
    const numberOfConfetti = 50;

    // Función para generar confeti
    function generateConfetti() {
        if (!heroSection) return; // Salir si el heroSection no existe

        for (let i = 0; i < numberOfConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const randomColor = confettiColors[(Math.random() * confettiColors.length) | 0];
            confetti.style.backgroundColor = randomColor;
            
            confetti.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
            confetti.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio
            confetti.style.animationDuration = `${4 + Math.random() * 3}s`; // Duración aleatoria
            
            const randomOffsetX = (Math.random() * 40 - 20); // Desplazamiento horizontal para la animación
            confetti.style.setProperty('--random-x', `${randomOffsetX}vw`);
            
            heroSection.appendChild(confetti);
        }
    }

    // Llama a la función para generar el confeti al cargar la página
    generateConfetti();

    // Lógica de la cuenta regresiva
    if (countdownElement) {
        const updateCountdown = setInterval(() => {
            const now = Date.now();
            const distance = birthdayDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "¡Feliz Cumpleaños, Mamá Edith!";
                // Cuando el contador llega a cero, activar fuegos artificiales
                startFireworks();
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

    // Función para generar un único fuego artificial
    function createFirework() {
        if (!heroSection) return; // Salir si el heroSection no existe

        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        // Posición horizontal aleatoria para que aparezcan en diferentes lugares
        firework.style.left = `${Math.random() * 80 + 10}vw`; 
        // Posición vertical inicial (un poco fuera de la vista para simular ascenso)
        firework.style.bottom = `${-5 + Math.random() * 15}vh`; 
        
        heroSection.appendChild(firework);

        // AUMENTADO: Número de chispas por fuego artificial (más denso)
        const numberOfSparks = 60 + Math.floor(Math.random() * 60); // Entre 60 y 120 chispas
        
        // Colores más vibrantes y diversos
        const fireworkColors = [
            '#FF4081', '#E040FB', '#7C4DFF', '#448AFF', '#18FFFF', '#69F0AE', '#FFEA00', '#FFAB40', '#FF6E40', '#CDDC39',
            '#F44336', '#9C27B0', '#3F51B5', '#00BCD4', '#8BC34A', '#FFEB3B', '#FF5722' // Más colores
        ];
        const color = fireworkColors[(Math.random() * fireworkColors.length) | 0];

        for (let i = 0; i < numberOfSparks; i++) {
            const spark = document.createElement('span');
            spark.classList.add('spark');
            spark.style.backgroundColor = color;

            const angle = Math.random() * Math.PI * 2; // Ángulo de 0 a 360 grados
            // AUMENTADO: Velocidad y distancia para que la explosión sea más grande
            const speed = 4 + Math.random() * 4; // Velocidad de expansión más rápida
            const distance = 150 + Math.random() * 150; // Distancia de vuelo de la chispa (más lejos)

            // Usamos CSS variables para pasar los valores a la animación
            spark.style.setProperty('--dx', `${Math.cos(angle) * speed * distance}px`);
            spark.style.setProperty('--dy', `${Math.sin(angle) * speed * distance}px`); 
            
            // Retraso individual para cada chispa para un efecto de explosión más natural
            spark.style.animationDelay = `${Math.random() * 0.4}s`; // Mayor variación en el delay

            firework.appendChild(spark);
        }

        // AUMENTADO: Dar más tiempo para que la animación se vea completa
        setTimeout(() => {
            firework.remove();
        }, 3000); // Duración total de la animación del fuego artificial
    }

    // Función para iniciar la generación continua de fuegos artificiales
    function startFireworks() {
        // Generar varios fuegos artificiales al inicio para un efecto más "wow"
        for (let i = 0; i < 3; i++) {
            setTimeout(createFirework, i * 200); // Disparar los primeros 3 rápidamente
        }
        
        // Luego continuar generando fuegos artificiales a un ritmo constante
        const fireworkInterval = setInterval(createFirework, 600); // Crea un fuego artificial cada 600ms (más rápido)

        // Detener los fuegos artificiales después de un tiempo (ej. 15 segundos)
        setTimeout(() => {
            clearInterval(fireworkInterval);
        }, 15000); // Mostrar fuegos artificiales por más tiempo
    }

    // Animación de aparición al hacer scroll (sin cambios)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});