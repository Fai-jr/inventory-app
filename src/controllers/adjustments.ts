import { db } from "@/db/db";
import { generateSaleNumber } from "@/utils/generateSaleNumber";
import { NotificationStatus } from "@prisma/client";
import { Request, Response } from "express";
import { stat } from "fs";
import { createNotification } from "./notifications";
import { error } from "console";

interface AdjustmentItem{
    adjustmentId: string;
    productId: string;
    quantity: number;
    type: string;
    currentStock: number;
    productName: string;
}
interface CreateAdjustmentProps{
    reason: string;
    items: AdjustmentItem[];
}

export async function createAdjustment(req: Request, res:Response){
         const {
            reason, items
        } :CreateAdjustmentProps =  req.body;
        try {
                   // Create a transaction
                  const adjustmentId = await db.$transaction(async(transaction)=>{
                 // Create the adjustment
                 const adjustment = await transaction.adjustment.create({
                    data: {
                        reason,
                        refNo: generateSaleNumber(),
                    }
                 })
                // Use the Items
                 for (const item of items){
                    //Update Product stock quantity
                    let query;
                    if(item.type === "Addition") {
                        query = {
                            increment: item.quantity,
                        }
                    } else if (item.type === "Subtraction"){
                        query = {
                            decrement: item.quantity,
                        }
                    }
                    const updatedProduct = await transaction.product.update({
                        where: {id: item.productId},
                        data: {
                            stockQty: query,
                        }
                    })

                    if(!updatedProduct){
                        return res.status(500).json({
                            error: `Failed to update stock for product ID: ${item.productId}`,
                            data: null
                        })
                    }
                    if (updatedProduct.stockQty < updatedProduct.alertQty){
                        // Send/ Create the Notification
                        const message =
                        updatedProduct.stockQty === 0? `The stock of ${updatedProduct.name} is out. Current stock: ${updatedProduct.stockQty}.`:`The stock of ${updatedProduct.name} has gone below threshold. Current stock: ${updatedProduct.stockQty}.`;
                        const statusText = updatedProduct.stockQty === 0 ? "Stock out" : "Warning";
                        const status: NotificationStatus = updatedProduct.stockQty === 0 ? "DANGER" : "WARNING";
                        const newNotification = {
                            message,
                            status,
                            statusText
                        };
                       await db.notification.create({
                         data: newNotification
                          })
                          }
                              // Create Adjustment Item
                const adjustmentItem = await transaction.adjustmentItem.create({
                    data:{
                        adjustmentId: adjustment.id,
                        productId: item.productId,
                        productName: item.productName,
                        currentStock: item.currentStock,
                        quantity: item.quantity,
                        type: item.type,
                    }
                 })

                 if(!adjustmentItem){
                      return res.status(500).json({
                            error: `Failed to Create adjustment for: ${item.productId}`,
                            data: null
                      })
                }
             }
            
                // Return adjustmentID
                return adjustment.id;
            })

            const savedAdjustment = await db.adjustment.findUnique({
                where:{
                    id: adjustmentId as string,
                },
                include: {
                    items: true
                }
            })

            return res.status(201).json({
                data: savedAdjustment,
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

export async function getAdjustments (req: Request, res:Response){
    try {
        const adjustments = await db.adjustment.findMany({
            orderBy: { 
                createdAt:"desc"
            },
            include:{
                items:true
            }
        });
        return res.status(200).json({
            data: adjustments,
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

