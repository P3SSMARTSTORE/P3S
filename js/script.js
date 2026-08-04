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
let currentSlide = 0;

if (slides.length > 1) {
    setInterval(function () {
        slides[currentSlide].classList.remove("active");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");
    }, 3000);
}
});

