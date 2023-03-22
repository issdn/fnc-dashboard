`use client`;

import type { FC, ReactNode } from "react";

const styles = {
  primary:
    "bg-orange-500 text-neutral-100 rounded-3xl hover:bg-orange-400 disabled:bg-orange-30 focus:outline outline-orange-500 outline-offset-2",
} as const;

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  style?: keyof typeof styles;
  attributes?: React.HTMLAttributes<HTMLButtonElement>;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  children,
  className = "",
  style = "primary",
  attributes,
}) => {
  return (
    <button
      {...attributes}
      className={`flex flex-row items-center justify-center px-1 ${className} ${styles[style]}`}
      onClick={onClick}
    >
      <span className="material-icons text-3xl">{icon}</span>
      {children}
    </button>
  );
};

export default IconButton;
