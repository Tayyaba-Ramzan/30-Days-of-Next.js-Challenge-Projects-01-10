import DigitalClockComponent from "@/components/digital-clock";

export default function Home() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <DigitalClockComponent />
    </div>
  );
}