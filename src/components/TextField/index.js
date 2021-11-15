import React from "react";

import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
} from "@material-ui/core";

import styles from "./styles.module.scss";

export default function TextField({
  onChange,

  value,

  label,

  type,

  placeholder,

  controlId,

  error,

  endAdornment,

  id,
}) {
  return (
    <FormGroup controlId={controlId} className={styles.textFieldContainer}>
      <FormLabel className={styles.textFieldLabel}> {label}</FormLabel>

      <FormControl
        aria-label={label}
        isInvalid={!!error}
        placeholder={placeholder}
      />

      <Input
        value={value}
        id={id}
        onChange={onChange}
        type={type}
        endAdornment={endAdornment}
        className={styles.textFieldControl}
      />

      <FormHelperText error={error}>{error}</FormHelperText>
    </FormGroup>
  );
}
