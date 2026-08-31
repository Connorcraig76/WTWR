export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "drizzle",
    url: new URL("../assets/day/rainy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/thunderstorm.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snowy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "mist",
    url: new URL("../assets/day/overcast.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "drizzle",
    url: new URL("../assets/night/rainy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/thunderstorm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snowy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "mist",
    url: new URL("../assets/night/overcast.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 39.916778,
  longitude: -75.387693,
};

export const apiKey = "8383c1c9fc8c74b7b2fc0266e6df8c71";
