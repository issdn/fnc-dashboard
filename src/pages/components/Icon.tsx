import type { FC } from "react";

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: FC<IconProps> = ({ icon, className = "" }) => {
  return <span className={`${className} material-icons`}>{icon}</span>;
};

export default Icon;
