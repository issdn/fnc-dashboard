import type { FC, ReactNode } from "react";

export const styles = {
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

export type IconButtonStyles = keyof typeof styles;

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  style?: IconButtonStyles;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  children,
  attributes,
  className = "",
  iconClassName = "",
  style = "clear",
}) => {
  return (
    <button
      {...attributes}
      className={`flex flex-row items-center justify-center px-1.5 py-0.5 outline-offset-2 focus:outline ${className} ${styles[style]}`}
      onClick={onClick}
    >
      <span className={`material-icons text-3xl ${iconClassName}`}>{icon}</span>
      {children}
    </button>
  );
};

export default IconButton;
