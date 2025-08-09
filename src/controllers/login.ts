import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { error } from "console";
import { generateAccessToken } from "@/utils/generateJWT";
import { addMinutes } from "date-fns";
import { Resend } from "resend";
import { generateEmailHTML } from "@/utils/generateEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

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

const generateToken = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export async function forgotPassword(req: Request, res: Response){

    try {
        const {email} = req.body;
     
        //Check if the user with this email exists
        const existingUser = await db.user.findUnique({
      where: { email },
    });
 
    if (!existingUser) {
      return res.status(404).json({ data: null, error: "User not found" });
    }

    const resetToken = generateToken().toString();
    const resetTokenExpiry = addMinutes(new Date(), 10);
    const currentTime = new Date();
 
        /* 
       1. Generate a secure token and store it in the resetToken field. 
       2. Set the resetTokenExpiry to a future date, e.g., 1 hour from the time of the request. 
       3. Send an email to the user with the reset token.
       */
      //Update the User with the Token and expiry date
      const updatedUser = await db.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const emailHTML = generateEmailHTML(resetToken)
    //send the Email with the token
      
    const { data, error } = await resend.emails.send({
      from: "Fai <info@projects.examples.com>",
      to: email,
      subject: "Password Reset Request",
      html: emailHTML,
    });
    if(error){
        return res.status(400).json({ error });
    }

    //  console.log(sendEmail)
    const result ={
        userId:updatedUser.id,
        emailId:data?.id
    }
    return res.status(200).json({
      message: `Password reset email sent to ${email}`,
      data:result,
    });
    
    } catch (error) {
       console.log(error);
        return res.status(500).json({
      message: "Something went wrong",
      data: null
    });
    }
}

export async function verifyToken(req: Request, res: Response){

    try {
        
        const {token} = req.params;
     
        //Check if the user with this email exists
        const existingUser = await db.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: {gte: new Date()} },
    });
 
    if (!existingUser) {
      return res.status(400).json({ data: null, error: "Invalid or expired token" });
    }
     res.status(200).json({ message: "Token is valid" });

    } catch (error) {
       console.log(error);
        return res.status(500).json({
      message: "Something went wrong",
      data: null
    });
    }
}

export const changePassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;
 
  try {
    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    });
 
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
 
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
 
    // Update the user's password and clear the reset token and expiry
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
 
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};