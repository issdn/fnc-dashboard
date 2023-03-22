`use client`;

import type { FC } from "react";

const styles = {
  primary:
    "rounded-3xl border-2 h-full disabled:bg-orange-300 border-orange-500 focus:outline outline-orange-500 outline-offset-1 disabled:outline-none disabled:cursor-not-allowed invalid:outline-red-500",
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
