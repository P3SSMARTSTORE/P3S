document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       SEARCH
    ========================== */

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

    function filterProducts() {

        if (!searchInput || !noResults) return;

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

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                filterProducts();
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", filterProducts);
    }

    if (clearSearch) {
        clearSearch.addEventListener("click", function () {
            searchInput.value = "";
            filterProducts();
            searchInput.focus();
        });
    }


    /* ==========================
       HERO SLIDER
    ========================== */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {

        if (slides.length === 0) return;

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function startSlider() {

        clearInterval(sliderTimer);

        if (slides.length > 1) {
            sliderTimer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 3000);
        }
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

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            startSlider();
        });
    });

    if (slides.length > 0) {
        showSlide(0);
        startSlider();
    }


    /* ==========================
       WISHLIST
    ========================== */

    const wishlistCount = document.getElementById("wishlistCount");
    const wishlistButtons = document.querySelectorAll(".wishlist");

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    function updateWishlistCount() {
        if (wishlistCount) {
            wishlistCount.textContent = wishlist.length;
        }
    }

    updateWishlistCount();

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

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

            updateWishlistCount();
        });
    });


    /* ==========================
       SHOW WISHLIST
    ========================== */

    const wishlistLink =
        document.getElementById("wishlistLink");

    const wishlistSection =
        document.getElementById("wishlist-products");

    const wishlistContainer =
        document.getElementById("wishlistContainer");

    if (
        wishlistLink &&
        wishlistSection &&
        wishlistContainer
    ) {

        wishlistLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                wishlistContainer.innerHTML = "";

                const savedWishlist =
                    JSON.parse(
                        localStorage.getItem("wishlist")
                    ) || [];

                productCards.forEach(
                    function (card, index) {

                        if (savedWishlist.includes(index)) {

                            const clonedCard =
                                card.cloneNode(true);

                            const heart =
                                clonedCard.querySelector(
                                    ".wishlist"
                                );

                            if (heart) {
                                heart.remove();
                            }

                            wishlistContainer.appendChild(
                                clonedCard
                            );
                        }
                    }
                );

                if (hero) hero.style.display = "none";
                if (categories) categories.style.display = "none";
                if (featured) featured.style.display = "none";
                if (deals) deals.style.display = "none";
                if (bestSellers) bestSellers.style.display = "none";
                if (noResults) noResults.style.display = "none";

                wishlistSection.style.display = "block";

                if (savedWishlist.length === 0) {

                    wishlistContainer.innerHTML =
                        "<p style='text-align:center;font-size:20px;'>❤️ Your Wishlist is Empty</p>";
                }

                wishlistSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        );
    }


    /* ==========================
       CART
    ========================== */

    const cartCount =
        document.getElementById("cartCount");

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {

        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    updateCartCount();


    /* Add to Cart */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".add-cart-btn");

            if (!button) return;

            const productCard =
                button.closest(".product-card");

            if (!productCard) return;

            const product = {
                id: productCard.dataset.productId,
                name: productCard.dataset.name,
                price: productCard.dataset.price,
                image: productCard.dataset.image,
                link: productCard.dataset.link
            };

            cart.push(product);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            button.textContent =
                "✅ Added to Cart";

            setTimeout(function () {
                button.textContent =
                    "🛒 Add to Cart";
            }, 1500);
        }
    );


    /* ==========================
       CART DRAWER
    ========================== */

    const cartLink =
        document.getElementById("cartLink");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const closeCart =
        document.getElementById("closeCart");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkoutBtn =
        document.getElementById("checkoutBtn");


    function renderCart() {

        if (!cartItems || !cartTotal) return;

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML =
                '<p class="cart-empty">Your cart is empty.</p>';

            cartTotal.textContent = "0";

            return;
        }

        let total = 0;

        cart.forEach(function (item, index) {

            total += Number(item.price) || 0;

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img src="${item.image}"
                     alt="${item.name}">

                <div>
    <h4>${item.name}</h4>

    <p>₹${Number(item.price).toLocaleString("en-IN")}</p>

    <div class="qty-box">

        <button class="qty-minus"
                data-index="${index}">
            −
        </button>

        <span class="qty">
            ${item.qty || 1}
        </span>

        <button class="qty-plus"
                data-index="${index}">
            +
        </button>

    </div>

</div>

                <button
                    type="button"
                    class="remove-cart-item"
                    data-index="${index}">
                    ✖
                </button>
            `;

            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent =
            total.toLocaleString("en-IN");
    }


    /* Open Cart */

    if (cartLink && cartDrawer) {

        cartLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                renderCart();

                cartDrawer.classList.add("open");
            }
        );
    }


    /* Close Cart */

    if (closeCart && cartDrawer) {

        closeCart.addEventListener(
            "click",
            function () {

                cartDrawer.classList.remove("open");
            }
        );
    }


    /* Remove Cart Product */

    document.addEventListener(
        "click",
        function (event) {

            const removeButton =
                event.target.closest(
                    ".remove-cart-item"
                );

            if (!removeButton) return;

            const index =
                Number(removeButton.dataset.index);

            if (!Number.isInteger(index)) return;

            cart.splice(index, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();
            renderCart();
        }
    );


    /* Checkout */

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert("Your cart is empty.");
                    return;
                }

                window.open(
                    cart[0].link,
                    "_blank"
                );
            }
        );
    }

});
