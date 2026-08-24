import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
export default async function handler(req, res) {

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

    try {

        const rows = await sql`
            INSERT INTO price_alerts
                (asin, target_price, product_url)
            VALUES
                (
                    ${asin},
                    ${Number(targetPrice)},
                    ${productUrl || ""}
                )
            RETURNING
                id,
                asin,
                target_price,
                product_url,
                active,
                created_at
        `;

        return res.status(200).json({
            success: true,
            persisted: true,
            alert: rows[0],
            message: "Price alert saved permanently."
        });

  } catch (error) {

    console.error("Database Error:", error);

    if (error.code === "23505") {
        return res.status(409).json({
            success: false,
            duplicate: true,
            message: "This price alert is already active."
        });
    }

    return res.status(500).json({
        success: false,
        message: "Unable to save price alert in database."
    });
}
