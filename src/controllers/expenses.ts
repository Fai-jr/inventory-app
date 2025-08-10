import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createExpense(req: Request, res:Response){
    try {
        //Get the data
        const {
           title,
amount,
description,
attachments,
expenseDate,
payeeId,
categoryId,
shopId
        } = req.body;
        //Create the category
        const newExpense = await db.expense.create({
            data:{
                   title,
amount,
description,
attachments,
expenseDate,
payeeId,
categoryId,
shopId
            }
        })

        //Return the Created category
        return res.status(201).json({
            data: newExpense,
            error: null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data:null,
            error:"Something went wrong"
        })
    }
}

export async function getExpenses (req: Request, res:Response){
    try {
        const expenses = await db.expense.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: expenses,
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

export async function getSingleExpense (req: Request, res:Response){
    try {
        const { id } = req.params
        const existingExpense = await db.expense.findUnique({
            where:{
                id:id
            },
        });

        if(!existingExpense){
            return res.status(404).json({
                data:null,
                error: "Expense does not exist"
            })
        }



        return res.status(200).json({
            data: existingExpense,
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

export async function deleteExpenseById(req: Request, res: Response){
    const {id} =req.params
    try {
      const expense = await db.expense.findUnique({
        where:{
            id
        },
      }); 
      if(!expense){
        return res.status(404).json({
            data:null,
            error:"Expense Not found"
        })
      }
     await db.expense.delete({
        where:{
            id
        },
     });
        res.status(200).json({
        success: true,
        error:null,
      });
    } catch (error) {
        console.log(error);
          return res.status(500).json({
      error: "Internal server error",
      data: null,
    });
    }
}

export async function updateExpenseById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
           title,
amount,
description,
attachments,
expenseDate,
payeeId,
categoryId,
shopId
  } = req.body;
  
      // Existing Category
      const existingExpense = await db.expense.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingExpense){
        return res.status(404).json({
            data:null,
            error:"Expense Not found"
        });
      }

      //update Expense
        const updatedExpense = await db.expense.update({
        where:{
            id
        }, 
        data:{
            title,
amount,
description,
attachments,
expenseDate,
payeeId,
categoryId,
shopId
        },
      });

      return res.status(200).json({
        data:updatedExpense,
        error:null,
      });

    } catch (error) {
        console.log(error);
          return res.status(500).json({
      error: "Internal server error",
      data: null,
    });
    }
}