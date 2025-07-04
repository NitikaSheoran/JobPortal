import Company from "../models/Company.js"
import bcrypt, { hash } from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateTokens.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import { messageInRaw } from "svix";

// Register company
export const registerCompany = async(req, res)=>{
    const {name, email, password} = req.body
    const imageFile = req.file;

    if(!imageFile || !name || !email || !password){
        return res.json({success: false, message: "missing details"})
    }

    try{
        const companyExists = await Company.findOne({email})
        if(companyExists){
            return res.json({success: false, message:"company already exists"})
        }
        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })


        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    }catch(error){
        res.json({success: false, message: error.message})
    }
}


// company login
export const loginCompany = async(req, res) =>{
    const {email, password} = req.body;

    try{
        const company = await Company.findOne({email})
        if(await bcrypt.compare(password, company.password)){
            res.json({
                success: true,
                company: {
                     _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }else{
            res.json({
                success: false,
                message: "incorrect password"
            })
        }
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
}


// get company data
export const getCompanyData = async (req, res) => {
  if (!req.company) {
    return res.json({
      success: false,
      message: "Not authorized"
    });
  }

  try {
    const companyData = await Company.findById(req.company._id).select("-password");
    res.json({
      success: true,
      company: companyData
    });
  } catch (error) {
        res.json({
        success: false,
        message: error.message
        });
  }
};


// post new job
export const postJob = async(req, res) =>{
    const {title, description, location, salary, level, category} = req.body
    if (!title || !description || !location || !salary || !level || !category) {
        return res.json({
            success: false,
            message: "Please fill in all required fields."
        });
    }

    const companyId = req.company._id
    console.log(companyId, {title, location, description, salary});
    try{
        const newJob = await Job.create({
            title: title,
            description: description,
            location: location,
            category,
            salary,
            date: Date.now(),
            companyId,
            level
        })
        await newJob.save();
        res.json({
            success: true,
            message: "Job posted successfully!",
            job: newJob
        })
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
}

// company jon applicants
export const getCompanyJobApplicants = async(req, res) =>{
    try {
        const companyId = req.company._id;

        const applicants = await JobApplication.find({companyId}).populate('userId', 'name image resume').populate('jobId', 'title location category level salary').exec()
        return res.json({success: true, applicants})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
    
}

// company jobs
export const getCompanyPostedJobs = async(req, res) => {
    try{
        const companyId = req.company._id;
        const jobs = await Job.find({companyId})
        // add number of applicants
        const jobsData = await Promise.all(jobs.map(async(job)=>{
            const applicants = await JobApplication.find({jobId: job._id});
            return {...job.toObject(), applicants: applicants.length}
        }))
        res.json({
            success:true,
            jobsData
        })
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
}

// change job application status
export const changeJobApplicationsStatus = async(req, res) =>{
    try {
        const {id, status} = req.body
        await JobApplication.findOneAndUpdate({_id: id}, {
            status: status
        })
        res.json({
            success: true, 
            message: "status"
        })
    } catch (error) {
        res.json({
            success:false, 
            message: error.message
        })
    }
}

// change visibility
export const changeJobVisiblity = async(req, res)=>{
    try{
        const {id} = req.body;
        const companyId = req.company._id;
        const job = await Job.findById(id);
        if(job.companyId.toString() === companyId.toString()){
            job.visible = !job.visible
        }
        await job.save();
        res.json({
            success: true,
            job
        })

    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
}