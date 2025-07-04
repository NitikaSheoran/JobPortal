import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About <span className="text-blue-600">RozgarSetu</span></h1>
      <p className="text-gray-600 text-lg mb-10">
        RozgarSetu is a modern job portal designed to bridge the gap between job seekers and employers. 
        We aim to simplify the hiring process and empower individuals to discover the right opportunities 
        that match their skills and ambitions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600">
            We believe that access to the right opportunity can change lives. Our mission is to connect
            skilled individuals with companies that value talent — seamlessly, efficiently, and inclusively.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Easy job discovery with powerful search & filters</li>
            <li>Simple and intuitive job application process</li>
            <li>Resume upload and tracking applications in real-time</li>
            <li>Employers can post and manage jobs efficiently</li>
            <li>Secure login for both users and recruiters</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 bg-blue-50 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Join RozgarSetu Today</h2>
        <p className="text-gray-600 mb-4">Start exploring career opportunities or find the right candidates for your company.</p>
        <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default About;
