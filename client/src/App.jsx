import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerified from './pages/EmailVerified'
import DashboardMetrics from './pages/Metrics'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadGrid from './pages/LoadGrid.jsx'
import Sites from './pages/sites.jsx'



const App = () => {
  return (
    <div >
      <ToastContainer />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verified" element={<EmailVerified />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/metrics" element={<DashboardMetrics/>} />
        <Route path="/loadboard" element={<LoadGrid/>} />
        <Route path="/sites" element={<Sites/>} />
      </Routes>

    </div>
  )
}

export default App
