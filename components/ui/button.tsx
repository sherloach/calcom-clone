import { cva, type VariantProps } from "class-variance-authority";
import type { LinkProps } from "next/link";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type InferredVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonColor = NonNullable<InferredVariantProps["color"]>;
export type ButtonBaseProps = {
  /** Action that happens when the button is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  shallow?: boolean;
  /**Tool tip used when icon size is set to small */
  tooltip?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipOffset?: number;
  disabled?: boolean;
  flex?: boolean;
} & Omit<InferredVariantProps, "color"> & {
    color?: ButtonColor;
  };

export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements["a"], "href" | "onClick" | "ref"> & LinkProps)
    | (Omit<JSX.IntrinsicElements["button"], "onClick" | "ref"> & { href?: never })
  );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }

const buttonVariants = cva(
  "relative inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        button: "",
        icon: "flex justify-center",
        fab: "radix-state-open:shadown-none justify-center rounded-full !shadow-none radix-state-open:rotate-45 radix-state-open:ring-0 md:rounded-md md:radix-state-open:rotate-0",
      },
      color: {
        primary:
          "focus-visible:ring-offset disabled:text-brand-subtle disabled:hover:text-brand-default bg-brand-default text-brand hover:bg-brand-emphasis focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default disabled:bg-brand-subtle disabled:opacity-40 disabled:hover:bg-brand-subtle disabled:hover:opacity-40",
        secondary:
          "focus-visible:ring-offset focus-visible:ring-empthasis border border-default bg-default text-emphasis hover:border-emphasis hover:bg-muted focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 disabled:border-subtle disabled:bg-opacity-30 disabled:text-muted disabled:hover:border-subtle disabled:hover:bg-default disabled:hover:bg-opacity-30 disabled:hover:text-muted",
        minimal:
          "focus-visible:ring-offset focus-visible:ring-empthasis text-emphasis hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 disabled:border-subtle disabled:bg-opacity-30 disabled:text-muted disabled:hover:border-subtle disabled:hover:bg-transparent disabled:hover:text-muted",
        destructive:
          "focus-visible:ring-offset border border-default text-emphasis hover:border-red-100 hover:bg-error  hover:text-red-700 focus-visible:border-red-100 focus-visible:bg-error  focus-visible:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 disabled:border-red-200 disabled:bg-red-100 disabled:text-red-700 disabled:opacity-40 disabled:hover:border-red-200 dark:hover:text-red-100",
      },
      size: {
        sm: "rounded-sm px-3 py-2 leading-4" /** For backwards compatibility */,
        base: "h-9 px-4 py-2.5 ",
        lg: "h-[36px] px-4 py-2.5 ",
      },
      loading: {
        true: "cursor-wait",
      },
    },
    defaultVariants: {
      variant: "button",
      color: "primary",
      size: "base",
    },
  }
);

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, color, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return <Comp className={cn(buttonVariants({ variant, size, className, color }))} ref={ref} {...props} />;
//   }
// );

const Button = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(function Button(
  props: ButtonProps,
  forwardedRef
) {
  const {
    loading = false,
    color = "primary",
    size,
    variant = "button",
    type = "button",
    tooltipSide = "top",
    tooltipOffset = 4,
    shallow,
    // attributes propagated from `HTMLAnchorProps` or `HTMLButtonProps`
    ...passThroughProps
  } = props;
  // Buttons are **always** disabled if we're in a `loading` state
  const disabled = props.disabled || loading;
  // If pass an `href`-attr is passed it's `<a>`, otherwise it's a `<button />`
  const isLink = typeof props.href !== "undefined";
  const elementType = isLink ? "a" : "button";
  const element = React.createElement(
    elementType,
    {
      ...passThroughProps,
      disabled,
      type: !isLink ? type : undefined,
      ref: forwardedRef,
      className: cn(buttonVariants({ color, size, loading, variant }), props.className),
      // if we click a disabled button, we prevent going through the click handler
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {variant === "fab" ? <span className="hidden md:inline">{props.children}</span> : props.children}
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            className={cn(
              "mx-4 h-5 w-5 animate-spin",
              color === "primary" ? "text-inverted" : "text-emphasis"
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </>
  );

  return props.href ? (
    <Link data-testid="link-component" passHref href={props.href} shallow={shallow && shallow} legacyBehavior>
      {element}
    </Link>
  ) : (
    <>{element}</>
  );
});

// Button.displayName = "Button";

export { Button, buttonVariants };
