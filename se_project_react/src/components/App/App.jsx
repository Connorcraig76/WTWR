import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";
import {
  addItem,
  getItems,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api.js";
import { register, authorize, checkToken } from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleCardDelete = (card) => {
    const makeRequest = () => {
      return removeItem(card._id).then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id),
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    const makeRequest = () => {
      return addItem(newCardData).then((data) => {
        setClothingItems([data, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    const makeRequest = () => {
      return register({ name, avatar, email, password }).then(() => {
        handleLogin({ email, password });
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      return authorize({ email, password })
        .then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            return checkToken(res.token);
          }
        })
        .then((userData) => {
          setCurrentUser(userData);
          navigate("/profile");
        });
    };
    handleSubmit(makeRequest);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return updateUserProfile({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const makeRequest = () => {
      const apiCall = !isLiked
        ? addCardLike(id, token)
        : removeCardLike(id, token);
      return apiCall.then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("signin")}
              onRegisterClick={() => setActiveModal("signup")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onRedirect={() => setActiveModal("signin")}
            isLoading={isLoading}
          />

          <LoginModal
            isOpen={activeModal === "signin"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRedirect={() => setActiveModal("signup")}
            isLoading={isLoading}
          />

          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
