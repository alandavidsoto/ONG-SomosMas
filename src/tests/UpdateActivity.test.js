import React from "react";
import { render, waitFor, screen, cleanup } from "@testing-library/react";
import user from "@testing-library/user-event";
import FormActivity from "../components/Activities/FormActivity/FormActivity";
import axiosMock from "ActivitiesFormMock";
import { activitiesAPI } from "../api/methods";

const newActivity = {
  name: "New Super Activity",
  description: "",
  image: new File(["hello"], "hello.png", { type: "image/png" }),
};
const activityToUpload = {
  category_id: null,
  created_at: "2021-09-27T03:49:04.000000Z",
  deleted_at: null,
  description: "<p>test</p>",
  group_id: null,
  id: 618,
  image: "http://ongapi.alkemy.org/storage/68PFo3kHqg.jpeg",
  name: "test",
  slug: null,
  updated_at: "2021-09-27T03:49:04.000000Z",
  user_id: null,
};
const updatedActivity = {
  name: "Updated Super Activity",
  description: "",
  image: new File(["goodbye"], "goodbye.png", { type: "image/png" }),
};
const onSubmit = axiosMock.post;
beforeEach(async () => {
  onSubmit.mockClear();
});
afterEach(cleanup);

describe("When an Activity is recived by props", () => {
  test("The form has a title 'Update Activity' ", async () => {
    await waitFor(() => {
      render(<FormActivity activity={{ ...newActivity }} />);
    });
    const sectionHeader = screen.getByRole("heading");
    expect(sectionHeader).toHaveTextContent("Edit Activity");
  });

  test("When all required fields are complete, can make a form submit", async () => {
    await waitFor(() => {
      render(<FormActivity activity={{ ...activityToUpload }} />);
    });
    const handleSubmit = jest.fn();

    const sectionHeader = screen.getByRole("heading");
    expect(sectionHeader).toHaveTextContent("Edit Activity");
    user.clear(getNameInput());
    user.type(getNameInput(), updatedActivity.name);
    await waitFor(() => {
      expect(getNameInput().value).not.toBe(activityToUpload.name);
      expect(getNameInput().value).toBe(updatedActivity.name);
    });
    await waitFor(() => {
      user.upload(
        getUploadImg(),
        new File(["goodBye"], "goodBye.png", { type: "image/png" })
      );
    });

    user.click(getSubmitButton());
    await waitFor(() => {
      expect(getNameInput().value).not.toBe("Update this activity");
      expect(getNameInput().value).toBe(activityToUpload.name);
    });
    handleSubmit.mockClear();
  });
});

function getNameInput() {
  return screen.getByPlaceholderText(/name/i);
}
function getUploadImg() {
  return screen.getByRole("button", {
    name: /upload file/i,
  });
}
function getSubmitButton() {
  return screen.getByText(/save activity/i);
}
function getNameErrorMessage() {
  return screen.getByText(/required/i);
}
function getImageErrorMessage() {
  return screen.getByText(/you need to provide a file/i);
}
