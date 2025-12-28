// ===================================
// SMOOTH SCROLLING
// ===================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navHeight;

        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            businessName: document.getElementById('businessName').value,
            businessType: document.getElementById('businessType').value,
            problem: document.getElementById('problem').value,
            whatsapp: document.getElementById('whatsapp').value
        };

        // Create WhatsApp message
        const message = `Hola, soy ${formData.name}.

Negocio: ${formData.businessName}
Tipo: ${formData.businessType}

Mi principal problema:
${formData.problem}

Mi WhatsApp: ${formData.whatsapp}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp number (replace with actual number)
        const whatsappNumber = '51999999999'; // Replace with actual WhatsApp number

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Show success message
        alert('¡Gracias! Te estamos redirigiendo a WhatsApp.');

        // Optional: Reset form
        contactForm.reset();
    });
}

// ===================================
// FAQ ACCORDION (Optional Enhancement)
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add smooth transition effect on click
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Don't animate hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Validate phone number (Peruvian format)
function validatePhoneNumber(phone) {
    // Remove spaces and special characters
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');

    // Check if it's a valid Peruvian number
    // Accepts: 999999999, +51999999999, 51999999999
    const peruPhoneRegex = /^(\+?51)?9\d{8}$/;

    return peruPhoneRegex.test(cleanPhone);
}

// Format phone number input
const whatsappInput = document.getElementById('whatsapp');
if (whatsappInput) {
    whatsappInput.addEventListener('blur', function() {
        const phone = this.value;

        if (phone && !validatePhoneNumber(phone)) {
            this.style.borderColor = '#ff6b6b';

            // Show error message
            let errorMsg = this.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('span');
                errorMsg.classList.add('error-message');
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.fontSize = '0.875rem';
                errorMsg.style.marginTop = '0.25rem';
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Por favor, ingresa un número de WhatsApp válido (ej: 999999999)';
                this.parentNode.appendChild(errorMsg);
            }
        } else {
            this.style.borderColor = '';

            // Remove error message if exists
            const errorMsg = this.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%cNodumStudio', 'font-size: 24px; font-weight: bold; color: #ffd700;');
console.log('%cGrowth Partner para negocios que quieren crecer', 'font-size: 14px; color: #b0b0b0;');
console.log('%c¿Interesado en trabajar juntos? Contáctanos!', 'font-size: 12px; color: #ffd700;');
