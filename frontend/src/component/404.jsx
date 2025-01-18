import React from "react";
import { Link } from "react-router-dom";
import "../styles/404.css"; // Add styles if needed

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
            <img
                src="https://via.placeholder.com/300x200.png?text=Lost+Page" 
                alt="404 Not Found"
                className="not-found-image"
            />
            <p>It seems you've ventured too far.</p>
            <Link to="/" className="back-home-button">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;

// mongodb+srv://Dpboss:DPboss-services@cluster0.tjnf0.mongodb.net/DPboss