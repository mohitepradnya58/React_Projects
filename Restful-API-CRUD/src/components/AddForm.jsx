import React, { useState } from "react";
import ViewForm from "./ViewForm";
import axios from "axios";

const AddForm = ({ getData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [alert, setAlert] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const onHandleSubmit = () => {
    if (!name || !email || !number) {
      setAlert("Please fill in all fields");
      setAlertClass("text-red-500");
      return;
    }
    axios
      .post("https://65b61298da3a3c16ab002a40.mockapi.io/users", {
        name: name,
        email: email,
        number: number,
      })
      .then(() => {
        setAlert("Data Added");
        setAlertClass("text-green-500");
        setName("");
        setEmail("");
        setNumber("");
        getData();
      });
  };

  return (
    <>
      <div>
        <h1 className="text-center text-3xl mb-4">
          Add Form <span className={`text-base ${alertClass}`}>{alert}</span>
        </h1>
        <div className="my-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black p-1 rounded-sm mr-4 text-sm mt-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black p-1 rounded-sm mr-4 text-sm mt-4"
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border border-black p-1 rounded-sm mr-4 text-sm mt-4"
          />
          <button
            onClick={onHandleSubmit}
            className="bg-black text-white text-sm rounded-lg border-black border hover:bg-white hover:text-black
                 py-1 px-3 mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddForm;
