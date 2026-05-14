"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  LineString,
  MultiLineString,
} from "geojson";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";

type GpxMapProps = {
  gpxUrl: string;
};

type GpxGeoJson = FeatureCollection<Geometry>;

function isLineString(
  feature: Feature<Geometry>,
): feature is Feature<LineString> {
  return feature.geometry.type === "LineString";
}

function isMultiLineString(
  feature: Feature<Geometry>,
): feature is Feature<MultiLineString> {
  return feature.geometry.type === "MultiLineString";
}

function FitBounds({ geoJson }: { geoJson: GpxGeoJson }) {
  const map = useMap();

  useEffect(() => {
    const coords: [number, number][] = [];

    geoJson.features.forEach((feature) => {
      if (isLineString(feature)) {
        feature.geometry.coordinates.forEach(([lng, lat]) => {
          coords.push([lat, lng]);
        });
      }

      if (isMultiLineString(feature)) {
        feature.geometry.coordinates.forEach((line) => {
          line.forEach(([lng, lat]) => {
            coords.push([lat, lng]);
          });
        });
      }
    });

    if (coords.length > 0) {
      map.fitBounds(coords as LatLngBoundsExpression, {
        padding: [30, 30],
      });
    }
  }, [geoJson, map]);

  return null;
}

export default function GpxMap({ gpxUrl }: GpxMapProps) {
  const [geoJson, setGeoJson] = useState<GpxGeoJson | null>(null);

  useEffect(() => {
    async function loadGpx() {
      const res = await fetch(gpxUrl);
      const text = await res.text();

      const parser = new DOMParser();
      const gpxDocument = parser.parseFromString(text, "application/xml");

      const converted = toGeoJSON.gpx(gpxDocument) as GpxGeoJson;

      setGeoJson(converted);
    }

    loadGpx();
  }, [gpxUrl]);

  return (
    <div className="h-125 w-full overflow-hidden rounded-lg border">
      <MapContainer
        center={[60.6297, 6.4147]}
        zoom={11}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJson && (
          <>
            <GeoJSON data={geoJson} style={{ weight: 5 }} />
            <FitBounds geoJson={geoJson} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
