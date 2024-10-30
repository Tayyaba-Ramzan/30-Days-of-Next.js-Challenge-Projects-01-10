import TipCalculatorComponent from "@/components/tip-calculator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <TipCalculatorComponent />
    </div>

  );
}