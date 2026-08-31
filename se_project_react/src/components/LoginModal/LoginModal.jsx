import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const LoginModal = ({ isOpen, onClose, onLogin, onRedirect }) => {
  const defaultValues = {
    email: "",
    password: "",
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
    onLogin(values);
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
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
          or Register
        </button>
      }
    >
      <label
        htmlFor="login-email"
        className={`modal__label ${errors.email ? "modal__label_type_error" : ""}`}
      >
        Email*{" "}
        <input
          type="email"
          name="email"
          id="login-email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="login-password"
        className={`modal__label ${errors.password ? "modal__label_type_error" : ""}`}
      >
        Password*{" "}
        <input
          type="password"
          name="password"
          id="login-password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
