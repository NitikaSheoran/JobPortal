import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const {user, isLoaded} = useUser();
    const {getToken} = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);


    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(() => {
        const stored = localStorage.getItem("companyData");
        return stored ? JSON.parse(stored) : null;
    });


    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([])


    // fetch userdata
    const fetchUserData = async()=>{
        try {
            const token = await getToken();
            console.log("Fetched Clerk token:", token);
            if (!token) return;
            const {data} = await axios.get(backendUrl + '/api/user/user', {headers: {Authorization: `Bearer ${token}`}})
            console.log(data)
            if(data.success){
                console.log("Fetched userData:", data.user); // ✅ debug
                setUserData(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // fetch jobs
    const fetchJobs = async() =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/job/')
            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCompanyData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/company/company', {headers: {token: companyToken}})
            if(data.success === true){
                setCompanyData(data.company)
                console.log(data)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchJobs();
        const storedCompanyToken = localStorage.getItem('companyToken')
        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }
    }, [])


    useEffect(()=>{
        if(companyToken){
            fetchCompanyData()
        }
    }, [companyToken])


    useEffect(()=>{
        if(isLoaded && user){
            fetchUserData()
        }
    },  [isLoaded,user])

    const value = {
        searchFilter,
        setSearchFilter,
        setIsSearched,
        isSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyData,
        setCompanyData,
        companyToken,
        setCompanyToken,
        backendUrl,
        userData,
        setUserApplications,
        setUserData,
        userApplications,
        fetchUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}