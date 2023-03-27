import type { FieldConfig } from "formik";
import { useField } from "formik";
import type { FC } from "react";

type InputProps = {
  label: string;
} & JSX.IntrinsicElements["input"] &
  FieldConfig<string>;

const Input: FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-y-2">
      <label>{label}</label>
      <input
        className={`${
          meta.error && meta.touched ? "border-red-500 outline-red-500" : ""
        } rounded-xl border-2 border-neutral-900 px-4 py-2 outline-offset-2 outline-neutral-900 focus:outline`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
