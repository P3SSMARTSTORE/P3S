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

            if (!searchInput) return;

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

        currentSlide =
            (index + slides.length) % slides.length;

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

    const wishlistCount =
        document.getElementById("wishlistCount");

    const wishlistButtons =
        document.querySelectorAll(".wishlist");

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
       SHOW WISHLIST PRODUCTS
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
                                clonedCard.querySelector(".wishlist");

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
       CART SYSTEM
    ========================== */

    const cartCount =
        document.getElementById("cartCount");

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    /* पुराने Cart Data को सही Format में लाना */

    function normalizeCart() {

        const mergedCart = [];

        cart.forEach(function (item) {

            const productId =
                item.id || item.name;

            const quantity =
                Number(item.qty) > 0
                    ? Number(item.qty)
                    : 1;

            const existingItem =
                mergedCart.find(function (savedItem) {

                    return savedItem.id === productId;
                });

            if (existingItem) {

                existingItem.qty += quantity;

            } else {

                mergedCart.push({

                    id: productId,

                    name:
                        item.name || "Product",

                    price:
                        Number(item.price) || 0,

                    image:
                        item.image || "",

                    link:
                        item.link || "#",

                    qty: quantity
                });
            }
        });

        cart = mergedCart;

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }


    /* ==========================
       HEADER CART COUNT
    ========================== */

    function updateCartCount() {

        let totalQuantity = 0;

        cart.forEach(function (item) {

            totalQuantity +=
                Number(item.qty) || 1;
        });

        if (cartCount) {

            cartCount.textContent =
                totalQuantity;
        }
    }


    normalizeCart();

    updateCartCount();


    /* ==========================
       ADD TO CART
    ========================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".add-cart-btn"
                );

            if (!button) return;


            const productCard =
                button.closest(
                    ".product-card"
                );

            if (!productCard) return;


            const productId =
                productCard.dataset.productId ||
                productCard.dataset.name;


            const existingItem =
                cart.find(function (item) {

                    return item.id === productId;
                });


            /* Same Product पहले से Cart में है */

            if (existingItem) {

                existingItem.qty =
                    (Number(existingItem.qty) || 1)
                    + 1;

            } else {

                /* नया Product */

                const product = {

                    id: productId,

                    name:
                        productCard.dataset.name ||
                        "Product",

                    price:
                        Number(
                            productCard.dataset.price
                        ) || 0,

                    image:
                        productCard.dataset.image ||
                        "",

                    link:
                        productCard.dataset.link ||
                        "#",

                    qty: 1
                };


                cart.push(product);
            }


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
        document.getElementById(
            "cartLink"
        );

    const cartDrawer =
        document.getElementById(
            "cartDrawer"
        );

    const closeCart =
        document.getElementById(
            "closeCart"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );


    /* ==========================
       RENDER CART
    ========================== */

    function renderCart() {

        if (!cartItems || !cartTotal) {
            return;
        }


        cartItems.innerHTML = "";


        /* Empty Cart */

        if (cart.length === 0) {

            cartItems.innerHTML =
                '<p class="cart-empty">' +
                'Your cart is empty.' +
                '</p>';

            cartTotal.textContent = "0";

            return;
        }


        let total = 0;


        cart.forEach(
            function (item, index) {

                const quantity =
                    Number(item.qty) || 1;

                const price =
                    Number(item.price) || 0;


                /* Price × Quantity */

                total +=
                    price * quantity;


                const cartItem =
                    document.createElement(
                        "div"
                    );


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ₹${price.toLocaleString(
                                "en-IN"
                            )}
                        </p>


                        <div class="qty-box">

                            <button
                                type="button"
                                class="qty-minus"
                                data-index="${index}">
                                −
                            </button>


                            <span class="qty">
                                ${quantity}
                            </span>


                            <button
                                type="button"
                                class="qty-plus"
                                data-index="${index}">
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="remove-cart-item"
                        data-index="${index}"
                        aria-label="Remove product">
                        ✖
                    </button>
                `;


                cartItems.appendChild(
                    cartItem
                );
            }
        );


        cartTotal.textContent =
            total.toLocaleString(
                "en-IN"
            );
    }


    /* ==========================
       OPEN CART
    ========================== */

    if (cartLink && cartDrawer) {

        cartLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                renderCart();

                cartDrawer.classList.add(
                    "open"
                );
            }
        );
    }


    /* ==========================
       CLOSE CART
    ========================== */

    if (closeCart && cartDrawer) {

        closeCart.addEventListener(
            "click",
            function () {

                cartDrawer.classList.remove(
                    "open"
                );
            }
        );
    }
        /* ==========================
       REMOVE CART PRODUCT
    ========================== */

    document.addEventListener(
        "click",
        function (event) {

            const removeButton =
                event.target.closest(
                    ".remove-cart-item"
                );

            if (!removeButton) return;

            const index =
                Number(
                    removeButton.dataset.index
                );

            if (
                !Number.isInteger(index) ||
                !cart[index]
            ) {
                return;
            }

            /* Product Remove */

            cart.splice(index, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            /* Header Count Update */

            updateCartCount();

            /* Cart फिर से दिखाएँ */

            renderCart();
        }
    );


    /* ==========================
       QUANTITY + / -
    ========================== */

    document.addEventListener(
        "click",
        function (event) {

            const plusButton =
                event.target.closest(
                    ".qty-plus"
                );

            const minusButton =
                event.target.closest(
                    ".qty-minus"
                );


            /* ==================
               PLUS +
            ================== */

            if (plusButton) {

                const index =
                    Number(
                        plusButton.dataset.index
                    );

                if (
                    !Number.isInteger(index) ||
                    !cart[index]
                ) {
                    return;
                }


                cart[index].qty =
                    (Number(cart[index].qty) || 1)
                    + 1;


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                /* Cart Header Number बदलेगा */

                updateCartCount();


                /* Quantity और Total बदलेगा */

                renderCart();

                return;
            }


            /* ==================
               MINUS -
            ================== */

            if (minusButton) {

                const index =
                    Number(
                        minusButton.dataset.index
                    );

                if (
                    !Number.isInteger(index) ||
                    !cart[index]
                ) {
                    return;
                }


                const currentQuantity =
                    Number(
                        cart[index].qty
                    ) || 1;


                if (currentQuantity > 1) {

                    cart[index].qty =
                        currentQuantity - 1;

                } else {

                    /* Quantity 1 पर - दबाने पर
                       Product Cart से हट जाएगा */

                    cart.splice(index, 1);
                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                updateCartCount();

                renderCart();
            }
        }
    );


    /* ==========================
       BUY ON AMAZON
    ========================== */

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;
                }


                /*
                   अभी पहला Cart Product
                   Amazon में खुलेगा.
                */

                const amazonLink =
                    cart[0].link;


                if (
                    amazonLink &&
                    amazonLink !== "#"
                ) {

                    window.open(
                        amazonLink,
                        "_blank"
                    );
                }
            }
        );
    }


    /* ==========================
       INITIAL CART RENDER
    ========================== */

    updateCartCount();


}); // DOMContentLoaded END
