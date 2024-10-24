"use client"; 

import { useState, ChangeEvent } from "react";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ColorPickerComponent() {

  const [color, setColor] = useState<string>("#000000");

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value);
  };
  
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(color); 
    alert("Copy Successfully!"); 
  };
  
  return (
    <div className="flex flex-col items-center justify-start dark:bg-gray-900">
      <Card className="w-[90%] max-w-md mx-auto p-8 bg-transparent grid gap-8  ">
        <div className="text-center space-y-2">
          <CardTitle className="text-4xl text-white">Color Picker</CardTitle>
          <CardDescription className="text-white text-2xl">
            Select a color and copy the hex and RGB values.
          </CardDescription>
        </div>
        <div className="grid gap-4">
          <div
            className="w-full h-48 rounded-lg"
            style={{ backgroundColor: color }}
          />
          <div className="grid gap-2 text-center">
            <div className="text-2xl font-semibold text-white">{color}</div>
            <div className="text-white dark:text-white text-3xl">
              RGB: {parseInt(color.slice(1, 3), 16)},{" "}
              {parseInt(color.slice(3, 5), 16)},{" "}
              {parseInt(color.slice(5, 7), 16)}
            </div>
            <Button
              onClick={copyToClipboard}
              variant="default"
              className="w-full"
            >
              Copy to Clipboard
            </Button>
          </div>
          <Input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-full h-16 p-0 border-0 rounded-md cursor-pointer"
          />
        </div>
      </Card>
    </div>
  );
}