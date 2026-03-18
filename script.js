document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;

    // Toggle menu
    mobileToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            mobileToggle.innerHTML = '<i class="ph ph-x"></i>';
        } else {
            mobileMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="ph ph-list"></i>';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="ph ph-list"></i>';
            isMenuOpen = false;
        });
    });

    // 3. Simple Intersection Observer for scroll animations (fade in)
    // Add some inline styles dynamically to cards for simple entrance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Prepare elements to be animated
    const animatedElements = document.querySelectorAll('.menu-card, .usp-item, .review-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
        // add slight stagger delay based on index
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        animateOnScroll.observe(el);
    });
});
