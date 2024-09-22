import React from "react";

const Quizlist = ({
  question,
  options,
  handleclick,
  optionans,
  handleSelect,
}) => {
  return (
    <div>
      <h1>{question}</h1>
      <ul>
        {options.map((option, index) => {
          return (
            <li
              key={index}
              onClick={() => handleclick(option)}
              className={optionans === option ? "alicebg" : "graybg"}
            >
              {option}
            </li>
          );
        })}
      </ul>

      <button
        className={optionans === "" ? "disable" : "enable"}
        onClick={handleSelect}
        disabled={optionans === ""}
      >
        Next Question
      </button>
    </div>
  );
};

export default Quizlist;
