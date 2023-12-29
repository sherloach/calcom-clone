import { Info } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { fetchUsername } from "@/actions/auth/signup/fetchUsername";
import { FormValues } from "@/app/signup/page";
import { useDebounce } from "@/hooks/useDebounce";

import { TextField } from "./TextField";

interface UsernameFieldProps {
  username: string;
  usernameTaken: boolean;
  setUsernameTaken: (value: boolean) => void;
}

const UsernameField = ({
  username,
  usernameTaken,
  setUsernameTaken,
  ...props
}: React.ComponentProps<typeof TextField> & UsernameFieldProps) => {
  const { register, formState } = useFormContext<FormValues>();
  const debouncedUsername = useDebounce(username, 600);

  useEffect(() => {
    if (formState.isSubmitting || formState.isSubmitSuccessful) return;

    async function checkUsername() {
      if (!debouncedUsername) {
        setUsernameTaken(false);
        return;
      }
      fetchUsername(debouncedUsername).then(({ available }) => {
        console.log("username", available);
        setUsernameTaken(!available);
      });
    }
    checkUsername();
  }, [debouncedUsername, formState.isSubmitSuccessful, formState.isSubmitting, setUsernameTaken]);

  return (
    <div>
      <TextField {...props} {...register("username")} addOnLeading={"http://localhost:8080/"} />
      {(!formState.isSubmitting || !formState.isSubmitted) && (
        <div className="mt-2 flex items-center text-sm text-default">
          <div className="text-sm ">
            {usernameTaken ? (
              <div className="flex items-center text-error">
                <Info className="mr-1 inline-block h-4 w-4" />
                <p>Username is already taken</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
UsernameField.displayName = "UsernameField";

export default UsernameField;
