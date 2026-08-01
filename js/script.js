document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const productCards = document.querySelectorAll(".product-card");

    function searchProducts() {
        const searchValue = searchInput.value.trim().toLowerCase();

        productCards.forEach(function (card) {
            const productText = card.textContent.toLowerCase();

            if (productText.includes(searchValue)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", searchProducts);
    searchButton.addEventListener("click", searchProducts);

});
