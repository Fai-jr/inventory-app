
import { createProduct, deleteProductById, getProducts, getSingleProduct, updateProductById } from "@/controllers/products";
import express from "express";

const productRouter = express.Router();


/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [products]
 *     description: Creates a new product in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Product'
 */

productRouter.post("/products", createProduct);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [products]
 *     description: Retrieve a list of products from the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.get("/products", getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [products]
 *     description: Retrieve a single product by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */

productRouter.get("/products/:id", getSingleProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [products]
 *     description: Update a single product by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a product brand.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */

productRouter.put("/products/:id", updateProductById);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: delete a product
 *     tags: [products]
 *     description: delete a product from the database.
 *     responses:
 *       200:
 *         description: delete a product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.delete("/products/:id", deleteProductById);

export default productRouter;