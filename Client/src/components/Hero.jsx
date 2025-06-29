import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function Hero() {

  const {setSearchFilter, setIsSearched} = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch =  ()=>{
    setSearchFilter({
        title: titleRef.current.value,
        location: locationRef.current.value
    })
    setIsSearched(true);
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
     
      <div className="w-full max-w-6xl py-16 px-6 sm:px-10 rounded-3xl mx-auto my-10 bg-gradient-to-r from-blue-100 to-blue-200 text-center shadow-md space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Over 10,000+ Jobs to Apply
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Find daily-wage jobs near you in seconds.
          <br className="sm:hidden" />
          Trusted by thousands of workers and employers.
        </p>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full sm:w-1/3 shadow border border-gray-300">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-5 h-5 mr-2"
            />
            <input
              type="text"
              ref={titleRef}
              placeholder="Search for jobs"
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
            />
          </div>

         
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full sm:w-1/3 shadow border border-gray-300">
            <img
              src={assets.location_icon}
              alt="location"
              className="w-5 h-5 mr-2"
            />
            <input
              type="text"
              ref={locationRef}
              placeholder="Location"
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
            />
          </div>

      
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow transition duration-200 w-full sm:w-auto" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>

     
      <div className="w-full max-w-5xl border border-gray-200 shadow-sm px-6 py-4 mb-10 bg-white rounded-2xl">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <p className="text-gray-500 text-sm font-medium">Trusted by</p>
          <img
            className="h-6 sm:h-8 object-contain"
            src={assets.microsoft_logo}
            alt="Microsoft"
          />
          <img
            className="h-6 sm:h-8 object-contain"
            src={assets.accenture_logo}
            alt="Accenture"
          />
          <img
            className="h-6 sm:h-8 object-contain"
            src={assets.walmart_logo}
            alt="Walmart"
          />
          <img
            className="h-6 sm:h-8 object-contain"
            src={assets.samsung_logo}
            alt="Samsung"
          />
          <img
            className="h-6 sm:h-8 object-contain"
            src={assets.amazon_logo}
            alt="Amazon"
          />
          <img
            className="h-6 sm:h-8 object-contain"
            src={assets.adobe_logo}
            alt="Adobe"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
