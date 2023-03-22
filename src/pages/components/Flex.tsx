import { FC } from "react";

type FlexProps = {
  direction?: "row" | "column";
  children?: React.ReactNode;
  className?: string;
};

const Flex: FC<FlexProps> = ({
  children,
  direction = "row",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-${direction} items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;
