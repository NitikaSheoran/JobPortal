import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function AddJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const {backendUrl, companyToken} = useContext(AppContext)

  const editorRef = useRef(null);
  const quillRef = useRef(null);


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const description = quillRef.current.root.innerHTML
      const {data} = await axios.post(backendUrl + '/api/company/post-job', {title, description, location, salary, category, level}, {headers: {token: companyToken}})

      if(data.success === true){
        toast.success(data.message)
        setTitle("")
        setSalary(0)
        quillRef.current.setContents([]);
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.response?.data?.message || error.message)
    }

  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write the job description here...",
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow space-y-6 mt-5">
      <h2 className="text-2xl font-semibold text-gray-800">Add a New Job</h2>

      {/* Job Title */}
      <div>
        <label className="block text-gray-700 mb-1">Job Title</label>
        <input
          type="text"
          placeholder="e.g., React Developer"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-gray-700 mb-1">Job Description</label>
        <div
          ref={editorRef}
          className="h-48 bg-white border border-gray-300 rounded-md"
        ></div>
      </div>

      {/* Dropdowns & Salary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Job Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <select
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Level</label>
          <select
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Salary (in INR)</label>
          <input
            type="number"
            min={0}
            placeholder="2500"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add Job
        </button>
      </div>
    </form>
  );
}

export default AddJob;
