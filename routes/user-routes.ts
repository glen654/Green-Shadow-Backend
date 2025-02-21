import express from "express";
import {User} from "../models/dtos/User";
import {registerUser, verifyUser} from "../database/user-data-store";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/login',async (req ,res) => {
    const user: User = {
        userName: req.body.username,
        userEmail: req.body.userEmail,
        password: req.body.password
    }

    try{
        const isVerified = await verifyUser(user);
        if(isVerified){
            console.log('Loaded SECRET_ACCESS_TOKEN:', process.env.SECRET_ACCESS_TOKEN);
            console.log('User email:', user.userEmail);
            const access_token = jwt.sign(
                {userEmail: user.userEmail},
                process.env["SECRET_ACCESS_TOKEN "] as string,
                {expiresIn: "1h"}
            );
            res.status(200).send({access_token})
        }else {
            res.status(200).send("Invalid credentials")
        }
    }catch (error){
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.post('/register',async (req ,res) => {
    const user: User = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        password: req.body.password
    }

    try {
        const newUser = await registerUser(user);
        res.status(200).json(newUser);
    }catch (error){
        console.log(error);
        res.status(400).send("Error registering register");
    }
})

export default router;