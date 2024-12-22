import React, { useContext } from "react";
import cx from "classnames";
import classes from "./index.module.css";
import { COLORS } from "../../constants";
import toolboxContext from "../../store/ToolBox-context";
import boardContext from "../../store/board-context";

export const Toolbox = () => {
  const { activeToolitem } = useContext(boardContext);
  const { toolboxState, changeStroke, changeFill } = useContext(toolboxContext);
  const strokeColor = toolboxState[activeToolitem]?.stroke;
  const fillColor = toolboxState[activeToolitem]?.fill;

  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke</div>
        <div className={classes.colorContainer}>
          {Object.keys(COLORS).map((k) => (
            <div
              key={k}
              className={cx(classes.colorBox, {
                [classes.activeColorBox]: strokeColor === COLORS[k],
              })}
              style={{ backgroundColor: COLORS[k] }}
              onClick={() => changeStroke(activeToolitem, COLORS[k])}
            />
          ))}
        </div>
      </div>
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
              onClick={() => changeFill(activeToolitem, COLORS[k])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
