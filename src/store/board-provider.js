import React, { useReducer } from "react";
import rough from "roughjs/bin/rough";
import boardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";

const gen = rough.generator();

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY } = action.payload;
      const newElement = {
        id: state.elements.length,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        roughEle: gen.line(clientX, clientY, clientX, clientY), // Create the rough element
      };
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,
        elements: [...prevElements, newElement], // Add new element to the array
      };
    }
    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      if (index >= 0) {
        // Ensure there is an element to update
        newElements[index] = {
          ...newElements[index],
          x2: clientX,
          y2: clientY,
          roughEle: gen.line(
            newElements[index].x1,
            newElements[index].y1,
            clientX,
            clientY
          ),
        };
      }
      return {
        ...state,
        elements: newElements,
      };
    }
    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES,
      };
    }
    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINETOOL,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  const handleToolItemClick = (tool) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TOOL,
      payload: {
        tool,
      },
    });
  };

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_MOVE,
      payload: {
        clientX,
        clientY,
      },
    });
  };
  const boardMouseUpHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_UP,
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    handleToolItemClick,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
