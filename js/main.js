/* ============================================
   PUFFLING COTTAGE - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Header Scroll Effect
    // ==========================================
    const header = document.querySelector('.header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
    
    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ==========================================
    // Lightbox Gallery
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let galleryItems = [];
    let currentIndex = 0;
    
    // Initialize gallery items
    function initGallery() {
        galleryItems = Array.from(document.querySelectorAll('[data-lightbox]'));
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
    }
    
    function openLightbox(index) {
        if (!lightbox || galleryItems.length === 0) return;
        
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxContent() {
        const item = galleryItems[currentIndex];
        const imageSrc = item.getAttribute('data-lightbox');
        const caption = item.getAttribute('data-caption') || '';
        
        if (lightboxImage) lightboxImage.src = imageSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxContent();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    }
    
    // Lightbox event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
    
    initGallery();
    
    // ==========================================
    // Gallery Filter (if present)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (filterButtons.length > 0 && galleryGrid) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                const items = galleryGrid.querySelectorAll('.gallery-item');
                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Reinitialize gallery for lightbox
                initGallery();
            });
        });
    }
    
    // ==========================================
    // Enquiry Form Handler
    // ==========================================
    const enquiryForm = document.getElementById('enquiry-form');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(enquiryForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Build email body
            const emailBody = `
New Booking Enquiry from Puffling Cottage Website

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Arrival Date: ${data.arrivalDate}
Departure Date: ${data.departureDate}

Number of Adults: ${data.adults}
Number of Children: ${data.children}
Number of Dogs: ${data.dogs}

Special Requests:
${data.requests || 'None'}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:rumahhomesltd@gmail.com?subject=Booking Enquiry - Puffling Cottage&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show confirmation
            alert('Thank you for your enquiry! Your email client will open with your booking details. Please send the email to complete your enquiry.');
        });
    }
    
    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load
    
    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Date Validation for Enquiry Form
    // ==========================================
    const arrivalDate = document.getElementById('arrivalDate');
    const departureDate = document.getElementById('departureDate');
    
    if (arrivalDate && departureDate) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        arrivalDate.setAttribute('min', today);
        
        arrivalDate.addEventListener('change', function() {
            // Set departure minimum to day after arrival
            const arrival = new Date(this.value);
            arrival.setDate(arrival.getDate() + 1);
            const minDeparture = arrival.toISOString().split('T')[0];
            departureDate.setAttribute('min', minDeparture);
            
            // Clear departure if it's before new minimum
            if (departureDate.value && departureDate.value < minDeparture) {
                departureDate.value = '';
            }
        });
    }
    
});
