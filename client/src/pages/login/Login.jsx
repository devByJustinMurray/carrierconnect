import { useState, useContext } from 'react';

import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContent } from '../../context/AppContext'
import Header from '../../components/Header.jsx';
import { Link } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent);
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (state === 'Register') {
      const { data } = await axios.post(backendUrl + 'api/auth/register', { name, email, password });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/metrics');
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + 'api/auth/login', { email, password });

      if (data.requiresOtp) {
        // Store userId for OTP verification
        localStorage.setItem('pendingUserId', data.userId);
        navigate('/verify-otp');
        return;
      }

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/sites');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message || 'An error occurred while processing your request.');
  }
};

  return (
    <div><Header /> 
    <div className = "bg-gray-800 min-h-screen grid place-items-start pt-40 px-4">
      

        <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg mx-auto" >
      <Link to="/" className="flex items-center  justify-center space-x-2 ">
        <div className="bg-yellow-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-900 font-bold">
          CC
        </div>
        <span className="text-4xl font-semibold text-white">Carrier Connect</span>
      </Link>
          <h2 className='text-3xl font-semibold text-center mb-6 pt-4 text-white'>{state === 'Login' ? 'Login' : 'Create an Account'}</h2>
       
        {/*setting state and collecting name onchange*/}
        <form onSubmit={onSubmitHandler}>
          {state === 'Register' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200'>
            <FaUserAlt className="text-yellow-500 text-2xl"  />
            <input 
            onChange={e => setName(e.target.value)} 
            value={name} 
            className='bg-transparent outline-none' 
            type="text" 
            placeholder= "Name" 
            required/>
          </div>)}

        {/*setting state and collecting email onchange*/}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200'>
            <MdEmail className="text-yellow-500 text-2xl"  />
            <input 
            onChange={e => setEmail(e.target.value)}
            value={email}
            className='bg-transparent outline-none' 
            type="email" 
            placeholder= "Email" 
            required/>
          </div>

        {/*setting state and collecting password onchange*/}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-200'>
            <RiLockPasswordFill className="text-yellow-300 text-2xl"  />
            <input             
            onChange={e => setPassword(e.target.value)}
            value={password}
            className='bg-transparent outline-none' 
            type="password" 
            placeholder= "Password" 
            required/>
          </div>

          {state ==='Login' && (<p onClick={()=>navigate('/reset-password')} className='mb-4 text-white cursor-pointer'>Forgot Password?</p>)}
          <button className='bg-yellow-300 w-full py-2.5 px-2 rounded-full text-black cursor-pointer font-medium'>{state}</button>
        </form>
        
        {state === 'Register' ? (<p className='text-white text-center text-xs mt-4'>Already have an account?
          <span className='p-1.5 cursor-pointer underline' onClick={()=>setState('Login')}>Login Here</span>
          </p>) : (<p className='text-white text-center text-xs mt-4'>Need an Account?
          <span className='p-1.5 cursor-pointer underline ' onClick={()=>setState('Register')}>Create an Account</span>
          </p>)}

      </div>
  </div>
  </div> 
  )
}

export default Login

