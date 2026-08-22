export default function handler(req, res) {

    // Allow requests from P3S Smart Store
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const { asin } = req.query;

    if (!asin) {
        return res.status(400).json({
            success: false,
            message: "ASIN is required"
        });
    }

    return res.status(200).json({
        success: true,
        asin: asin,
        currentPrice: null,
        lowestPrice: null,
        highestPrice: null,
        lastUpdated: new Date().toISOString(),
        message: "P3S Price API is working"
    });
}
