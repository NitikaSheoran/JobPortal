import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Dashboard() {
  const navigate = useNavigate();
  const {companyData, setCompanyData, setCompanyToken} = useContext(AppContext)
  // console.log("Company Data in Dashboard:", companyData);
  const logout = async () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    localStorage.removeItem('companyData')
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer"
        />
        {companyData && (
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm">Welcome, {companyData.name}</p>
          <div className="relative">
            <img
                src={companyData.image}
                alt="Company Icon"
                className="h-10 w-10 rounded-full border cursor-pointer"
            />
            
            {/* Dropdown */}
            <ul className="absolute right-0 top-full mt-2 min-w-[8rem] bg-white border rounded-lg shadow-lg z-50">
                <li onClick = {()=>logout()} className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer text-sm rounded-t-lg">
                Logout
                </li>
            </ul>
          </div>

        </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-full shadow-md">
          <ul className="flex flex-col py-6 space-y-2 text-gray-700 text-sm">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-3 hover:bg-gray-100 transition-all ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                }`
              }
            >
              <img src={assets.add_icon} alt="" className="h-5 w-5" />
              <span>Add Job</span>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-3 hover:bg-gray-100 transition-all ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="h-5 w-5" />
              <span>Manage Job</span>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-3 hover:bg-gray-100 transition-all ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500 font-medium' : ''
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="" className="h-5 w-5" />
              <span>View Applications</span>
            </NavLink>
          </ul>
        </div>

        {/* Main Outlet */}
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
