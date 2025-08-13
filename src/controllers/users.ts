import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  // Receive the Data
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
    role,
  } = req.body;
  try {
    // Check if the user already exists (email, username, phone)
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    const existingUserByPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUserByEmail) {
      res.status(409).json({
        error: `Email (${email}) is already taken`,
        data: null,
      });
      return;
    }
    if (existingUserByPhone) {
      res.status(409).json({
        error: `Phone Number (${phone}) is already taken`,
        data: null,
      });
      return;
    }
    if (existingUserByUsername) {
      res.status(409).json({
        error: `Username (${username}) is already taken`,
        data: null,
      });
      return;
    }

    // Hash the Password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Create the User
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        role,
        image: image ? image : "https://aarfrvsozm.ufs.sh/f/sGwDJxy63ut8qnx9Q8uMYf2KpTIBHNJ1ciOAUujlkn30Gmh6",
      },
    });

    // Modify the returned user
    const { password: _, ...others } = newUser;
    res.status(201).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      data: null,
    });
  }
}

export async function getUsers(req: Request, res: Response){
    try {
      const users = await db.user.findMany({
        orderBy:{
            createdAt:"desc"
        },
      }); 
      const filteredUsers =users.map((user: { [x: string]: any; password: any; })=>{
        const {password, ...others}=user;
        return others;
      });
      res.status(200).json({
        data: filteredUsers,
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

export async function getAttendants(req: Request, res: Response){
    try {
      const users = await db.user.findMany({
        orderBy:{
            createdAt:"desc"
        },
        where:{
            role:"ATTENDANT"
        },
      }); 
      const filteredUsers =users.map((user: { [x: string]: any; password: any; })=>{
        const {password, ...others}=user;
        return others;
      });
      res.status(200).json({
        data: filteredUsers,
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

export async function getUserById(req: Request, res: Response){
    const {id} =req.params
    try {
      const user = await db.user.findUnique({
        where:{
            id
        },
      }); 
      if(!user){
        return res.status(404).json({
            data:null,
            error:"User Not found"
        })
      }
      const {password, ...result}= user
      res.status(200).json({
        data: result,
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

export async function updateUserById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
    email,
    username,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
    password
  } = req.body;
  
      // Existing User
      const existingUser = await db.user.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingUser){
        return res.status(404).json({
            data:null,
            error:"User Not found"
        });
      }
      //If the email,suername,phone are unique
      if(email && email !== existingUser.email){
        const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUserByEmail) {
      return res.status(409).json({
        error: `Email (${email}) is already taken`,
        data: null,
      });
    }
      }

  if(phone && phone !==existingUser.phone){
      const existingUserByPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });
    if (existingUserByPhone) {
     return res.status(409).json({
        error: `Phone Number (${phone}) is already taken`,
        data: null,
      });
    }
  }

  if(username && username !==existingUser.username){
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      return res.status(409).json({
        error: `Username (${username}) is already taken`,
        data: null,
      });
    }
  }
    
      //Hash the password if it exists
      let hashedPassword =existingUser.password
      if(password){
        hashedPassword = await bcrypt.hash(password,10)
      }

      //update user
        const updatedUser = await db.user.update({
        where:{
            id
        }, 
        data:{
              email,
    username,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
    password:hashedPassword
        },
      });

      //return updated user without pass
      
     const {password:userPass, ...others}=updatedUser;
      return res.status(200).json({
        data:others,
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

export async function updateUserPasswordById(req: Request, res: Response){
    const {id} =req.params
      const { oldPassword,newPassword } = req.body;
    try {
      //Get the User
      const user = await db.user.findUnique({
        where:{
            id
        },
      }); 
      //Return error if user not found
      if(!user){
        return res.status(404).json({
            data:null,
            error:"User Not found"
        })
      }
      // Check if the Old Password matches
       const passwordMatch = await bcrypt.compare(oldPassword,user.password);
          if(!passwordMatch){
              return res.json({
                  error: "Incorrect Old Password",
                  data: null,
              }).status(403);
          }
      //Hash the Password
      const hashedPassword: string = await bcrypt.hash(newPassword, 10);
      const updatedUser = await db.user.update({
        where:{
            id
        }, 
        data:{ password: hashedPassword},
      });
      const {password:savedPassword, ...others}=updatedUser
      return res.status(200).json({
        data:others,
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

export async function deleteUserById(req: Request, res: Response){
    const {id} =req.params
    try {
      const user = await db.user.findUnique({
        where:{
            id
        },
      }); 
      if(!user){
        return res.status(404).json({
            data:null,
            error:"User Not found"
        })
      }
     await db.user.delete({
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