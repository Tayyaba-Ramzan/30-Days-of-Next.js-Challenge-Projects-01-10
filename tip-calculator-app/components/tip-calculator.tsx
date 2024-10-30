"use client"; 

import { useState, ChangeEvent } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TipCalculatorComponent() {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBillAmount(parseFloat(e.target.value));
  };

  const handleTipPercentageChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setTipPercentage(parseFloat(e.target.value));
  };

  const calculateTip = (): void => {
    if (billAmount !== null && tipPercentage !== null) {
      const tip = billAmount * (tipPercentage / 100); // Calculate the tip amount
      setTipAmount(tip); // Set the tip amount state
      setTotalAmount(billAmount + tip); // Set the total amount state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <Card className="w-[90%] max-w-md p-6 bg-black dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-5xl text-white rounded-3xl">Tip Calculator</CardTitle>
          <CardDescription className="text-white">
            Enter the bill amount and tip percentage to calculate the tip and
            total.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 text-white">
            <Label htmlFor="bill-amount">Bill Amount</Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount !== null ? billAmount : ""}
              onChange={handleBillAmountChange}
            />
          </div>
          <div className="grid gap-2 text-white">
            <Label htmlFor="tip-percentage">Tip Percentage</Label>
            <Input
              id="tip-percentage"
              type="number"
              placeholder="Enter tip percentage"
              value={tipPercentage !== null ? tipPercentage : ""}
              onChange={handleTipPercentageChange}
            />
          </div>
          <Button onClick={calculateTip} className="bg-white text-black hover:bg-300 hover:text-black">Calculate</Button>
        </CardContent>
        <CardFooter className="grid gap-2">
          <div className="flex items-center justify-between text-white">
            <span>Tip Amount:</span>
            <span className="font-bold">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-white">
            <span>Total Amount:</span>
            <span className="font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
