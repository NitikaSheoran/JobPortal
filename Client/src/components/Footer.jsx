import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useClerk } from "@clerk/clerk-react";


function Footer() {
  const { userData } = useContext(AppContext);
  const { openSignIn } = useClerk();
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + Description */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Rozgar<span className="text-blue-600">Setu</span>
            </h1>
            <p className="text-sm text-gray-600">
              Empowering careers. Bridging opportunities between talent and companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
              {userData && (
                <li><a href="/applications" className="hover:text-blue-600 transition">My Applications</a></li>
              )}
              <li><a href="/about" className="hover:text-blue-600 transition">About Us</a></li>
              {!userData && (
                <li><button onClick={() => openSignIn()}
                className="hover:text-blue-600 transition text-left">
                    Login
                </button></li>
              )}
            </ul>
          </div>

          

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-sm text-gray-600">Email: nitikasheoran5@gmail.com</p>
            <div className="flex gap-4 mt-4">
              <a href="https://www.linkedin.com/in/nitika-sheoran-891414282/" target="_blank" rel="noreferrer" className="hover:text-blue-600 text-sm transition">LinkedIn</a>
              <a href="https://github.com/NitikaSheoran" target="_blank" rel="noreferrer" className="hover:text-blue-600 text-sm transition">GitHub</a>
              <a href="#" className="hover:text-blue-600 text-sm transition">Twitter</a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} RozgarSetu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
