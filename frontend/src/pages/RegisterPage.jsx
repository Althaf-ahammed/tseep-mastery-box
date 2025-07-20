import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "Student",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/auth/register", formData);
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-6 shadow-lg">
        <div className="relative">
          <h2 className="flex flex-col text-3xl font-semibold text-center mb-4 z-10 relative">
            Register
          </h2>
            <span className="absolute bottom-0 left-25 block h-1.5 w-35 bg-yellow-400 mx-auto mt-1 rounded"></span>
        </div>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-2">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xl font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              className="border-gray-300 border p-2 w-full rounded mt-2"
              required
            />
          </div>
          <div>
            <label className="text-xl font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              required
            />
          </div>
          <div>
            <label className="text-xl font-medium">Mobile Number</label>
            <div className="flex mt-2">
              <span className="flex items-center border border-gray-300 p-2 rounded mr-2">
                +91
              </span>
              <input
                type="text"
                name="mobile"
                placeholder="Enter your phone number"
                value={formData.mobile}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xl font-medium">Current Status</label>
            <div className="flex items-center space-x-4 mt-2.5">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={formData.role === "Student"}
                  onChange={handleChange}
                />
                <span>Student</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="role"
                  value="Employee"
                  checked={formData.role === "Employee"}
                  onChange={handleChange}
                />
                <span>Employee</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-xl font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#224957] text-white p-2 rounded w-full hover:bg-[#1b3c46] transition"
          >
            Save
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
