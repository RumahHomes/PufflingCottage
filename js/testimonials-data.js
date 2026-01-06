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
        text: "Sparkling and clean. A wonderfully appointed home for both people with dogs and children. Although we don't have our own dog, we could see things like a dog bed, bowls and everything else you'd need for a dog. For children, there were plastic plates, beakers, bowls and cutlery. Plus things like steps for them. The sensor night lights were a great added bonus. Plus there was a big box of Lego, a few kids toys and books and a few family games. Kitchen was well stocked with an air fryer, dishwasher and other stuff to cook with. Only thing that would've been great, would've been a plate drainer on the sink. Washer/dryer was an brilliant added feature, perfect for washing out swimming costumes and towels, which there was plenty provided. The towels were soft and smelt great. Bedrooms were comfy and beds lovely to sleep in. Amble is an amazing place. Perfect beaches and lovely scenery. Half an hour by bus to Alnwick. Which has a castle, museum and great shops, amongst other things. Northumberland is an absolute gem.",
        author: "Anon, Confirmed Guest",
        date: "Aug 2025",
        initials: "AG"
    },
    {
        id: 3,
        rating: 5,
        text: "We had a great stay. Perfect for the kids and dog. Great base to explore the amazing beaches nearby. Comfy beds and a stunning dining table.",
        author: "Gary McAuley, Castleford",
        date: "Aug 2025",
        initials: "GM"
    },
    {
        id: 4,
        rating: 5,
        text: "Beautiful cottage in a very convenient location. Amble is a lovely town with fantastic beaches.",
        author: "Anon, Confirmed Guest",
        date: "Aug 2025",
        initials: "AG"
    },
    {
        id: 5,
        rating: 5,
        text: "Gorgeous cottage. Brilliant location and exceptionally thoughtfully fitted out throughout. The sofa bed is huge and extremely comfortable so worked well with extended family staying. We had an amazing holiday.",
        author: "Anon, Confirmed Guest",
        date: "Aug 2025",
        initials: "AG"
    },
    {
        id: 6,
        rating: 5,
        text: "Lovely terraced cottage, two minute walk from Main Street and five minutes from harbour. Quiet area and perfectly situated to drive off to other parts of the coast. A lovely little home from home with everything you need there.",
        author: "Kevin Whiting, Sunderland",
        date: "Jul 2025",
        initials: "KW"
    },
    {
        id: 7,
        rating: 5,
        text: "The cottage was perfect in every way! Location, decor, cleanliness and the owners have obviously thought of everything that their visitors might need. A real home from home that I'd recommend to anyone. 5 out of 5",
        author: "Donna O'Doherty",
        date: "June 2025",
        initials: "DO"
    },
    {
        id: 8,
        rating: 5,
        text: "The cottage was clean, fresh and welcoming. Everything there that we needed. Information from Sophia was clear, concise and friendly. The cottage was the best we have stayed in. All made for a perfect, relaxing sea-side break.",
        author: "Anon, Confirmed Guest",
        date: "May 2025",
        initials: "AG"
    }
];

// Function to generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star empty">☆</span>';
        }
    }
    return stars;
}

// Function to generate a testimonial card HTML
function generateTestimonialCard(testimonial, truncate = false) {
    let text = testimonial.text;
    
    // Truncate long testimonials on homepage
    if (truncate && text.length > 250) {
        text = text.substring(0, 250).trim() + '...';
    }
    
    return `
        <div class="testimonial-card">
            <div class="testimonial-stars">
                ${generateStars(testimonial.rating)}
            </div>
            <p class="testimonial-text">"${text}"</p>
            <div class="testimonial-author">
                <div class="testimonial-author-avatar">${testimonial.initials}</div>
                <div class="testimonial-author-info">
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
