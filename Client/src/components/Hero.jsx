import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <section className="bg-blue-50 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Left content */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
            Find Jobs That Match Your Skills
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Over <span className="text-blue-600 font-semibold">10,000+ opportunities</span> are waiting for you. Search, apply, and work with top companies.
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 max-w-xl">
            {/* Job Title Input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-3" />
              <input
                type="text"
                ref={titleRef}
                placeholder="Job title or keyword"
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <img src={assets.location_icon} alt="location" className="w-5 h-5 mr-3" />
              <input
                type="text"
                ref={locationRef}
                placeholder="Enter location"
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={onSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
            >
              🔍 Search Jobs
            </button>
          </div>
        </div>

        {/* Right illustration / trusted companies */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <h3 className="text-gray-700 font-medium mb-4 text-center sm:text-left">
              Trusted by top companies:
            </h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-6">
              <img className="h-6 sm:h-8 object-contain" src={assets.microsoft_logo} alt="Microsoft" />
              <img className="h-6 sm:h-8 object-contain" src={assets.accenture_logo} alt="Accenture" />
              <img className="h-6 sm:h-8 object-contain" src={assets.walmart_logo} alt="Walmart" />
              <img className="h-6 sm:h-8 object-contain" src={assets.samsung_logo} alt="Samsung" />
              <img className="h-6 sm:h-8 object-contain" src={assets.amazon_logo} alt="Amazon" />
              <img className="h-6 sm:h-8 object-contain" src={assets.adobe_logo} alt="Adobe" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
