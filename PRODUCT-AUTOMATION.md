# P3S Product Catalog Automation

## What this update does
- Loads additional products from the root `products.json` file.
- Renders them into the existing Featured Products grid using the existing P3S card design.
- Existing static products, search, category filtering, and product-detail navigation remain in place.
- Product data is validated before rendering. Affiliate links must be valid HTTP(S) URLs.

## Add a product
Edit `products.json` and add an object inside the `products` array:

```json
{
  "id": "unique-product-id",
  "name": "Product name",
  "category": "electronics",
  "keywords": "electronics gadget useful search terms",
  "price": 1499,
  "oldPrice": 1999,
  "image": "images/products/product-image.jpg",
  "affiliateUrl": "https://example.com/your-approved-affiliate-link",
  "platform": "Amazon",
  "badge": "25% OFF",
  "rating": "4.5",
  "discount": "Save ₹500",
  "specs": ["Feature one", "Feature two"],
  "active": true
}
```

- `id` must be unique.
- `image` can be a repository-relative path or an HTTPS image URL.
- `affiliateUrl` must be your own approved affiliate URL.
- `category` should use the existing category names (for example `mobiles`, `electronics`, `home-kitchen`, `fashion`, `accessories`).
- Set `active` to `false` to hide a product without deleting its data.
- Keep JSON valid: use double quotes and commas between objects.

## Important API limitation
This is catalog automation (automatic loading/rendering from a managed JSON feed), not automatic marketplace discovery or price scraping. Amazon/Flipkart products cannot be safely imported by scraping public product pages. Fully automatic product discovery, images, prices, and stock require the relevant marketplace's currently approved API/feed access and credentials. Never put API secrets in this public GitHub repository or browser JavaScript.

## Deployment
Commit `products.json`, `js/product-loader.js`, `js/script.js`, and `index.html` to the repository's publishing branch. GitHub Pages will serve the JSON and scripts as static files.
