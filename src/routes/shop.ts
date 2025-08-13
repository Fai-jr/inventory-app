import { createShop, getShopAttendants, getShops, getSingleShop } from "@/controllers/shops";
import express from "express";

const shopRouter = express.Router()


/**
 * @swagger
 * /api/v1/shops:
 *   post:
 *     summary: Create a new shop
 *     description: Creates a new shop in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Shop'
 */

shopRouter.post("/shops", createShop)
shopRouter.get("/shops", getShops)
shopRouter.get("/shops/:id", getSingleShop)
shopRouter.get("/attendants/shop/:id", getShopAttendants)

export default shopRouter