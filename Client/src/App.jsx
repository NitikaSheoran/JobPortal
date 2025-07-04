import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import About from './pages/About'
import 'quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


function App() {

  const {showRecruiterLogin, companyToken} = useContext(AppContext)


  return (
    <>
    {showRecruiterLogin && <RecruiterLogin />}
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element = {<Dashboard />} >
        {companyToken ? <>
          <Route index element={<AddJob />} />
          <Route path='add-job' element = {<AddJob />} />
          <Route path='manage-jobs' element = {<ManageJobs />} />
          <Route path='view-applications' element = {<ViewApplications />} />
        </>: null}
          
        </Route>

      </Routes>
    </>
  )
}

export default App
