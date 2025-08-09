import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
          toast.info('OTP sent to your email.');
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
        navigate('/sites'); // or wherever you want to go next
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
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;