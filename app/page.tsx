import Image from "next/image";
import picture from "@/components/images/1.jpeg";
import Link from "next/link";

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

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute top-56 rounded text-center items-center text-white">
        <h1 className="italic font-bold tracking-wide mb-4">VOSSAGRAVEL</h1>
        <h3 className="italic font-semibold tracking-wide">07.06.26</h3>
        <h4 className="italic font-semibold">Norway Gravel Series 2026</h4>
        <div className="flex gap-4 my-10 items-center justify-center">
          <Link
            href="https://live.eqtiming.com/82974#dashboard"
            target="_blank"
            className="w-40 text-center bg-green-800/90 border-green-700 border-2 hover:bg-green-700 py-2 px-4 rounded-lg italic tracking-wide font-semibold text-lg"
          >
            Påmelding
          </Link>

          <Link
            href="https://www.youtube.com/watch?v=Dfy7GgMYa2o&t=13s"
            target="_blank"
            className="w-40 text-center bg-red-800/90 border-red-700 border-2 hover:bg-red-700 py-2 px-4 rounded-lg italic tracking-wide font-semibold text-lg"
          >
            Youtube
          </Link>
        </div>
      </div>
    </div>
  );
}
