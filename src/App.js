// import logo from './logo.svg';
// import './App.css';

import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef();
  useEffect(() => {}, []);
  return (
    <div className="App">
      <canvas width="100vw" height="100vh" />
      <h1>My whiteboard App</h1>
    </div>
  );
}

export default App;
