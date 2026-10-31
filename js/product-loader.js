/* P3S Smart Store - JSON product catalog loader
   Add products to /products.json. This loader does not scrape marketplaces. */
(function () {
    "use strict";

    function safeText(value, fallback) {
        return String(value == null ? fallback || "" : value).trim();
    }

    function safeImage(value) {
        var image = safeText(value);
        if (!image) return "";
        if (/^https:\/\/ /i.test(image)) return "";
        if (/^https?:\/\//i.test(image)) return image;
        if (/^(javascript:|data:|\/\/)/i.test(image)) return "";
        return image.replace(/^\/+/, "");
    }

    function safeAffiliateUrl(value) {
        var url = safeText(value);
        try {
            var parsed = new URL(url);
            return (parsed.protocol === "https:" || parsed.protocol === "http:") ? parsed.href : "";
        } catch (error) {
            return "";
        }
    }

    function makeCard(product) {
        var name = safeText(product.name);
        var image = safeImage(product.image);
        var affiliateUrl = safeAffiliateUrl(product.affiliateUrl);
        var price = Number(product.price);
        if (!name || !affiliateUrl || !Number.isFinite(price) || price < 0) return null;

        var card = document.createElement("div");
        card.className = "product-card";
        card.dataset.productId = safeText(product.id, name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
        card.dataset.name = name;
        card.dataset.category = safeText(product.category, "deals").toLowerCase();
        card.dataset.keywords = safeText(product.keywords);
        card.dataset.price = String(price);
        card.dataset.image = image;
        card.dataset.link = affiliateUrl;

        var badge = safeText(product.badge);
        if (badge) {
            var badgeEl = document.createElement("span");
            badgeEl.className = "badge";
            badgeEl.textContent = badge;
            card.appendChild(badgeEl);
        }

        var wishlist = document.createElement("div");
        wishlist.className = "wishlist";
        wishlist.textContent = "❤️";
        card.appendChild(wishlist);

        if (image) {
            var img = document.createElement("img");
            img.src = image;
            img.alt = name;
            img.loading = "lazy";
            img.onerror = function () { img.style.display = "none"; };
            card.appendChild(img);
        } else {
            var placeholder = document.createElement("div");
            placeholder.className = "product-image-placeholder";
            placeholder.textContent = "P3S Smart Store";
            placeholder.setAttribute("aria-label", "Product image not supplied");
            placeholder.style.cssText = "min-height:180px;display:flex;align-items:center;justify-content:center;background:#eef4ff;color:#2456a6;font-weight:600;";
            card.appendChild(placeholder);
        }

        var info = document.createElement("div");
        info.className = "product-info";

        var title = document.createElement("h3");
        title.className = "product-title";
        title.textContent = name;
        info.appendChild(title);

        if (safeText(product.rating)) {
            var rating = document.createElement("div");
            rating.className = "rating";
            rating.textContent = "⭐ " + safeText(product.rating);
            info.appendChild(rating);
        }

        var priceEl = document.createElement("p");
        priceEl.className = "price";
        priceEl.appendChild(document.createTextNode("₹" + price.toLocaleString("en-IN")));
        if (Number(product.oldPrice) > price) {
            var oldPrice = document.createElement("span");
            oldPrice.className = "old-price";
            oldPrice.textContent = "₹" + Number(product.oldPrice).toLocaleString("en-IN");
            priceEl.appendChild(oldPrice);
        }
        info.appendChild(priceEl);

        if (safeText(product.discount)) {
            var discount = document.createElement("p");
            discount.className = "discount";
            discount.textContent = safeText(product.discount);
            info.appendChild(discount);
        }

        if (Array.isArray(product.specs) && product.specs.length) {
            var specs = document.createElement("div");
            specs.className = "product-specs";
            product.specs.slice(0, 4).forEach(function (item) {
                var line = document.createElement("p");
                line.textContent = safeText(item);
                specs.appendChild(line);
            });
            info.appendChild(specs);
        }

        var buy = document.createElement("a");
        buy.href = affiliateUrl;
        buy.target = "_blank";
        buy.rel = "nofollow sponsored noopener";
        buy.className = "buy-btn";
        buy.textContent = "Buy on " + (safeText(product.platform, "Store"));
        info.appendChild(buy);

        card.appendChild(info);
        return card;
    }

    async function loadProducts() {
        var grid = document.querySelector("#products .product-grid");
        if (!grid) return;

        try {
            var response = await fetch("products.json", { cache: "no-store" });
            if (!response.ok) throw new Error("Catalog request failed: " + response.status);
            var catalog = await response.json();
            var products = Array.isArray(catalog) ? catalog : catalog.products;
            if (!Array.isArray(products)) throw new Error("products.json must contain a products array");

            var existingIds = new Set(
                Array.from(document.querySelectorAll(".product-card"))
                    .map(function (card) { return card.dataset.productId; })
            );

            products.forEach(function (product) {
                if (!product || (product.active === false)) return;
                var id = safeText(product.id, safeText(product.name).toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                if (!id || existingIds.has(id)) return;
                var card = makeCard(product);
                if (card) {
                    grid.appendChild(card);
                    existingIds.add(id);
                }
            });
        } catch (error) {
            console.warn("P3S product catalog could not be loaded:", error);
        }
    }

    window.P3SLoadProducts = loadProducts;
})();