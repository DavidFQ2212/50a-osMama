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
                countdownElement.classList.add('birthday-message'); // Añadir clase para estilos específicos
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
            countdownElement.classList.remove('birthday-message'); // Asegurar que la clase no esté antes de tiempo
        }, 1000);
    }

    // Función para generar un único fuego artificial
    function createFirework() {
        if (!heroSection) return; // Salir si el heroSection no existe

        const firework = document.createElement('div');
        firework.classList.add('firework');

        // Posición horizontal aleatoria para que aparezcan en diferentes lugares
        firework.style.left = `${Math.random() * 70 + 15}vw`; // Un poco más centrado
        // Posición vertical inicial (más abajo para que suban más)
        firework.style.bottom = `${-20 + Math.random() * 5}vh`; // Empiezan más abajo y tienen más camino para subir

        heroSection.appendChild(firework);

        // --- MODIFICACIÓN PARA RENDIMIENTO ---
        const numberOfSparks = 60 + Math.floor(Math.random() * 60); // Reducir el número de chispas
        // --- FIN DE LA MODIFICACIÓN ---

        const fireworkColors = [
            '#FF4081', '#E040FB', '#7C4DFF', '#448AFF', '#18FFFF', '#69F0AE', '#FFEA00', '#FFAB40', '#FF6E40', '#CDDC39',
            '#F44336', '#9C27B0', '#3F51B5', '#00BCD4', '#8BC34A', '#FFEB3B', '#FF5722', '#FFFFFF' // Añadir blanco
        ];
        const color = fireworkColors[(Math.random() * fireworkColors.length) | 0];

        const animationDuration = 4 + Math.random() * 2; // Duración de la animación (4 a 6 segundos)
        firework.style.setProperty('--firework-duration', `${animationDuration}s`); // Pasar a CSS

        // Decidir aleatoriamente si este fuego artificial se inclinará a la izquierda o a la derecha
        const directionBias = Math.random() < 0.5 ? 1 : -1; // 1 para derecha, -1 para izquierda

        for (let i = 0; i < numberOfSparks; i++) {
            const spark = document.createElement('span');

            // Determinar si es una chispa tipo "cola" o "redonda"
            const isTailSpark = Math.random() < 0.6; // Aumentar la probabilidad de ser una "tira" (60%)
            spark.classList.add(isTailSpark ? 'firework-tail' : 'firework-spark');

            // Establecer el color como una variable CSS para el efecto fluorescente
            spark.style.setProperty('--spark-color', color);

            if (isTailSpark) {
                // Rotación inicial para las chispas tipo "cola"
                const initialRotation = (Math.random() - 0.5) * 60; // -30 a 30 grados
                spark.style.setProperty('--initial-rotation', `${initialRotation}deg`);
            } else {
                spark.style.width = `${8 + Math.random() * 5}px`; // Tamaño base más grande para bolitas
                spark.style.height = spark.style.width;
            }

            const angle = Math.random() * Math.PI * 2; // Ángulo de 0 a 360 grados
            const speed = 5 + Math.random() * 6; // Velocidad de expansión más alta
            const distance = 200 + Math.random() * 250; // Distancia de vuelo más lejos y grande

            // AUMENTADO: Simular gravedad para el efecto de caída
            const gravityEffect = i * 0.1; // Un pequeño efecto de "gravedad" para que caigan

            // Ajustar el ángulo de las chispas según la dirección elegida
            let adjustedAngle;
            if (directionBias === 1) { // Derecha
                adjustedAngle = (Math.random() * Math.PI) - (Math.PI / 2) + (Math.random() * 0.6 - 0.3); // Ángulos entre -90 y 90 grados
            } else { // Izquierda
                adjustedAngle = (Math.random() * Math.PI) + (Math.PI / 2) + (Math.random() * 0.6 - 0.3); // Ángulos entre 90 y 270 grados
            }

            const dx = Math.cos(adjustedAngle) * speed * distance;
            const dy = Math.sin(adjustedAngle) * speed * distance + (distance * 0.2); // Añade una componente de caída

            spark.style.setProperty('--dx', `${dx}px`);
            spark.style.setProperty('--dy', `${dy}px`);

            spark.style.animationDelay = `${Math.random() * 0.8}s`; // Retraso individual para cada chispa

            firework.appendChild(spark);
        }

        // Eliminar el fuego artificial después de que termine su animación + un margen
        setTimeout(() => {
            firework.remove();
        }, (animationDuration * 1000) + 1000); // Dar un poco más de tiempo de vida al elemento
    }

    // Función para iniciar la generación continua de fuegos artificiales
    function startFireworks() {
        // Generar varios fuegos artificiales al inicio para un efecto más "wow"
        for (let i = 0; i < 3; i++) { // Reducir la cantidad inicial de fuegos artificiales
            setTimeout(createFirework, i * 300); // Disparar los primeros rápidamente
        }

        // --- MODIFICACIÓN PARA RENDIMIENTO ---
        const fireworkInterval = setInterval(createFirework, 500); // Intervalo ligeramente mayor
        // --- FIN DE LA MODIFICACIÓN ---

        // Detener los fuegos artificiales después de un tiempo (ej. 25 segundos)
        setTimeout(() => {
            clearInterval(fireworkInterval);
        }, 25000); // Mostrar fuegos artificiales por más tiempo
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