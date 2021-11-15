import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditMembersForm from "../components/CreateEditMembersForm/CreateEditMembersForm";
import axiosMock from "MembersFormMock";
import { act } from "react-dom/test-utils";

const onSubmit = axiosMock.patch;

describe("Render edit member form based on props", () => {
  test("Text of submit button shows edit if member is in props", async () => {
    await waitFor(() => {
      render(<CreateEditMembersForm member={"member"} />);
    });
    const submitButton = screen.getByText("Editar Miembro");
    expect(submitButton).toBeInTheDocument();
  });
});
