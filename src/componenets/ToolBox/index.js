import React, { useContext } from "react";
import cx from "classnames";
import classes from "./index.module.css";
import {
  COLORS,
  FILL_TOOL_TYPES,
  STROKE_TOOL_TYPES,
  SIZE_TOOL_TYPES,
} from "../../constants";
import toolboxContext from "../../store/ToolBox-context";
import boardContext from "../../store/board-context";

export const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext); // Changed from activeToolitem to activeToolItem
  const { toolboxState, changeStroke, changeFill, changeSize } =
    useContext(toolboxContext);

  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;

  return (
    <div className={classes.container}>
      {STROKE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          <div className={classes.colorContainer}>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: strokeColor === COLORS[k],
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeStroke(activeToolItem, COLORS[k])}
                />
              );
            })}
          </div>
        </div>
      )}
      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classes.colorContainer}>
            {Object.keys(COLORS).map((k) => (
              <div
                key={k}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: fillColor === COLORS[k],
                })}
                style={{ backgroundColor: COLORS[k] }}
                onClick={() => changeFill(activeToolItem, COLORS[k])}
              />
            ))}
          </div>
        </div>
      )}
      {SIZE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Brush Size</div>
          <input
            type="range"
            min="1"
            max="10"
            step={1}
            value={size}
            onChange={(event) =>
              changeSize(activeToolItem, parseInt(event.target.value))
            }
          />
        </div>
      )}
    </div>
  );
};
