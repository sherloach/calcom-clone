/* eslint-disable unused-imports/no-unused-vars */
import { forwardRef, type ReactNode } from "react";
import * as React from "react";

// import { forwardRef } from "react";
import { cn } from "@/lib/utils";

import { Label } from "./label";

export type InputFieldProps = {
  label?: ReactNode;
  LockedIcon?: React.ReactNode;
  hint?: ReactNode;
  hintErrors?: string[];
  addOnLeading?: ReactNode;
  addOnSuffix?: ReactNode;
  inputIsFullWidth?: boolean;
  addOnFilled?: boolean;
  addOnClassname?: string;
  error?: string;
  labelSrOnly?: boolean;
  containerClassName?: string;
  showAsteriskIndicator?: boolean;
  onClickAddon?: () => void;
} & React.ComponentProps<typeof Input> & {
    labelProps?: React.ComponentProps<typeof Label>;
    labelClassName?: string;
  };

export type InputProps = JSX.IntrinsicElements["input"] & { isFullWidth?: boolean };

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isFullWidth = true, ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        "hover:border-emphasis dark:focus:border-emphasis border-default bg-default placeholder:text-muted text-emphasis disabled:hover:border-default disabled:bg-subtle focus:ring-brand-default mb-2 block h-9 rounded-md border px-3 py-2 text-sm leading-4 transition focus:border-neutral-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed",
        isFullWidth && "w-full",
        props.className
      )}
    />
  );
});
Input.displayName = "Input";

export { Input };
