export default function handler(req, res) {

    // Allow requests from P3S Smart Store
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Only POST requests are allowed"
        });
    }

    const {
        asin,
        targetPrice,
        productUrl
    } = req.body || {};

    if (!asin) {
        return res.status(400).json({
            success: false,
            message: "ASIN is required"
        });
    }

    if (!targetPrice || Number(targetPrice) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid target price is required"
        });
    }

    return res.status(200).json({
        success: true,
        alert: {
            asin: asin,
            targetPrice: Number(targetPrice),
            productUrl: productUrl || "",
            createdAt: new Date().toISOString()
        },
        persisted: false,
        message:
            "P3S Price Alert API is working. Database storage is not connected yet."
    });
}
