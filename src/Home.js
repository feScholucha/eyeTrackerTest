import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="App-header">
            <h1>Home Page</h1>
            <br />
            <ul>
                <li>
                    <Link to="/teclado">Teclado Teste</Link>
                </li>
            </ul>
        <div>
        </div>
        </div>
    );
};

export default Home;