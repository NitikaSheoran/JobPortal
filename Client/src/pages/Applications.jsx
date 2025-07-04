import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from 'moment'
import { useCallback } from "react";
import { useContext } from "react";
import App from "../App";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
function Applications(){

    const [isEdit, setisEdit] = useState(false);
    const [resume, setResume] = useState(null);
    const {backendUrl, userData, userApplications, fetchUserData, fetchUserApplications} = useContext(AppContext)
    const {user} = useUser();
    const {getToken} = useAuth();

    const updateResume = async () => {
        try {
            const formData = new FormData()
            formData.append('resumeFile', resume)
            const token = await getToken();
            const {data} = await axios.post(backendUrl+'/api/user/update-resume', formData, {headers: {Authorization: `Bearer ${token}`}})
            if(data.success){
                toast.success(data.message)
                await fetchUserData();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

        setisEdit(false)
        setResume(null)
    }

    useEffect(()=>{
        if(user){
            fetchUserApplications()
        }
    }, [user])

    return(
        <>
        <Navbar />
        <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
            <h2 className="text-xl font-semibold">Your Resume</h2>
            <div className="mb-6 mt-3">
                {
                    isEdit || userData && userData.resume==='' ? 
                    <>
                    <label className="flex items-center" htmlFor="resumeUpload">
                        <p className="bg-blue text-blue-600 px-4 py-2 rounded-lg mr-2">{resume? resume.name : "Select Resume"}</p>
                        <input className="border border-blue-200 rounded-2xl mr-2 py-2 px-4" type="file" onChange = {e=>setResume(e.target.files[0])} accept="application/pdf" />
                        <img src={assets.profile_upload_icon} alt="" />
                    </label>
                    <button onClick={updateResume} className="bg-green-100 border border-green-400 rounded-lg px-4 py-2">Save</button>
                    </> : 
                    <div className="flex gap-2">
                        <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg" href= {userData.resume} target="blank" >Resume</a>
                        <button onClick={()=>setisEdit(true)} className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2">Edit</button>
                    </div>
                }
                <div className="my-10 px-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Jobs Applied</h2>
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold uppercase">
                            <tr>
                            <th className="px-6 py-3">Company</th>
                            <th className="px-6 py-3">Job Title</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {userApplications.map((job, index) =>
                            // job.jobId ? (
                            true ? (
                                <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={job.companyId.image} alt="logo" className="h-6 w-6 object-contain" />
                                    <span className="text-gray-800 font-medium">{job.companyId.name}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{job.jobId.title}</td>
                                <td className="px-6 py-4 text-gray-600">{job.jobId.location}</td>
                                <td className="px-6 py-4 text-gray-500">{moment(job.date).format("ll")}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                    ${job.status === "Accepted" ? "bg-green-100 text-green-700" : 
                                        job.status === "Rejected" ? "bg-red-100 text-red-700" : 
                                        "bg-yellow-100 text-yellow-700"}`}>
                                    {job.status}
                                    </span>
                                </td>
                                </tr>
                            ) : null
                            )}
                        </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}
export default Applications;