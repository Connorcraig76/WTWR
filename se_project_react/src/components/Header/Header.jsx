import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__bottons">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__bottons_type_add-clothes"
              type="button"
            >
              + Add Clothes
            </button>
            <NavLink className="header__nav-link" to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <div className="header__auth-container">
            <button
              onClick={onRegisterClick}
              className="header__auth-button"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              className="header__auth-button"
              type="button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
