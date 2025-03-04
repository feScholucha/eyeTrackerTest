import React, {useEffect, useRef, useState } from 'react';
import './App.css';
import CallWorld from './components/CallWorld';
import { Button, ButtonGroup } from "react-bootstrap";

/*A seção mestre do código, contém o gerenciador do webgazer e o elemento de canvas*/

function App() {
  const [coordy, setY] = useState([])
  const [coordx, setX] = useState([])
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleGlobalMouseMove = event => {
      if (event.target.id === "mainScreen" && window.webgazer) {
        window.webgazer.resume();
      }
      else {
        window.webgazer.pause();
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener(
        'mousemove',
        handleGlobalMouseMove,
      );
    };
  }, []);

  useEffect(() => {
    if (window.webgazer) {
      // Configura e inicia o WebGazer
      window.webgazer.clearData();
      window.webgazer.setGazeListener((data, elapsedTime) => {
        if (data) {
          // console.log(`Olhar em x: ${data.x}, y: ${data.y} no tempo ${elapsedTime}`);
          setX(data.x)
          setY(data.y)
        }
      })
        .begin();

      // Oculta elementos extras do WebGazer
      window.webgazer
        .showVideo(true)
        .showFaceOverlay(true)
        .showFaceFeedbackBox(true)
        .showPredictionPoints(false);
    }
  }, [])
  useEffect(() => {
    if (canvasRef.current) {
      if (gameRef.current === null) {

        gameRef.current = new CallWorld(canvasRef.current);
        // console.log(gameWorld.gameObjects[0])
      }
      else {
        const gameWorld = gameRef.current;
        // console.log(canvasRef.current.offsetLeft, canvasRef.current.offsetTop)

        // console.log(gameWorld.gameObjects[0])
        gameWorld.gameObjects[0].x = coordx - canvasRef.current.offsetLeft;
        gameWorld.gameObjects[0].y = coordy - canvasRef.current.offsetTop;
        gameWorld.gameObjects[0].vx = coordx - canvasRef.current.offsetLeft;
        gameWorld.gameObjects[0].vy = coordy - canvasRef.current.offsetTop;
      }
    }
  }, [coordx, coordy]);

  if (gameRef.current !== null) {
    const gameWorld = gameRef.current;
    window.onclick = function (event) {
      gameWorld.primed = 1;
      // console.log(gameWorld.primed);
    }
  }
  
  return (
    <div className="App-header">
      <p>Teste EyeTracker</p>
      <canvas
        id="mainScreen"
        ref={canvasRef}
        width="1200"
        height="600"
        style={{ border: '1px solid lightgrey' }}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <ButtonGroup aria-label="Basic example">
        <Button onClick={() => gameRef.current.swapLayout(0)} variant="secondary">4</Button>
        <Button onClick={() => gameRef.current.swapLayout(1)} variant="secondary">5</Button>
        <Button onClick={() => gameRef.current.swapLayout(2)} variant="secondary">6</Button>
        <Button onClick={() => gameRef.current.swapLayout(3)} variant="secondary">9</Button>
      </ButtonGroup>

    </div>
  );
}

export default App;