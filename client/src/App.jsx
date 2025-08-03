import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerified from './pages/EmailVerified'


const App = () => {
  return (
    <div >
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verified" element={<EmailVerified />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

    </div>
  )
}

export default App
