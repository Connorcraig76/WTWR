import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

import likeBtn from "../../assets/like-btn.png";
import likeClicked from "../../assets/like_clicked.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button type="button" className={itemLikeButton} onClick={handleLike}>
            <img
              src={isLiked ? likeClicked : likeBtn}
              alt="like icon"
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
