// Main JavaScript for Afro Cabanna Website

// Preloader
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1000);
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize components
    initMobileMenu();
    initMenuFilter();
    initTestimonialSlider();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
    initWhatsAppLinks();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Menu Data - UPDATED WITH YOUR ACTUAL IMAGES
const menuItems = [
    {
        id: 1,
        name: "Mogodu (Tripe)",
        description: "Traditional tripe stew slow-cooked with spices, served with pap or rice.",
        price: "R50",
        category: "traditional",
        image: "mogodu.jfif"
    },
    {
        id: 2,
        name: "Quarter Leg & Chips",
        description: "Juicy quarter chicken leg, perfectly seasoned and fried, served with golden chips.",
        price: "R40",
        category: "traditional",
        image: "quarter_leg.jfif"
    },
    {
        id: 3,
        name: "Chips",
        description: "Traditional maize meal served with your choice of grilled meat (beef, chicken, or wors).",
        price: "R20",
        category: "traditional",
        image: "fries.jfif" // Using fries image as placeholder
    },
    {
        id: 6,
        name: "Mixed Braai Platter",
        description: "Assorted grilled meats (steak, chops, wors, chicken) served with pap, chakalaka and salad.",
        price: "R180",
        category: "platters",
        image: "braai_platter.jfif"
    },
    {
        id: 9,
        name: "Classic Dagwood",
        description: "Multi-layered sandwich with ham, cheese, lettuce, tomato, and special sauce.",
        price: "R50",
        category: "dagwoods",
        image: "dagwood.jfif"
    },
    {
        id: 12,
        name: "Kota (Sphatlho)",
        description: "Quarter loaf filled with chips, polony, cheese, Russian, egg, and atchar.",
        price: "R55",
        category: "kota",
        image: "kota.jfif"
    },
    {
        id: 14,
        name: "Steak & Wors",
        description: "Grilled Steak & Wors, with a side of your choice",
        price: "R65",
        category: "kota",
        image: "steak_wors.jfif" // Using same kota image
    }
];

// Initialize Menu Filter
function initMenuFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuGrid = document.getElementById('menuGrid');
    
    // Load initial menu items
    loadMenuItems('all');
    
    // Add click event to category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter menu items
            const category = btn.getAttribute('data-category');
            loadMenuItems(category);
        });
    });
    
    // Add click event to footer menu links
    document.querySelectorAll('a[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
            
            // Load filtered items
            loadMenuItems(category);
            
            // Scroll to menu section
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Load Menu Items
function loadMenuItems(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    // Filter items based on category
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    // Create menu item elements
    filteredItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-category', item.category);
        
        // WhatsApp order link
        const whatsappMessage = `Hi Afro Cabanna, I'd like to order ${item.name}.`;
        const whatsappLink = `https://wa.me/27725724287?text=${encodeURIComponent(whatsappMessage)}`;
        
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <span class="menu-item-category">${getCategoryName(item.category)}</span>
                <p class="menu-item-description">${item.description}</p>
                <a href="${whatsappLink}" target="_blank" class="btn btn-primary menu-item-btn">
                    <i class="fab fa-whatsapp"></i> Order Now
                </a>
            </div>
        `;
        
        // Add animation with delay
        setTimeout(() => {
            menuItem.classList.add('animate');
        }, index * 100);
        
        menuGrid.appendChild(menuItem);
    });
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'traditional': 'Traditional Food',
        'platters': 'Meat Platter',
        'dagwoods': 'Dagwood',
        'kota': 'Sphatlho / Kota'
    };
    return categoryNames[category] || category;
}

// Testimonials Data
const testimonials = [
    {
        text: "The mogodu here takes me back to my grandmother's cooking. Perfectly seasoned and tender. Afro Cabanna has become our family's favorite spot for traditional meals.",
        author: "Faith.",
        role: "Regular Customer",
        image: ""
    },
    {
        text: "Best kota in town! The portion size is generous and the flavors are amazing. I order from Afro Cabanna at least twice a week.",
        author: "Mshefane.",
        role: "Entertainer",
        image: ""
    },
    {
        text: "Their meat platters are perfect for family gatherings. The quality is always top-notch and the delivery is fast. Highly recommended!",
        author: "Pearl.",
        role: "Resident",
        image: ""
    },
    {
        text: "As someone who grew up eating traditional African food, I can say Afro Cabanna gets it right. The pap and vleis is exactly how I remember it.",
        author: "Aphiwe.",
        role: "TUT Student",
        image: ""
    }
];

// Testimonial Slider
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = testimonials.length;
    
    // Create slides and dots
    testimonials.forEach((testimonial, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.innerHTML = `
            <div class="testimonial-text">${testimonial.text}</div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        `;
        track.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Reset auto slide interval on interaction
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => resetAutoSlide());
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
            const whatsappLink = `https://wa.me/27725724287?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp with the message
            window.open(whatsappLink, '_blank');
            
            // Show success message
            alert(`Thank you ${name}! Your message has been sent. We'll contact you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp Links Enhancement
function initWhatsAppLinks() {
    // Add click tracking to all WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('WhatsApp order link clicked:', this.href);
            
            // Optional: Add a small animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Add order item functionality to menu items
    document.addEventListener('click', function(e) {
        if (e.target.closest('.menu-item-btn')) {
            const menuItem = e.target.closest('.menu-item');
            const itemName = menuItem.querySelector('.menu-item-title').textContent;
            
            // Optional: Track specific item orders
            console.log('Order placed for:', itemName);
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to menu items
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to menu items after they're loaded
    const observer = new MutationObserver(() => {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    });
    
    observer.observe(document.getElementById('menuGrid'), {
        childList: true,
        subtree: true
    });
});