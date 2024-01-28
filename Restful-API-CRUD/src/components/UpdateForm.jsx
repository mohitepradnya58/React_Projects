import axios from "axios";
import React from "react";

const UpdateForm = ({
  uname,
  uemail,
  uNumber,
  id,
  setUName,
  setUNumber,
  setUEmail,
  getData,
}) => {
  const uddateData = () => {
    axios
      .put(`https://65b61298da3a3c16ab002a40.mockapi.io/users/${id}`, {
        name: uname,
        email: uemail,
        number: uNumber,
      })
      .then(() => {
        getData();
      });

    document.querySelector(".update_form").classList.remove("show");
  };

  return (
    <>
      <div className="hidden update_form">
        <h3 className="text-xl my-5">Update Data</h3>
        <input
          type="text"
          placeholder="Name"
          value={uname}
          onChange={(e) => setUName(e.target.value)}
          className="border border-black p-1 rounded-sm mr-4 text-sm mt-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={uemail}
          onChange={(e) => setUEmail(e.target.value)}
          className="border border-black p-1 rounded-sm mr-4 text-sm mt-4"
        />
        <input
          type="number"
          placeholder="Number"
          value={uNumber}
          onChange={(e) => setUNumber(e.target.value)}
          className="border border-black p-1 rounded-sm mr-4 text-sm mt-4"
        />
        <button
          onClick={() => uddateData(id)}
          className="bg-black text-white text-sm rounded-lg border-black border hover:bg-white hover:text-black
                 py-1 px-3 mt-4"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
