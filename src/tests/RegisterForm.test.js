import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { findByText, fireEvent, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import FormRegister from "../components/FormRegister/FormRegister";
import store from "../redux/store";
import { Provider } from "react-redux";

describe("testing FormRegister", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FormRegister />
      </Provider>
    );
  });
  afterEach(cleanup);

  test("when all fields are empty, do not allow submission ", async () => {
    const button = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(button);
    await screen.findByText(/No puedes dejar este campo vacío/i);
    await screen.findByText(/No puedes dejar el campo email vacío/i);
    await screen.findByText(/No puedes dejar el campo contraseña vacío/i);
    await screen.findByText(/No puedes dejar este campo vacío/i);
    await screen.findByText(/Debes aceptar los términos y condiciones/i);
  });
  test("the name field should not contain numbers or symbols", async () => {
    const button = screen.getByRole("button", { name: "Registrarse" });
    const inputName = screen.getByRole("textbox", { name: /nombre/i });
    fireEvent.change(inputName, { target: { value: "Alan@david4" } });
    fireEvent.click(button);
    await screen.findByText(/No puede contener numeros y simbolos/i);
  });

  test("should the email field contains text but is not a valid email", async () => {
    const button = screen.getByRole("button", { name: "Registrarse" });
    const inputEmail = screen.getByRole("textbox", { name: /email/i });
    fireEvent.change(inputEmail, {
      target: { value: "alansoto2015outlookcom" },
    });
    fireEvent.click(button);
    await screen.findByText(/Introduzca un email válido/i);
  });
  describe("testing Inputpassword", () => {
    test("should contain at least 6 characters  ", async () => {
      const button = screen.getByRole("button", { name: "Registrarse" });
      const inputPassword = screen.getByLabelText("Contraseña");
      fireEvent.change(inputPassword, { target: { value: "a4b5c" } });
      fireEvent.click(button);
      await screen.findByText(/Debe contener al menos 6 caracteres/i);
    });

    test("should contain at least 1 letter", async () => {
      const button = screen.getByRole("button", { name: "Registrarse" });
      const inputPassword = screen.getByLabelText("Contraseña");
      fireEvent.change(inputPassword, { target: { value: "123@#%" } });
      fireEvent.click(button);
      await screen.findByText(/Debe contener al menos 1 letra/i);
    });
    test("should contain at least 1 symbol", async () => {
      const button = screen.getByRole("button", { name: "Registrarse" });
      const inputPassword = screen.getByLabelText("Contraseña");
      fireEvent.change(inputPassword, { target: { value: "sfe451" } });
      fireEvent.click(button);
      await screen.findByText(/Debe contener al menos 1 símbolo/i);
    });

    test("should contain at least 1 digit", async () => {
      const button = screen.getByRole("button", { name: "Registrarse" });
      const inputPassword = screen.getByLabelText("Contraseña");
      fireEvent.change(inputPassword, { target: { value: "abc#$!" } });
      fireEvent.click(button);
      await screen.findByText(/La contraseña debe contener al menos 1 dígito/i);
    });
  });

  test("when the repeatPassword field does not have the same content as the password field ", async () => {
    const button = screen.getByRole("button", { name: "Registrarse" });
    const inputPassword = screen.getByLabelText("Contraseña");
    const inputRepPassword = screen.getByLabelText("Repetir Contraseña");
    fireEvent.change(inputPassword, { target: { value: "pelota23#" } });
    fireEvent.change(inputRepPassword, { target: { value: "cuadrado$25" } });
    fireEvent.click(button);
    await screen.findByText(/Las contraseña deben ser iguales/i);
  });

  test("if the conditions field is not accept", async () => {
    const button = screen.getByRole("button", { name: "Registrarse" });
    fireEvent.click(button);
    await screen.findByText(/Debes aceptar los términos y condiciones/i);
  });

  test("when all fields are completed,allow submission", async () => {
    const button = screen.getByRole("button", { name: "Registrarse" });
    const inputName = screen.getByRole("textbox", { name: /nombre/i });
    const inputEmail = screen.getByRole("textbox", { name: /email/i });
    const inputPassword = screen.getByLabelText("Contraseña");
    const inputRepPassword = screen.getByLabelText("Repetir Contraseña");
    const checkConditions = screen.getByRole("checkbox", {
      name: "Acepto los términos y condiciones.",
    });
    fireEvent.change(inputName, { target: { value: "Alan david" } });
    fireEvent.change(inputEmail, {
      target: { value: "alansoto2015@outlook.com" },
    });
    fireEvent.change(inputPassword, { target: { value: "cuadrado223@" } });
    fireEvent.change(inputRepPassword, { target: { value: "cuadrado223@" } });
    fireEvent.click(checkConditions);
    fireEvent.click(button);
    await waitFor(() => {
      const { auth } = store.getState();
      expect(auth.isAuthenticaded).toBeTruthy();
    });
  });
});
