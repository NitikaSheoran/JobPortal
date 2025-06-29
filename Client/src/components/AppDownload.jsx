import React from "react";
import { assets } from "../assets/assets";

function AppDownload() {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl p-10 shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Download Mobile App for Better Experience
            </h1>
            <div className="flex gap-4">
              <a href="#" className="inline-block">
                <img className="h-12" src={assets.app_store} alt="App Store" />
              </a>
              <a href="#" className="inline-block">
                <img className="h-12" src={assets.play_store} alt="Play Store" />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              className="w-80 max-h-[400px] object-contain"
              src={assets.app_main_img}
              alt="Mobile App"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDownload;
