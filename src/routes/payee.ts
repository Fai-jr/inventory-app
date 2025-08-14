import { createPayee, deletePayeeById, getPayees, getSinglePayee, updatePayeeById } from "@/controllers/payees";
import express from "express";

const payeeRouter = express.Router();

/**
 * @swagger
 * /api/v1/payees:
 *   post:
 *     summary: Create a new payee
 *     tags: [payees]
 *     description: Creates a new payee in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Payee'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Payee'
 */

payeeRouter.post("/payees", createPayee);

/**
 * @swagger
 * /api/v1/payees:
 *   get:
 *     summary: Retrieve a list of payees
 *     tags: [payees]
 *     description: Retrieve a list of payees from the database.
 *     responses:
 *       200:
 *         description: A list of payees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payee'
 */

payeeRouter.get("/payees", getPayees);

/**
 * @swagger
 * /api/v1/payees/{id}:
 *   get:
 *     summary: Get a payee by ID
 *     tags: [payees]
 *     description: Retrieve a single payee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single payee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       404:
 *         description: Payee not found.
 */

payeeRouter.get("/payees/:id", getSinglePayee);

/**
 * @swagger
 * /api/v1/payees/{id}:
 *   put:
 *     summary: Update a payee by ID
 *     tags: [payees]
 *     description: Update a single payee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a single payee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       404:
 *         description: Payee not found.
 */

payeeRouter.put("/payees/:id", updatePayeeById);

/**
 * @swagger
 * /api/v1/payees/{id}:
 *   delete:
 *     summary: delete a payee
 *     tags: [payees]
 *     description: delete a payee from the database.
 *     responses:
 *       200:
 *         description: delete a payee.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payee'
 */

payeeRouter.delete("/payees/:id", deletePayeeById);

export default payeeRouter;