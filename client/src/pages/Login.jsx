import React from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets.js';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const Login = () => {

  const [state, setState] = useState('Login');

  return (
    <div className = 'bg-gray-200 flex items-center justify-center min-h-screen px-6 sm:px-0'>
         
        <div className='bg-[rgb(15,41,60)] p-10 rounded-lg shadow-lg w-full sm:w-96 text-black'>
          <img src = {assets.miniLogo} alt="Logo" className='mx-auto block mb-4' />
          <h2 className='text-3xl font-seibold text-center mb-6 text-white'>{state === 'Login' ? 'Login' : 'Create Account'}</h2>

        <form>
          {state === 'Register' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200'>
            <FaUserAlt className="text-yellow-500 text-2xl"  />
            <input className='bg-transparent outline-none' type="text" placeholder= "Name" required/>
          </div>)}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200'>
            <MdEmail className="text-yellow-500 text-2xl"  />
            <input className='bg-transparent outline-none' type="email" placeholder= "Email" required/>
          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200'>
              <RiLockPasswordFill className="text-yellow-500 text-2xl"  />
              <input className='bg-transparent outline-none' type="password" placeholder= "Password" required/>
          </div>
          {state ==='Login' && (<p className='mb-4 text-white cursor-pointer'>Forgot Password?</p>)}
          <button className='bg-yellow-500 w-full py-2.5 px-2 rounded-full text-black cursor-pointer font-medium'>{state}</button>
        </form>
        
        {state === 'Register' ? (<p className='text-white text-center text-xs mt-4'>Already have an account?
          <span className='p-1.5 cursor-pointer underline' onClick={()=>setState('Login')}>Login Here</span>
        </p>) : (<p className='text-white text-center text-xs mt-4'>Need an Account?
          <span className='p-1.5 cursor-pointer underline' onClick={()=>setState('Register')}>Create an Account</span>
        </p>)}

      </div>
  </div>
  )
}

export default Login
