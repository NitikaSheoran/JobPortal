import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-converter";
import moment from 'moment';
import JobCart from "../components/jobCart";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

function ApplyJob() {
  

  const navigate = useNavigate()
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const {getToken} = useAuth();
  useEffect(() => {
    console.log("UserData in ApplyJob:", userData);
  }, [userData]);

  const fetchJob = async () => {
    try {
      const {data} = await axios.get(backendUrl + `/api/job/${id}`)
      if(data.success){
        setJobData(data.job)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };


  const applyHandler = async () => {
    try {
      console.log(userData)
      if(!userData){
        return toast.error("Login to apply for jobs")
      }

      if(!userData.resume){
        navigate('/applications')
        return toast.error("Upload resume to apply")
      }
      const token = await getToken();
      const {data} = await axios.post(backendUrl + '/api/user/apply', {jobId: jobData._id}, {headers: {Authorization: `Bearer ${token}`}})
      console.log("applied")
      if(data.success){
        toast.success(data.message)
        fetchUserApplications()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const [isAlreadyApplied, setisAlreadyApplied] = useState(false)
  const checkAlreadyAppplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === jobData._id)
    if(hasApplied){
      setisAlreadyApplied(true);
    }else{
      setisAlreadyApplied(false)
    }
  }

  useEffect(() => {
      fetchJob();
  }, [id]);

  useEffect(()=>{
    if(userApplications.length > 0 && jobData){
      checkAlreadyAppplied();
    }
  
  },[jobData, userApplications, id])

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen py-10 px-4 2xl:px-20 bg-gray-50">
        <div className="bg-white text-gray-800 rounded-2xl shadow-md p-8 max-w-7xl mx-auto space-y-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <img
                className="h-24 w-24 object-contain bg-white rounded-lg p-3 border"
                src={jobData.companyId.image}
                alt="Company Logo"
              />
              <div>
                <h1 className="text-2xl font-semibold mb-2">{jobData.title}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" className="h-4 w-4" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} className="h-4 w-4" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} className="h-4 w-4" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} className="h-4 w-4" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <button onClick={applyHandler} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition">
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="space-y-4 text-gray-700 leading-7 text-[15px] [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg [&>strong]:font-semibold [&>a]:text-blue-600 [&>a]:underline"
               dangerouslySetInnerHTML={{ __html: jobData.description }}>
              </div>

              <button onClick={applyHandler} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition">
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>

            {/* More Jobs from Company */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                More jobs from {jobData.companyId.name}
              </h2>
              <div className="space-y-4">
                {jobs
                  .filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.companyId._id === jobData.companyId._id
                  ).filter(job => {
                    // applied job ids
                    const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                    return !appliedJobsIds.has(job._id)
                  })
                  .slice(0, 3)
                  .map((job, index) => (
                    <JobCart key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default ApplyJob;
