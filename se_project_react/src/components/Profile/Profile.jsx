import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  handleAddClick,
  onSignOut,
  onEditProfileClick,
}) {
  return (
    <section className="profile">
      <SideBar onSignOut={onSignOut} onEditProfileClick={onEditProfileClick} />
      <ClothesSection
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
