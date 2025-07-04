import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations,  } from "../assets/assets";
import JobCart from "./JobCart";

function JobListing() {

  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);



  const handleCategoryChange = (category) =>{
    setSelectedCategories(
        prev => prev.includes(category) ? prev.filter(c=> c!==category) : [...prev, category]
    )
  }

  const handleLocationChange = (location) =>{
    setSelectedLocations(
        prev => prev.includes(location) ? prev.filter(c=> c!==location) : [...prev, location]
    )
  }

  useEffect(()=>{

    const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
    const newFilteredJobs = jobs.slice().reverse().filter(
        job => matchesCategory(job) && matchesLocation(job) && matchesSearchLocation(job) && matchesTitle(job)
    )

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter])

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-6 py-10">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full shadow ml-3 pl-2 pt-3 rounded-xl bg-gray-50">
        {/* Active Search Filter */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-blue-700 mb-2">Current Search</h3>
            <div className="flex flex-wrap gap-2">
              {searchFilter.title && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center text-sm">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    src={assets.cross_icon}
                    alt=""
                    className="w-4 h-4 ml-2 cursor-pointer"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center text-sm">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    src={assets.cross_icon}
                    alt=""
                    className="w-4 h-4 ml-2 cursor-pointer"
                  />
                </span>
              )}
            </div>
          </div>
        )}

        <button onClick={e=>setShowFilter((prev)=>!prev)} className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
            {showFilter ? "Close" : "Filter"}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Search by Categories
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  className="scale-125 accent-blue-600"
                  type="checkbox"
                  id={`cat-${index}`}
                  onChange={() => handleCategoryChange(category)}
                  checked = {selectedCategories.includes(category)}
                />
                <label htmlFor={`cat-${index}`}>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="text-lg font-semibold text-gray-700 mb-4 pt-4">
            Search by Location
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  className="scale-125 accent-blue-600"
                  type="checkbox"
                  id={`loc-${index}`}
                  onChange={()=>handleLocationChange(location)}
                  checked = {selectedLocations.includes(location)}
                />
                <label htmlFor={`loc-${index}`}>{location}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-1" id="job-list">
          Latest Jobs
        </h3>
        <p className="text-gray-600 mb-6 text-sm">
          Get your desired jobs from top companies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.slice((currentPage-1)*6, currentPage*6).map((job, index) => (
            <JobCart key={index} job={job} />
          ))}
        </div>


        {/* Pagination */}
          {/* currentpage logic => display 6 job cards on each page, for pagination length/6 pages,  jobs for certain index = currentpage-1 * 6 to currentpage6 */}

        {filteredJobs.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-10">
                <a href="#job-list">
                    <img onClick={()=> setCurrentPage(Math.max(currentPage-1, 1))}src={assets.left_arrow_icon} alt="" />
                </a>
                {Array.from({length: Math.ceil(filteredJobs.length/6)}).map((_, index)=>(
                    <a key={index} href="#job-list">
                        <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index+1 ? 'bg-blue text-blue-500': 'text-gray-500'}`}>{index+1}</button>
                    </a>
                ))}

                <a href="#job-list">
                    <img src={assets.right_arrow_icon} alt="" onClick={()=>setCurrentPage(Math.min(currentPage+1, Math.ceil(filteredJobs.length/6)))}/>
                </a>

            </div>
        )}
      </section>
    </div>
  );
}

export default JobListing;
