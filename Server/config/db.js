import mongoose from "mongoose";

// connect to db
const connectDB = async () => {
    mongoose.connection.on('connected', ()=>console.log("connected to db"))
    await mongoose.connect(`${process.env.MONGODB_URI}/job_portal`)
}

export default connectDB