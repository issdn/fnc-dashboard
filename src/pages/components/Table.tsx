import type { FC } from "react";

const styles = {
  primary: "bg-primary-900 text-white",
} as const;

type TableProps = {
  children: React.ReactNode;
  className?: string;
  style?: keyof typeof styles;
};

const Table: FC<TableProps> = ({
  children,
  className = "",
  style = "primary",
}) => {
  return <table className={` ${className} ${style}`}>{children}</table>;
};

export default Table;
