import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

function ViewApplications() {
  return (
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
          {viewApplicationsPageData.map((applicant, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3 flex items-center gap-2">
                <img
                  src={applicant.imgSrc}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="text-gray-800 font-medium">
                  {applicant.name}
                </span>
              </td>
              <td className="p-3">{applicant.jobTitle}</td>
              <td className="p-3">{applicant.location}</td>
              <td className="p-3">
                <a
                  href={applicant.resumeLink || "#"}
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
                <div className="relative inline-block text-left">
                  <button
                    className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                    onClick={() => {
                      const el = document.getElementById(`dropdown-${index}`);
                      el.classList.toggle("hidden");
                    }}
                  >
                    •••
                  </button>
                  <div
                    id={`dropdown-${index}`}
                    className="hidden absolute right-0 z-10 mt-2 w-28 bg-white border rounded shadow-md"
                  >
                    <button className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50">
                      Accept
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Reject
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApplications;
