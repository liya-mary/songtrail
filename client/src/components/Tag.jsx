import React from "react"
import { Popup } from "react-leaflet"

export function Tag({tag}) {

  const date = new Date(tag.timestamp);
  const hours = date.getHours();

// need to customise the popup
  return (
    <>
      <Popup>
        <div className="songTitle">
          {tag.title}
        </div>
        <div className="artistName">
          {tag.author}
        </div>
        <div className="date">
          {tag.timestamp}
        </div>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </>
  )
}

export default Tag
