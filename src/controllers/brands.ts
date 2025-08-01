import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createBrand(req: Request, res:Response){
    try {
        //Get the data
        const {
             name,
             slug,
        } =  req.body;
        //Check if brand already exists
        const existingBrand = await db.brand.findUnique({
            where:{
                slug
            },
        });
        if(existingBrand){
            return res.status(409).json({
                error: `Brand(${name}) is already existing`,
                data:null
            });
        }
        //Create the brand
        const newBrand = await db.brand.create({
            data:{
               name,
             slug,
            }
        })

        //Return the Created Shop
        return res.status(201).json({
            data: newBrand,
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

export async function getBrands (req: Request, res:Response){
    try {
        const brands = await db.brand.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: brands,
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

export async function getSingleBrand(req: Request, res:Response){
    try {
        const { id } = req.params
        const existingBrand = await db.brand.findUnique({
            where:{
                id:id
            },
        });

        if(!existingBrand){
            return res.status(404).json({
                data:null,
                error: "Brand does not exist"
            })
        }



        return res.status(200).json({
            data: existingBrand,
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

export async function deleteBrandById(req: Request, res: Response){
    const {id} =req.params
    try {
      const brand = await db.brand.findUnique({
        where:{
            id
        },
      }); 
      if(!brand){
        return res.status(404).json({
            data:null,
            error:"Brand Not found"
        })
      }
     await db.brand.delete({
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

export async function updateBrandById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
    name,
    slug,
  } = req.body;
  
      // Existing User
      const existingBrand = await db.brand.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingBrand){
        return res.status(404).json({
            data:null,
            error:"Brand Not found"
        });
      }
      //If the email,suername,phone are unique
      if(slug !== existingBrand.slug){
        const existingBrandBySlug = await db.brand.findUnique({
      where: {
        slug,
      },
    });
    if (existingBrandBySlug) {
      return res.status(409).json({
        error: `Brand name (${name}) is already taken`,
        data: null,
      });
    }
      }

      //update unit
        const updatedBrand = await db.brand.update({
        where:{
            id
        }, 
        data:{
              name,
             slug,
        },
      });

      return res.status(200).json({
        data:updatedBrand,
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