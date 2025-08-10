import { createExpenseCategory, deleteExpenseCategoryById, getExpenseCategories, getSingleExpenseCategory, updateExpenseCategoryById } from "@/controllers/expense-categories";
import express from "express";

const ExpenseCategoryRouter = express.Router();

ExpenseCategoryRouter.post("/expense-categories", createExpenseCategory);
ExpenseCategoryRouter.get("/expense-categories", getExpenseCategories);
ExpenseCategoryRouter.get("/expense-categories/:id", getSingleExpenseCategory);
ExpenseCategoryRouter.put("/expense-categories/:id", updateExpenseCategoryById);
ExpenseCategoryRouter.delete("/expense-categories/:id", deleteExpenseCategoryById);

export default ExpenseCategoryRouter;