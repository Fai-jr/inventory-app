import { createExpenseCategory, deleteExpenseCategoryById, getExpenseCategories, getSingleExpenseCategory, updateExpenseCategoryById } from "@/controllers/expense-categories";
import express from "express";

const ExpenseCategoryRouter = express.Router();

/**
 * @swagger
 * /api/v1/expense-categories:
 *   post:
 *     summary: Create a new expense-cat
 *     tags: [expense-categories]
 *     description: Creates a new expense-cat in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/ExpenseCategory'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ExpenseCategory'
 */

ExpenseCategoryRouter.post("/expense-categories", createExpenseCategory);

/**
 * @swagger
 * /api/v1/expense-categories:
 *   get:
 *     summary: Retrieve a list of expense-cat
 *     tags: [expense-categories]
 *     description: Retrieve a list of expense-cat from the database.
 *     responses:
 *       200:
 *         description: A list of expense-cat.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseCategory'
 */

ExpenseCategoryRouter.get("/expense-categories", getExpenseCategories);

/**
 * @swagger
 * /api/v1/expense-categories/{id}:
 *   get:
 *     summary: Get an expense-cat by ID
 *     tags: [expense-categories]
 *     description: Retrieve a single expense-cat by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single expense-cat.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: ExpenseCategory not found.
 */

ExpenseCategoryRouter.get("/expense-categories/:id", getSingleExpenseCategory);

/**
 * @swagger
 * /api/v1/expense-categories/{id}:
 *   put:
 *     summary: Update an expense-cat by ID
 *     tags: [expense-categories]
 *     description: Update a single expense-cat by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a single expense-cat.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: ExpenseCategory not found.
 */

ExpenseCategoryRouter.put("/expense-categories/:id", updateExpenseCategoryById);

/**
 * @swagger
 * /api/v1/expense-categories/{id}:
 *   delete:
 *     summary: delete a expense-cat
 *     tags: [expense-categories]
 *     description: delete an expense-cat from the database.
 *     responses:
 *       200:
 *         description: delete an expense-cat.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseCategory'
 */

ExpenseCategoryRouter.delete("/expense-categories/:id", deleteExpenseCategoryById);

export default ExpenseCategoryRouter;