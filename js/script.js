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

            const image = card.querySelector("img");

const productText = (
    card.textContent + " " +
    (card.dataset.name || "") + " " +
    (card.dataset.category || "") + " " +
    (card.dataset.keywords || "") + " " +
    (image ? image.alt : "")
).toLowerCase();
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

    if (!found) {
        if (featured) featured.style.display = "none";
        if (deals) deals.style.display = "none";
        if (bestSellers) bestSellers.style.display = "none";

        noResults.style.display = "block";

    } else {
        if (featured) featured.style.display = "";
        if (deals) deals.style.display = "";
        if (bestSellers) bestSellers.style.display = "";

        noResults.style.display = "none";
    }
}    }

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
   CATEGORY FILTER
========================== */

const categoryLinks = document.querySelectorAll(".category-link");
const categoryBack = document.getElementById("categoryBack");
const categoryBackBtn = document.getElementById("categoryBackBtn");
categoryLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const selectedCategory = link.dataset.filter;

        if (!selectedCategory) return;
        if (categoryBack) {
    categoryBack.style.display = "block";
}

        let foundFeatured = false;
        let foundDeals = false;
        let foundBestSellers = false;

        productCards.forEach(function (card) {

            const productCategory =
                (card.dataset.category || "").toLowerCase();

            const isMatch =
                productCategory.includes(selectedCategory);

            card.style.display = isMatch ? "" : "none";

            if (isMatch) {

                if (card.closest("#products")) {
                    foundFeatured = true;
                }

                if (card.closest("#deals")) {
                    foundDeals = true;
                }

                if (card.closest("#best-sellers")) {
                    foundBestSellers = true;
                }
            }
        });

        if (hero) hero.style.display = "none";
        if (categories) categories.style.display = "none";

        if (featured) {
            featured.style.display = foundFeatured ? "" : "none";
        }

        if (deals) {
            deals.style.display = foundDeals ? "" : "none";
        }

        if (bestSellers) {
            bestSellers.style.display = foundBestSellers ? "" : "none";
        }

        if (noResults) {
            noResults.style.display =
                (foundFeatured || foundDeals || foundBestSellers)
                    ? "none"
                    : "block";
        }

        if (categoryBack) {
    categoryBack.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
    });
});
    /* TOP MENU CATEGORY FILTER */

const navCategoryLinks =
    document.querySelectorAll(".nav-category-filter");

