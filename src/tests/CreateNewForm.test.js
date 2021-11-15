import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditNewForm from "../components/CreateEditNewForm";
import { act } from "react-dom/test-utils";

describe("Render createNew or editNew form based on props", () => {
  test("Text of submit button shows create if no new is in props", async () => {
    await waitFor(() => {
      render(<CreateEditNewForm />);
    });
    const submitButton = screen.getByText("Crear novedad");
    expect(submitButton).toBeInTheDocument();
  });
});
