import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function JobCart({ job }) {


  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300 ease-in-out">
  
      <div className="flex items-center justify-center mb-4">
        <img
          src={assets.company_icon}
          alt="company logo"
          className="h-10 w-10 object-contain"
        />
      </div>


      <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        {job.title}
      </h4>

  
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{job.location}</span>
        {job.level && <span>{job.level}</span>}
      </div>

      <p
        className="text-sm text-gray-600 mb-4"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150) + (job.description.length > 150 ? "..." : ""),
        }}
      ></p>

    
      <div className="flex justify-between mt-4">
        <button onClick = {()=> {navigate(`/apply-job/${job._id}`); scrollTo(0, 0)}} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
          Apply
        </button>
        <button onClick = {()=> {navigate(`/apply-job/${job._id}`); scrollTo(0, 0)}} className="text-gray-500 border border-gray-600 px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default JobCart;