navCategoryLinks.forEach(function (navLink) {

    navLink.addEventListener("click", function (event) {

        event.preventDefault();

        const selectedFilter = navLink.dataset.filter;

        const matchingCategory =
            document.querySelector(
                '.category-link[data-filter="' +
                selectedFilter +
                '"]'
            );

        if (matchingCategory) {
            matchingCategory.click();
        }

    });

});
    if (categoryBackBtn) {

    categoryBackBtn.addEventListener("click", function () {

        productCards.forEach(function (card) {
            card.style.display = "";
        });

        if (hero) hero.style.display = "";
        if (categories) categories.style.display = "";
        if (featured) featured.style.display = "";
        if (deals) deals.style.display = "";
        if (bestSellers) bestSellers.style.display = "";
        if (noResults) noResults.style.display = "none";

        if (categoryBack) {
            categoryBack.style.display = "none";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

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
const mobileWishlistLink =
    document.getElementById("mobileWishlistLink");
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
   if (
    mobileWishlistLink &&
    wishlistSection &&
    wishlistContainer
) {
    mobileWishlistLink.addEventListener("click", function (event) {

        event.preventDefault();

        wishlistContainer.innerHTML = "";

        const savedWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        productCards.forEach(function (card, index) {

            if (savedWishlist.includes(index)) {

                const clonedCard = card.cloneNode(true);

                const heart =
                    clonedCard.querySelector(".wishlist");

                if (heart) {
                    heart.remove();
                }

                wishlistContainer.appendChild(clonedCard);
            }
        });

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
    });
}
        /* ==========================
       CART SYSTEM
    ========================== */

    const cartCount =
        document.getElementById("cartCount");
const mobileCartCount = document.getElementById("mobileCartCount");
const mobileCartLink = document.getElementById("mobileCartLink");
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
        totalQuantity += Number(item.qty) || 1;
    });

    // Desktop Cart Count
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    // Mobile Cart Count
    if (mobileCartCount) {
        mobileCartCount.textContent = totalQuantity;
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
if (mobileCartLink && cartDrawer) {

    mobileCartLink.addEventListener(
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
/* ==========================
   MOBILE MENU
========================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector("nav");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
        });
    });
}
/* ==========================
   FOOTER LINKS SCROLL
========================== */

document.querySelectorAll(".footer-links a").forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});
}); // DOMContentLoaded END
/* V2 BACKEND CONFIG */
const P3S_API_BASE = "https://p3s-backend.vercel.app";
function updateV2PriceSummary(data) {
    

    const currentPrice =
        document.getElementById("v2CurrentPrice");

    const lowestPrice =
        document.getElementById("v2LowestPrice");

    const highestPrice =
        document.getElementById("v2HighestPrice");

    const lastUpdated =
        document.getElementById("v2LastUpdated");

    if (currentPrice) {
        currentPrice.textContent =
            data.currentPrice || "—";
    }

    if (lowestPrice) {
        lowestPrice.textContent =
            data.lowestPrice || "—";
    }

    if (highestPrice) {
        highestPrice.textContent =
            data.highestPrice || "—";
    }

    if (lastUpdated) {
        lastUpdated.textContent =
            data.lastUpdated || "—";
    }
}
async function fetchPriceData(asin) {

    if (!P3S_API_BASE) {
        return {
            success: false,
            message: "Live price data source not connected."
        };
    }

    try {

        const response = await fetch(
            `${P3S_API_BASE}/api/price/${asin}`
        );

        if (!response.ok) {
            throw new Error("Price data unavailable");
        }

        const data = await response.json();

        return {
            success: true,
            data: data
        };

    } catch (error) {

        console.error("P3S Price API Error:", error);

        return {
            success: false,
            message: "Unable to load live price data."
        };
    }
}
/* ==========================
   PRICE HISTORY CHECKER
========================== */

const priceHistoryUrl = document.getElementById("priceHistoryUrl");
const checkPriceBtn = document.getElementById("checkPriceBtn");
const v2PriceSummary = document.getElementById("v2PriceSummary");
if (checkPriceBtn && priceHistoryUrl) {

   checkPriceBtn.addEventListener("click", async function () {

        const productUrl = priceHistoryUrl.value.trim();
const asinMatch =
    productUrl.match(/(?:dp\/|gp\/product\/)([A-Z0-9]{10})/i);

if (!asinMatch) {
    alert("Amazon ASIN could not be found.");
    return;
}

const asin = asinMatch[1].toUpperCase();

try {

    const response = await fetch(
        P3S_API_BASE + "/api/alert",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                asin: asin,
                targetPrice: Number(targetPrice),
                productUrl: productUrl
            })
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || "Unable to save price alert"
        );
    }

} catch (error) {

    console.error("P3S Alert API Error:", error);

    alert(
        "Price alert could not be sent to the backend."
    );

    return;
}
        if (productUrl === "") {
            alert("Please paste an Amazon product link.");
            return;
        }

        // Try to find Amazon ASIN / product code
        const asinMatch = productUrl.match(/(?:dp\/|gp\/product\/)([A-Z0-9]{10})/i);

        if (asinMatch) {

            const asin = asinMatch[1].toUpperCase();
            const livePriceResult = await fetchPriceData(asin);
if (livePriceResult.success) {

    updateV2PriceSummary({
        currentPrice: livePriceResult.data.currentPrice || "—",
        lowestPrice: livePriceResult.data.lowestPrice || "—",
        highestPrice: livePriceResult.data.highestPrice || "—",
        lastUpdated: livePriceResult.data.lastUpdated || new Date().toLocaleString("en-IN")
    });

    const v2DataStatus =
        document.getElementById("v2DataStatus");

    if (v2DataStatus) {
        v2DataStatus.textContent = "✅ Live price data connected.";
    }

} else {

    const v2DataStatus =
        document.getElementById("v2DataStatus");

    if (v2DataStatus) {
        v2DataStatus.textContent =
            "🔌 " + livePriceResult.message;
    }
}
          const priceHistoryResult =
    document.getElementById("priceHistoryResult");

if (priceHistoryResult) {

    priceHistoryResult.innerHTML = `
        <div class="price-result-card">

            <h3>✅ Product Found</h3>

            <p>
                <strong>Amazon ASIN:</strong>
                ${asin}
            </p>

            <div class="price-alert-box">

    <input type="number"
           id="targetPrice"
           placeholder="Enter target price ₹">

    <button type="button"
            id="setPriceAlertBtn">
        🔔 Set Price Alert
    </button>

</div>
            <p class="price-status">
                📊 Price history data connection is the next step.
            </p>

        </div>
    `;
    if (v2PriceSummary) {
    v2PriceSummary.style.display = "grid";
}
    const v2LastUpdated =
    document.getElementById("v2LastUpdated");

if (v2LastUpdated) {
    const now = new Date();

    v2LastUpdated.textContent =
        now.toLocaleString("en-IN");
}
const priceChartBox =
    document.getElementById("priceChartBox");

if (priceChartBox) {
    priceChartBox.style.display = "block";
}
    priceHistoryResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

        } else {

            alert(
                "Amazon link detected, but product code could not be found.\n\n" +
                "Please paste the full Amazon product link."
            );
        }

    });

}
/* ==========================
   PRICE DROP ALERT
========================== */

