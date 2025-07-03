import Job from "../models/Job.js"
import mongoose from "mongoose"

export const getJobs = async(req, res)=>{
    try{
        const jobs = await Job.find({visible: true})
        .populate({path: 'companyId', select: '-password'})

        return res.json({
            success: true,
            jobs
        })
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
    
}


export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log("Looking for job with id:", jobId);

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(jobId).populate({
      path: 'companyId',
      select: '-password'
    });

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
