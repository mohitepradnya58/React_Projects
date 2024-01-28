import React, { useState } from "react";
import Data from "./components/Data";
import List from "./components/List";

function App() {
  const [student, setStudent] = useState(Data);

  return (
    <>
      <div className="w-screen h-screen grid place-content-center bg-blue-200">
        <div className="text-2xl mb-5 text-center">
          {student.length} Students
        </div>
        <div className="bg-white p-5 rounded-xl sm:w-96 w-full">
          <List people={student} />
        </div>
        <button
          onClick={() => setStudent([])}
          className="bg-blue-600 rounded-md p-3 text-white mt-5"
        >
          Clear All
        </button>
      </div>
    </>
  );
}

export default App;
