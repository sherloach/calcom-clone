import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { cn } from "@/lib/utils";

import { InputFieldProps } from "../ui/input";
import { InputField } from "./TextField";

const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleIsPasswordVisible = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible, setIsPasswordVisible]
  );
  const textLabel = isPasswordVisible ? "Hide password" : "Show password";

  return (
    <div className="relative [&_.group:focus-within_.addon-wrapper]:border-neutral-300 [&_.group:hover_.addon-wrapper]:border-emphasis">
      <InputField
        type={isPasswordVisible ? "text" : "password"}
        ref={ref}
        {...props}
        className={cn("addon-wrapper mb-0 ltr:border-r-0 ltr:pr-10 rtl:border-l-0 rtl:pl-10", props.className)}
        addOnClassname="cursor-pointer"
        addOnFilled={false}
        addOnSuffix={
          // <Tooltip content={textLabel}>
          <button className="h-9 text-emphasis" tabIndex={-1} type="button" onClick={() => toggleIsPasswordVisible()}>
            {isPasswordVisible ? <EyeOff className="h-4 stroke-[2.5px]" /> : <Eye className="h-4 stroke-[2.5px]" />}
            <span className="sr-only">{textLabel}</span>
          </button>
          // </Tooltip>
        }
      />
    </div>
  );
});
PasswordField.displayName = "PasswordField";

export default PasswordField;
