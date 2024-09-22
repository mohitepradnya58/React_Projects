import React, { useState, useRef, useEffect } from "react";
import "./ContTimer.css";

const ContTimer = () => {
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [isActive, setIsActive] = useState(false); // To track if the timer is active
  const [isPaused, setIsPaused] = useState(false); // To track if the timer is paused
  const [inputValue, setInputValue] = useState(""); // Store input value for reset
  const [isTimerEnded, setIsTimerEnded] = useState(false); // Timer end state

  const intervalRef = useRef(null);

  const handleInput = (e) => {
    const minutes = parseInt(e.target.value);
    if (!isNaN(minutes)) {
      setTimer(minutes * 60); // Convert minutes to seconds
      setInputValue(e.target.value); // Save the input value for reset
      setIsTimerEnded(false); // Reset end message if entering new value
    }
  };

  useEffect(() => {
    if (isActive && !isPaused && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      setIsPaused(false);
      setIsTimerEnded(true); // Show timer ended message
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, timer]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    setIsTimerEnded(false);
  };

  const pauseResumeTimer = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(parseInt(inputValue) * 60 || 0); // Reset to original input value
    setIsTimerEnded(false); // Clear end message
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <h1>Countdown Timer</h1>
      <input
        type="number"
        placeholder="Enter Time in minutes"
        onChange={handleInput}
        value={inputValue}
        className="input-field"
        disabled={isActive} // Disable input when timer is running
      />
      <p className="timer-display">{formatTime(timer)}</p>
      <div className="buttons">
        {!isActive ? (
          <button onClick={startTimer} className="btn start-btn">
            Start
          </button>
        ) : (
          <button onClick={pauseResumeTimer} className="btn pause-btn">
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        <button onClick={resetTimer} className="btn reset-btn">
          Reset
        </button>
      </div>
      {isTimerEnded && <p className="end-message">Your timer has ended!</p>}
    </div>
  );
};

export default ContTimer;
