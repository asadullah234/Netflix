import React, { useEffect, useRef } from "react";
import './Navbar.css';
import { logout } from "../../firebase";
import netflix_Logo from "../../assets/logo.png";
import caret_icon from "../../assets/caret_icon.svg";
import profile_img from "../../assets/profile_img.png";
import bell_icon from "../../assets/bell_icon.svg";
import search_icon from "../../assets/search_icon.svg";


const Navbar = () => {
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {  // Check if ref exists
                if (window.scrollY >= 80) {
                    navRef.current.classList.add("nav-dark");
                } else {
                    navRef.current.classList.remove("nav-dark");
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);  // Empty dependency array means this runs once on mount

    return (
        <div className="navbar" ref={navRef}>
            <div className="navbar-left">
                <img src={netflix_Logo} alt="Netflix Logo" />
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse By Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={search_icon} alt="Search" />
                <p>Children</p>
                <img src={bell_icon} alt="Notifications" />
                <div className="navbar-profile">
                    <img src={profile_img} alt="Profile" className="profile" />
                    <img src={caret_icon} alt="Menu" />
                    <div className="dropdown">
                        <p onClick={logout}>Sign Out of Netflix</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;