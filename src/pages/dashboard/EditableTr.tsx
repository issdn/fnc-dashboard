import { FC, HTMLAttributes, ReactNode, useState } from "react";
import type { Category } from "@prisma/client";

type EditableTrProps = {
  category: Omit<Category, "id">;
  className?: string;
  index: number;
  children: ReactNode | ReactNode[];
} & HTMLAttributes<HTMLDivElement>;

export const useSelectTr = <T,>() => {
  const [selectedTr, setSelectedTr] = useState<T | null>(null);
  const selectTr = (item: T) => {
    setSelectedTr(item);
  };
  return { selectedTr, selectTr };
};

const EditableTr: FC<EditableTrProps> = ({
  category,
  children,
  className = "",
  onClick,
}) => {
  return (
    <>
      <tr
        onClick={onClick}
        className={`${className} "
              last:rounded-br-xl 
              [&>td:first-child]:px-1
              [&>td:first-child]:sm:px-2
              [&>td:first-child]:xl:px-16
              [&>td:last-child]:px-1
              [&>td:last-child]:sm:px-2
              [&>td:last-child]:xl:px-16`}
      >
        {Object.values(category).map((cell, i) => (
          <td key={i}>{cell}</td>
        ))}
        <td className="flex flex-row justify-center py-1">
          <div className="flex flex-row gap-x-1">{children}</div>
        </td>
      </tr>
    </>
  );
};

export default EditableTr;
