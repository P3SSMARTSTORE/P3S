import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://p3ssmartstore.github.io"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Only POST requests are allowed"
        });
    }

    const { asin, price } = req.body || {};

    if (!asin) {
        return res.status(400).json({
            success: false,
            message: "ASIN is required"
        });
    }

    if (!price || Number(price) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid price is required"
        });
    }

    try {

        const sql = neon(process.env.DATABASE_URL);

        const rows = await sql`
            INSERT INTO price_history
                (asin, price)
            VALUES
                (${asin}, ${Number(price)})
            RETURNING
                id,
                asin,
                price,
                checked_at
        `;

        return res.status(200).json({
            success: true,
            saved: true,
            data: rows[0]
        });

    } catch (error) {

        console.error("Record Price Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Unable to save price."
        });
    }
}
