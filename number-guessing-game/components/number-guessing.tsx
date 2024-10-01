"use client"; 

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false); 
  const [gameOver, setGameOver] = useState<boolean>(false); 
  const [paused, setPaused] = useState<boolean>(false); 
  const [targetNumber, setTargetNumber] = useState<number>(0); 
  const [userGuess, setUserGuess] = useState<number | string>("");  
  const [attempts, setAttempts] = useState<number>(0); 

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]); 

 
  const handleStartGame = (): void => {
    setGameStarted(true); 
    setGameOver(false); 
    setAttempts(0); 
    setPaused(false); 
  };


  const handlePauseGame = (): void => {
    setPaused(true); 
  };

  const handleResumeGame = (): void => {
    setPaused(false); 
  };


  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempts(attempts + 1); 
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false); 
    setGameOver(false); 
    setUserGuess(""); 
    setAttempts(0); 
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      <Image
      src={"/girl.png"}
      alt="Girl"
      width={300}
      height={300}
      />
      <div className="bg bg-transparent rounded-3xl shadow-lg p-8 w-[90%] max-w-md border-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Number Guessing Game
        </h1>
        <p className="text-center text-white mb-4">
          Try to guess the number between 1 and 10!
        </p>
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-white hover:bg-gray-700 text-black font-bold py-2 px-4 rounded hover:text-white transition duration-300"
            >
              Start Game
            </Button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-white hover:bg-gray-600 text-black hover:text-white transition duration-300 font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-white hover:bg-gray-600 text-black hover:text-white transition duration-300 font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-white hover:bg-gray-600 text-black hover:text-white transition duration-300 font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-white">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}
  
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-white">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}