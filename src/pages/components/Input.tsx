`use client`;

import type { FC } from "react";

const styles = {
  primary:
    "rounded-3xl disabled:bg-orange-30 border-orange-500 focus:outline outline-orange-500 outline-offset-1 disabled:outline-none disabled:cursor-not-allowed invalid:outline-red-500",
} as const;

type InputProps = {
  className?: string;
  attributes?: React.HTMLAttributes<HTMLInputElement>;
  style?: keyof typeof styles;
};

const Input: FC<InputProps> = ({
  style = "primary",
  attributes = {},
  className = "",
}) => {
  return (
    <input
      className={`px-2 py-1 ${styles[style]} ${className}`}
      {...attributes}
    ></input>
  );
};

export default Input;
