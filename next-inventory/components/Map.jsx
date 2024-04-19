"use client"

import React, { useEffect, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ coords }) {
  const mapRef = React.useRef(null)
  const lattitude = parseFloat(coords[0])
  const longitude = parseFloat(coords[1])
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly"
      });

      const {Map} = await loader.importLibrary('maps')

      const {Marker} = await loader.importLibrary('marker')

      const position = {
        lat: lattitude,
        lng: longitude
      }

      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID"
      }

      const map = new Map(mapRef.current, mapOptions)
      const marker = new Marker({
        map: map,
        position: position
      })
    }
    
    initMap()
  }, [])

  return (
    <div style={{height: "600px", width: "560px"}} ref={mapRef} className="feed_card"/>
  )


  /*
  const mapRef = useRef(null);
  const geocoder = useMemo(() => new google.maps.Geocoder(), []);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });
    loader.load().then(() => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const map = new google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 8,
          });
          const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }, [address, geocoder]);
  return <div style={{ height: "400px" }} ref={mapRef} />;
  */
}
export default Map;