import React from "react";
import { compose, withProps } from "recompose";
import { CircularProgress } from "@material-ui/core";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import styles from "./mapStyles";

const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

// At the moment GoogleMap only receives onClick element
// if you want to use this component with any other event just add it like onClick

const Map = compose(
  withProps({
    googleMapURL: url,
    loadingElement: (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </div>
    ),
    mapElement: <div style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      options={{ styles }}
      defaultZoom={props.defaultZoom}
      defaultCenter={props.defaultCenter}
      onClick={props.onClick}
    >
      {props.showMarker && <Marker position={props.markerPosition} />}
    </GoogleMap>
  );
});

export default Map;
