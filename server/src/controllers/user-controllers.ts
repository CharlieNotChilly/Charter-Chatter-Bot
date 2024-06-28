import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
//in bcrypt, hash is to encrypt and compare is to compare if the password is same after encrypting 
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";





export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });

    }

}


export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //user Signup

        const { name, email, password } = req.body;
        const hashPassword = await hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already registered");
        //always encrypt the data before storing in the data base

        const user = new User({ name, email, password: hashPassword });
        await user.save();

        //create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        //change the localhost after deployed the website
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            //use httponly to prevent from the javascript retrieval
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({ message: "OK", name: user.name, email:user.email});

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });

    }

}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //user login

        const { email, password } = req.body;
        //use find one to find a specific user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("user not registered hereeee");

        }

        const isPasswordCorrect = await compare(password, user.password);

       /* if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");

        }*/


        res.clearCookie(COOKIE_NAME,  {
            domain: "localhost",
            signed: true,
            httpOnly: true,
            path: "/",
        }
    
        );
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        //change the localhost after deployed the website
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            //use httponly to prevent from the javascript retrieval
            httpOnly: true,
            signed: true
        });

        //send the token in the form of token
        //use the cookie parser to send the cookie from the backend to the frontend

        
        return res.status(200).json({ message: "OK", name: user.name, email:user.email});
        


        //return res.status(200).json({ message: "OK", id:user._id.toString() });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });

    }

}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        //use find one to find a specific user
        const user = await User.findById({ email: res.locals.jwtData.email });

        if (!user) {
            return res.status(401).send("user not registered OR token malfunctioned");


            
        }
        console.log(user._id.toString(),res.locals.jwtData.id);
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
                
        }



        
        return res.status(200).json({ message: "OK", name: user.name, email:user.email});
        


        //return res.status(200).json({ message: "OK", id:user._id.toString() });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });

    }

}