import { AlertCircle, Check, Circle } from "lucide-react";
import { type FieldValues, useFormContext } from "react-hook-form";

interface HintsOrErrorsProps {
  hintErrors?: string[];
  fieldName: string;
}

const HINT: Record<string, string> = {
  caplow: "Mix of uppercase",
  min: "Minimum 7 characters long",
  num: "Contain at least 1 number",
};

const HintsOrErrors = <T extends FieldValues = FieldValues>({ hintErrors, fieldName }: HintsOrErrorsProps) => {
  const methods = useFormContext() as ReturnType<typeof useFormContext> | null;

  console.log("method", methods);
  /* If there's no methods it means we're using these components outside a React Hook Form context */
  if (!methods) return null;

  const { formState } = methods;
  // @ts-ignore
  const fieldErrors: FieldErrors<T> | undefined = formState.errors[fieldName];
  console.log("Hints or Errors", fieldErrors, fieldName);

  // no hints passed, field errors exist and they are custom ones
  if (!hintErrors && fieldErrors && !fieldErrors.message) {
    return (
      <div className="mt-2 flex items-center text-sm text-default">
        <ul className="ml-2">
          {Object.keys(fieldErrors).map((key: string) => {
            return (
              <li key={key} className="text-red-700">
                {HINT[key]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // hints passed, errors exist, display hints with errors
  if (hintErrors && fieldErrors) {
    return (
      <div className="mt-2 flex items-center text-sm text-default">
        <ul className="ml-2">
          {hintErrors?.map((key: string) => {
            const error = fieldErrors[key] || fieldErrors.message;
            return (
              <li key={key} className={error !== undefined ? "" : "text-green-600"}>
                {error !== undefined ? (
                  <Circle fill="currentColor" size="5" className="mx-2 inline-block" />
                ) : (
                  <Check size="12" strokeWidth="3" className="mx-1 inline-block" />
                )}
                {HINT[key]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // errors exist, not custom ones, just show them as is
  if (fieldErrors) {
    return (
      <div className="mt-2 flex items-center gap-x-2 text-sm text-red-700">
        <AlertCircle width="13" height="13" />
        <p>{fieldErrors.message}</p>
      </div>
    );
  }

  if (!hintErrors) return null;

  // hints passed, no errors, display hints
  return (
    <div className="mt-2 flex items-center text-sm text-default">
      <ul className="ml-2">
        {hintErrors?.map((key: string) => {
          // if field was changed, as no error exist, show checked status and color
          const dirty = formState.dirtyFields[fieldName];
          return (
            <li key={key} className={!!dirty ? "text-green-600" : ""}>
              {!!dirty ? (
                <Check size="12" strokeWidth="3" className="mx-1 inline-block" />
              ) : (
                <Circle fill="currentColor" size="5" className="mx-2 inline-block" />
              )}
              {HINT[key]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HintsOrErrors;
