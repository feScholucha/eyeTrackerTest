import React, { useEffect, useRef, useState } from 'react';
import GameWorld from './components/GameWorld';
import './App.css';

function App() {
  const [coordy, setY] = useState([])
  const [coordx, setX] = useState([])
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

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

        gameRef.current = new GameWorld(canvasRef.current);
        // console.log(gameWorld.gameObjects[0])
      }
      else {
        const gameWorld = gameRef.current;
        console.log(canvasRef.current.offsetLeft, canvasRef.current.offsetTop)

        // console.log(gameWorld.gameObjects[0])
        gameWorld.gameObjects[0].x = coordx - canvasRef.current.offsetLeft;
        gameWorld.gameObjects[0].y = coordy - canvasRef.current.offsetTop;
        gameWorld.gameObjects[0].vx = coordx - canvasRef.current.offsetLeft;
        gameWorld.gameObjects[0].vy = coordy - canvasRef.current.offsetTop;
      }
    }
  }, [coordx, coordy]);



  return (
    <div className="App-header">
      <p>Teste EyeTracker detecção de colisão</p>
      <canvas
        ref={canvasRef}
        width="1200"
        height="600"
        style={{ border: '1px solid lightgrey' }}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  );
}

export default App;