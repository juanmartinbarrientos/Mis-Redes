document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. DYNAMIC LIKES COUNTER
    // ==========================================================================
    const likesCountEl = document.getElementById('likes-count');
    const likeBtn = document.getElementById('like-button');
    const postImageWrap = document.getElementById('post-image-wrap');
    const heartPopEl = document.getElementById('heart-pop-el');

    // Generate random likes count above 2 Million
    // Range: 2,100,000 to 2,900,000
    const minLikes = 2100000;
    const maxLikes = 2900000;
    let baseLikes = Math.floor(Math.random() * (maxLikes - minLikes + 1)) + minLikes;
    let isLiked = false;

    // Helper function to format number with Argentine/Spanish dots separator
    function formatLikes(num) {
        return new Intl.NumberFormat('es-AR').format(num);
    }

    // Set initial likes count
    likesCountEl.textContent = formatLikes(baseLikes);

    // Function to handle the "Like" toggle action
    function toggleLike(triggerAnimation = false) {
        isLiked = !isLiked;

        if (isLiked) {
            baseLikes += 1;
            likeBtn.classList.add('liked');
            likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
            likeBtn.style.color = 'var(--color-heart)';
            
            if (triggerAnimation) {
                triggerHeartPop();
            }
        } else {
            baseLikes -= 1;
            likeBtn.classList.remove('liked');
            likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
            likeBtn.style.color = '';
        }

        // Update likes in DOM
        likesCountEl.textContent = formatLikes(baseLikes);
    }

    // Big heart pop-up animation in the center of the photo
    function triggerHeartPop() {
        // Reset animation class to allow re-triggering
        heartPopEl.classList.remove('animate');
        // Force reflow
        void heartPopEl.offsetWidth;
        // Add animation class
        heartPopEl.classList.add('animate');

        // Remove class after animation finishes (800ms)
        setTimeout(() => {
            heartPopEl.classList.remove('animate');
        }, 800);
    }

    // Click handler for the heart button
    likeBtn.addEventListener('click', () => {
        toggleLike(isLiked ? false : true); // only trigger big pop when liking
    });

    // Double click handler for the post image container
    postImageWrap.addEventListener('dblclick', () => {
        // If not already liked, toggle it
        if (!isLiked) {
            toggleLike(true);
        } else {
            // If already liked, just trigger the heart pop animation again for fun
            triggerHeartPop();
        }
    });

    // ==========================================================================
    // 2. HEADER SCROLL EFFECT & MOBILE MENU
    // ==========================================================================
    const header = document.querySelector('.main-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle logic
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        
        if (isOpen) {
            navLinks.style.display = '';
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--color-bg)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--color-border)';
            navLinks.style.gap = '1.5rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(37, 19, 8, 0.05)';
            
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = '';
                mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    // Handle screen resize to clean up inline styles of mobile menu
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    // ==========================================================================
    // 3. DAILY OPENING COUNTDOWN TIMER
    // ==========================================================================
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        
        // Target is 9:00 AM today
        let target = new Date();
        target.setHours(9, 0, 0, 0);

        // If it's already past 9:00 AM, the target is 9:00 AM tomorrow
        if (now > target) {
            target.setDate(target.getDate() + 1);
        }

        const difference = target - now; // diff in ms

        // Calculate hours, minutes, seconds
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format leading zeros
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Run countdown update immediately and every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================================================
    // 4. INTERACTIVE ORDER FORM HANDLING
    // ==========================================================================
    const orderForm = document.getElementById('order-form');
    const successMsg = document.getElementById('form-success-msg');
    const submitBtn = document.getElementById('btn-submit-order');

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check validation
        if (!orderForm.checkValidity()) return;

        // Visual loading state
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        btnText.textContent = 'Redirigiendo a WhatsApp...';
        btnIcon.className = 'fa-solid fa-circle-notch fa-spin btn-icon';

        // Gather form data
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const phone = document.getElementById('form-phone').value;
        const boxSelect = document.getElementById('form-pack');
        const boxText = boxSelect.options[boxSelect.selectedIndex].text;
        const msg = document.getElementById('form-msg').value;

        // Target WhatsApp number: +54 9 11 6957-8193 -> 5491169578193
        const wpNumber = "5491169578193";
        
        // Build the WhatsApp message
        let wpText = `¡Hola Alfajores FOMO! 🤤🍫\nQuiero realizar una reserva:\n\n`;
        wpText += `👤 *Nombre:* ${name}\n`;
        wpText += `📧 *Email:* ${email}\n`;
        wpText += `📞 *WhatsApp:* ${phone}\n`;
        wpText += `📦 *Box:* ${boxText}\n`;
        if (msg.trim()) {
            wpText += `📝 *Mensaje:* ${msg}\n`;
        }

        const wpUrl = `https://wa.me/${wpNumber}?text=${encodeURIComponent(wpText)}`;

        // Simulate API Processing (1.2 seconds) before redirecting
        setTimeout(() => {
            // Open WhatsApp in a new tab
            window.open(wpUrl, '_blank');

            // Fade out the form
            orderForm.classList.add('fade-out');
            
            // Wait for fade transition then show success alert
            setTimeout(() => {
                orderForm.style.display = 'none';
                successMsg.classList.add('show');
            }, 300);
        }, 1200);
    });
});
