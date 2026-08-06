document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearSearch = document.getElementById("clearSearch");
    const productCards = document.querySelectorAll(".product-card");

    const hero = document.querySelector(".hero");
    const categories = document.querySelector(".categories");
    const featured = document.getElementById("products");
    const deals = document.getElementById("deals");
    const bestSellers = document.getElementById("best-sellers");
    const noResults = document.getElementById("noResults");

    if (!searchInput || !searchButton || !noResults) {
        console.error("Required search elements not found.");
        return;
    }

    function filterProducts() {
        const searchText = searchInput.value.trim().toLowerCase();
        let found = false;

        productCards.forEach(function (card) {
            const productText = card.textContent.toLowerCase();

            if (productText.includes(searchText)) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (searchText === "") {
            if (hero) hero.style.display = "";
            if (categories) categories.style.display = "";
            if (featured) featured.style.display = "";
            if (deals) deals.style.display = "";
            if (bestSellers) bestSellers.style.display = "";

            noResults.style.display = "none";
        } else {
            if (hero) hero.style.display = "none";
            if (categories) categories.style.display = "none";
            if (featured) featured.style.display = found ? "" : "none";
            if (deals) deals.style.display = found ? "" : "none";
            if (bestSellers) bestSellers.style.display = found ? "" : "none";

            noResults.style.display = found ? "none" : "block";
        }
    }

    searchInput.addEventListener("input", filterProducts);
    searchButton.addEventListener("click", filterProducts);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            filterProducts();
        }
    });

    if (clearSearch) {
        clearSearch.addEventListener("click", function () {
            searchInput.value = "";
            filterProducts();
            searchInput.focus();
        });
    }
    const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;
let sliderTimer;

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}

function startSlider() {

    clearInterval(sliderTimer);

    sliderTimer = setInterval(function () {
        showSlide(currentSlide + 1);
    }, 3000);
}

if (nextBtn) {
    nextBtn.addEventListener("click", function () {
        showSlide(currentSlide + 1);
        startSlider();
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", function () {
        showSlide(currentSlide - 1);
        startSlider();
    });
}

dots.forEach(function(dot, index){
    dot.addEventListener("click", function(){
        showSlide(index);
        startSlider();
    });
});

if (slides.length > 0) {
    showSlide(0);
    startSlider();
}

/* ==========================
   WISHLIST COUNTER
========================== */

const wishlistCount = document.getElementById("wishlistCount");
const wishlistButtons = document.querySelectorAll(".wishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
}

wishlistButtons.forEach(function (button, index) {

    if (wishlist.includes(index)) {
        button.classList.add("active");
    }

    button.addEventListener("click", function () {

        if (wishlist.includes(index)) {
            wishlist = wishlist.filter(function (item) {
                return item !== index;
            });

            button.classList.remove("active");
        } else {
            wishlist.push(index);
            button.classList.add("active");
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        if (wishlistCount) {
            wishlistCount.textContent = wishlist.length;
        }
    });
});

});

