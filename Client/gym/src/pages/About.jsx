import React from "react";
import "../styles/About.css"; // Import the CSS file
import Navbar from "../components/Navbar";

const About = () => {
  const programs = [
    {
      title: "Basic Fitness",
      description:
         "Basic Fitness is a simple routine of exercise, nutrition, and consistency for overall health and well-being.",
    },
    {
      title: "New Gym Training",
      description:
        "If you wish to support TemplateMo website via PayPal, please feel free to contact us. We appreciate it a lot.",
    },
    {
      title: "Advanced Muscle Course",
      description:
        "You may want to browse through Digital Marketing or Corporate HTML CSS templates on our website.",
    },
    {
      title: "Yoga Training",
      description:
        "This template is built on Bootstrap v4.3.1 framework. It is easy to adapt the columns and sections.",
    },
    {
      title: "Basic Muscle Course",
      description:
        "Credit goes to Pexels website for images and video background used in this HTML template.",
    },
    {
      title: "Body Building Course",
      description:
        "Suspendisse fringilla et nisi et mattis. Curabitur sed finibus nisi. Integer nibh sapien, vehicula et auctor.",
    },
  ];

  return (
    <div className="about-container">
        <Navbar/>
      <h2 className="about-title">
        CHOOSE <span>PROGRAM</span>
      </h2>
      <p className="about-description">
      Basic Fitness is a simple routine of exercise, nutrition, and consistency for overall health and well-being.
      </p>

      <div className="program-grid">
        {programs.map((program, index) => (
          <div key={index} className="program-card">
            <div className="icon">💪</div> {/* Placeholder for an icon */}
            <div className="program-content">
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <a href="#" className="discover-link">
                DISCOVER MORE
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
