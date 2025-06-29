import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations,  } from "../assets/assets";
import JobCart from "./jobCart";

function JobListing() {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

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

        {/* Category Filter */}
        <div className="hidden lg:block mb-10">
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
                />
                <label htmlFor={`cat-${index}`}>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className="hidden lg:block">
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
          {jobs.map((job, index) => (
            <JobCart key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default JobListing;
