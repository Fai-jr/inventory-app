import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { error } from "console";
import { generateAccessToken } from "@/utils/generateJWT";

export async function authorizeUser(req: Request, res: Response) {
  // Receive the Data
  const {
    email,
    username,
    password,
  } = req.body;
  try {
    let existingUser = null;
    if(email){
        existingUser = await db.user.findUnique({
            where:{
                email,
            }
        });
    }
    if (username){
        existingUser = await db.user.findUnique({
            where:{
                username
            }
        });
    }
    if(!existingUser){
        return res.status(403).json({
            error:"Wrong Credentials",
            data:null
        })
    }

    //Check if the password is Correct
    const passwordMatch = await bcrypt.compare(password,existingUser.password);
    if(!passwordMatch){
        return res.json({
            error: "Wrong Credentials",
            data: null,
        }).status(403);
    }
    //Destructure out the password from the existing user
    const {password:userPass,...userWithoutPassword} = existingUser;
    const accessToken = generateAccessToken(userWithoutPassword)
    const result = {
        ...userWithoutPassword, accessToken
    };

    return res.json(result).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      data: null,
    });
  }
}