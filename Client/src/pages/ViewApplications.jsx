import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
function ViewApplications() {

  const {backendUrl, companyToken} = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  const fetchCompanyJobApplications = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/company/applicants', {headers: {token: companyToken}})
      if(data.success){
        setApplicants(data.applicants.reverse())
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  const changeJobApplicationStatus = async(id, status) =>{
    try {
      const {data} = await axios.post(backendUrl + '/api/company/change-status', {id, status}, {headers: {token: companyToken}})
      if(data.success){
        fetchCompanyJobApplications()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobApplications()
    }
  }, [companyToken])


  return applicants ? applicants.length===0
  ?  (<div className="flex items-center justify-center h-[70vh]"><p className="text-xl sm:text-2xl">No Applications Available</p></div>) 
  : (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto mt-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Applications</h2>

      <table className="w-full text-left text-sm text-gray-600 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="p-3">#</th>
            <th className="p-3">User Name</th>
            <th className="p-3">Job Title</th>
            <th className="p-3">Location</th>
            <th className="p-3">Resume</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3 flex items-center gap-2">
                <img
                  src={applicant.userId.image}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="text-gray-800 font-medium">
                  {applicant.userId.name}
                </span>
              </td>
              <td className="p-3">{applicant.jobId.title}</td>
              <td className="p-3">{applicant.jobId.location}</td>
              <td className="p-3">
                <a
                  href={applicant.userId.resume || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline gap-1"
                >
                  Resume
                  <img
                    src={assets.resume_download_icon}
                    alt=""
                    className="w-4 h-4"
                  />
                </a>
              </td>
              <td className="p-3">
                {applicant.status.toLowerCase() === 'pending' ? 
                <div className="relative inline-block text-left">
                  <button
                    className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
                    onClick={() => {
                      const el = document.getElementById(`dropdown-${index}`);
                      el.classList.toggle("hidden");
                    }}
                  >
                    <span className="text-xl font-bold">⋮</span>
                  </button>
                  <div
                    id={`dropdown-${index}`}
                    className="hidden absolute right-0 z-20 mt-2 w-28 bg-white border rounded shadow-md"
                  >
                    <button onClick={()=>changeJobApplicationStatus(applicant._id, 'Accepted')} className="block w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50">
                       ✅ Accept
                    </button>
                    <button onClick={()=>changeJobApplicationStatus(applicant._id, 'Rejected')} className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      ❌ Reject
                    </button>
                  </div>
                </div>
                : <div>{applicant.status}</div>  
                }   
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <Loading />
}

export default ViewApplications;
