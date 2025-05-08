import React, { useEffect, useRef, useState } from "react";
import KeyboardCanvas from "./KeyboardCanvas";
import Callibrator from "./Callibrator";
import "./Controller.css";

let operacional = false;

const Controller = () => {
    const [coordy, setY] = useState([])
    const [coordx, setX] = useState([])
    const canvasRef = useRef(null);
    const keyboardRef = useRef(null);
    const screenRef = useRef(null);
    const kScreenRef = useRef(null);

    useEffect(() => {// Configura e inicia o WebGazer
        if (window.webgazer) {
            window.webgazer.clearData();
            window.webgazer.setGazeListener((data, elapsedTime) => {
                if (data) {
                    setX(data.x)
                    setY(data.y)
                }
            }).begin();
            // O que deve aparecer de câmera
            window.webgazer
                .showVideo(false)
                .showFaceOverlay(false)
                .showFaceFeedbackBox(false)
                .showPredictionPoints(true);
        }
    }, [])

    useEffect(() => {// Setup da calibração
        if (canvasRef.current) {
            if (screenRef.current === null) {
                screenRef.current = new Callibrator(canvasRef.current);
        }
            else if (!operacional) {
                const screenActive = screenRef.current;
                screenActive.cursor.x = coordx - canvasRef.current.offsetLeft;
                screenActive.cursor.y = coordy - canvasRef.current.offsetTop;
            }   
        }
    }, [coordx, coordy]);
    useEffect(() => {// Setup da calibração
        if (keyboardRef.current) {
            if (kScreenRef.current === null) {
                kScreenRef.current = new KeyboardCanvas(keyboardRef.current);
        }
            else if (operacional){
                const kScreenActive = kScreenRef.current;
                kScreenActive.cursor.x = coordx - keyboardRef.current.offsetLeft;
                kScreenActive.cursor.y = coordy - keyboardRef.current.offsetTop;
            }   
        }
    }, [coordx, coordy]);

    if (screenRef.current !== null) {// Ativar Alvo
        const screenActive = screenRef.current;
        window.onclick = function (event) {
            screenActive.primed = 1;
        }
        operacional = screenActive.activateUse;
    }

    // operacional = true; //Toggle da calibragem
    if (operacional) //Teclado
    {
        return (
            <div>
                    <canvas
                        id="mainScreen"
                        ref={keyboardRef}
                        width={String(window.innerWidth-3)}
                        height={String(window.innerHeight-6)}
                        style={{ border: '1px solid lightgrey' }}>
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
            </div>
        );
    }
    else //Calibragem
    {
        return (
                <div className="baseKeyboard">
                    <canvas
                        id="mainScreen"
                        ref={canvasRef}
                        width={String(window.innerWidth-3)}
                        height={String(window.innerHeight-6)}
                        style={{ border: '1px solid lightgrey' }}>
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
                </div>
        );
    }
}
export default Controller;