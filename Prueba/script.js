// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Observers only once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(element => {
    observer.observe(element);
});

// Cart Functionality
let cartItems = [];
let cartTotal = 0;

const cartBadge = document.getElementById('cart-total');
const toast = document.getElementById('toast');
const modal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart-btn');
const closeModalBtn = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const modalTotal = document.getElementById('modal-total');
const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout');

function addToCart(price, productName) {
    // sumar al array y al total
    cartItems.push({ price, name: productName });
    cartTotal += price;

    // Animate badge
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartBadge.textContent = '$' + cartTotal.toLocaleString('en-US');
        cartBadge.style.transform = 'scale(1)';
    }, 150);

    // Show toast
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Modal Logic
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
        whatsappCheckoutBtn.style.opacity = '0.5';
        whatsappCheckoutBtn.style.pointerEvents = 'none';
    } else {
        cartItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toLocaleString('en-US')}</span>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
        whatsappCheckoutBtn.style.opacity = '1';
        whatsappCheckoutBtn.style.pointerEvents = 'auto';
    }

    modalTotal.textContent = '$' + cartTotal.toLocaleString('en-US');
}

openCartBtn.addEventListener('click', () => {
    renderCart();
    modal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// WhatsApp Checkout Logic
whatsappCheckoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) return;

    const numeroWhatsApp = "+5491169578193";
    let mensaje = "Hola, quiero consultar el stock y comprar los siguientes artículos:\n\n";

    cartItems.forEach((item, index) => {
        mensaje += `* ${item.name} ($${item.price.toLocaleString('en-US')})\n`;
    });

    mensaje += `\n*Total a pagar: $${cartTotal.toLocaleString('en-US')}*`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
});

// Smooth scrolling for Anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
