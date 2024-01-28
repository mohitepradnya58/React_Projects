import React, { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);

  const getApiData = async () => {
    const res = await fetch("https://reqres.in/api/users");
    const json = await res.json();
    const data = json.data;
    setUsers(json.data);
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <h1 className="text-center text-3xl mt-5 mb-5">Working With React API</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  mt-5 max-w-4xl m-auto gap-x-6 gap-y-10 p-6">
        {users.length &&
          users.map((user) => {
            return (
              <div
                key={user.id}
                className="p-4 widget grid place-content-center rounded-3xl"
              >
                <img
                  src={user.avatar}
                  key={user.avatar}
                  className="rounded-full mb-3"
                />
                <h4 className="text-xl mb-3 text-center">{user.first_name}</h4>
                <p className="text-sm mb-3 text-center">{user.email}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default App;
