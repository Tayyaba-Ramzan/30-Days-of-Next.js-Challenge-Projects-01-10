import Image from "next/image";
import Countdown from "@/components/password-generator";
import GeneratePassword from "@/components/password-generator";


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
        <GeneratePassword />
      </div>
    </div>

  );
}