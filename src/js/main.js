// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 58, 138, 0.25)';
        header.style.backdropFilter = 'blur(25px)';
        header.style.borderBottom = '1px solid rgba(251, 191, 36, 0.3)';
        header.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(30, 58, 138, 0.15)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(251, 191, 36, 0.2)';
        header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
    }
});

// Animated Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current).toLocaleString();
            }
        }, 20);
    });
}

// Scroll triggered animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-in-left, .fade-in-up');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animationPlayState = 'running';
        }
    });
}

// Hero Slideshow Auto-cycle
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const intervalTime = 5000; // 5 seconds per slide

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, intervalTime);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Boardroom TV website loaded successfully');
    
    // Initialize hero slideshow
    initHeroSlideshow();
    
    // Create particles if container exists
    if (document.getElementById('particles')) {
        createParticles();
    }
    
    // Start counter animations when about section is visible
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Handle scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
});