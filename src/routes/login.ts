import { authorizeUser, changePassword, forgotPassword, verifyToken } from "@/controllers/login";
import express from "express";

const loginRouter = express.Router()

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Create a new login
 *     tags: [login]
 *     description: Creates a new login in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Login'
 */

loginRouter.post("/auth/login", authorizeUser)

/**
 * @swagger
 * /api/v1/auth/forgot-password/{id}:
 *   put:
 *     summary: Get a token for a forgotten password
 *     tags: [login]
 *     description: Get a token for a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get a single token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       404:
 *         description: Login not found.
 */

loginRouter.put("/auth/forgot-password", forgotPassword)

/**
 * @swagger
 * /api/v1/auth/verify-token:
 *   get:
 *     summary: Verify tokens
 *     tags: [login]
 *     description: verify tokens from the database.
 *     responses:
 *       200:
 *         description: verify token.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Login'
 */

loginRouter.get("/auth/verify-token", verifyToken)

/**
 * @swagger
 * /api/v1/auth/change-password/{id}:
 *   put:
 *     summary: Change password by ID
 *     tags: [login]
 *     description: change user passwords by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: change a single password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       404:
 *         description: Login not found.
 */

loginRouter.put("/auth/change-password", changePassword)

export default loginRouter