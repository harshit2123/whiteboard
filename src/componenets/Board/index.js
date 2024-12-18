import { useContext, useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";

function Board() {
  const canvasRef = useRef();
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    toolActionType,
    boardMouseUpHandler,
  } = useContext(boardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });

    // Clear the canvas when component is unmounted or before each draw
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Corrected method
    };
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    boardMouseDownHandler(event); // Make sure this triggers state updates
  };
  const handleBoardMouseMove = (event) => {
    if (toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      boardMouseMoveHandler(event); // Make sure this triggers state updates
    }
  };
  const handleBoardUpMove = (event) => {
    boardMouseUpHandler();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleBoardMouseDown}
      onMouseMove={handleBoardMouseMove}
      onMouseUp={handleBoardUpMove}
    />
  );
}

export default Board;
