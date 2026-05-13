import Image from "next/image";
import picture from "@/components/images/framside.png";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-64px)] overflow-hidden">
      <Image
        src={picture}
        alt="Vossagravel landscape"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-14 z-10 w-full sm:w-fit rounded text-white">
        <h1 className="text-center mb-4 font-bold">Vossagravel</h1>
        <h4 className="text-center mb-8">Norway Gravel Series 2026</h4>
        <h1 className="font-extrabold tracking-wide text-2xl sm:text-5xl text-center px-8">
          07.06.26
        </h1>
      </div>
    </div>
  );
}
