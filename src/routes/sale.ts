
import { createSale, createSaleItem, getSales, getShopSales, getShopsSales } from "@/controllers/sales";
import express from "express";

const saleRouter = express.Router();

saleRouter.post("/sales", createSale);
saleRouter.post("/sales/item", createSaleItem);
saleRouter.get("/sales", getSales);
saleRouter.get("/sales/shop/:shopId", getShopSales);
saleRouter.get("/sales/all-shops", getShopsSales);
// saleRouter.get("/sales/:id", getSingleBrand);
// saleRouter.put("/sales/:id", updateBrandById);
// saleRouter.delete("/sales/:id", deleteBrandById);

export default saleRouter;