import {User} from "../models/dtos/User";
import UserModel from "../models/schemas/User-model";
import bcrypt from 'bcrypt'

export async function registerUser(u:User){
    const hashPassword = await bcrypt.hash(u.password, 10);
    try{
        const newUser = await UserModel.create({
            userName: u.userName,
            userEmail: u.userEmail,
            password: hashPassword,
        })
        return newUser;
    }catch(err){
        console.log("Error registering user",err);
    }
}

export async function verifyUser(u:User){
    try{
        const user = await UserModel.findOne({userEmail: u.userEmail});
        if(!user){
            throw new Error("User does not exist");
        }
        const isPasswordValid = await bcrypt.compare(u.password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }
        return user
    }catch(err){
        console.log("Error verifying user",err);
    }
}