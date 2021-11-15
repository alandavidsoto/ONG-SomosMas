import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import CreateEditNewForm from "../components/CreateEditNewForm";
import { act } from "react-dom/test-utils";
import { AccessAlarm } from "@material-ui/icons";

const testNew = {
  name: "title",
  slug: "title",
  content: "content",
  image: "",
  user_id: "tbd",
  category_id: "categoryId",
};

describe("Render createNew or editNew form based on props", () => {
  test("Text of submit button shows edit if new is in props", async () => {
    await waitFor(() => {
      render(<CreateEditNewForm new={testNew} />);
    });
    const submitButton = screen.getByText("Editar");
    expect(submitButton).toBeInTheDocument();
  });
});
