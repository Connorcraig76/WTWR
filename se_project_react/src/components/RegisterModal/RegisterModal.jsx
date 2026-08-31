import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, onRedirect }) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

  const { values, handleChange, setValues, isFilled, errors } =
    useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="signup"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFilled}
      secondaryButton={
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onRedirect}
        >
          or Log in
        </button>
      }
    >
      <label
        htmlFor="register-email"
        className={`modal__label ${errors.email ? "modal__label_type_error" : ""}`}
      >
        Email*{" "}
        <input
          type="email"
          name="email"
          id="register-email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="register-password"
        className={`modal__label ${errors.password ? "modal__label_type_error" : ""}`}
      >
        Password*{" "}
        <input
          type="password"
          name="password"
          id="register-password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="register-name"
        className={`modal__label ${errors.name ? "modal__label_type_error" : ""}`}
      >
        Name*{" "}
        <input
          type="text"
          name="name"
          id="register-name"
          className={`modal__input ${errors.name ? "modal__input_type_error" : ""}`}
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="register-avatar"
        className={`modal__label ${errors.avatar ? "modal__label_type_error" : ""}`}
      >
        Avatar URL*{" "}
        <input
          type="url"
          name="avatar"
          id="register-avatar"
          className={`modal__input ${errors.avatar ? "modal__input_type_error" : ""}`}
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
