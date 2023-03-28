type TooltipProps = {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
  side?: "left" | "right" | "top" | "bottom";
};

const sides = {
  right: "left-[100%] -translate-y-1/2 after:arrow-left top-1/2 ml-4",
  left: "right-[100%] -translate-y-1/2 after:arrow-right top-1/2 mr-4",
  top: "bottom-[100%] -translate-x-1/2 after:arrow-top left-1/2 mb-4",
  bottom: "top-[100%] -translate-x-1/2 after:arrow-bottom left-1/2 mt-4",
} as const;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className = "",
  visible = true,
  side = "right",
}) => {
  return (
    <div
      style={{ display: visible ? "inline-block" : "none" }}
      className={`${className} text-secondary ${sides[side]} absolute max-w-[16rem] break-words rounded-md bg-neutral-900 px-4 py-1 font-mono text-lg font-bold transition-[display] duration-200`}
    >
      {children}
    </div>
  );
};

export default Tooltip;
