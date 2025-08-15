import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo.jsx';
import { AppContent } from '../../context/AppContext.jsx';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}api/auth/send-reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    if (!otp) return toast.error('Please enter the OTP');
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return toast.error('Please enter a new password');
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {!isEmailSent && (
        <div className="bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
          <Logo />
          <form onSubmit={onSubmitEmail}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              className="w-full px-4 py-2 bg-gray-200 border rounded mb-4"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-400"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <div className="bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
          <Logo />
          <form onSubmit={onSubmitOtp}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter Verification Code"
              className="w-full px-4 py-2 bg-gray-200 border rounded mb-4"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-400"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      )}

      {isEmailSent && isOtpSubmitted && (
        <div className="bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
          <Logo />
          <form onSubmit={onSubmitNewPassword}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Your New Password"
              className="w-full px-4 py-2 bg-gray-200 border rounded mb-4"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-400"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

