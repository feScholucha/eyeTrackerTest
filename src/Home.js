import React from "react";
import "./App.css";

// Importing Link from react-router-dom to 
// navigate to different end points.
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="App-header">
            <h1>Home Page</h1>
            <br />
            <ul>
                <li>
                    {/* Endpoint to route to Home component */}
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {/* Endpoint to route to Home component */}
                    <Link to="/callsetup">CallSetup</Link>
                </li>
                <li>
                    {/* Endpoint to route to Home component */}
                    <Link to="/gamesetup">GameSetup</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;