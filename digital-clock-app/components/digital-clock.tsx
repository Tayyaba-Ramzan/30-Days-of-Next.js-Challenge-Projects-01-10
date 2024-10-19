"use client";

import { useState, useEffect, useMemo } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DigitalClockComponent() {

  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-8 shadow-lg w-[90%] rounded-3xl border-black">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/digital-clock.jpg"}
            alt="Digital Clock"
            height={300}
            width={300}
            className="mb-10 ml-4"

          />
          <div className="text-5xl font-bold tracking-tight mb-5 text-center">Digital Clock</div>
          <div className="text-sm text-black mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          <div className="text-6xl font-bold tracking-tight">
            {formattedTime}
          </div>
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold rounded-full"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold rounded-full"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}