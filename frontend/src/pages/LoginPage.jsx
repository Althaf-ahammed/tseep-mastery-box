import { useState, useContext } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('/auth/login', { mobile, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user); 
            navigate('/test/687bf9f49dc68eac0dc0ee99'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-lg">
        <div className="relative">
          <h2 className="flex flex-col text-3xl text-[#2a586f] font-semibold text-center mb-4 z-10 relative">
            Login
          </h2>
          <span className="absolute bottom-0 left-30 block h-1.5 w-23 bg-yellow-400 mx-auto mt-1 rounded"></span>
        </div>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xl font-medium">Mobile Number</label>
            <div className="flex mt-2">
              <span className="flex items-center border border-gray-300 p-2 mr-2 rounded ">
                +91
              </span>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xl font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#224957] text-white p-2 rounded w-full hover:bg-[#1b3c46] transition"
          >
            Login
          </button>
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
