import { MapContainer, TileLayer, Marker, useMap, Polyline } from "react-leaflet";
import React from "react";
import { useEffect } from "react";
import Tag from "./Tag";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import customIconUrl from '../assets/pin.png'

interface mapProps {
  position: [number, number];
  tagList: Tag[];
  handleClick: any;
}

export function Map({position, tagList, handleClick}: mapProps) {

  function ChangeView({ center, zoom }: any) {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, zoom, {
          duration: 1,
          easeLinearity: 0.25
        });
      }
    }, [center, zoom, map]);
    return null;
  }
  let trail = tagList.map((tag: any) => {
    return tag.coordinates;
  });

  const blackOptions = { color: "#67B996"};

  //delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  const customIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });


  return (
    <>
     <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ minHeight: "400px", minWidth: "400px" }}
      >
        <ChangeView center={position} zoom={18}/>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <div className="tagListing">
          {tagList.map((tag: any, index: any) => (
            <Marker position={tag.coordinates} key={index} icon={customIcon}>
              <Tag tag={tag}/>
            </Marker>
          ))}
        </div>
        <Polyline pathOptions={blackOptions} positions={trail} />
      </MapContainer>
    </>
  )
}

export default Map
