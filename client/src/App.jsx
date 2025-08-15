import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import ResetPassword from './pages/login/ResetPassword.jsx'
import Home from './pages/Home'
import Login from './pages/login/Login.jsx'
import EmailVerified from './pages/login/EmailVerified.jsx'
import DashboardMetrics from './pages/Metrics'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadGrid from './pages/LoadGrid.jsx'
import Sites from './pages/sites/Sites.jsx'
import Load from './pages/Load.jsx'
import VerifyOtp from './pages/login/VerifyOTP.jsx'




const App = () => {
  return (
    <div >
      <ToastContainer />
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verified" element={<EmailVerified />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/metrics" element={<DashboardMetrics/>} />
        <Route path="/loadboard" element={<LoadGrid/>} />
        <Route path="/sites" element={<Sites/>} />
        <Route path="/load" element={<Load/>} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>

    </div>
  )
}

export default App
