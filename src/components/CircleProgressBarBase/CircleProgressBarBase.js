import React, { useState, useEffect } from "react";
import ButtonAtom from "../button-atom";
import { string, number, bool } from "prop-types";

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: "0 0 38 38",
  x: "19",
  y: "19",
  radio: "15.91549430918954",
};

const CircleProgressBarBase = ({
  className,
  strokeColor,
  strokeWidth,
  innerText,
  legendText,
  percentage,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  speed,
}) => {
  const [progressBar, setProgressBar] = useState(0);
  const [paused, setPaused] = useState(false);
  let timeOut = setTimeout(10);

  const pace = percentage / speed;
  const updatePercentage = () => {
    timeOut = setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
  }, [progressBar]);

  const handleStart = () => {
    if (paused) {
      setPaused(false);
    } else {
      setProgressBar(0);
      if (percentage > 0) updatePercentage();
    }
    if (percentage > 0) updatePercentage();
  };
  const handlePause = () => {
    setPaused(true);
    clearTimeout(timeOut);
  };

  return (
    <div
      className="loading-container"
      style={{ height: "100%", width: "50%", textAlign: "center" }}
    >
      <figure className={className}>
        <svg viewBox={circleConfig.viewBox}>
          <circle
            className="donut-ring"
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke={trailStrokeColor}
            strokeWidth={trailStrokeWidth}
            strokeDasharray={trailSpaced ? 1 : 0}
          />

          <circle
            className="donut-segment"
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progressBar} ${100 - progressBar}`}
            strokeDashoffset={INITIAL_OFFSET}
          />

          <g className="chart-text">
            <text x="50%" y="50%" className="chart-number">
              {progressBar}%
            </text>
          </g>
        </svg>
        {legendText && (
          <figcaption className="figure-key">
            <ul
              className="figure-key-list"
              aria-hidden="true"
              role="presentation"
            >
              <li>
                <span className="shape-circle" />
                <span>{legendText}</span>
              </li>
            </ul>
          </figcaption>
        )}
      </figure>
      <div>
        <ButtonAtom text="Start" onClick={handleStart} />
        <ButtonAtom text="Pause" onClick={handlePause} />
      </div>
    </div>
  );
};

CircleProgressBarBase.propTypes = {
  className: string.isRequired,
  strokeColor: string,
  strokeWidth: number,
  innerText: string,
  legendText: string,
  percentage: number,
  trailStrokeWidth: number,
  trailStrokeColor: string,
  trailSpaced: bool,
  speed: number,
};

CircleProgressBarBase.defaultProps = {
  strokeColor: "blueviolet",
  strokeWidth: 1,
  innerText: "Completed",
  legendText: "",
  percentage: 0,
  trailStrokeWidth: 1,
  trailStrokeColor: "#d2d3d4",
  trailSpaced: false,
  speed: 1,
};

export default CircleProgressBarBase;
