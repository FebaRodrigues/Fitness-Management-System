import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    const navigate = useNavigate(); // Initialize navigation

    return (
        <div className="home-container">
            <Navbar />
            
            <div className="hero">
                <div className="content">
                    <h3>WORK HARDER, GET STRONGER</h3>
                    <h1>EASY WITH OUR <span>GYM</span></h1>
                    <button className="btn" onClick={() => navigate("/about")}>
                        BECOME A MEMBER
                    </button>
                </div>
            </div>
            
            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default Home;
