document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const productCards = document.querySelectorAll(".product-card");

    if (!searchInput) {
        console.error("Search input not found");
        return;
    }

    searchInput.addEventListener("input", function () {
        const searchText = this.value.trim().toLowerCase();

        productCards.forEach(function (card) {
            const productText = card.textContent.toLowerCase();

            card.style.display =
                productText.includes(searchText) ? "" : "none";
        });
    });
});
