import Image from "next/image";
import BirthdayWish from "@/components/birthday-wish";


export default function Home() {
  return (
    <div>
      <Image
      src="/birthday-bg.jpg"
      alt="Background_Image"
      layout="fill"
      objectFit="cover"
      priority
      />

      
    
    <div className="absolute inset-0 flex items-center justify-center">
      <BirthdayWish />
    </div>
    </div>

  );
}