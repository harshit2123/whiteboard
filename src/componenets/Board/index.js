import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";
import toolboxContext from "../../store/ToolBox-context";
import { TOOL_ITEMS } from "../../constants";

function Board() {
  const canvasRef = useRef();
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    toolActionType,
    boardMouseUpHandler,
  } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINETOOL:
        case TOOL_ITEMS.RECTANGLETOOL:
        case TOOL_ITEMS.CIRCLETOOL:
        case TOOL_ITEMS.ARROWTOOL:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSHTOOL:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        default:
          throw new Error("Type not recognised");
      }
    });

    // Clear the canvas when component is unmounted or before each draw
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Corrected method
    };
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState); // Make sure this triggers state updates
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
