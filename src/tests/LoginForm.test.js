import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { fireEvent, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "../components/loginForm/LoginForm";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("<LoginForm/>", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  });
  afterEach(cleanup);

  it("should't allow submit and should display two errors when submitting without filling fields", async () => {
    const submitButton = screen.getByText(/entrar/i);
    fireEvent.click(submitButton);
    await screen.findByText("No puedes dejar el campo email vacio");
    await screen.findByText("No puedes dejar el campo contraseña vacio");
  });

  it("should display an error when blur email input after don't type anything", async () => {
    const emailInput = screen.getByLabelText("Email");
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    await screen.findByText("No puedes dejar el campo email vacio");
  });

  it("should display an error when blur password input after don't type anything", async () => {
    const passInput = screen.getByLabelText("Contraseña");
    fireEvent.focus(passInput);
    fireEvent.blur(passInput);
    await screen.findByText("No puedes dejar el campo contraseña vacio");
  });

  it("should display an error when email input value is not valid", async () => {
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByText(/entrar/i);
    fireEvent.change(emailInput, { target: { value: "invalid_email" } });
    fireEvent.click(submitButton);
    await screen.findByText("Introduce un email valido");
  });

  describe("Testing password input", () => {
    it("should be longer than 6 characters", async () => {
      const passInput = screen.getByLabelText("Contraseña");
      const submitButton = screen.getByText(/entrar/i);
      fireEvent.change(passInput, { target: { value: "short" } });
      fireEvent.click(submitButton);
      await screen.findByText("Debe contener al menos 6 caracteres");
    });
    it("should contain at least one letter", async () => {
      const passInput = screen.getByLabelText("Contraseña");
      const submitButton = screen.getByText(/entrar/i);
      fireEvent.change(passInput, { target: { value: "123123123" } });
      fireEvent.click(submitButton);
      await screen.findByText("Debe contener al menos una letra");
    });
    it("should contain at least one digit", async () => {
      const passInput = screen.getByLabelText("Contraseña");
      const submitButton = screen.getByText(/entrar/i);
      fireEvent.change(passInput, { target: { value: "invalidpassword" } });
      fireEvent.click(submitButton);
      await screen.findByText("Debe contener al menos 1 Digito");
    });
    it("should contain at least one symbol", async () => {
      const passInput = screen.getByLabelText("Contraseña");
      const submitButton = screen.getByText(/entrar/i);
      fireEvent.change(passInput, { target: { value: "invalidpassword123" } });
      fireEvent.click(submitButton);
      await screen.findByText("Debe contener al menos 1 simbolo(#@-/)");
    });
  });

  it("should change the redux user store when submitting with valid values", async () => {
    const submitButton = screen.getByText(/entrar/i);
    const emailInput = screen.getByLabelText("Email");
    const passInput = screen.getByLabelText("Contraseña");
    // Filling inputs and submitting form
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passInput, { target: { value: "@password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const { auth } = store.getState();
      expect(auth.isAuthenticated).toBeTruthy();
    });
  });
});
