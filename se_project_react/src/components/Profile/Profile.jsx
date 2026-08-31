import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  handleCardLike,
  onSignOut,
  onEditProfileClick,
}) {
  return (
    <section className="profile">
      <SideBar onSignOut={onSignOut} onEditProfileClick={onEditProfileClick} />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardLike={handleCardLike}
      />
    </section>
  );
}
