// ExtendedDynamicForm.js
import React, { useState } from "react";
import FormField from "./components/FormField";
import Button from "./components/Button";
import FormGroup from "./components/FormGroup";
import ErrorMessage from "./components/ErrorMessage";
import { validate } from "./components/validation";

const ExtendedDynamicForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = [
    { id: "name", label: "Name", type: "text", required: true },
    { id: "email", label: "Email", type: "email", required: true },
    { id: "password", label: "Password", type: "password", required: true },
    { id: "age", label: "Age", type: "number", required: true },
    { id: "agree", label: "Agree to Terms", type: "checkbox" },
    {
      id: "gender",
      label: "Gender",
      type: "radio",
      options: ["Male", "Female"],
    },
    {
      id: "favoriteColor",
      label: "Favorite Color",
      type: "select",
      options: ["Red", "Green", "Blue"],
    },
    { id: "comments", label: "Comments", type: "textarea" },
    { id: "range", label: "Range", type: "range", min: 1, max: 100 },
    { id: "date", label: "Date", type: "date" },
    { id: "time", label: "Time", type: "time" },
    { id: "file", label: "Upload File", type: "file" },
  ];

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validate the field
    const errorMessage = validate(newValue, {
      required: fields.find((field) => field.id === name)?.required,
    });
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation and submission logic
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormGroup key={field.id}>
          <FormField
            field={field}
            value={formData[field.id] || ""}
            onChange={handleChange}
          />
          {errors[field.id] && <ErrorMessage message={errors[field.id]} />}
        </FormGroup>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ExtendedDynamicForm;
