import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createUnit(req: Request, res:Response){
    try {
        //Get the data
        const {
             name,
             abbreviation,
             slug,
        } =  req.body;
        //Check if Unots already exists
        const existingUnit = await db.unit.findUnique({
            where:{
                slug
            },
        });
        if(existingUnit){
            return res.status(409).json({
                error: `Unit(${name}) is already existing`,
                data:null
            });
        }
        //Create the Unit
        const newUnit = await db.unit.create({
            data:{
               name,
             abbreviation,
             slug,
            }
        })

        //Return the Created Unit
        return res.status(201).json({
            data: newUnit,
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

export async function getUnits (req: Request, res:Response){
    try {
        const units = await db.unit.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: units,
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

export async function getSingleUnit(req: Request, res:Response){
    try {
        const { id } = req.params
        const existingUnit = await db.unit.findUnique({
            where:{
                id:id
            },
        });

        if(!existingUnit){
            return res.status(404).json({
                data:null,
                error: "Unit does not exist"
            })
        }



        return res.status(200).json({
            data: existingUnit,
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

export async function deleteUnitById(req: Request, res: Response){
    const {id} =req.params
    try {
      const unit = await db.unit.findUnique({
        where:{
            id
        },
      }); 
      if(!unit){
        return res.status(404).json({
            data:null,
            error:"Unit Not found"
        })
      }
     await db.unit.delete({
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

export async function updateUnitById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
    name,
    abbreviation,
    slug,
  } = req.body;
  
      // Existing Unit
      const existingUnit = await db.unit.findUnique({
        where:{
            id
        },
      }); 
      // If unit does not exist we run 404
       if(!existingUnit){
        return res.status(404).json({
            data:null,
            error:"Unit Not found"
        });
      }
   
      
      if(slug !== existingUnit.slug){
        const existingUnitBySlug = await db.unit.findUnique({
      where: {
        slug,
      },
    });
    if (existingUnitBySlug) {
      return res.status(409).json({
        error: `Name (${name}) is already taken`,
        data: null,
      });
    }
      }

      //update unit
        const updatedUnit = await db.unit.update({
        where:{
            id
        }, 
        data:{
              name,
             abbreviation,
             slug,
        },
      });

      return res.status(200).json({
        data:updatedUnit,
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