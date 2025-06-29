import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
function Home(){
    return(
        <>
        <Navbar />
        <Hero />
        <JobListing />
        </>
    )
}
export default Home;