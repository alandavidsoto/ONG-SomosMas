import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button, FormHelperText, Box } from "@material-ui/core";
import { Field } from "formik";
import imagePlaceholder from "./placeholder-image.jpg";

export const ImageInput = (props) => {
  const { error, value, handleChange } = props;
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (typeof value === "string") {
      setImagePreview(value ? value : null);
    } else {
      setImagePreview(value ? URL.createObjectURL(value) : null);
    }
  }, [value, setImagePreview]);

  return (
    <Box my={2}>
      <img
        className="img_activity"
        src={imagePreview ? imagePreview : imagePlaceholder}
        alt="Uploaded"
      />
      <Button
        style={{ marginTop: "15px" }}
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        color={error ? "secondary" : "default"}
        variant={error ? "outlined" : "contained"}
      >
        Upload File
        <Field
          type="file"
          onChange={(e) => handleChange(e.target.files[0])}
          name="image"
          value={value.fieldname}
          hidden
        />
      </Button>
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </Box>
  );
};
