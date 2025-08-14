
import { createSale, createSaleItem, getSales, getShopSales, getShopsSales } from "@/controllers/sales";
import express from "express";

const saleRouter = express.Router();

/**
 * @swagger
 * /api/v1/sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [sales]
 *     description: Creates a new sale in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Sale'
 */

saleRouter.post("/sales", createSale);

/**
 * @swagger
 * /api/v1/sales/item:
 *   post:
 *     summary: Create a new sale item
 *     tags: [sales]
 *     description: Creates a new sale item in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Sale'
 */

saleRouter.post("/sales/item", createSaleItem);

/**
 * @swagger
 * /api/v1/sales:
 *   get:
 *     summary: Retrieve a list of sales
 *     tags: [sales]
 *     description: Retrieve a list of sales from the database.
 *     responses:
 *       200:
 *         description: A list of sales.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */

saleRouter.get("/sales", getSales);

/**
 * @swagger
 * /api/v1/sales/shop/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [sales]
 *     description: Retrieve a single sale by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single sales.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found.
 */

saleRouter.get("/sales/shop/:shopId", getShopSales);

/**
 * @swagger
 * /api/v1/sales/all-shops/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [sales]
 *     description: Retrieve a single sale by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single sales.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found.
 */

saleRouter.get("/sales/all-shops", getShopsSales);
// saleRouter.get("/sales/:id", getSingleBrand);
// saleRouter.put("/sales/:id", updateBrandById);
// saleRouter.delete("/sales/:id", deleteBrandById);

export default saleRouter;