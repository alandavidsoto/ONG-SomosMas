import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditNewForm from "../components/CreateEditNewForm";
import axiosMock from "NewsFormMock";
import { act } from "react-dom/test-utils";

describe("HTTP post validation, can create a new", () => {
  test("When all required fields are complete and valid, can make a form submit", async () => {
    await waitFor(() => {
      render(<CreateEditNewForm />);
    });
    axiosMock.post.mockResolvedValueOnce({ data: "Request made successfully" });
    const submitButton = screen.getByText("Crear novedad");
    const nameInput = screen.getByRole("textbox", { name: "Nombre" });
    const contentInput = screen.getByRole("textbox", {
      name: "Rich Text Editor, main",
    });
    act(() => {
      userEvent.type(nameInput, "newTest");
      userEvent.type(contentInput, "newTest");
      userEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(nameInput).toHaveTextContent("");
    });
  });
});
