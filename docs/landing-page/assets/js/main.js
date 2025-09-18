// Hospital Appointment Management System - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');

        if (window.innerWidth <= 768) {
            // Create hamburger menu
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';

            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            navbar.appendChild(hamburger);
        }
    };

    // Initialize mobile menu
    createMobileMenu();

    // Window resize handler
    window.addEventListener('resize', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (window.innerWidth > 768) {
            if (hamburger) hamburger.remove();
            navMenu.classList.remove('active');
        } else {
            if (!hamburger) createMobileMenu();
        }
    });

    // Add loading animation for diagrams
    const diagramContainers = document.querySelectorAll('.diagram-container');

    diagramContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            img.addEventListener('load', () => {
                container.classList.add('loaded');
            });

            // Add loading placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'diagram-placeholder';
            placeholder.textContent = 'Loading diagram...';
            container.appendChild(placeholder);

            img.addEventListener('load', () => {
                placeholder.remove();
            });
        }
    });

    // Add scroll-based navbar styling
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add click tracking for buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize tooltips for technical terms
    const technicalTerms = document.querySelectorAll('[data-tooltip]');

    technicalTerms.forEach(term => {
        term.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });

        term.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        }
    });

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add page transition effects
    const pageLinks = document.querySelectorAll('a[href]');

    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                document.body.classList.add('page-transition');

                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });

    console.log('Hospital Appointment Management System - Landing Page Loaded');
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
    }

    .page-transition {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .diagram-placeholder {
        background: #f1f5f9;
        border: 2px dashed #cbd5e1;
        border-radius: 8px;
        padding: 40px;
        text-align: center;
        color: #64748b;
        font-weight: 500;
    }

    .hamburger {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--text-secondary);
    }

    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }

        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            box-shadow: var(--shadow);
            padding: 20px;
        }
    }
`;
document.head.appendChild(style);