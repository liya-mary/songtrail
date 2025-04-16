import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import React from "react";
import { useEffect } from "react";
import Tag from "./Tag";

// Ensure that the map automatically recenter when adding a new tag
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
}

export function Map({addTag, position, tagList}) {


  return (
    <>
    <button onClick={() => addTag()}>Press Me!</button>
     <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ minHeight: "400px", minWidth: "400px" }}
      >
        <ChangeView center={position} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <div className="tagListing">
          {tagList.map((tag, index) => (
            <Marker position={tag} key={index}>
              <Tag tag={tag}/>
            </Marker>
          ))}
        </div>
      </MapContainer>
    </>
  )
}

export default Map
