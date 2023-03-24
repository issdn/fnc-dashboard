import type { FC } from "react";

const styles = {
  primary:
    "rounded-3xl border-2 h-full disabled:bg-neutral-700 border-neutral-900 focus:outline outline-neutral-900 outline-offset-1 disabled:outline-none disabled:cursor-not-allowed invalid:outline-red-900",
} as const;

type InputProps = {
  className?: string;
  attributes?: React.InputHTMLAttributes<HTMLInputElement>;
  style?: keyof typeof styles;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({
  onChange,
  style = "primary",
  attributes = {},
  className = "",
}) => {
  return (
    <input
      {...attributes}
      onChange={onChange}
      className={`px-2 py-1 ${styles[style]} ${className}`}
    ></input>
  );
};

export default Input;
