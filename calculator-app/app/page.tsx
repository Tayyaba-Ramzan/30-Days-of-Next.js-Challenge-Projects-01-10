import Calculator from "@/components/calculator";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <Image
        src="/bg.jpg"
        alt="Background_Image"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Calculator />
      </div>
    </div>
  );
}