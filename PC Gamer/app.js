/* ==========================================
   CYPERPULSE SCRIPT - Lógica e Interactividad
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class after a brief delay if specified
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Animate Performance Bars when in view
    const performanceSection = document.querySelector('#rendimiento');
    const progressBars = document.querySelectorAll('.bar');
    
    const performanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });
    
    if (performanceSection) {
        performanceObserver.observe(performanceSection);
    }

    // 3. Parallax / Mouse Move effect on ambient orbs and PC Image
    const pcImage = document.querySelector('.pc-image-wrapper');
    const orbOrange = document.querySelector('.orb-orange');
    const orbCyan = document.querySelector('.orb-cyan');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        // Move orbs slightly in opposite directions
        if (orbOrange) {
            orbOrange.style.transform = `translate(${x * -60}px, ${y * -60}px)`;
        }
        if (orbCyan) {
            orbCyan.style.transform = `translate(${x * 60}px, ${y * 60}px)`;
        }
        
        // Tilt PC Image slightly based on mouse
        if (pcImage && window.innerWidth > 1024) {
            pcImage.style.transform = `rotateY(${x * 12}deg) rotateX(${y * -12}deg) translateY(${y * -10}px)`;
        }
    });
    
    // Reset tilt when mouse leaves window
    document.addEventListener('mouseleave', () => {
        if (pcImage) {
            pcImage.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
        }
    });

    // 4. Customize Button Actions
    const btnCustom = document.getElementById('btn-custom');
    const messageInput = document.getElementById('message');
    const contactSection = document.getElementById('contacto');
    
    if (btnCustom && contactSection) {
        btnCustom.addEventListener('click', () => {
            // Scroll smoothly
            contactSection.scrollIntoView({ behavior: 'smooth' });
            // Focus message textarea after scrolling
            if (messageInput) {
                setTimeout(() => {
                    messageInput.focus();
                }, 800);
            }
        });
    }

    // 5. WhatsApp Form Redirect
    const purchaseForm = document.getElementById('purchase-form');
    
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Recipient number (e.g. your store's WhatsApp number)
            const phoneNumber = '5491169578193'; 
            
            // Build the formatted WhatsApp message
            let text = `*¡Nueva Consulta PC Gamer DECSATECH!*\n\n`;
            text += `👤 *Cliente:* ${name}\n`;
            
            if (message) {
                text += `💬 *Mensaje:* ${message}\n`;
            } else {
                text += `💬 *Mensaje:* Sin comentarios adicionales, ¡quiero reservar la oferta!\n`;
            }
            
            text += `\n💵 *Precio Base:* $2.329.000\n`;
            text += `📦 *Detalle de Oferta:* Ryzen 9 7900 + RTX 5050 + ASUS B650 + 16GB DDR5 + SSD 256GB x 2 Unidades + Elite 502 ARGB`;
            
            // Encode URI
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // 6. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on any nav link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
