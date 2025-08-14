import { createNotification, deleteNotification, getNotifications, updateNotificationById } from "@/controllers/notifications";
import express from "express";

const notificationRouter = express.Router();

/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [notifications]
 *     description: Creates a new notification in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Notification'
 */

notificationRouter.post("/notifications", createNotification);

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Retrieve a list of notifications
 *     tags: [notifications]
 *     description: Retrieve a list of notifications from the database.
 *     responses:
 *       200:
 *         description: A list of notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */

notificationRouter.get("/notifications", getNotifications);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     tags: [notifications]
 *     description: Update a single notification by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Update a single notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found.
 */

notificationRouter.put("/notifications/:id", updateNotificationById);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: delete a notification
 *     tags: [notifications]
 *     description: delete a notification from the database.
 *     responses:
 *       200:
 *         description: delete a notification.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */

notificationRouter.delete("/notifications/:id", deleteNotification);

export default notificationRouter;