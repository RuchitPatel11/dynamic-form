import React, { useState } from "react";

const AddProperty = ({ onAddField, index, fieldName }) => {
  const [label, setLabel] = useState([]);
  const [boolean, setBoolean] = useState(false);

  const handleChange = (value, index) => {
    setLabel((prev) => {
      return prev.map((label, i) => {
        if (i === index) {
          return value;
        }
        return label;
      });
    });
  };
  return (
    <div>
      {boolean ? (
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="p-1 mt-1"
            placeholder="Enter Field Name"
            onChange={(e) => handleChange(e.target.value, index)}
            value={label[index]}
          />
          <button
            type="button"
            className="btn btn-dark mx-2"
            onClick={() => {
              setBoolean(false);
              setLabel((prev) => {
                return prev.map((label, i) => {
                  if (i === index) {
                    return "";
                  }
                  return label;
                });
              });
              onAddField(index, fieldName, label[index]);
            }}
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            setLabel((prev) => [...prev, ""]);
            setBoolean(true);
          }}
        >
          Add Property
        </button>
      )}
    </div>
  );
};

export default AddProperty;
