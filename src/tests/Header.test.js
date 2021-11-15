import React from "react";
import { render, screen } from "@testing-library/react";
import PublicHeader from "../components/PublicHeader";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import { loginExample, logout } from "../app/auth/authReducer.js";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("<Header /> component for unauthenticated users", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PublicHeader />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should allow to view login, registration, and public links", () => {
    expect(screen.queryByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Registrarse/i)).toBeInTheDocument();
    expect(screen.queryByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.queryByText(/Nosotro/i)).toBeInTheDocument();
    expect(screen.queryByText(/Contacto/i)).toBeInTheDocument();
    expect(screen.queryByText(/Campañas/i)).toBeInTheDocument();
    expect(screen.queryByText(/Donacion/i)).toBeInTheDocument();
  });
  it("should NOT allow to view link the Escritorio  ", () => {
    expect(screen.queryByText(/Escritorio/i)).toBeFalsy();
  });
  it("should NOT allow to view the link perfil ", () => {
    expect(screen.queryByText(/perfil/i)).toBeFalsy();
  });
});
describe("<Header /> component for Authenticated users but they are not administrators ", () => {
  beforeEach(() => {
    store.dispatch(
      loginExample({
        email: "pepe@gmail.com",
        password: "pepe@gmail.com",
        role: "user",
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PublicHeader />
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    store.dispatch(logout());
  });

  it("should NOT allow to view links login and registrarse ", () => {
    expect(screen.queryByText(/login/i)).toBeFalsy();
    expect(screen.queryByText(/Registrarse/i)).toBeFalsy();
    expect(true).toBe(true);
  });
  it("should NOT allow to view link the Escritorio  ", () => {
    expect(screen.queryByText(/Escritorio/i)).toBeFalsy();
  });
  it("should allow to view the link perfil ", () => {
    expect(screen.queryByText(/perfil/i)).toBeTruthy();
  });
  it("should allow to view links public ", () => {
    expect(screen.queryByText(/Inicio/i)).toBeTruthy();
    expect(screen.queryByText(/Nosotro/i)).toBeTruthy();
    expect(screen.queryByText(/Contacto/i)).toBeTruthy();
    expect(screen.queryByText(/Campañas/i)).toBeTruthy();
    expect(screen.queryByText(/Donacion/i)).toBeTruthy();
  });
});
describe("<Header /> component for Authenticated users and they are administrators", () => {
  beforeEach(() => {
    store.dispatch(
      loginExample({
        email: "hann23@gmail.com",
        password: "hann23@gmail.com",
        role: "admi",
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PublicHeader />
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    store.dispatch(logout());
  });
  it("should NOT allow to view links login and registrarse ", () => {
    expect(screen.queryByText(/login/i)).toBeFalsy();
    expect(screen.queryByText(/Registrarse/i)).toBeFalsy();
  });
  it("should NOT allow to view links Donacion and Contacto", () => {
    expect(screen.queryByText(/Donacion/i)).toBeFalsy();
    expect(screen.queryByText(/Caontacto/i)).toBeFalsy();
  });
  it("should allow to view link the Escritorio ", () => {
    expect(screen.queryByText(/Escritorio/i)).toBeInTheDocument();
  });
});
