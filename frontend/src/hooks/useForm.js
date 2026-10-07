import { useState } from "react";
import { useFormState } from "react-dom";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormState(initialForm);
  };

  return {
    ...useFormState,
    formState,
    handleInputChange,
    handleReset,
  };
};