document.addEventListener("click", function (event) {

    if (event.target.id !== "setPriceAlertBtn") return;

    const targetPriceInput =
        document.getElementById("targetPrice");

    const priceHistoryUrl =
        document.getElementById("priceHistoryUrl");

    const targetPrice =
        targetPriceInput.value.trim();

    if (!targetPrice || Number(targetPrice) <= 0) {
        alert("Please enter a valid target price.");
        return;
    }

    const productUrl = priceHistoryUrl.value.trim();

    localStorage.setItem(
        "p3sPriceAlert",
        JSON.stringify({
            productUrl: productUrl,
            targetPrice: Number(targetPrice)
        })
    );

    alert(
        "🔔 Price Alert Saved!\n\n" +
        "Target Price: ₹" + targetPrice +
        "\n\nAutomatic notifications will be available after backend integration."
    );

});
/* ==========================
   SHOW SAVED PRICE ALERT
========================== */

function showSavedPriceAlert() {

    const savedAlertBox =
        document.getElementById("savedAlertBox");

    const savedAlert =
        localStorage.getItem("p3sPriceAlert");

    if (!savedAlertBox || !savedAlert) return;

    try {

        const alertData = JSON.parse(savedAlert);

        savedAlertBox.innerHTML = `
    🔔 <strong>Saved Price Alert:</strong>
    ₹${alertData.targetPrice}

    <button type="button"
            id="removePriceAlertBtn"
            class="remove-alert-btn">
        🗑️ Remove
    </button>
`;

        savedAlertBox.style.display = "block";

    } catch (error) {
        console.log("Saved alert could not be loaded.");
    }
}

showSavedPriceAlert();
/* ==========================
   REMOVE SAVED PRICE ALERT
========================== */

document.addEventListener("click", function (event) {

    if (event.target.id !== "removePriceAlertBtn") return;

    localStorage.removeItem("p3sPriceAlert");

    const savedAlertBox =
        document.getElementById("savedAlertBox");

    if (savedAlertBox) {
        savedAlertBox.innerHTML = "";
        savedAlertBox.style.display = "none";
    }

    alert("Price Alert Removed.");
});
