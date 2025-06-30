import { Webhook } from "svix";
import User from "../models/User.js";

// to manage clerk user with database
export const clerkWebhooks = async (req, res) => {
    try{
        // create svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // verufy headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // getting data from body
        const {data, type} = req.body
        
    }catch(error){

    }
}