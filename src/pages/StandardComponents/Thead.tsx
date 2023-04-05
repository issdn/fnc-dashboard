import type { FC } from "react";

type TheadProps = {
  children: React.ReactElement<HTMLTableCellElement>[];
};

const Thead: FC<TheadProps> = ({ children }) => {
  return (
    <thead className="text-center">
      <tr className="[&>th]:px-2 [&>th]:py-4">{children}</tr>
    </thead>
  );
};

export default Thead;
