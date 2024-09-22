import { useState, useEffect } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

const ToDo = () => {
  const [addtodo, setAddTodo] = useState("");
  const [task, setTask] = useState(() => {
    const newstorage = localStorage.getItem("todoApp");
    if (!newstorage) return [];
    return JSON.parse(newstorage);
  });
  const [dateinput, setDate] = useState("");

  // Handle input change
  const handleinputChange = (value) => {
    setAddTodo(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!addtodo) {
      return;
    }
    if (task.some((t) => t.text === addtodo)) {
      setAddTodo("");
      return;
    }
    setTask((prev) => [...prev, { text: addtodo, completed: false }]);
    setAddTodo("");
  };
  //localstrorage
  localStorage.setItem("todoApp", JSON.stringify(task));

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();

      setDate(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle task completion
  const toggleCompletion = (index) => {
    const newTasks = task.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTask(newTasks);
  };

  // Delete a task
  const deleteTodo = (index) => {
    const newTodos = task.filter((_, i) => i !== index);
    setTask(newTodos);
  };

  // Clear all tasks
  const clearAllTodos = () => {
    setTask([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">ToDo List</h1>
      <p className="mb-4">{dateinput}</p>

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            autoComplete="off"
            type="text"
            name="todo"
            value={addtodo}
            onChange={(e) => handleinputChange(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            placeholder="Add a new task"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>
      <div className="w-full max-w-md">
        <ul className="space-y-2">
          {task.map((curr, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 bg-white shadow-md rounded-md ${
                curr.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <span>{curr.text}</span>
              <div className="space-x-2">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => toggleCompletion(index)}
                >
                  <MdCheck size={24} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(index)}
                >
                  <MdDeleteForever size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <button
            onClick={clearAllTodos}
            className="p-2 text-white shadow-md rounded-md mt-4 bg-red-600"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
