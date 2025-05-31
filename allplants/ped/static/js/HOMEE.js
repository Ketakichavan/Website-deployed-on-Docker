// function showSidebar(){
//     const sidebar = document.querySelector('.sidebar')
//     sidebar.style.display = 'flex'
// }

// function hideSidebar(){
//     const sidebar = document.querySelector('.sidebar')
//     sidebar.style.display = 'none'
// }

// let currentIndex = 0;
//         const slides = document.querySelectorAll(".slide");
//         const sliderWrapper = document.querySelector(".slider-wrapper");
//         const totalSlides = slides.length;

//         // Add the first slide to the end to create a continuous loop
//         function addFirstSlideToEnd() {
//             const firstSlide = slides[0].cloneNode(true);
//             sliderWrapper.appendChild(firstSlide);
//         }

//         // Function to show the next slide with smooth transition
//         function nextSlide() {
//             if (currentIndex === totalSlides) {
//                 // When the last slide is reached, we jump to the first slide without transition
//                 sliderWrapper.style.transition = "none"; // Disable transition temporarily
//                 currentIndex = 0;
//                 sliderWrapper.style.transform = translateX(0); // Immediately jump to the first image
//                 setTimeout(() => {
//                     sliderWrapper.style.transition = "transform 1s ease-in-out"; // Restore transition
//                 }, 50); // Short delay to allow the transition to be restored
//             } else {
//                 currentIndex++;
//                 sliderWrapper.style.transform = `translateX(-${currentIndex*100}%)`;
//             }
//         }
//         // Automatic slide change every 3 seconds
//         setInterval(nextSlide, 3000);

//         // Add the first slide to the end to create a continuous loop
//         addFirstSlideToEnd();







        
// function toggleText(element) {
//     let content = element.previousElementSibling;
//     if (content.style.display === "none") {
//         content.style.display = "block";
//         element.innerText = "Read Less";
//     } else {
//         content.style.display = "none";
//         element.innerText = "Read More";
//     }
// }


// // JavaScript to toggle visibility of the search bar
// const searchIcon = document.getElementById('search-icon');
// const searchInput = document.getElementById('search');

// searchIcon.addEventListener('click', () => {
//     searchInput.classList.toggle('hidden');
//     searchInput.focus();
// });

// // Define a mapping of multiple search terms to URLs (using .html files)
// const searchMap = {
//     "home": "home.html",
//     "about": "about.html",
//     "contact": "contact.html",
//     "services": "services.html",
//     "rose": "rose.html",
//     "jasmine": "jasmine.html",
//     "flower rose": "rose.html",
//     "flower jasmine": "jasmine.html"
// };

// // Redirect user when they type in something and press Enter
// searchInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter' && searchInput.value.trim() !== "") {
//         const searchQuery = searchInput.value.trim().toLowerCase(); // Make it case-insensitive

//         // Check if the search query matches a predefined URL
//         if (searchMap[searchQuery]) {
//             window.location.href = searchMap[searchQuery]; // Redirect to the corresponding .html page
//         } else {
//             alert("Sorry, no page found for: " + searchQuery); // Handle unknown searches
//         }
//     }
// });

// Wait until the DOM content is fully loaded


document.addEventListener("DOMContentLoaded", () => {

    // Sidebar toggle functions
    const sidebar = document.querySelector('.sidebar');
    window.showSidebar = () => {
        if (sidebar) sidebar.style.display = 'flex';
    };
    window.hideSidebar = () => {
        if (sidebar) sidebar.style.display = 'none';
    };

    // Image Slider setup
    const slides = document.querySelectorAll(".slide");
    const sliderWrapper = document.querySelector(".slider-wrapper");
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Check if there are any slides and initialize the slider only if they exist
    if (slides.length > 0 && sliderWrapper) {
        // Add the first slide to the end to create a continuous loop
        function addFirstSlideToEnd() {
            if (slides.length > 0) {
                const firstSlide = slides[0].cloneNode(true);
                sliderWrapper.appendChild(firstSlide);
            }
        }

        // Function to show the next slide with smooth transition
        function nextSlide() {
            if (sliderWrapper) {
                if (currentIndex === totalSlides) {
                    // When the last slide is reached, jump to the first slide without transition
                    sliderWrapper.style.transition = "none"; // Disable transition temporarily
                    currentIndex = 0;
                    sliderWrapper.style.transform = "translateX(0%)"; // Immediately jump to the first image
                    setTimeout(() => {
                        sliderWrapper.style.transition = "transform 1s ease-in-out"; // Restore transition
                    }, 50); // Short delay to allow the transition to be restored
                } else {
                    currentIndex++;
                    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
            }
        }

        // Add the first slide to the end to create a continuous loop
        addFirstSlideToEnd();

        // Automatically change the slide every 3 seconds
        setInterval(nextSlide, 3000);
    } else {
        console.error("No slides found on the page.");
    }

    // Toggle "Read More / Read Less" functionality
    window.toggleText = function (element) {
        const content = element.previousElementSibling;
        if (content) {
            const isHidden = content.style.display === "none";
            content.style.display = isHidden ? "block" : "none";
            element.innerText = isHidden ? "Read Less" : "Read More";
        }
    };

    // JavaScript to toggle visibility of the search bar
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            searchInput.classList.toggle('hidden');
            if (!searchInput.classList.contains('hidden')) {
                searchInput.focus();
            }
        });

        // Define a mapping of multiple search terms to URLs (using .html files)
        const searchMap = {
            "home": "home.html",
            "about": "about.html",
            "contact": "contact.html",
            "services": "services.html",
            "rose": "rose.html",
            "jasmine": "jasmine.html",
            "flower rose": "rose.html",
            "flower jasmine": "jasmine.html"
        };

        // Redirect user when they type in something and press Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== "") {
                const searchQuery = searchInput.value.trim().toLowerCase(); // Make it case-insensitive

                // Check if the search query matches a predefined URL
                if (searchMap[searchQuery]) {
                    window.location.href = searchMap[searchQuery]; // Redirect to the corresponding .html page
                } else {
                    alert("Sorry, no page found for: " + searchQuery); // Handle unknown searches
                }
            }
        });
    }

});

