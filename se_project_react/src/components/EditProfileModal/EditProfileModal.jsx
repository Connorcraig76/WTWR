import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../context/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, setValues, isFilled } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFilled}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          name="name"
          id="edit-name"
          className="modal__input"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          name="avatar"
          id="edit-avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
