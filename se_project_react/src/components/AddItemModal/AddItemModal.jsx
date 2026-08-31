import { useForm } from "../../hooks/useForm.js";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const { values, handleChange, setValues, isFilled } = useForm(defaultValues);
  useEffect(() => {
    if (isOpen) setValues(defaultValues);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFilled}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL{" "}
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            value="hot"
            checked={values.weatherType === "hot"}
            className="modal__radio-input"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            value="warm"
            checked={values.weatherType === "warm"}
            className="modal__radio-input"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            value="cold"
            checked={values.weatherType === "cold"}
            className="modal__radio-input"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
