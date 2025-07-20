import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { MdLogout } from "react-icons/md";
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const handleAvatarClick = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-white px-4 flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                <img src={logo} alt="Logo" className="h-27 w-auto" />
            </div>

            {user && (
                <div className="relative" ref={dropdownRef}>
                    <div
                        onClick={handleAvatarClick}
                        className="cursor-pointer w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold"
                    >
                        <img src={avatar} alt="Avatar" className="h-12 w-12 rounded-full" />
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow z-50">
                            <button
                                onClick={handleLogout}
                                className="flex gap-1 items-center text-red-600 w-full text-left px-4 py-2 bg-[#ffeaea] text-sm"
                            >
                                <MdLogout /> Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
