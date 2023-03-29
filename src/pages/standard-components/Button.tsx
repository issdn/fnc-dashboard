import type { FC, ReactNode } from "react";

export const types = {
  primary:
    "bg-neutral-900 text-neutral-100 rounded-xl hover:bg-neutral-800 disabled:bg-neutral-300 outline-neutral-900",
  primaryLighter:
    "bg-neutral-800 text-neutral-100 rounded-xl hover:bg-neutral-700 disabled:bg-neutral-300 outline-neutral-800",
  primaryContrast:
    "bg-neutral-900 text-neutral-100 rounded-xl hover:bg-neutral-800 disabled:bg-neutral-300 outline-neutral-100",
  primaryLighterContrast:
    "bg-neutral-800 text-neutral-100 rounded-xl hover:bg-neutral-700 disabled:bg-neutral-300 outline-neutral-100",
  clear: "",
  secondary:
    "text-neutral-900 rounded-xl hover:text-neutral-600 border-2 border-neutral-900 hover:border-neutral-600 disabled:bg-neutral-600 outline-neutral-900",
} as const;

export type ButtonStyles = keyof typeof types;

type ButtonProps = {
  onClick?: () => unknown;
  children?: ReactNode;
  className?: string;
  type?: ButtonStyles;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};
const Button: FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "clear",
  attributes,
}) => {
  return (
    <button
      {...attributes}
      className={`flex flex-row items-center justify-center gap-x-1 whitespace-nowrap py-1 px-2 outline-offset-2 transition-colors duration-300 focus:outline md:px-2 ${className} ${types[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
