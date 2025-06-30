import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ManageJobs() {

    const navigate = useNavigate();
  return (
    <>
    <div className="p-6 mt-5 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Jobs</h2>

      <table className="w-full text-left text-sm text-gray-600 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="p-3">#</th>
            <th className="p-3">Job Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Location</th>
            <th className="p-3">Applicants</th>
            <th className="p-3 text-center">Visible</th>
          </tr>
        </thead>
        <tbody>
          {manageJobsData.map((job, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium text-gray-800">{job.title}</td>
              <td className="p-3">{moment(job.date).format("ll")}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3 text-blue-600 font-semibold">{job.applicants}</td>
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-400"
                  defaultChecked
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-4 flex justify-end">
        <button onClick={()=>navigate('/dashboard/add-job')} className="bg-black text-white py-2 px-4 rounded">Add new Job</button>
    </div>

    </>
    
  );
}

export default ManageJobs;
