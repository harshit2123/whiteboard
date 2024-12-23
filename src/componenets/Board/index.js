import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/ToolBox-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";

function Board() {
  const canvasRef = useRef();
  const {
    elements,
    toolActionType,
    boardMouseDownHandler,
    boardMouseMoveHandler,
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
        case TOOL_ITEMS.TEXT:
          console.log("Something");
          break;
        default:
          throw new Error("Type not recognised");
      }
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState);
  };

  const handleBoardMouseMove = (event) => {
    boardMouseMoveHandler(event);
  };

  const handleBoardUpMove = (event) => {
    boardMouseUpHandler();
  };

  // // Get the last element safely
  // const lastElement =
  //   elements.length > 0 ? elements[elements.length - 1] : null;
  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
          type="text"
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          // onBlur={() => textAreaBlur(event.target.value)}
        />
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={handleBoardMouseDown}
        onMouseMove={handleBoardMouseMove}
        onMouseUp={handleBoardUpMove}
      />
    </>
  );
}

export default Board;
