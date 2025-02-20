import React from 'react';
import './Home.css'; // Import the CSS for styling

const Home = () => {
    return (
        <div className="home-container">
            
            <div className="header">
                <h1 className="title">TRAINING STUDIO</h1>
                <h2 className="subtitle">WORK HARDER, GET STRONGER</h2>
                <h3 className="highlight">EASY WITH OUR <span className="gym-highlight">GYM</span></h3>
                <button className="cta-button">BECOME A MEMBER</button>
            </div>
        </div>
    );
};

export default Home;