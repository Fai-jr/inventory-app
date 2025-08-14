import { createShop, getShopAttendants, getShops, getSingleShop } from "@/controllers/shops";
import express from "express";

const shopRouter = express.Router()


/**
 * @swagger
 * /api/v1/shops:
 *   post:
 *     summary: Create a new shop
 *     tags: [shops]
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

/**
 * @swagger
 * /api/v1/shops:
 *   get:
 *     summary: Retrieve a list of shops
 *     tags: [shops]
 *     description: Retrieve a list of shops from the database.
 *     responses:
 *       200:
 *         description: A list of shops.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 */

shopRouter.get("/shops", getShops)

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   get:
 *     summary: Get a shop by ID
 *     tags: [shops]
 *     description: Retrieve a single shop by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A shop .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found.
 */
shopRouter.get("/shops/:id", getSingleShop)

/**
 * @swagger
 * /api/v1/attendants/shop/{id}:
 *   get:
 *     summary: Get attendants by shop ID
 *     tags: [shops]
 *     description: Retrieve shop attendants by their shop ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A shop attendant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Attendants not found.
 */
shopRouter.get("/attendants/shop/:id", getShopAttendants)

export default shopRouter