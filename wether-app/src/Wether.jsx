import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = "346b14f12ccedc37a2591d62b6eb305e";

  const getWeather = async () => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Added units=metric for Celsius
    console.log("Fetching weather data from:", API); // Debugging info

    try {
      const res = await fetch(API);
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white m-4 p-8 rounded-lg shadow-md max-w-md w-full">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={getWeather}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
            <p className="text-lg">{weather.main.temp}°C</p>
            <p className="text-gray-700 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
