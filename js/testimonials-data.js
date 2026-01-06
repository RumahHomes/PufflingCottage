/* ============================================
   PUFFLING COTTAGE - Testimonials Data
   Most recent testimonials first
   ============================================ */

const testimonialData = [
    {
        id: 1,
        rating: 5,
        text: "Excellent lovely cottage; everything you want, we had no issue with parking our car (which is an SUV). Our dog loved it too was out in the water the whole time! Also, had fantastic weather. An amazing place. Thank you, we will be back",
        author: "Deborah Freeman, Kent",
        date: "Sept 2025",
        initials: "DF"
    },
    {
        id: 2,
        rating: 5,
        text: "Sparkling and clean. A wonderfully appointed home for both people with dogs and children. Although we don't have our own dog, we could see things like a dog bed, bowls and everything else you'd need for a dog. For children, there were plastic plates, beakers, bowls and cutlery. Plus things like steps for them. The sensor night lights were a great added bonus. Plus there was a big box of Lego, a few kids toys and books and a few family games. Kitchen was well stocked with an air fryer, dishwasher and other stuff to cook with. Only thing that would've been great, would've been a plate drainer on the sink. Location was lovely - 10 minute walk onto Seahouses. Lovely 'Good Earth' shop very close by. Beach was only 5 minute walk away - nice and clean with a fair amount of rock pools at one end. Cottage felt nice and secure. Heating was in good working order. Very quiet too. I've been going to the Northumberland coast for about 30 years now, and this is one of the better places I've stayed at. Would definitely return.",
        author: "Anon",
        date: "Aug 2025",
        initials: "A"
    },
    {
        id: 3,
        rating: 5,
        text: "Just returned from a wonderful weeks stay at Puffling Cottage. The cottage is beautifully presented and well equipped. It's a perfect base for exploring the beautiful Northumberland coast. Will definitely be returning.",
        author: "Gary McAuley, Castleford",
        date: "Aug 2025",
        initials: "GM"
    },
    {
        id: 4,
        rating: 5,
        text: "What a beautiful cottage. It was immaculate on arrival. The owners have thought of everything to make the stay as comfortable as possible. My daughter and granddaughter were delighted with their room. Lovely welcome hamper. We will definitely be returning. Would also like to say thank you for being so accommodating with check in/out times. We are already planning our next visit.",
        author: "Anon",
        date: "Aug 2025",
        initials: "A"
    },
    {
        id: 5,
        rating: 5,
        text: "What a gorgeous cottage! Well equipped, clean, and decorated so tastefully. Location was brilliant for exploring the coast and castles. The welcome hamper was a lovely touch. We will definitely be back!",
        author: "Anon",
        date: "Aug 2025",
        initials: "A"
    },
    {
        id: 6,
        rating: 5,
        text: "Lovely cottage, spotlessly clean and very well equipped. Great location to explore the coast. The welcome hamper was a lovely touch. Our dogs loved the garden and the nearby beach. Would definitely recommend and we hope to return soon!",
        author: "Kevin Whiting, Sunderland",
        date: "Jul 2025",
        initials: "KW"
    },
    {
        id: 7,
        rating: 5,
        text: "A beautiful cottage in a perfect location. Everything was spotless and the welcome hamper was a lovely surprise. The garden is perfect for dogs and the beach is just a short walk away. We loved every minute of our stay and can't wait to return!",
        author: "Donna O'Doherty",
        date: "June 2025",
        initials: "DO"
    },
    {
        id: 8,
        rating: 5,
        text: "Clean, fresh and welcoming. The cottage has been thoughtfully furnished and equipped. A lovely base for exploring Northumberland's beautiful coastline. The owners clearly take pride in their property. Highly recommended!",
        author: "Anon",
        date: "May 2025",
        initials: "A"
    }
];

/* ============================================
   TESTIMONIAL RENDERING FUNCTIONS
   ============================================ */

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star${i > rating ? ' empty' : ''}">★</span>`;
    }
    return stars;
}

// Generate single testimonial card HTML
function generateTestimonialCard(testimonial, truncate = false) {
    let text = testimonial.text;
    
    // Truncate long text for homepage preview
    if (truncate && text.length > 200) {
        text = text.substring(0, 200).trim() + '...';
    }
    
    return `
        <div class="testimonial-card">
            <div class="testimonial-rating">
                ${generateStars(testimonial.rating)}
            </div>
            <p class="testimonial-text">${text}</p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.initials}</div>
                <div class="author-info">
                    <h5>${testimonial.author}</h5>
                    <span>${testimonial.date}</span>
                </div>
            </div>
        </div>
    `;
}

// Function to render featured testimonials (for homepage - first 2)
function renderFeaturedTestimonials(containerId, count = 2) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const featured = testimonialData.slice(0, count);
    container.innerHTML = featured.map(t => generateTestimonialCard(t, true)).join('');
}

// Function to render all testimonials (for testimonials page)
function renderAllTestimonials(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = testimonialData.map(t => generateTestimonialCard(t, false)).join('');
}

// Function to calculate and display average rating
function displayAverageRating(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const total = testimonialData.reduce((sum, t) => sum + t.rating, 0);
    const average = (total / testimonialData.length).toFixed(1);
    
    const scoreEl = container.querySelector('.average-score');
    const countEl = container.querySelector('.review-count');
    
    if (scoreEl) scoreEl.textContent = average;
    if (countEl) countEl.textContent = `Based on ${testimonialData.length} guest reviews`;
}

// Initialize testimonials on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and render appropriate testimonials
    if (document.getElementById('featured-testimonials')) {
        renderFeaturedTestimonials('featured-testimonials', 2);
    }
    
    if (document.getElementById('all-testimonials')) {
        renderAllTestimonials('all-testimonials');
    }
    
    if (document.getElementById('rating-summary')) {
        displayAverageRating('rating-summary');
    }
});
