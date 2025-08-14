import { createCategory, deleteCategoryById, getCategories, getSingleCategory, updateCategoryById } from "@/controllers/categories";
import express from "express";

const categoryRouter = express.Router();

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [categories]
 *     description: Creates a new category in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Category'
 */

categoryRouter.post("/categories", createCategory);

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [categories]
 *     description: Retrieve a list of categories from the database.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

categoryRouter.get("/categories", getCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [categories]
 *     description: Retrieve a single category by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 */

categoryRouter.get("/categories/:id", getSingleCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [categories]
 *     description: Update a single category by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a category brand.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 */

categoryRouter.put("/categories/:id", updateCategoryById);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: delete a category
 *     tags: [categories]
 *     description: delete a category from the database.
 *     responses:
 *       200:
 *         description: delete a category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

categoryRouter.delete("/categories/:id", deleteCategoryById);

export default categoryRouter;