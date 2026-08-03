document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const productCards = document.querySelectorAll(".product-card");

    function filterProducts() {

        const searchText = searchInput.value.trim().toLowerCase();

        productCards.forEach(function (card) {

            const productText = card.textContent.toLowerCase();

            if (productText.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });
    }

    // Search while typing
    searchInput.addEventListener("input", filterProducts);

    // Search when button is clicked
    searchButton.addEventListener("click", filterProducts);

    // Search when Enter key is pressed
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            filterProducts();
        }
    });

});
