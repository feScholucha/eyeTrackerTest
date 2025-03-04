import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="App-header">
            <h1>Home Page</h1>
            <br />
            <ul>
            <p>
                Os testes atuais estão sendo feitos no primeiro link
            </p>
                <li>
                    <Link to="/callsetup">Calibração e Botões</Link>
                </li>
            <p>
                O segundo é um teste interno sem relação ao desenvolvimento atual
            </p>
                <li>
                    <Link to="/gamesetup">Joguinho de Teste (WIP)</Link>
                </li>
            </ul>
        <div>
        </div>
        </div>
    );
};

export default Home;