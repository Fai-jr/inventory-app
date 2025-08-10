import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createExpenseCategory(req: Request, res:Response){
    try {
        //Get the data
        const {
             name,
             slug,
        } =  req.body;
        //Check if category already exists
        const existingCategory = await db.expenseCategory.findUnique({
            where:{
                slug
            },
        });
        if(existingCategory){
            return res.status(409).json({
                error: `Category (${name}) is already existing`,
                data:null
            });
        }
        //Create the category
        const newCategory = await db.expenseCategory.create({
            data:{
               name,
             slug,
            }
        })

        //Return the Created category
        return res.status(201).json({
            data: newCategory,
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

export async function getExpenseCategories (req: Request, res:Response){
    try {
        const categories = await db.expenseCategory.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: categories,
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

export async function getSingleExpenseCategory (req: Request, res:Response){
    try {
        const { id } = req.params
        const existingCategory = await db.expenseCategory.findUnique({
            where:{
                id:id
            },
        });

        if(!existingCategory){
            return res.status(404).json({
                data:null,
                error: "Category does not exist"
            })
        }



        return res.status(200).json({
            data: existingCategory,
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

export async function deleteExpenseCategoryById(req: Request, res: Response){
    const {id} =req.params
    try {
      const category = await db.expenseCategory.findUnique({
        where:{
            id
        },
      }); 
      if(!category){
        return res.status(404).json({
            data:null,
            error:"Expense Category Not found"
        })
      }
     await db.expenseCategory.delete({
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

export async function updateExpenseCategoryById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
    name,
    slug,
  } = req.body;
  
      // Existing Category
      const existingCategory = await db.expenseCategory.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingCategory){
        return res.status(404).json({
            data:null,
            error:"Category Not found"
        });
      }
      //If the email,suername,phone are unique
      if(slug !== existingCategory.slug){
        const existingCategoryBySlug = await db.expenseCategory.findUnique({
      where: {
        slug,
      },
    });
    if (existingCategoryBySlug) {
      return res.status(409).json({
        error: `Category (${name}) is already taken`,
        data: null,
      });
    }
      }

      //update unit
        const updatedCategory = await db.expenseCategory.update({
        where:{
            id
        }, 
        data:{
              name,
             slug,
        },
      });

      return res.status(200).json({
        data:updatedCategory,
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