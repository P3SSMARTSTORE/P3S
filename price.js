import { neon } from "@neondatabase/serverless";

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

        const rows = await sql`
            SELECT
                (
                    SELECT price
                    FROM price_history
                    WHERE asin = ${asin}
                    ORDER BY checked_at DESC
                    LIMIT 1
                ) AS current_price,

                MIN(price) AS lowest_price,
                MAX(price) AS highest_price,
                MAX(checked_at) AS last_updated

            FROM price_history
            WHERE asin = ${asin}
        `;

        const data = rows[0];

        if (!data || data.current_price === null) {
            return res.status(404).json({
                success: false,
                message: "No price data found for this product"
            });
        }

        return res.status(200).json({
            success: true,
            asin: asin,
            currentPrice: Number(data.current_price),
            lowestPrice: Number(data.lowest_price),
            highestPrice: Number(data.highest_price),
            lastUpdated: data.last_updated
        });

    } catch (error) {

        console.error("Price API Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load price data"
        });
    }
}
