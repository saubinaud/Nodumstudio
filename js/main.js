// ===================================
// MODERN PROFESSIONAL INTERACTIONS
// Advanced Animations | Smooth UX | Optimized
// ===================================

'use strict';

// ===================================
// AOS (Animate On Scroll) Implementation
// ===================================
class AnimateOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        if (!this.elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay');
                    const duration = entry.target.getAttribute('data-aos-duration') || 600;

                    entry.target.style.transitionDuration = `${duration}ms`;

                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('aos-animate');
                        }, parseInt(delay));
                    } else {
                        entry.target.classList.add('aos-animate');
                    }

                    // Only observe once
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.elements.forEach(el => observer.observe(el));
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const sectionTop = section.offsetTop - navHeight;

    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
}

// ===================================
// NAVBAR SCROLL EFFECTS
// ===================================
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for shadow effect
        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

// ===================================
// FAQ ACCORDION
// ===================================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggle(item));
            }
        });
    }

    toggle(item) {
        const isActive = item.classList.contains('active');

        // Close all items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ===================================
// FORM HANDLING
// ===================================
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.whatsappNumber = '51981811185'; // WhatsApp de NodumStudio
        this.webhookURL = 'https://pallium-n8n.s6hx3x.easypanel.host/webhook/registro-cliente';
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }

    setupValidation() {
        const whatsappInput = document.getElementById('whatsapp');
        const emailInput = document.getElementById('email');

        if (whatsappInput) {
            whatsappInput.addEventListener('blur', () => this.validatePhone(whatsappInput));
            whatsappInput.addEventListener('input', () => this.removeError(whatsappInput));
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput));
            emailInput.addEventListener('input', () => this.removeError(emailInput));
        }
    }

    validatePhone(input) {
        const phone = input.value.trim();
        const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
        const peruPhoneRegex = /^(\+?51)?9\d{8}$/;

        if (phone && !peruPhoneRegex.test(cleanPhone)) {
            this.showError(input, 'Ingresa un número válido (ej: 981811185)');
            return false;
        }

        this.removeError(input);
        return true;
    }

    validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            this.showError(input, 'Ingresa un correo válido');
            return false;
        }

        this.removeError(input);
        return true;
    }

    showError(input, message) {
        input.style.borderColor = '#ff4444';

        let errorMsg = input.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = 'color: #ff4444; font-size: 0.875rem; margin-top: 0.5rem;';
            input.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    removeError(input) {
        input.style.borderColor = '';
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            nombre: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('whatsapp').value,
            nombreNegocio: document.getElementById('businessName').value,
            rubro: document.getElementById('businessType').value,
            desafio: document.getElementById('problem').value,
            fecha: new Date().toISOString()
        };

        // Validate phone and email before submitting
        const whatsappInput = document.getElementById('whatsapp');
        const emailInput = document.getElementById('email');

        if (!this.validatePhone(whatsappInput)) {
            whatsappInput.focus();
            return;
        }

        if (!this.validateEmail(emailInput)) {
            emailInput.focus();
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            // Send data to webhook
            await this.sendToWebhook(formData);

            // Create WhatsApp message
            const message = this.createWhatsAppMessage(formData);
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Reset form and show success
            this.form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.showSuccessMessage();

        } catch (error) {
            console.error('Error al enviar formulario:', error);

            // Even if webhook fails, still open WhatsApp
            const message = this.createWhatsAppMessage(formData);
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');

            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.showErrorMessage();
        }
    }

    async sendToWebhook(data) {
        const response = await fetch(this.webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al enviar datos');
        }

        return response.json();
    }

    createWhatsAppMessage(data) {
        return `¡Hola! Me llamo ${data.nombre}.

📧 Email: ${data.email}
📱 WhatsApp: ${data.telefono}

🏢 Negocio: ${data.nombreNegocio}
📊 Rubro: ${data.rubro}

💡 Mi principal desafío:
${data.desafio}

Quiero saber más sobre cómo NodumStudio puede ayudarme.`;
    }

    showSuccessMessage() {
        const formContainer = this.form.parentElement;
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.style.cssText = `
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid rgba(0, 255, 136, 0.3);
            padding: 1rem;
            border-radius: 12px;
            color: #00ff88;
            text-align: center;
            margin-top: 1rem;
            animation: fadeIn 0.3s ease;
        `;
        successMsg.innerHTML = '✓ Datos enviados correctamente<br><small>Te contactaremos por WhatsApp en menos de 24 horas</small>';

        formContainer.appendChild(successMsg);

        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => successMsg.remove(), 300);
        }, 5000);
    }

    showErrorMessage() {
        const formContainer = this.form.parentElement;
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message-box';
        errorMsg.style.cssText = `
            background: rgba(255, 68, 68, 0.1);
            border: 1px solid rgba(255, 68, 68, 0.3);
            padding: 1rem;
            border-radius: 12px;
            color: #ff4444;
            text-align: center;
            margin-top: 1rem;
            animation: fadeIn 0.3s ease;
        `;
        errorMsg.innerHTML = '⚠ Hubo un problema al enviar los datos<br><small>Pero puedes continuar por WhatsApp</small>';

        formContainer.appendChild(errorMsg);

        setTimeout(() => {
            errorMsg.style.opacity = '0';
            setTimeout(() => errorMsg.remove(), 300);
        }, 5000);
    }
}

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if (!this.images.length) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        this.images.forEach(img => imageObserver.observe(img));
    }
}

