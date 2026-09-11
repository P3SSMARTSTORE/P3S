// Fetches a best-effort live price for a given ASIN by reading the
// public Amazon product page. This is a plain fetch with a normal
// browser User-Agent — no proxy rotation, no CAPTCHA bypass, no
// request-volume tricks. Amazon can still block or rate-limit this,
// and its page markup can change without notice, so treat failures
// as expected and always fail gracefully.

export default async function handler(req, res) {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://p3ssmartstore.github.io"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Only GET requests are allowed"
        });
    }

    const { asin } = req.query;

    if (!asin || !/^[A-Z0-9]{10}$/i.test(asin)) {
        return res.status(400).json({
            success: false,
            message: "A valid 10-character ASIN is required"
        });
    }

    const productUrl = `https://www.amazon.in/dp/${asin.toUpperCase()}`;

    try {

        const response = await fetch(productUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                    "AppleWebKit/537.36 (KHTML, like Gecko) " +
                    "Chrome/124.0 Safari/537.36",
                "Accept-Language": "en-IN,en;q=0.9"
            }
        });

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                message:
                    "Amazon page could not be fetched (status " +
                    response.status + "). It may be rate-limiting this request."
            });
        }

        const html = await response.text();

        const price = extractPrice(html);
        const title = extractTitle(html);

        if (!price) {
            return res.status(404).json({
                success: false,
                message:
                    "Could not read a price from this page right now. " +
                    "Amazon may have blocked the request or changed its layout."
            });
        }

        return res.status(200).json({
            success: true,
            asin: asin.toUpperCase(),
            price: price,
            title: title,
            source: productUrl,
            fetchedAt: new Date().toISOString()
        });

    } catch (error) {

        console.error("Live Price Fetch Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch live price right now."
        });
    }
}

function extractPrice(html) {

    // Amazon renders price in a few different places depending on
    // page/experiment. Try each known pattern in order.
    const patterns = [
        /"priceAmount"\s*:\s*([\d.]+)/,
        /class="a-price-whole">\s*([\d,]+)/,
        /id="priceblock_dealprice"[^>]*>[^\d]*([\d,]+)/,
        /id="priceblock_ourprice"[^>]*>[^\d]*([\d,]+)/,
        /"asinPrice"\s*:\s*"([\d.]+)"/
    ];

    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
            const value = parseFloat(match[1].replace(/,/g, ""));
            if (!isNaN(value) && value > 0) {
                return value;
            }
        }
    }

    return null;
}

function extractTitle(html) {
    const match = html.match(/id="productTitle"[^>]*>\s*([^<]+?)\s*</);
    return match ? match[1].trim() : null;
}
