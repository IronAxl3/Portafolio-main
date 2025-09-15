// Selectores globales
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');

// Función para alternar el menú móvil
function toggleMenu() {
    if (hamburger && navLinks) {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
}

// Función para manejar el cambio de tema
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Actualizar el atributo data-theme
    html.setAttribute('data-theme', newTheme);
    
    // Actualizar el icono
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Guardar la preferencia en localStorage
    try {
        localStorage.setItem('theme', newTheme);
    } catch (e) {
        console.error('Error al guardar la preferencia del tema:', e);
    }
}

// Función para validar el formulario de contacto
function validateForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Validar nombre
    if (!name.value.trim()) {
        showError(name, 'Por favor ingresa tu nombre');
        isValid = false;
    } else {
        removeError(name);
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Por favor ingresa tu correo electrónico');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Por favor ingresa un correo electrónico válido');
        isValid = false;
    } else {
        removeError(email);
    }
    
    // Validar mensaje
    if (!message.value.trim()) {
        showError(message, 'Por favor ingresa tu mensaje');
        isValid = false;
    } else {
        removeError(message);
    }
    
    // Si el formulario es válido, se puede enviar
    if (isValid) {
        // Aquí iría el código para enviar el formulario
        alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
        contactForm.reset();
    }
}

// Función para mostrar errores en el formulario
function showError(input, message) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
    } else {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formControl.appendChild(errorElement);
    }
    
    input.classList.add('error');
}

// Función para eliminar mensajes de error
function removeError(input) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error-message');
    
    if (errorElement) {
        formControl.removeChild(errorElement);
    }
    
    input.classList.remove('error');
}

/* ===== OBSERVER UNIVERSAL ===== */
const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pop-in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('section, .project-card, .skill-item, .timeline-item')
        .forEach(el => appearOnScroll.observe(el));

// La función initIntersectionObserver ha sido reemplazada por appearOnScroll

// Función para actualizar el contador de visitas
function updateVisitCounter() {
    // Esta función se puede implementar con un backend para contar visitas
    // Por ahora, solo mostramos un número estático
    const visitCounter = document.getElementById('visit-counter');
    if (visitCounter) {
        visitCounter.textContent = '1000+'; // Número de ejemplo
    }
}

// Inicialización
function init() {
    // Mostrar todo el contenido una vez que el DOM esté completamente cargado
    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');

    // Inicializar el tema
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Inicializar el menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Inicializar el formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }

    // Actualizar el año actual
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Asegurarse de que todo el contenido sea visible después de cargar
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        });
    }, 100);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todo cuando el DOM esté listo
    init();
    
    // Agregar evento para el botón de cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Actualizar el contador de visitas
    updateVisitCounter();
    
    // Forzar una verificación inicial de animaciones
    handleScrollAnimations();
});

// Manejar el evento de carga para asegurar que todo se inicialice correctamente
window.addEventListener('load', () => {
    // Asegurarse de que el tema se aplique correctamente
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    
    // Actualizar el icono del tema
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Forzar una nueva verificación de animaciones
    handleScrollAnimations();
});

// Observer para animar las tarjetas de habilidades cuando entran en el viewport
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observar todas las tarjetas de habilidades
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => skillObserver.observe(card));
    
    /* Partículas que flotan dentro de cada card */
    skillCards.forEach(card => {
        const p = card.querySelector('.particles');
        if (!p) return;
        
        // Crear 15 partículas por tarjeta
        for(let i = 0; i < 15; i++) {
            const dot = document.createElement('span');
            dot.className = 'particle';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.animationDelay = Math.random() * 8 + 's';
            dot.style.animationDuration = (6 + Math.random() * 4) + 's';
            p.appendChild(dot);
        }
    });
});