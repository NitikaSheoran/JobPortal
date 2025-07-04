import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    status: {
        type: String,
        default: "Pending"
    },
    date: {
        type: Number,
        required: true
    }
})

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
export default JobApplication