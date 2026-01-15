# Puffling Cottage Website

This is the complete website for Puffling Cottage, a holiday cottage in Northumberland.

## Typography

This version uses **Option 4** fonts:
- **Headings/Logo**: Plus Jakarta Sans - Soft, approachable, modern warmth
- **Body text**: Nunito Sans - Excellent readability, warm feel

## Navigation Structure

The website navigation has been restructured as follows:
1. **Home** - Main landing page with hero, features, gallery preview, testimonials, and enquiry form
2. **Our Cottage** (about.html) - About the cottage, amenities, dog-friendly features, location, and hosts
3. **Testimonials** - Guest reviews and ratings
4. **Gallery** - Photo gallery featuring:
   - Section 1: The Cottage (interior photos)
   - Section 2: Amble & Immediate Vicinity
5. **Things to Do** (recommendations.html) - Local recommendations plus photo galleries:
   - Local recommendations (Castles, Nature, Food, Activities, Practical Info)
   - Coastline & Castles photo gallery
   - Cheviots & Interior photo gallery
   - Additional Places of Interest photo gallery
6. **Enquire** - Links to the enquiry form on the homepage

## File Structure

```
puffling-cottage/
├── index.html              # Homepage
├── about.html              # Our Cottage page (formerly "About Us")
├── gallery.html            # Photo gallery (Sections 1-2 only)
├── testimonials.html       # Guest reviews
├── recommendations.html    # Things to Do (with photo galleries)
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Navigation, lightbox, forms
│   └── testimonials-data.js # Guest testimonials data
└── images/                 # Add your images here
```

## Changes from Previous Version

### Navigation Order Updated
- Old: Home | Gallery | Testimonials | Things to Do | About Us | Enquire
- New: Home | Our Cottage | Testimonials | Gallery | Things to Do | Enquire

### Gallery Page Simplified
The Gallery page now contains only:
- Section 1: The Cottage
- Section 2: Amble & Immediate Vicinity

### Things to Do Page Enhanced
The following photo gallery sections have been moved to Things to Do:
- Coastline & Castles (formerly Gallery Section 3)
- Cheviots & Interior (formerly Gallery Section 4)
- Additional Places of Interest (formerly Gallery Section 6)

### Removed Content
- Market Towns section (formerly Gallery Section 5) has been removed entirely

## Required Images

Add the following images to the `/images/` folder:

### Core Images
1. **New PuffCo Icon No Background 1.png** - Logo/favicon
2. **Coquet_Estuary_Night_1.jpeg** - Hero background
3. **Amble Pier Night Landscape.jpeg** - Gallery image

### Cottage Photos
4. **Front_Garden_1.jpeg** - Cottage exterior
5. **Living_Room_1.JPG** - Living room
6. **Kitchen_2.JPG** - Kitchen
7. **Master_Bedroom_1.JPG** - Master bedroom
8. **Twin_Bedroom_1.JPG** - Twin bedroom
9. **Bathroom_1.JPG** - Bathroom
10. **Dining_Table_1.jpeg** - Dining area
11. **Back_Garden_1.jpeg** - Back garden
12. **FullSizeRender_7.jpeg** - Living room alternate
13. **IMG_0828.JPG** - Master bedroom
14. **IMG_0831.JPG** - Second bedroom
15. **IMG_0832.JPG** - Bedroom details

### Feature Card Images
16. **Warkworth_Castle_2.JPG** - Castle Views card
17. **Pristine_Beaches_Image_1.JPG** - Pristine Beaches card
18. **Dog_Friendly_Image_1.JPG** - Dog Friendly card
19. **Puffin_Paradise_Image_1.JPG** - Puffin Paradise card
20. **Jaspers_4.JPG** - Food Heaven card
21. **Aurora_1.JPG** - Activity Variety card

### Gallery & Things to Do Images
22. **IMG_1848.JPG** - Beach scene
23. **IMG_1849.JPG** - Coastal walk
24. **IMG_1906.JPG** - Bamburgh Castle
25. **IMG_1916.JPG** - Castle views
26. **IMG_1920.JPG** - Dunstanburgh
27. **IMG_1941.JPG** - Alnwick area
28. **IMG_1944.JPG** - Holy Island
29. **Activity_Variety_Image_1.JPG** - College Valley
30. **Food_Heaven_Image_1.JPG** - Craster
31. **Warkworth_Castle_1.jpeg** - Warkworth Castle
32. **Bamburgh_Castle_2.JPG** - Bamburgh Castle
33. **Dunstanburgh_Castle_3.JPG** - Dunstanburgh Castle
34. **Cherry_Blossom_1.jpeg** - Alnwick Garden
35. **Cragside_1.jpeg** - Cragside
36. **Barter_Books_1.jpeg** - Barter Books
37. **Vindolanda.png** - Vindolanda
38. **Farne_Islands_1.jpeg** - Farne Islands
39. **Kielder_Observatory.png** - Dark Sky Park
40. **Howick_1.jpeg** - Howick Hall Gardens

### Additional Gallery Images
41. amble-harbour.jpg
42. harbour-village.jpg
43. puffin-cruises.jpg
44. little-shore.jpg
45. alnwick-castle.jpg
46. holy-island.jpg
47. seahouses.jpg
48. cheviot.jpg
49. hadrians-wall.jpg
50. coquetdale.jpg
51. kielder-forest.jpg
52. kielder-water.jpg
53. sycamore-gap.jpg
54. chillingham-castle.jpg
55. grace-darling.jpg

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
