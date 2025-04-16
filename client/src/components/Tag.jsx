import React from "react"
import { Popup } from "react-leaflet"

export function Tag({tag}) {

// need to customise the popup
  return (
    <>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </>
  )
}

export default Tag
