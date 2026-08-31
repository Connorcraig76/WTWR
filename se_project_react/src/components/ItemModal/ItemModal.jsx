import "./ItemModal.css";
import closeBtn from "../../assets/close-btn_white.png";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close modal__close_type_clothes"
          onClick={onClose}
          type="button"
        >
          <img src={closeBtn} alt="close icon" className="modal__close-btn" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal_image" />
        <div className="modal__footer">
          <div className="modal__footer-elements">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete"
              onClick={() => onDelete(card)}
              type="button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
