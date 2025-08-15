import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';


const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const sendOtp = async () => {
      try {
        const res = await axios.post('/api/auth/send-verify-otp');
        if (res.data.success) {
          toast.info('Verification code has been sent to your email.');
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error('Failed to send OTP.');
      }
    };
    sendOtp();
  }, []);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/verify-account', { otp });
      if (res.data.success) {
        toast.success('Email verified!');
        navigate('/loadboard'); // or wherever you want to go next
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-gray-900 p-6 rounded shadow-md w-full max-w-md ">
        <Logo />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter Verification Code"
          className="w-full px-4 py-2 bg-gray-200 border rounded mb-4"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-400"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;