import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isFilled, setIsFilled] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage } = evt.target;

    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);

    setErrors({ ...errors, [name]: validationMessage });

    // Check if every value is filled
    const filled = Object.values(updatedValues).every(
      (val) => typeof val === "string" && val.trim() !== "",
    );
    setIsFilled(filled);
  }

  return { values, setValues, handleChange, errors, isFilled, setErrors };
}
