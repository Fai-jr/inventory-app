import { createExpense, deleteExpenseById, getExpenses, getSingleExpense, updateExpenseById } from "@/controllers/expenses";
import express from "express";

const expenseRouter = express.Router();

/**
 * @swagger
 * /api/v1/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [expenses]
 *     description: Creates a new expense in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Expense'
 */

expenseRouter.post("/expenses", createExpense);

/**
 * @swagger
 * /api/v1/expenses:
 *   get:
 *     summary: Retrieve a list of expense
 *     tags: [expenses]
 *     description: Retrieve a list of expense from the database.
 *     responses:
 *       200:
 *         description: A list of expense.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.get("/expenses", getExpenses);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [expenses]
 *     description: Retrieve a single expenses by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found.
 */

expenseRouter.get("/expenses/:id", getSingleExpense);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [expenses]
 *     description: Update a single expense by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a single expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found.
 */

expenseRouter.put("/expenses/:id", updateExpenseById);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   delete:
 *     summary: delete a expense-cat
 *     tags: [expenses]
 *     description: delete an expense from the database.
 *     responses:
 *       200:
 *         description: delete an expense.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.delete("/expenses/:id", deleteExpenseById);

export default expenseRouter;