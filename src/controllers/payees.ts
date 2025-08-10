import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createPayee (req: Request, res:Response){
    try {
        //Get the data
        const {
             name,
             phone,
        } =  req.body;
        //Check if category already exists
        const existingPayee = await db.payee.findUnique({
            where:{
                phone,
            },
        });
        if(existingPayee){
            return res.status(409).json({
                error: `Payee (${name}) is already existing`,
                data:null
            });
        }
        //Create the category
        const newPayee = await db.payee.create({
            data:{
               name,
             phone,
            }
        })

        //Return the Created category
        return res.status(201).json({
            data: newPayee,
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

export async function getPayees (req: Request, res:Response){
    try {
        const payees = await db.payee.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: payees,
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

export async function getSinglePayee (req: Request, res:Response){
    try {
        const { id } = req.params
        const existingPayee = await db.payee.findUnique({
            where:{
                id:id
            },
        });

        if(!existingPayee){
            return res.status(404).json({
                data:null,
                error: "Category does not exist"
            })
        }



        return res.status(200).json({
            data: existingPayee,
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

export async function deletePayeeById(req: Request, res: Response){
    const {id} =req.params
    try {
      const payee = await db.payee.findUnique({
        where:{
            id
        },
      }); 
      if(!payee){
        return res.status(404).json({
            data:null,
            error:"Payee Not found"
        })
      }
     await db.payee.delete({
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

export async function updatePayeeById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
    name,
    phone,
  } = req.body;
  
      // Existing Category
      const existingPayee = await db.payee.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingPayee){
        return res.status(404).json({
            data:null,
            error:"Payee Not found"
        });
      }
      //If the email,suername,phone are unique
      if(phone !== existingPayee.phone){
        const existingPayeeByPhone = await db.payee.findUnique({
      where: {
        phone,
      },
    });
    if (existingPayeeByPhone) {
      return res.status(409).json({
        error: `Payee (${name}) is already taken`,
        data: null,
      });
    }
      }

      //update unit
        const updatedPayee = await db.payee.update({
        where:{
            id
        }, 
        data:{
              name,
             phone,
        },
      });

      return res.status(200).json({
        data:updatedPayee,
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