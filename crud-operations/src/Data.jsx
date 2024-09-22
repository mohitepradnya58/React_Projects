import React, { useEffect, useState, useRef } from "react";

const Data = () => {
  const [data, setData] = useState({ name: "", age: "", gender: "" });
  const [addData, setAddData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [validationMessages, setValidationMessages] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    let newAddData = JSON.parse(localStorage.getItem("UserDataArray")) || [];
    setAddData(newAddData);
  }, []);

  const nameInputRef = useRef(null);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (totalPages <= 1) {
      return null;
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePaginationClick(pageNumber)}
            className={`${
              pageNumber === currentPage ? "bg-blue-500 text-white" : ""
            } rounded p-2 m-1`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setValidationMessages({ ...validationMessages, [e.target.name]: "" });
  };

  const handleAddData = () => {
    let valid = true;
    const messages = {};

    if (data.name.trim() === "") {
      messages.name = "Please enter your name.";
      valid = false;
    } else if (data.name.length < 3) {
      messages.name = "Name must be at least 3 characters long.";
      valid = false;
    }

    if (data.age.trim() === "") {
      messages.age = "Please enter your age.";
      valid = false;
    } else if (isNaN(data.age) || parseInt(data.age) <= 0) {
      messages.age = "Please enter a valid age.";
      valid = false;
    }

    if (data.gender.trim() === "") {
      messages.gender = "Please enter your gender.";
      valid = false;
    } else if (
      data.gender.toLowerCase() !== "male" &&
      data.gender.toLowerCase() !== "female"
    ) {
      messages.gender = "Please enter a valid gender (Male/Female).";
      valid = false;
    }

    if (!valid) {
      setValidationMessages(messages);
      return;
    }

    const setItemNew = {
      id: Date.now(),
      name: data.name,
      age: data.age,
      gender: data.gender,
    };

    let userDataArray = localStorage.getItem("UserDataArray");
    if (userDataArray !== undefined && userDataArray !== null) {
      let userObjectData = JSON.parse(userDataArray);
      userObjectData.push(setItemNew);
      localStorage.setItem("UserDataArray", JSON.stringify(userObjectData));
    } else {
      let newArray = [];
      newArray.push(setItemNew);
      localStorage.setItem("UserDataArray", JSON.stringify(newArray));
    }

    let newAddData = JSON.parse(localStorage.getItem("UserDataArray"));
    setAddData(newAddData);
    setData({ name: "", age: "", gender: "" });
    setValidationMessages({ name: "", age: "", gender: "" });
  };

  const handleDelete = (id) => {
    let userDataArray = JSON.parse(localStorage.getItem("UserDataArray"));
    const updatedUserDataArray = userDataArray.filter((item) => item.id !== id);
    localStorage.setItem("UserDataArray", JSON.stringify(updatedUserDataArray));
    setAddData(updatedUserDataArray);
  };

  const handleEditChange = (e, id) => {
    let userDataArray = JSON.parse(localStorage.getItem("UserDataArray"));
    const updatedList = userDataArray.map((item) =>
      item.id === id ? { ...item, [e.target.name]: e.target.value } : item
    );
    localStorage.setItem("UserDataArray", JSON.stringify(updatedList));
    setAddData(updatedList);
  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  const handleSave = () => {
    setEdit(null);
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length > searchTerm.length) {
      setCurrentPage(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  useEffect(() => {
    if (edit !== null) {
      nameInputRef.current.focus();
    }
  }, [edit]);

  let filteredData =
    addData?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          className="border rounded p-2 w-full"
          onChange={inputChange}
          value={data.name}
        />
        {validationMessages.name && (
          <p className="text-red-500">{validationMessages.name}</p>
        )}
        <input
          type="text"
          name="age"
          placeholder="Enter Your Age"
          className="border rounded p-2 w-full"
          onChange={inputChange}
          value={data.age}
        />
        {validationMessages.age && (
          <p className="text-red-500">{validationMessages.age}</p>
        )}
        <input
          type="text"
          name="gender"
          placeholder="Enter Your Gender"
          className="border rounded p-2 w-full"
          onChange={inputChange}
          value={data.gender}
        />
        {validationMessages.gender && (
          <p className="text-red-500">{validationMessages.gender}</p>
        )}
        <button
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleAddData}
        >
          Add
        </button>
      </div>
      <input
        type="text"
        name="search"
        placeholder="Looking for.."
        className="border rounded p-2 w-full mb-4"
        onKeyDown={handleKeyDown}
        defaultValue={searchTerm}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border border-gray-300 text-center">
                Name
              </th>
              <th className="py-2 px-4 border border-gray-300 text-center">
                Gender
              </th>
              <th className="py-2 px-4 border border-gray-300 text-center">
                Age
              </th>
              <th className="py-2 px-4 border border-gray-300 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {edit === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={(e) => handleEditChange(e, item.id)}
                      className="border rounded p-2 w-full"
                      ref={nameInputRef}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {edit === item.id ? (
                    <input
                      type="text"
                      name="gender"
                      value={item.gender}
                      onChange={(e) => handleEditChange(e, item.id)}
                      className="border rounded p-2 w-full"
                    />
                  ) : (
                    item.gender
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {edit === item.id ? (
                    <input
                      type="text"
                      name="age"
                      value={item.age}
                      onChange={(e) => handleEditChange(e, item.id)}
                      className="border rounded p-2 w-full"
                    />
                  ) : (
                    item.age
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {edit === item.id ? (
                    <>
                      <button
                        className="bg-green-500 text-white rounded p-2 m-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-white rounded p-2 m-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white rounded p-2 m-2"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white rounded p-2 m-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default Data;
