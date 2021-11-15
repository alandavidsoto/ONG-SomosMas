import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditMembersForm from "../components/CreateEditMembersForm/CreateEditMembersForm";
import axiosMock from "MembersFormMock";
import { act } from "react-dom/test-utils";

const onSubmit = axiosMock.post;

const newMember = {
  name: "New name Member Test",
  description: "New description Member Test",
  image: new File(["test"], "test.png", { type: "image/png" }),
  facebookUrl: "http://facebook.com/marco_fernandez",
  linkedinUrl: "http://linkedin.com/marco_fernandez",
};

describe("Render create member form based on props", () => {
  test("Text of submit button shows create if no member is in props", async () => {
    await waitFor(() => {
      render(<CreateEditMembersForm />);
    });
    const submitButton = screen.getByText("Crear Miembro");
    expect(submitButton).toBeInTheDocument();
  });
});

describe("Validation of form input fields before submit", () => {
  test("Expect errors to be rendered if clicked submit without filling fields", async () => {
    await waitFor(() => {
      render(<CreateEditMembersForm />);
    });
    const submitButton = screen.getByText("Crear Miembro");
    act(() => {
      userEvent.click(submitButton);
    });
    await waitFor(() =>
      expect(screen.getByText("Debes ingresar un nombre").toBeInTheDocument)
    );
    await waitFor(() =>
      expect(
        screen.getByText("Debes ingresar una descripción").toBeInTheDocument
      )
    );
    await waitFor(() =>
      expect(screen.getByText("Debes elegir una imagen").toBeInTheDocument)
    );
  });
  test("Cant submit if the form has errors", async () => {
    await waitFor(() => {
      render(<CreateEditMembersForm />);
    });
    axiosMock.post.mockResolvedValueOnce({ data: "Request failure" });
    const submitButton = screen.getByText("Crear Miembro");
    act(() => {
      userEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
    expect(onSubmit).not.toHaveBeenCalledWith({});
  });
});
describe("Can create a new member", () => {
  test("When all required fields are complete and valid, can make a form submit", async () => {
    await waitFor(() => {
      render(<CreateEditMembersForm />);
    });
    axiosMock.post.mockResolvedValueOnce({ data: "Request made successfully" });
    const submitButton = screen.getByText("Crear Miembro");
    const nameInput = screen.getByRole("textbox", { name: "Nombre" });
    const descriptionInput = screen.getByRole("textbox", {
      name: "Rich Text Editor, main",
    });
    const imageInput = screen.getByTestId("imageInput");
    const facebookInput = screen.getByRole("textbox", { name: "Facebook" });
    const linkedinInput = screen.getByRole("textbox", { name: "LinkedIn" });
    act(() => {
      userEvent.type(nameInput, newMember.name);
      userEvent.type(descriptionInput, newMember.description);
      userEvent.upload(imageInput, newMember.image);
      userEvent.type(facebookInput, newMember.facebookUrl);
      userEvent.type(linkedinInput, newMember.linkedinUrl);
      userEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(nameInput).toHaveTextContent("");
    });
  });
});