// ===================================
// PARALLAX EFFECT - Simplified for mobile performance
// ===================================
// Parallax effect removed to improve mobile performance and reduce motion

// ===================================
// PERFORMANCE MONITORING
// ===================================
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if ('PerformanceObserver' in window) {
            // Monitor Long Tasks
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 50) {
                            console.warn('Long task detected:', entry);
                        }
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // PerformanceObserver not supported in this browser
            }
        }
    }

    logMetrics() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;

            console.log('Page Load Metrics:');
            console.log(`- Total Load Time: ${loadTime}ms`);
            console.log(`- DOM Ready: ${domReady}ms`);
        }
    }
}

// ===================================
// INTERSECTION OBSERVER FOR STATS COUNTER
// ===================================
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        if (!this.stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animateNumber(element) {
        const text = element.textContent;
        const hasX = text.includes('x');
        const number = parseInt(text.replace(/[^\d]/g, ''));

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = text;
                clearInterval(timer);
            } else {
                element.textContent = hasX ? `${Math.floor(current)}x` : Math.floor(current);
            }
        }, stepTime);
    }
}

// ===================================
// CURSOR EFFECTS (Desktop Only)
// ===================================
class CursorEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.cta-button, .service-card, .problem-card');
        this.init();
    }

    init() {
        if (window.innerWidth <= 768) return; // Mobile devices

        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', () => this.addHoverEffect(button));
            button.addEventListener('mouseleave', () => this.removeHoverEffect(button));
        });
    }

    addHoverEffect(element) {
        element.style.cursor = 'pointer';
    }

    removeHoverEffect(element) {
        element.style.cursor = '';
    }
}

// ===================================
// SMOOTH SCROLL INDICATOR HIDE
// ===================================
class ScrollIndicator {
    constructor() {
        this.indicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        if (!this.indicator) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                this.indicator.style.opacity = '0';
            } else {
                this.indicator.style.opacity = '1';
            }
        }, { passive: true });
    }
}

// ===================================
// VIDEO LOADER
// ===================================
function loadVideo() {
    // Replace 'YOUR_VIDEO_ID' with your actual YouTube video ID
    const videoId = 'dQw4w9WgXcQ'; // Example: https://youtube.com/watch?v=dQw4w9WgXcQ
    const iframe = document.getElementById('youtubeVideo');
    const placeholder = document.getElementById('videoPlaceholder');

    if (iframe && placeholder) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.style.display = 'block';
        placeholder.style.display = 'none';
    }
}

// ===================================
// MAGNETIC BUTTON EFFECT
// ===================================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic');
        this.init();
    }

    init() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
            button.addEventListener('mouseleave', () => this.handleMouseLeave(button));
        });
    }

    handleMouseMove(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
    }

    handleMouseLeave(button) {
        button.style.transform = '';
    }
}

// ===================================
// GRADIENT ORBS - Removed for mobile optimization
// ===================================
// Gradient orbs functionality removed to improve mobile performance

// ===================================
// SECTION REVEAL ANIMATIONS
// ===================================
class SectionReveal {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.sections.forEach(section => {
            section.classList.add('section-hidden');
            observer.observe(section);
        });
    }
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new AnimateOnScroll();
    new NavbarController();
    new FAQAccordion();
    new ContactFormHandler();
    new LazyLoader();
    new StatsCounter();
    new CursorEffects();
    new ScrollIndicator();
    new MagneticButtons();
    new SectionReveal();

    // Performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const perfMonitor = new PerformanceMonitor();
        window.addEventListener('load', () => perfMonitor.logMetrics());
    }

    // Console branding
    console.log(
        '%cNodumStudio',
        'font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
    );
    console.log(
        '%cSistemas que hacen crecer negocios',
        'font-size: 14px; color: #a0a0a0;'
    );
});

// ===================================
// SERVICE WORKER REGISTRATION (PWA Ready)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isInViewport
    };
}
