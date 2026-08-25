import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://p3ssmartstore.github.io"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

    if (!asin) {
        return res.status(400).json({
            success: false,
            message: "ASIN is required"
        });
    }

    if (!process.env.DATABASE_URL) {
        return res.status(500).json({
            success: false,
            message: "DATABASE_URL is not configured"
        });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);

        const history = await sql`
            SELECT price, checked_at
            FROM price_history
            WHERE asin = ${asin}
            ORDER BY checked_at ASC
        `;

        if (history.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No price history found"
            });
        }

        const prices = history.map(row => Number(row.price));

        return res.status(200).json({
            success: true,
            asin: asin,
            currentPrice: prices[prices.length - 1],
            lowestPrice: Math.min(...prices),
            highestPrice: Math.max(...prices),
            history: history
        });

    } catch (error) {
        console.error("History API Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Unable to load price history"
        });
    }
}
