import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
