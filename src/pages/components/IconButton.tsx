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
} as const;

export type IconButtonStyles = keyof typeof types;

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  type?: IconButtonStyles;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};
const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  children,
  className = "",
  iconClassName = "",
  type = "clear",
  attributes,
}) => {
  return (
    <button
      {...attributes}
      className={`flex flex-row items-center justify-center p-1 outline-offset-2 transition-colors duration-300 focus:outline md:px-2 ${className} ${types[type]}`}
      onClick={onClick}
    >
      <span className={`material-icons ${iconClassName}`}>{icon}</span>

      {children}
    </button>
  );
};

export default IconButton;
