import { useState, useContext } from 'react';
import { assets } from '../assets/assets.js';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContent } from '../context/AppContext.jsx';

const Login = () => {

  const navigate = useNavigate();
  const {backendUrl, setIsLoggedIn} = useContext(AppContent);
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
        navigate('/metrics');
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + 'api/auth/login', { email, password });
      if (data.success) {
        setIsLoggedIn(true);
        navigate('/metrics');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message || 'An error occurred while processing your request.');
  }
}
  return (
    <div className = 'bg-gray-200 flex items-center justify-center min-h-screen px-6 sm:px-0'>
         
        <div className='bg-[rgb(15,41,60)] p-10 rounded-lg shadow-lg w-full sm:w-96 text-black'>
          <img onClick={()=>navigate('/')} 
          src = {assets.miniLogo} 
          alt="Carrier Connect Logo" 
          className='mx-auto block mb-4 cursor-pointer' />
          <h2 className='text-3xl font-semibold text-center mb-6 text-white'>{state === 'Login' ? 'Login' : 'Create an Account'}</h2>
       
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
            <RiLockPasswordFill className="text-yellow-500 text-2xl"  />
            <input             
            onChange={e => setPassword(e.target.value)}
            value={password}
            className='bg-transparent outline-none' 
            type="password" 
            placeholder= "Password" 
            required/>
          </div>

          {state ==='Login' && (<p onClick={()=>navigate('/reset-password')} className='mb-4 text-white cursor-pointer'>Forgot Password?</p>)}
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
