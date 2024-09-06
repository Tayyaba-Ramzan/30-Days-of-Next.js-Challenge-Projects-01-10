"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {

    const [duration, setDuration] = useState<number | string>("");

    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [isActive, setIsActive] = useState<boolean>(false);

    const [isPaused, setIsPaused] = useState<boolean>(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };


    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };


    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };


    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {

        if (isActive && !isPaused) {

            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {

                    if (prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }

                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };


    return (

        <div className="flex flex-col items-center justify-center h-screen">

            <div className="p-8 w-full max-w-md">

                <h1 className="text-4xl font-bold mb-4 italic text-red-800 dark:text-gray-200 text-center">
                    COUNTDOWN TIMER
                </h1>

                <div className="flex items-center mb-6">
                    <Input
                        type="number"
                        id="duration"
                        placeholder="Enter duration in seconds"
                        value={duration}
                        onChange={handleDurationChange}
                        className="flex-1 mr-4 rounded-md border-red-800 text-red-800 dark:border-red-800 dark:bg-gray-700 dark:text-red-800"
                    />
                    <Button
                        onClick={handleSetDuration}
                        variant="outline"
                        className="text-red-800 dark:text-gray-200 italic font-bold"
                    >
                        Set
                    </Button>
                </div>

                <div className="text-7xl font-bold text-red-800 dark:text-gray-200 mb-8 text-center italic">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleStart}
                        variant="outline"
                        className="text-red-800 dark:text-gray-200 italic font-bold"
                    >
                        {isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button
                        onClick={handlePause}
                        variant="outline"
                        className="text-red-800 dark:text-gray-200 italic font-bold"
                    >
                        Pause
                    </Button>
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="text-red-800 dark:text-gray-200"
                    >
                        Reset
                    </Button>


                </div>

            </div>
            <p className="text-2xl font-bold text-red-800 dark:text-gray-200 mb-8 text-center italic">Skillfully Designed by Tayyaba Ramzan</p>
        </div>
    );
}