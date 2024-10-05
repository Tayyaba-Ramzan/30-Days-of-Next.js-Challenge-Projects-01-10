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
    <div className="flex flex-col items-center justify-center  dark:bg-gray-900">
      {/* Center the color picker card within the screen */}
      <Card className="w-[90%] max-w-md mx-auto p-8 grid gap-8 rounded-3xl">
        {/* Header with title and description */}
        <div className="text-center space-y-2">
          <CardTitle className="text-4xl">Color Picker</CardTitle>
          <CardDescription>
            Select a color and copy the hex and RGB values.
          </CardDescription>
        </div>
        {/* Main content area for color display and input */}
        <div className="grid gap-4">
          {/* Display the selected color */}
          <div
            className="w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-800"
            style={{ backgroundColor: color }}
          />
          {/* Display the color value in hex and RGB format, and button to copy */}
          <div className="grid gap-2 text-center">
            <div className="text-2xl font-semibold">{color}</div>
            <div className="text-gray-500 dark:text-gray-400">
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
          {/* Input field to pick a color */}
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