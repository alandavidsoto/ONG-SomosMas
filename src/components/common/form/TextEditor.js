import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";

export const TextEditor = (props) => {
  const { handleChange, value, ...rest } = props;
  const handleEditor = (event, editor) => {
    handleChange(editor.getData());
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleEditor}
        {...rest}
      />
    </div>
  );
};
