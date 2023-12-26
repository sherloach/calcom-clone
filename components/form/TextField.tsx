import { forwardRef, useId } from "react";

import { Input, InputFieldProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import HintsOrErrors from "./HintsOrErrors";

const PLACEHOLDER: Record<string, string> = {
  username: "username",
  email: "jdoe@example.com",
  password: '•••••••••••••"',
};

interface AddonProps {
  children?: React.ReactNode;
}

const Addon = ({ children }: AddonProps) => (
  <div className="flex h-9 rounded-l-md border border-r-0 border-default px-3 [&:has(+_input:hover)]:border-emphasis [&:has(+_input:hover)]:border-r-default [input:hover_+_&]:border-emphasis [input:hover_+_&]:border-l-default">
    <div className="flex flex-col justify-center text-sm leading-7 text-default">
      <span className="flex whitespace-nowrap">{children}</span>
    </div>
  </div>
);

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const id = useId();
  const name = props.name || "";
  const {
    label = name,
    disabled,
    placeholder,
    className,
    inputIsFullWidth,
    type,
    hintErrors,
    readOnly,
    addOnLeading,
    ...passThrough
  } = props;

  return (
    <div>
      {label && (
        <Label htmlFor={id} className="mb-2 capitalize">
          {label}
        </Label>
      )}
      {addOnLeading ? (
        <div className="group relative mb-1 flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-default">
          <Addon>{addOnLeading}</Addon>
          <Input
            id={id}
            type={type}
            placeholder={PLACEHOLDER[name] || placeholder || ""}
            className="!my-0 mb-2 h-9 rounded-md rounded-l-none border-l-0 bg-default text-sm leading-4 text-emphasis !ring-0 transition placeholder:text-muted hover:border-emphasis focus:border-neutral-300 focus:ring-2 focus:ring-brand-default disabled:cursor-not-allowed disabled:bg-subtle disabled:hover:border-subtle"
            readOnly={readOnly}
            ref={ref}
            isFullWidth={inputIsFullWidth}
            disabled={readOnly || disabled}
            {...passThrough}
          />
        </div>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={PLACEHOLDER[name] || placeholder || ""}
          className={cn(className, "disabled:bg-subtle disabled:hover:border-subtle disabled:cursor-not-allowed")}
          readOnly={readOnly}
          ref={ref}
          isFullWidth={inputIsFullWidth}
          disabled={readOnly || disabled}
          {...passThrough}
        />
      )}
      <HintsOrErrors hintErrors={hintErrors} fieldName={name} />
    </div>
  );
});
InputField.displayName = "TextField";

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(function TextField(props, ref) {
  return <InputField ref={ref} {...props} />;
});
