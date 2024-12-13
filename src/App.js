import { useEffect, useRef } from "react";
import rough from "roughjs";

function App() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");

    const roghCanvas = rough.canvas(canvas);
    const generator = roghCanvas.generator;

    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 150, 75);
  }, []);
  return (
    <div className="App">
      <canvas ref={canvasRef} />
      <h1>My whiteboard App</h1>
    </div>
  );
}

export default App;
