import { createNotification, deleteNotification, getNotifications, updateNotificationById } from "@/controllers/notifications";
import express from "express";

const notificationRouter = express.Router();

notificationRouter.post("/notifications", createNotification);
notificationRouter.get("/notifications", getNotifications);
notificationRouter.put("/notifications/:id", updateNotificationById);
notificationRouter.delete("/notifications/:id", deleteNotification);

export default notificationRouter;