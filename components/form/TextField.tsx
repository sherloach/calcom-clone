import { forwardRef, useId } from "react";

import { Input, InputFieldProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import HintsOrErrors from "./HintsOrErrors";

const PLACEHOLDER: Record<string, string> = {
  username: "username",
  email: "jdoe@example.com",
  password: "•••••••••••••",
};

type AddonProps = {
  children: React.ReactNode;
  isFilled?: boolean;
  className?: string;
  onClickAddon?: () => void;
};

const Addon = ({ children, isFilled, className, onClickAddon }: AddonProps) => (
  <div
    onClick={onClickAddon && onClickAddon}
    className={cn(
      "flex border-default [input:hover_+_&]:border-emphasis [input:hover_+_&]:border-l-default [&:has(+_input:hover)]:border-emphasis [&:has(+_input:hover)]:border-r-default h-9 border px-3",
      isFilled && "bg-subtle",
      onClickAddon && "cursor-pointer disabled:hover:cursor-not-allowed",
      className
    )}>
    <div className={"flex flex-col justify-center text-sm leading-7 text-default"}>
      <span className="flex whitespace-nowrap">{children}</span>
    </div>
  </div>
);

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
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
    addOnSuffix,
    addOnFilled = true,
    addOnClassname,
    onClickAddon,
    ...passThrough
  } = props;

  return (
    <div>
      {label && (
        <Label htmlFor={id} className="mb-2 capitalize">
          {label}
        </Label>
      )}
      {addOnLeading || addOnSuffix ? (
        <div className="group relative mb-1 flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-default">
          {addOnLeading && (
            <Addon isFilled={addOnFilled} className={cn("rounded-l-md border-r-0", addOnClassname)}>
              {addOnLeading}
            </Addon>
          )}
          <Input
            id={id}
            type={type}
            placeholder={PLACEHOLDER[name] || placeholder || ""}
            className={cn(
              className,
              "disabled:bg-subtle disabled:hover:border-subtle disabled:cursor-not-allowed",
              addOnLeading && "rounded-l-none border-l-0",
              addOnSuffix && "rounded-r-none border-r-0",
              "!my-0 !ring-0"
            )}
            readOnly={readOnly}
            ref={ref}
            isFullWidth={inputIsFullWidth}
            disabled={readOnly || disabled}
            {...passThrough}
          />
          {addOnSuffix && (
            <Addon onClickAddon={onClickAddon} isFilled={addOnFilled} className={cn("rounded-r-md", addOnClassname)}>
              {addOnSuffix}
            </Addon>
          )}
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
