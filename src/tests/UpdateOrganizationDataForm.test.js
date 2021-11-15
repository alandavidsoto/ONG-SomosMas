import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import UpdateOrganizationDataForm from "../components/UpdateOrganizationDataForm";
import { act } from "react-dom/test-utils";

describe("Render edit organization form", () => {
  test("Title of form shows edit", async () => {
    await waitFor(() => {
      render(
        <Provider store={store}>
          <UpdateOrganizationDataForm />
        </Provider>
      );
    });
    const title = screen.getByText("Editar datos de la organizacion");
    expect(title).toBeInTheDocument();
  });
});
describe("Validation of form input fields before submit", () => {
  test("Expect errors to be rendered if clicked submit without filling fields", async () => {
    await waitFor(() => {
      render(
        <Provider store={store}>
          <UpdateOrganizationDataForm />
        </Provider>
      );
    });
    const submitButton = screen.getByText("Guardar");
    const nameInput = screen.getByTestId("nameInput");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByText("Escriba el nombre").toBeInTheDocument);
    });
  });
});
describe("Validation of form input fields before submit", () => {
  test("Expect errors to be rendered if clicked submit without filling fields", async () => {
    await waitFor(() => {
      render(
        <Provider store={store}>
          <UpdateOrganizationDataForm />
        </Provider>
      );
    });
    const submitButton = screen.getByText("Guardar");
    const longDescriptionInput = screen.getByTestId("longDescriptionTest");
    act(() => {
      fireEvent.change(longDescriptionInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByText("Escriba una descripcion").toBeInTheDocument);
    });
  });
});
describe("Validation of form input fields before submit", () => {
  test("Expect errors to be rendered if clicked submit without filling social media fields", async () => {
    await waitFor(() => {
      render(
        <Provider store={store}>
          <UpdateOrganizationDataForm />
        </Provider>
      );
    });
    const submitButton = screen.getByText("Guardar");
    const facebookTestInput = screen.getByTestId("facebookTest");
    const linkedinTestInput = screen.getByTestId("linkedinTest");
    const instagramTestInput = screen.getByTestId("facebookTest");
    const twitterTestInput = screen.getByTestId("facebookTest");
    act(() => {
      fireEvent.change(facebookTestInput, { target: { value: "" } });
      fireEvent.change(linkedinTestInput, { target: { value: "" } });
      fireEvent.change(instagramTestInput, { target: { value: "" } });
      fireEvent.change(twitterTestInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByText("Escriba el link de Facebook").toBeInTheDocument);
      expect(screen.getByText("Escriba el link de LinkedIn").toBeInTheDocument);
      expect(
        screen.getByText("Escriba el link de Instagram").toBeInTheDocument
      );
      expect(screen.getByText("Escriba el link de Twitter").toBeInTheDocument);
    });
  });
});
describe("Should change the redux organization store when submitting with valid values", () => {
  test("Shoudl call store.dispatch fn after sucessful submit", async () => {
    await waitFor(() => {
      store.dispatch = jest.fn();
      render(
        <Provider store={store}>
          <UpdateOrganizationDataForm />
        </Provider>
      );
    });

    const submitButton = screen.getByText("Guardar");
    const nameInput = screen.getByTestId("nameInput");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Somos Mas Test" } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(store.dispatch).toBeCalledTimes(1);
    });
  });
});
