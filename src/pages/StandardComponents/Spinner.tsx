import type { FC } from "react";

type SpinnerProps = {
  size?: keyof typeof sizes;
};

const sizes = {
  sm: "h-4 w-4 border-[2px]",
  md: "h-8 w-8 border-[4px]",
  lg: "h-16 w-16  border-[6px]",
} as const;

const Spinner: FC<SpinnerProps> = ({ size = "lg" }) => {
  return (
    <span
      className={`${sizes[size]} animate-spin rounded-full border-neutral-400 border-b-transparent`}
    />
  );
};

export default Spinner;
