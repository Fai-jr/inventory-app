import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createNotification (req: Request, res:Response){
    try {
        //Get the data
        const {
             message,
status,
statusText,
read,
        } =  req.body;
       
        //Create the Notification
        const newNotification = await db.notification.create({
            data:{
                         message,
status,
statusText,
read,
            }
        })

        //Return the Created category
        return res.status(201).json({
            data: newNotification,
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

export async function getNotifications (req: Request, res:Response){
    try {
        const notifications = await db.notification.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: notifications,
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

export async function deleteNotification(req: Request, res: Response){
    const {id} =req.params
    try {
      const notification = await db.notification.findUnique({
        where:{
            id
        },
      }); 
      if(!notification){
        return res.status(404).json({
            data:null,
            error:"Notification Not found"
        })
      }
     await db.notification.delete({
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

export async function updateNotificationById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
   read
  } = req.body;
  
      // Existing Notification
      const existingNotification = await db.notification.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingNotification){
        return res.status(404).json({
            data:null,
            error:"Notification Not found"
        });
      }

      //update Notification
        const updatedNotification = await db.notification.update({
        where:{
            id
        }, 
        data:{
              read,
        },
      });

      return res.status(200).json({
        data:updatedNotification,
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