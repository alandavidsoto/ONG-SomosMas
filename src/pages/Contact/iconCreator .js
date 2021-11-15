import L from "leaflet";
const CreateIconPosition = (icon) => {
  const iconCreate = L.icon({
    iconUrl: icon,
    iconSize: [50, 62],
    iconAnchor: null,
    popupAnchor: [0, -20],
  });
  return iconCreate;
};

export default CreateIconPosition;
