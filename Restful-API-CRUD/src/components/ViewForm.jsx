import React, { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";
import axios from "axios";
import AddForm from "./AddForm";

const ViewForm = () => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState("");
  const [uname, setUName] = useState("");
  const [uemail, setUEmail] = useState("");
  const [uId, setUId] = useState("");
  const [uNumber, setUNumber] = useState("");
  const getData = () => {
    axios
      .get("https://65b61298da3a3c16ab002a40.mockapi.io/users")
      .then((res) => {
        setData(res.data);
      });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`https://65b61298da3a3c16ab002a40.mockapi.io/users/${id}`)
      .then(() => {
        getData();
        setAlert("Data Has Deleted");
      });
  };

  const updateHandler = (id) => {
    axios
      .get(`https://65b61298da3a3c16ab002a40.mockapi.io/users/${id}`)
      .then((res) => {
        setUName(res.data.name);
        setUEmail(res.data.email);
        setUNumber(res.data.number);
        setUId(id);
      });

    document.querySelector(".update_form").classList.add("show");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AddForm getData={getData} />
      <div>
        <h2 className="text-xl my-5">
          Data<span className="text-base text-red-500 ml-3">{alert}</span>
        </h2>
        <table className="border border-black">
          <tbody>
            <tr className="border-b border-black">
              <th className="text-base p-4">ID</th>
              <th className="text-base p-4">Name</th>
              <th className="text-base p-4">Email</th>
              <th className="text-base p-4">Phone</th>
              <th className="text-base p-4">Update</th>
              <th className="text-base p-4">Delete</th>
            </tr>

            {data.map((item) => (
              <tr key={item.id} className="border-b border-black">
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.number}</td>
                <td className="p-4">
                  <button
                    onClick={() => updateHandler(item.id)}
                    className="text-green-800"
                  >
                    Update
                  </button>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => deleteHandler(item.id)}
                    className="text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateForm
        uname={uname}
        uNumber={uNumber}
        uemail={uemail}
        setUName={setUName}
        setUEmail={setUEmail}
        setUNumber={setUNumber}
        id={uId}
        getData={getData}
      />
    </>
  );
};

export default ViewForm;
