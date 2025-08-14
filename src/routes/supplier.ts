import { createSupplier, getSupplierById, getSuppliers } from '@/controllers/suppliers';
import express from 'express';

const supplierRouter = express.Router();

/**
 * @swagger
 * /api/v1/suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [suppliers]
 *     description: Creates a new supplier in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Supplier'
 */

supplierRouter.post("/suppliers", createSupplier);

/**
 * @swagger
 * /api/v1/suppliers:
 *   get:
 *     summary: Retrieve a list of suppliers
 *     tags: [suppliers]
 *     description: Retrieve a list of suppliers from the database.
 *     responses:
 *       200:
 *         description: A list of suppliers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */

supplierRouter.get("/suppliers",getSuppliers);
/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [suppliers]
 *     description: Retrieve a single supplier by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found.
 */

supplierRouter.get("/suppliers/:id", getSupplierById);

export default supplierRouter