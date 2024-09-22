import { useState } from "react";
import Quizlist from "./component/Quizlist";
import Header from "./component/Header/Header";

function App() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Mars", "Venus", "Earth", "Mercury"],
      correctAnswer: "Mercury",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Pacific Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Michelangelo",
        "Leonardo da Vinci",
        "Vincent van Gogh",
        "Pablo Picasso",
      ],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "What is the highest mountain in the world?",
      options: [
        "Mount Kilimanjaro",
        "Mount Everest",
        "Mount McKinley",
        "Mount Fuji",
      ],
      correctAnswer: "Mount Everest",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionans, setOptionans] = useState("");
  const [score, setScore] = useState(0);

  const handleclick = (option) => {
    setOptionans(option);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleSelect = () => {
    setCurrentQuestion(currentQuestion + 1);
    setOptionans(""); // Reset the selected option for the next question
  };

  return (
    <>
      <div className="app">
        <Header />
        {currentQuestion < questions.length ? (
          <div>
            <Quizlist
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              optionans={optionans}
              handleclick={handleclick}
              handleSelect={handleSelect}
            />
          </div>
        ) : (
          <div className="score">Your Score is {score}</div>
        )}
      </div>
    </>
  );
}

export default App;
