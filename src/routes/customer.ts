import { createCustomer, getCustomerById, getCustomers } from "@/controllers/customers";
import express from "express"
const customerRouter = express.Router();

/**
 * @swagger
 * /api/v1/customer:
 *   post:
 *     summary: Create a new brand
 *     tags: [customers]
 *     description: Creates a new customer in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Customer'
 */

customerRouter.post("/customers", createCustomer);

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [customers]
 *     description: Retrieve a list of customers from the database.
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

customerRouter.get("/customers", getCustomers);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [customers]
 *     description: Retrieve a single customer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 */

customerRouter.get("/customers/:id", getCustomerById);
// customerRouter.get("/api/v2/customers",getV2Customers);

export default customerRouter