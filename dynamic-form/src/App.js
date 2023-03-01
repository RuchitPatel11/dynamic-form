import { useState } from "react";
import "./App.css";
import DynamicForm from "./components/DynamicForm";

function App() {
  const [formData, setFormData] = useState({
    firstName: {
      inputType: "text",
      label: "First Name:",
      key: "fName",
      type: "text",
      required: true,
    },
    lastName: {
      inputType: "text",
      label: "Last Name:",
      key: "lName",
      type: "text",
    },
    vehicle: {
      inputType: "array",
      label: "Vehicle:",
      key: "vehicle",
      required: false,
      items: [
        {
          model: {
            inputType: "text",
            label: "Model:",
            key: "model",
            required: true,
          },
          year: {
            inputType: "number",
            label: "Year:",
            key: "year",
            required: true,
          },
        },
      ],
    },

    Qualification: {
      inputType: "array",
      label: "Qualification:",
      key: "qualification",
      required: false,
      items: [
        {
          hsc: {
            inputType: "text",
            label: "HSC:",
            key: "hsc",
            required: true,
          },
          ssc: {
            inputType: "text",
            label: "SSC:",
            key: "ssc",
            required: true,
          },
        },
      ],
    },
  });

  const addCategory = (category) => {
    setFormData((prev) => {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          items: [...prev[category].items, { ...prev[category].items[0] }],
        },
      };
    });
  };
  const addSubCategory = (index, category, label) => {
    setFormData((prev) => {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          items: prev[category].items.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                [label]: {
                  inputType: "text",
                  label: label,
                  key: label,
                },
              };
            }
            return item;
          }),
        },
      };
    });
  };

  return (
    <div className="container d-flex flex-column gap-3 mt-3">
      <h1>Dynamic Form</h1>
      <DynamicForm
        formData={formData}
        onAdd={addCategory}
        onAddField={addSubCategory}
      />
    </div>
  );
}

export default App;
