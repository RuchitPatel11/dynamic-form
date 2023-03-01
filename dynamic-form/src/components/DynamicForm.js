import React, { useEffect, useState } from "react";
import AddProperty from "./AddProperty";

function DynamicForm({ formData, onAdd, onAddField }) {
  const [value, setValue] = useState();

  useEffect(() => {
    function extractValues(formMeta) {
      let val = {};
      Object.keys(formMeta).forEach((key) => {
        if (formMeta[key].inputType === "array") {
          val[key] = formMeta[key].items.map((i) => extractValues(i));
        } else val[key] = "";
      });
      return val;
    }

    setValue(extractValues(formData));
  }, [formData]);

  const handleValue = (name, data) => {
    const [category, index, property] = name.split(".");

    console.log(name);
    setValue((prev) => {
      return {
        ...prev,
        [category]: prev[category].map((item, i) => {
          if (i === parseInt(index, 10)) {
            return { ...item, [property]: data };
          }
          return item;
        }),
      };
    });
  };

  return (
    <div>
      {JSON.stringify(value)}
      <form className="d-flex flex-column gap-2 pb-5">
        {Object.keys(formData).map((fieldName) => {
          const field = formData[fieldName];
          if (field.inputType === "array") {
            return (
              <div key={fieldName} className="border mb-3 p-2">
                <legend>{field.label}</legend>
                {field.items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex gap-3  align-items-end flex-wrap m-2"
                  >
                    {Object.keys(item).map((itemName) => (
                      <div
                        key={itemName}
                        className="d-flex flex-column align-items-start"
                      >
                        <label className="form-label">
                          {item[itemName].label}
                        </label>
                        <input
                          type={item[itemName].inputType}
                          name={`${fieldName}.${index}.${itemName}`}
                          required={item[itemName].required}
                          onChange={(e) => {
                            handleValue(
                              `${fieldName}.${index}.${itemName}`,
                              e.target.value
                            );
                          }}
                        />
                      </div>
                    ))}
                    <AddProperty
                      onAddField={onAddField}
                      index={index}
                      fieldName={fieldName}
                    />
                  </div>
                ))}
                <button
                  className="p-2 m-2 btn btn-danger"
                  type="button"
                  onClick={() => onAdd(fieldName)}
                >
                  + Add
                </button>
              </div>
            );
          } else {
            return (
              <div key={fieldName}>
                <label className="form-label">{field.label}</label>
                <input
                  type={field.inputType}
                  name={fieldName}
                  required={field.required}
                  onChange={(e) => {
                    setValue((prev) => {
                      return { ...prev, [fieldName]: e.target.value };
                    });
                  }}
                />
              </div>
            );
          }
        })}
        <button type="submit" className="btn btn-primary w-25">
          Submit
        </button>
      </form>
    </div>
  );
}
export default DynamicForm;
