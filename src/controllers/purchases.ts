import { db } from "@/db/db";
import { generateSaleNumber } from "@/utils/generateSaleNumber";
import { NotificationStatus, PurchaseOrderStatus } from "@prisma/client";
import { Request, Response } from "express";
import { createNotification } from "./notifications";
import { error } from "console";

interface PurchaseOrderItem{
    purchaseOrderId:string;
productId:string;
quantity:number;
productName:string;
unitCost:number
subTotal:number
currentStock:number
}
interface CreatePurchaseProps{
            notes:string,
            balanceAmount:number,
            totalAmount:number,
            shippingCost:number,
            tax:number,
            discount:number,
            status: PurchaseOrderStatus,
            supplierId:string,
    items: PurchaseOrderItem[];
}

export async function createPurchaseOrder(req: Request, res:Response){
         const {
            notes,
            balanceAmount,
            totalAmount,
            shippingCost,
            tax,
            discount,
            items,
            status,
            supplierId,
        } :CreatePurchaseProps
         =  req.body;
        try {
                   // Create a transaction
                  const purchaseId = await db.$transaction(async(transaction)=>{
                 // Create the purchase order
                 const purchase = await transaction.purchaseOrder.create({
                  data: {
                    notes,
            balanceAmount,
            totalAmount,
            shippingCost,
            tax,
            discount,
            status,
            supplierId,
            refNo:generateSaleNumber()
                  }
                 })
                // Use the Items
                 for (const item of items){
                    //Update Product stock quantity
                const updatedProduct = await transaction.product.update({
                    where: {id: item.productId},
                    data: {
                        stockQty:{
                            increment: item.quantity,
                        }
                    }
                })

                    if(!updatedProduct){
                        return res.status(500).json({
                            error: `Failed to update stock for product ID: ${item.productId}`,
                            data: null
                        })
                    }
                   //Send/create the notification
                   const message = updatedProduct.stockQty === 0 ? `New stock for ${updatedProduct.name} . Current stock: ${updatedProduct.stockQty}.` : `The stock of ${updatedProduct.name} has been updated. Current stock: ${updatedProduct.stockQty}.`;
                   const statusText = "New Stock";
                   const status: NotificationStatus =  "INFO";

                   const newNotification = {
                    message,
                    status,
                    statusText,
                   }
                   await db.notification.create({
                    data:newNotification,
                   });

                              // Create Purchase Item
                const purchaseItem = await transaction.purchaseOrderItem.create({
                    data: {
                        purchaseOrderId: purchase.id,
                        productId: item.productId,
                        productName: item.productName,
                        currentStock:item.currentStock,
                        quantity: item.quantity,
                        unitCost: item.unitCost,
                        subTotal: item.subTotal
                    }
                })

                 if(!purchaseItem){
                      return res.status(500).json({
                            error: `Failed to Create purchase for: ${item.productId}`,
                            data: null
                      })
                }
             }
            
                // Return adjustmentID
                return purchase.id;
            })

            const savedPurchaseOrder = await db.purchaseOrder.findUnique({
                where:{
                    id: purchaseId as string,
                },
                include: {
                    items: true
                }
            })

            return res.status(201).json({
                data: savedPurchaseOrder,
                error:null,
            })
        } catch (error) {
             console.log(error)
        return res.status(500).json({
            data: null,
            error: "Something went wrong",
        });
        }
}

export async function getPurchaseOrders (req: Request, res:Response){
    try {
        const orders = await db.purchaseOrder.findMany({
            orderBy: { 
                createdAt:"desc"
            },
            include:{
                items:true,
                supplier: true
            }
        });
        return res.status(200).json({
            data: orders,
            error: null,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: "Something went wrong",
        });
    }
}

