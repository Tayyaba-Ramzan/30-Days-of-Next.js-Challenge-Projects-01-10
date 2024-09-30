"use client"; // Enables client-side rendering for this component

// Import necessary hooks and types from React
import { useState, ChangeEvent, FormEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import icons from the Lucide React library
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

// Define a TypeScript interface for weather data
interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

// Default export of the WeatherWidgetComponent function
export default function WeatherWidget() {
  // State hooks for managing location input, weather data, error messages, and loading state
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle the search form submission
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location."); 
      setWeather(null); 
      return;
    }

    setIsLoading(true); 
    setError(null); 

    try {
      // Fetch weather data from the weather API
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.current.temp_c, 
        description: data.current.condition.text, 
        location: data.location.name, 
        unit: "C", 
      };
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again."); 
      setWeather(null); 
    } finally {
      setIsLoading(false); 
    }
  };

  function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
      if (temperature < 0) {
        return `It's freezing at ${temperature}°C! Bundle up!`;
      } else if (temperature < 10) {
        return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
      } else if (temperature < 20) {
        return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
      } else if (temperature < 30) {
        return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
      } else {
        return `It's hot at ${temperature}°C. Stay hydrated!`;
      }
    } else {
      return `${temperature}°${unit}`;
    }
  }

  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return "Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description;
    }
  }

  function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;

    return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
  }

  return (
  <div className="flex justify-center items-center min-h-screen p-2 sm:p-4 md:p-6">
    {/* Center the card within the screen */}
    <Card className="w-full max-w-lg sm:max-w-md mx-auto text-center bg-white shadow-md rounded-3xl p-3 sm:p-4 md:p-6">
      {/* Card header with title and description */}
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold">Weather Widget</CardTitle>
        <CardDescription className="text-gray-600 text-xs sm:text-sm md:text-base">
          Search for the current weather conditions in your city.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex items-center gap-1 sm:gap-2">
          <Input
            type="text"
            placeholder="Enter a city name"
            value={location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
            className="w-full text-xs sm:text-sm md:text-base"
          />
          <Button
            type="submit"
            className="bg-black text-white hover:bg-blue-300 hover:text-black transition duration-300 font-semibold px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}{" "}
          </Button>
        </form>
        {error && <div className="mt-2 text-red-500 text-xs sm:text-sm">{error}</div>}
        {weather && (
          <div className="mt-3 grid gap-1 sm:gap-2 text-black">
            <div className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
              <ThermometerIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              {getTemperatureMessage(weather.temperature, weather.unit)}
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
              <CloudIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <div>{getWeatherMessage(weather.description)}</div>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
              <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <div>{getLocationMessage(weather.location)}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

