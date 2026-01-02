/* ============================================
   PUFFLING COTTAGE - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initLightbox();
    initEnquiryForm();
    initBackToTop();
    initScrollReveal();
    initGalleryFilters();
});

/* ============================================
   NAVIGATION
   ============================================ */

function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Mobile menu toggle
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle aria-expanded
            const isExpanded = navList.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking a link
        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Set active nav link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   SCROLL EFFECTS
   ============================================ */

function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ============================================
   LIGHTBOX
   ============================================ */

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let galleryItems = [];
    let currentIndex = 0;
    
    // Get all gallery items
    function updateGalleryItems() {
        galleryItems = Array.from(document.querySelectorAll('.gallery-item[data-lightbox]'));
    }
    
    // Open lightbox
    function openLightbox(index) {
        updateGalleryItems();
        if (galleryItems.length === 0) return;
        
        currentIndex = index;
        const item = galleryItems[currentIndex];
        const imgSrc = item.dataset.lightbox || item.querySelector('img').src;
        const caption = item.dataset.caption || '';
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const imgSrc = item.dataset.lightbox || item.querySelector('img').src;
        const caption = item.dataset.caption || '';
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
    }
    
    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const imgSrc = item.dataset.lightbox || item.querySelector('img').src;
        const caption = item.dataset.caption || '';
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
    }
    
    // Event listeners for gallery items
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item[data-lightbox]');
        if (galleryItem) {
            e.preventDefault();
            updateGalleryItems();
            const index = galleryItems.indexOf(galleryItem);
            openLightbox(index);
        }
    });
    
    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

/* ============================================
   ENQUIRY FORM
   ============================================ */

function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'arrivalDate', 'departureDate'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate dates
        const arrival = new Date(data.arrivalDate);
        const departure = new Date(data.departureDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (arrival < today) {
            showNotification('Arrival date cannot be in the past.', 'error');
            return;
        }
        
        if (departure <= arrival) {
            showNotification('Departure date must be after arrival date.', 'error');
            return;
        }
        
        // Build email content
        const subject = encodeURIComponent(`Puffling Cottage Enquiry - ${data.firstName} ${data.lastName}`);
        const body = buildEmailBody(data);
        
        // Open email client
        window.location.href = `mailto:rumahhomesltd@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success message
        showNotification('Thank you for your enquiry! Your email client should open shortly.', 'success');
        
        // Reset form after a delay
        setTimeout(() => {
            form.reset();
        }, 2000);
    });
    
    // Remove error class on input
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

function buildEmailBody(data) {
    const lines = [
        'PUFFLING COTTAGE BOOKING ENQUIRY',
        '================================',
        '',
        'GUEST DETAILS:',
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : '',
        '',
        'BOOKING DETAILS:',
        `Arrival Date: ${formatDate(data.arrivalDate)}`,
        `Departure Date: ${formatDate(data.departureDate)}`,
        `Number of Nights: ${calculateNights(data.arrivalDate, data.departureDate)}`,
        '',
        'PARTY COMPOSITION:',
        `Adults: ${data.adults || 0}`,
        `Children: ${data.children || 0}`,
        `Dogs: ${data.dogs || 0}`,
        '',
        'SPECIAL REQUESTS:',
        data.requests || 'None specified',
        '',
        '================================',
        'Sent via Puffling Cottage Website'
    ];
    
    return encodeURIComponent(lines.filter(line => line !== '').join('\n'));
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

function calculateNights(arrival, departure) {
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const diffTime = Math.abs(departureDate - arrivalDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
    }
`;
document.head.appendChild(notificationStyles);

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */

function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    };
    
    // Check on load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

/* ============================================
   GALLERY FILTERS
   ============================================ */

function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter category
            const filter = this.dataset.filter;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ============================================
   LAZY LOADING IMAGES
   ============================================ */

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);
