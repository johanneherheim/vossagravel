"use client";

import dynamic from "next/dynamic";

const GpxMap = dynamic(() => import("@/components/gpx-map"), {
  ssr: false,
});

type GpxMapWrapperProps = {
  gpxUrl: string;
};

export default function GpxMapWrapper({ gpxUrl }: GpxMapWrapperProps) {
  return <GpxMap gpxUrl={gpxUrl} />;
}
