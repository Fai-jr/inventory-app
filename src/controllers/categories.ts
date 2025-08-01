import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createCategory(req: Request, res:Response){
    try {
        //Get the data
        const {
             name,
             slug,
        } =  req.body;
        //Check if category already exists
        const existingCategory = await db.brand.findUnique({
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
        const newCategory = await db.category.create({
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

export async function getCategories (req: Request, res:Response){
    try {
        const categories = await db.category.findMany({
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

export async function getSingleCategory (req: Request, res:Response){
    try {
        const { id } = req.params
        const existingCategory = await db.category.findUnique({
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

export async function deleteCategoryById(req: Request, res: Response){
    const {id} =req.params
    try {
      const category = await db.category.findUnique({
        where:{
            id
        },
      }); 
      if(!category){
        return res.status(404).json({
            data:null,
            error:"Category Not found"
        })
      }
     await db.category.delete({
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

export async function updateCategoryById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
    name,
    slug,
  } = req.body;
  
      // Existing Category
      const existingCategory = await db.category.findUnique({
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
        const existingCategoryBySlug = await db.category.findUnique({
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
        const updatedCategory = await db.category.update({
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