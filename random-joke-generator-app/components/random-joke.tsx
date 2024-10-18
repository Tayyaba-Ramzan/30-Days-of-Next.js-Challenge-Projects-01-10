"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import Image from "next/image";

interface JokeResponse {
  setup: string;
  punchline: string;
}

export default function RandomJokeComponent() {
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error); // Log any errors
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ffa500] to-[#ff6b6b] p-4">
      <div className="bg-transparent rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center">
          <Image
            src={"/joke.png"}
            alt="Joke"
            width={300}
            height={200}
            className="mb-5"
          />
        </div>
        <h1 className="text-4xl font-bold mb-5 text-black text-center">
          😂 Random Joke 😂
        </h1>
        <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-black text-lg">
          {joke || "Loading..."}
        </div>
        <Button
          onClick={fetchJoke}
          className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          😂 Get New Joke 😂
        </Button>
      </div>
    </div>
  );
}
