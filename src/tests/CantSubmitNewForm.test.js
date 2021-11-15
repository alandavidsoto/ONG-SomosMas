import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEditNewForm from "../components/CreateEditNewForm";
import axiosMock from "NewsFormMock";
import { act } from "react-dom/test-utils";

const onSubmit = axiosMock.post;

describe("HTTP post validation", () => {
  test("Cant submit if the form has errors", async () => {
    await waitFor(() => {
      render(<CreateEditNewForm />);
    });
    axiosMock.post.mockResolvedValueOnce({ data: "Request failure" });
    const submitButton = screen.getByText("Crear novedad");
    act(() => {
      userEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
    expect(onSubmit).not.toHaveBeenCalledWith({});
  });
});
