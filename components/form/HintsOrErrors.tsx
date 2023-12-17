import { Check, Circle } from "lucide-react";

interface HintsOrErrorsProps {
  errors: any;
  hintErrors?: string[];
  dirty?: any;
}

const HINT: Record<string, string> = {
  caplow: "Mix of uppercase",
  min: "Minimum 7 characters long",
  num: "Contain at least 1 number",
};

const HintsOrErrors = ({ errors, hintErrors, dirty }: HintsOrErrorsProps) => {
  console.log(errors);

  // hints passed, errors exist, display hints with errors
  if (hintErrors && errors) {
    return (
      <div className="mt-2 flex items-center text-sm text-default">
        <ul className="ml-2">
          {hintErrors?.map((key: string) => {
            const error = errors[key];
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

  // hints passed, no errors, display hints
  return (
    <div className="mt-2 flex items-center text-sm text-default">
      <ul className="ml-2">
        {hintErrors?.map((key: string) => (
          <li key={key} className={!!dirty ? "text-green-600" : ""}>
            {!!dirty ? (
              <Check size="12" strokeWidth="3" className="mx-1 inline-block" />
            ) : (
              <Circle fill="currentColor" size="5" className="mx-2 inline-block" />
            )}
            {HINT[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HintsOrErrors;
