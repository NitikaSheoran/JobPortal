import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { openSignIn } = useClerk();

  const { user } = useUser();
  const navigate = useNavigate();
  const {setShowRecruiterLogin} = useContext(AppContext)


  return (
    <div className="shadow-md py-4 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        
        <div className="flex items-center gap-3">
          <button onClick={()=>navigate('/')} className="text-xl font-bold text-black hover:text-black transition-colors duration-300"> Rozgar<span className="text-blue-800">Setu</span></button>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
            About
          </Link>

        {/* Right side */}
        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/applications" className="text-gray-700 hover:text-blue-600 font-medium">
              Applied Jobs
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-gray-800 font-medium">
              <span className="max-sm:hidden">Hi, {user.firstName + " " + user.lastName}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <button onClick={e=>setShowRecruiterLogin(true)} className="px-4 py-2 rounded-lg border text-gray-700 hover:text-blue-600 hover:border-blue-600 transition">
              Recruiter Login
            </button>
            <button
              onClick={openSignIn}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Navbar;
