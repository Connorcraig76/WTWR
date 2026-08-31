import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn.png";

const ModalWithForm = ({
  title,
  name,
  buttonText = "Save",
  onClose,
  children,
  isOpen,
  onSubmit,
  secondaryButton,
  isValid = false,
}) => {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="close icon" className="modal__close-btn" />
        </button>
        <form onSubmit={onSubmit} name={name} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className={`modal__submit ${
                !isValid ? "modal__submit_disabled" : ""
              }`}
              disabled={!isValid}
            >
              {buttonText}
            </button>
            {secondaryButton}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
