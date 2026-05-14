"use client";
import { useState } from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

interface Route {
  name: string;
  slug: string;
}

interface NavigationProps {
  routes: Route[];
}

function DesktopNavigation({ routes }: NavigationProps) {
  return (
    <div className="flex items-center gap-8 text-gray-600">
      {routes.map((route) => (
        <Link
          href={`/${route.slug}`}
          key={route.slug}
          className="hover:underline"
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
}

export default function NavBar({ routes }: NavigationProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="flex border-b sticky top-0 p-2 md:px-5 bg-background z-50 h-16">
        <div className="flex justify-between w-full">
          <Link href="/" className="my-auto mx-3">
            <h1 className="text-2xl italic font-semibold tracking-wide">
              VOSSAGRAVEL
            </h1>
          </Link>
          <div className="p-2 my-auto hidden gap-4 sm:flex">
            <DesktopNavigation routes={routes} />
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger onClick={() => setIsSheetOpen(true)}>
              <div className="border rounded-sm p-2 m-1">
                <HamburgerMenuIcon className="scale-125" />
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Meny</SheetTitle>

              <nav className="flex flex-col gap-10 mt-20">
                {routes.map((route) => (
                  <Link
                    href={`/${route.slug}`}
                    key={route.slug}
                    onClick={handleLinkClick}
                    className="hover:underline text-2xl"
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
