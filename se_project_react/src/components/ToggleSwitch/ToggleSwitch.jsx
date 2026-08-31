import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
      />
      <div className="toggle-switch__slider"></div>
      <span
        className={`toggle-switch__text toggle-switch__text--fahrenheit ${currentTemperatureUnit === "F" ? "toggle-switch__text_color_white" : ""}`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text--celsius ${currentTemperatureUnit === "C" ? "toggle-switch__text_color_white" : ""}`}
      >
        C
      </span>
    </label>
  );
}
