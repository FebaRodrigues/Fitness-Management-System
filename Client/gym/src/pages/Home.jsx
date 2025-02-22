import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
    const navigate = useNavigate(); // Initialize navigation

    return (
        
        <div className="hero">
            <Navbar/>
            <div className="content">
                <h3>WORK HARDER, GET STRONGER</h3>
                <h1>EASY WITH OUR <span>GYM</span></h1>
                <button className="btn" onClick={() => navigate("/about")}>
                    BECOME A MEMBER
                </button>
            </div>
        </div>
    );
};

export default Home;
