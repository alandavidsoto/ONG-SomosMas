import Swal from "sweetalert2";

export const SweetAlert = (type, text) => {
  switch (type) {
    case "success":
      Alert("Confirmación", text || "¡Se ha realizado con Éxito!");
      break;
    case "error":
      Alert("Error", text || "¡Ocurrió un Error!");
      break;
    case "info":
      Alert("Información", text || "Información genérica");
      break;

    default:
      break;
  }
  function Alert(title, text) {
    Swal.fire({
      title,
      text,
      icon: type,
      confirmButtonText: "OK",
    });
  }
};
