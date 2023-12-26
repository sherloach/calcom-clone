import { forwardRef } from "react";

import { TextField } from "./TextField";

interface UsernameFieldProps {
  label: string;
  passThrough?: any;
}

const UsernameField = forwardRef<HTMLInputElement, UsernameFieldProps>((props, ref) => {
  const { label, ...passThrough } = props;

  return (
    <div>
      <TextField ref={ref} label={label} {...passThrough} addOnLeading={"http://localhost:8080/"} />
    </div>
  );
});
UsernameField.displayName = "UsernameField";

export default UsernameField;
