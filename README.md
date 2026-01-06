# Puffling Cottage Website

This is the complete website for Puffling Cottage, a holiday cottage in Northumberland.

## Typography

This version uses **Option 4** fonts:
- **Headings/Logo**: Plus Jakarta Sans - Soft, approachable, modern warmth
- **Body text**: Nunito Sans - Excellent readability, warm feel

## File Structure

```
puffling-cottage/
├── index.html              # Homepage
├── gallery.html            # Photo gallery
├── testimonials.html       # Guest reviews (dynamically loaded)
├── recommendations.html    # Things to do
├── about.html              # About the cottage
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Navigation, lightbox, forms
│   └── testimonials-data.js # Guest testimonials data
└── images/                 # Add your images here
```

## Required Images

Add the following images to the `/images/` folder:

1. **PuffCot_icon_2.png** - Logo/favicon (used throughout)
2. **IMG_1906.JPG** - Bamburgh Castle (hero background)
3. **IMG_1848.JPG** - Beach scene
4. **IMG_1849.JPG** - Coastal walk
5. **IMG_1916.JPG** - Castle views
6. **IMG_1920.JPG** - Local scenery / Dunstanburgh
7. **IMG_1941.JPG** - Northumberland coast
8. **IMG_1944.JPG** - Stunning views / Holy Island
9. **IMG_0828.JPG** - Master bedroom
10. **IMG_0831.JPG** - Second bedroom
11. **IMG_0832.JPG** - Bedroom details
12. **FullSizeRender_7.jpeg** - Living room

## Adding New Testimonials

To add a new testimonial, edit `js/testimonials-data.js` and add a new entry at the TOP of the `testimonialData` array:

```javascript
{
    id: 9,
    rating: 5,
    text: "Your review text here",
    author: "Guest Name, Location",
    date: "Month Year",
    initials: "GN"
}
```

The homepage will automatically show the 2 most recent reviews, and the testimonials page will display all of them.

## Deployment to GitHub Pages

1. Create a new repository at github.com/RumahHomes/Puffling-Cottage
2. Upload all files maintaining the folder structure
3. Go to Settings → Pages
4. Set Source to "main" branch
5. Wait 1-2 minutes for deployment

Your site will be available at: https://rumahhomes.github.io/Puffling-Cottage/

## Contact

Email: rumahhomesltd@gmail.com

---

© 2026 Puffling Cottage - A Rumah Homes Property
