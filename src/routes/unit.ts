import { createUnit, deleteUnitById, getSingleUnit, getUnits, updateUnitById } from "@/controllers/units";
import express from "express";

const unitRouter = express.Router();

/**
 * @swagger
 * /api/v1/units:
 *   post:
 *     summary: Create a new unit
 *     tags: [units]
 *     description: Creates a new unit in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Unit'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Unit'
 */

unitRouter.post("/units", createUnit);

/**
 * @swagger
 * /api/v1/units:
 *   get:
 *     summary: Retrieve a list of units
 *     tags: [units]
 *     description: Retrieve a list of units from the database.
 *     responses:
 *       200:
 *         description: A list of units.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 */

unitRouter.get("/units", getUnits);

/**
 * @swagger
 * /api/v1/units/{id}:
 *   get:
 *     summary: Get a unit by ID
 *     tags: [units]
 *     description: Retrieve a single unit by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single unit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: Unit not found.
 */

unitRouter.get("/units/:id", getSingleUnit);

/**
 * @swagger
 * /api/v1/units/{id}:
 *   put:
 *     summary: Update a unit by ID
 *     tags: [brands]
 *     description: Update a single unit by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a single unit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: Unit not found.
 */

unitRouter.put("/units/:id", updateUnitById);

/**
 * @swagger
 * /api/v1/units/{id}:
 *   delete:
 *     summary: delete a unit
 *     tags: [units]
 *     description: delete a unit from the database.
 *     responses:
 *       200:
 *         description: delete a unit.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 */

unitRouter.delete("/units/:id", deleteUnitById);

export default unitRouter;