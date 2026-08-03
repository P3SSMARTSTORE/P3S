document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const productCards = document.querySelectorAll(".product-card");
const hero = document.querySelector(".hero");
const categories = document.querySelector(".categories");
const featured = document.getElementById("products");

    if (!searchInput || !searchButton) {
        console.error("Search input or button not found.");
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

const noResults = document.getElementById("noResults");

if (found) {
    noResults.style.display = "none";
} else {
    noResults.style.display = "block";
}
    }

    searchInput.addEventListener("input", filterProducts);
    searchButton.addEventListener("click", filterProducts);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            filterProducts();
            if (searchText === "") {
    hero.style.display = "";
    categories.style.display = "";
    featured.style.display = "";
    noResults.style.display = "none";
} else {
    hero.style.display = "none";
    categories.style.display = "none";
    featured.style.display = "";

    if (found) {
        noResults.style.display = "none";
    } else {
        noResults.style.display = "block";
    }
}
        }
    });
});
