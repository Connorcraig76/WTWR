import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function SideBar({ onEditProfileClick, onSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        onClick={onEditProfileClick}
        type="button"
        className="sidebar__edit-button"
      >
        Change profile data
      </button>
      <button
        onClick={onSignOut}
        type="button"
        className="sidebar__signout-button"
      >
        Log out
      </button>
    </aside>
  );
}
