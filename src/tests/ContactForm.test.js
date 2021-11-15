import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import ContactForm from "../components/ContactForm/ContactForm";
import { act } from "react-dom/test-utils";

describe("ContactForm", () => {
  beforeEach(() => {
    render(<ContactForm />);
  });

  test("Expect errors to be rendered if clicked submit without filling fields", async () => {
    const submitButton = screen.getByText("Enviar");
    act(() => {
      fireEvent.click(submitButton);
    });
    await waitFor(() =>
      expect(screen.getAllByText("Requerido").toBeInTheDocument)
    );
  });
  test("Expect phone field error if length is not valid", async () => {
    const phoneInput = screen.getByTestId("phoneInput");
    const submitButton = screen.getByText("Enviar");
    act(() => {
      fireEvent.change(phoneInput, { target: { value: 1234 } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    await waitFor(() =>
      expect(screen.getByText("Minimo 8 caracteres").toBeInTheDocument)
    );
  });
  test("Expect submit to be successful if all fields are valid", async () => {
    const nameInput = screen.getByTestId("nameInput");
    const emailInput = screen.getByTestId("emailInput");
    const phoneInput = screen.getByTestId("phoneInput");
    const messageInput = screen.getByTestId("messageInput");
    const submitButton = screen.getByText("Enviar");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "testytest" } });
      fireEvent.change(emailInput, { target: { value: "testytest@test.com" } });
      fireEvent.change(phoneInput, { target: { value: 123456789 } });
      fireEvent.change(messageInput, { target: { value: "test" } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      //value of inputs resets after successful submit
      expect(nameInput.textContent).toBe("");
    });
  });
});
