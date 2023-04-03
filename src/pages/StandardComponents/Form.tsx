import type { z } from "zod";
import { Formik } from "formik";
import type { FormikValues } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "./Button";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useToastContext } from "./Toast/toastContext";
import { TRPCError } from "@trpc/server";
import Spinner from "./Spinner";

export type FormProps<T extends FormikValues> = {
  initialValues: T;
  onSubmit: UseMutateAsyncFunction<T | void, unknown, T, unknown>;
  validationSchema: z.ZodSchema;
  children?: React.ReactNode;
  submitButtonContent: React.ReactNode | string;
  errorMessage?: string;
  successMessage?: string;
  successCallback?: () => void;
};

const Form = <T extends FormikValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  submitButtonContent,
  errorMessage = "Something went wrong",
  successMessage = "Success",
  successCallback = () => null,
}: FormProps<T>) => {
  const { addToast } = useToastContext();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await onSubmit(values)
          .then(() => {
            actions.resetForm();
            addToast({ title: successMessage, type: "success" });
            successCallback();
          })
          .catch((err: TRPCError) => {
            addToast({
              title: errorMessage,
              message: err.message,
              type: "error",
            });
          });
      }}
    >
      {({ isSubmitting, handleSubmit, setSubmitting }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setSubmitting(false);
          }}
        >
          <div className="flex h-full w-full flex-col gap-y-4">
            {children}
            <Button
              attributes={{ disabled: isSubmitting, type: "submit" }}
              type="primary"
              className="w-full"
            >
              {isSubmitting ? <Spinner size="md" /> : submitButtonContent}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
