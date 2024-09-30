import Image from "next/image";
import WeatherWidget from "@/components/ui/weather-widget";


export default function Home() {
  return (
    <div>
      <Image
      src="/weather-bg.jpg"
      alt="Background_Image"
      layout="fill"
      objectFit="cover"
      priority
      />

      
    
    <div className="absolute inset-0 flex items-center justify-center">
      <WeatherWidget />
    </div>
    </div>

  );
}