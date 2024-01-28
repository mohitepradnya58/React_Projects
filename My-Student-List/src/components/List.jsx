import React from "react";

const List = ({ people }) => {
  return (
    <div>
      {people.map((person) => {
        const { id, name, age, image } = person;
        return (
          <>
            <div key={id} className="flex gap-5 mb-8 items-center">
              <div>
                <img
                  src={image}
                  alt={image}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{name}</h3>
                <p>{age} years</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default List;
