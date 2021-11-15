import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditNewForm from "../components/CreateEditNewForm";
import { act } from "react-dom/test-utils";

describe("Validation of form input fields before submit", () => {
  test("Expect errors to be rendered if clicked submit without filling fields", async () => {
    await waitFor(() => {
      render(<CreateEditNewForm />);
    });
    const submitButton = screen.getByText("Crear novedad");
    act(() => {
      userEvent.click(submitButton);
    });
    await waitFor(() =>
      expect(screen.getByText("Debes ingresar un título").toBeInTheDocument)
    );
    await waitFor(() =>
      expect(screen.getByText("Debes elegir una categoría").toBeInTheDocument)
    );
    await waitFor(() =>
      expect(screen.getByText("Debes ingresar un contenido").toBeInTheDocument)
    );
    await waitFor(() =>
      expect(screen.getByText("Debes elegir una imagen").toBeInTheDocument)
    );
  });
});
