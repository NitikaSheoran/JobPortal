import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function RecruiterLogin() {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const {setShowRecruiterLogin} = useContext(AppContext)
  const onSubmit = async (e) =>{
    e.preventDefault()

    if(state === "Sign Up" && !isTextDataSubmitted){
        setIsTextDataSubmitted(true)
    }
  }

  useEffect(()=>{
    document.body.style.overflow='hidden'
    return () =>{
        document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6 relative">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Recruiter {state}
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Welcome back! Please {state === "Login" ? "sign in" : "register"} to
          continue
        </p>
        {state === "Sign Up" && isTextDataSubmitted 
        ? <>
        <div className="flex items-center gap-4 my-10">
            <label htmlFor="image" className="cursor-pointer flex items-center gap-3 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
                <img className="w-16 rounded-full" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                <input onChange={e=>setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            <p className="text-gray-700 text-sm">Upload company logo</p>
        </div>
        </>
        : <>

        {state !== "Login" && (
          <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50">
            <img src={assets.person_icon} alt="" className="h-5 w-5 mr-2" />
            <input
              type="text"
              placeholder="Company Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
        )}

        <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50">
          <img src={assets.email_icon} alt="" className="h-5 w-5 mr-2" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full bg-transparent focus:outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50">
          <img src={assets.lock_icon} alt="" className="h-5 w-5 mr-2" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full bg-transparent focus:outline-none text-gray-700"
          />
        </div>

        </> }

        {state === "Login" && <div className="text-right text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 mt-4"
        >
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "next"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>

        <img className="w-5 h-5 absolute top-4 right-4 cursor-pointer hover:scale-110 transition" src={assets.cross_icon} onClick={()=>setShowRecruiterLogin(false)}/>
      </form>
    </div>
  );
}

export default RecruiterLogin;
