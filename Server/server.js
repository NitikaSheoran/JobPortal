import './config/instrument.js'
import * as Sentry from '@sentry/node'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/comapnyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import connectCloudinary from './config/cloudinary.js'



// initialise
const app = express();
// connect to db
await connectDB()
await connectCloudinary()



// middlewares
app.use(cors())
app.use(express.json())



// routes
app.get('/', (req, res)=>{
    res.send("Api working")
})
app.get('/debug-sentry', function mainHandler(req, res){
    throw new Error("first sentry error")
})
app.post('/webhooks', clerkWebhooks)




app.use('/api/company',companyRoutes)
app.use('/api/Job', jobRoutes)




const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})