import { createUser, deleteUserById, getAttendants, getUserById, getUsers, updateUserById, updateUserPasswordById } from "@/controllers/users";
import express from "express";

const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/User'
 */

userRouter.post("/users", createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [users]
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get("/users", getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [users]
 *     description: Retrieve a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */

userRouter.get("/users/:id", getUserById);

/**
 * @swagger
 * /api/v1/attendants:
 *   get:
 *     summary: Retrieve a list of attendants
 *     tags: [users]
 *     description: Retrieve a list of attendants from the database.
 *     responses:
 *       200:
 *         description: A list of attendants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get("/attendants", getAttendants);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [users]
 *     description: Update a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               username:
 *                 type: string
 *                 description: The user's name
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *             required:
 *               - email
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: Update a single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.put("/users/:id", updateUserById);

/**
 * @swagger
 * /api/v1/users/update-password/{id}:
 *   put:
 *     summary: Update a users password by ID
 *     tags: [users]
 *     description: Update a single users password by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a single users password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */

userRouter.put("/users/update-password/:id", updateUserPasswordById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: delete a user
 *     tags: [users]
 *     description: delete a user from the database.
 *     responses:
 *       200:
 *         description: delete a user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.delete("/users/:id", deleteUserById);

export default userRouter;