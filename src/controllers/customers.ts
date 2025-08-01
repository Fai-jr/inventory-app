import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createCustomer(req:Request, res:Response){
   const {
    customerType,
firstName,
lastName,
phone,
gender,
country,
location,
maxCreditLimit,
maxCreditDays,
taxPin,
dob,
email,
NIN,
} =req.body

   try {
    //Check if phone,email and NIN are unique
    const existingCustomerByPhone = await db.customer.findUnique({
        where:{
            phone
        }
    });
    if(existingCustomerByPhone){
        return res.status(409).json ({
            error: `Phone number${phone} is already in use`
        })
    }
    if(email){
         const existingCustomerByEmail = await db.customer.findUnique({
        where:{
            email
        }
    });
    if(existingCustomerByEmail){
        return res.status(409).json ({
            error: `Email ${email} is already in use`
        })
    }
    }
     if(NIN){
         const existingCustomerByNIN = await db.customer.findUnique({
        where:{
            NIN,
        }
    });
    if(existingCustomerByNIN){
        return res.status(409).json ({
            error: `NIN ${NIN} is already in use`
        })
    }
    }
    //Create the Customer
      const newCustomer = await db.customer.create({
        data:{
             customerType,
firstName,
lastName,
phone,
gender,
country,
location,
maxCreditLimit,
maxCreditDays,
taxPin,
dob,
email,
NIN,
        },
    });
    //Return the Created Customer
    return res.status(201).json(newCustomer)
   } catch (error) {
    console.log(error);
   }

}
export async function getCustomers(req:Request, res:Response){
    try {
        const customers = await db.customer.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        return res.status(200).json(customers)
    } catch (error) {
        console.log(error);
    }
 
}

export async function getCustomerById(req:Request, res:Response){
    const { id } = req.params
    try {
  const customer = await db.customer.findUnique({
    where:{
        id
    }
  });

   if (!customer) {
      return res.status(404).json({ 
        error: "Customer not found",
        data:null
     });
    }
  return res.status(200).json(customer)
    } catch (error) {
      console.log(error);  
    }
}
