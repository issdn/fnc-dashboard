import { FC, HTMLAttributes, ReactNode, useState } from "react";

type TrProps = {
  row: Record<string, string | number>;
  className?: string;
  index: number;
  children: ReactNode | ReactNode[];
  selected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const useSelectTr = <T,>() => {
  const [selectedTr, setSelectedTr] = useState<T | null>(null);
  const selectTr = (item: T | null) => {
    setSelectedTr(item);
  };
  return { selectedTr, selectTr };
};

const Tr: FC<TrProps> = ({
  row,
  children,
  className = "",
  onClick,
  selected = false,
}) => {
  return (
    <>
      <tr
        onClick={onClick}
        className={`
              ${className}
              ${
                selected
                  ? "bg-slate-700 disabled:bg-slate-300 [&>button]:bg-slate-700"
                  : "disabled:bg-neutral-300 [&:nth-child(2n)>button]:bg-neutral-800 [&:nth-child(2n)]:bg-neutral-800 "
              }
              cursor-pointer 
              last:rounded-br-xl 
              [&>td:first-child]:px-1
              [&>td:first-child]:sm:px-2
              [&>td:first-child]:xl:px-16
              [&>td:last-child]:px-1
              [&>td:last-child]:sm:px-2
              [&>td:last-child]:xl:px-16`}
      >
        {Object.values(row).map((cell, i) => (
          <td key={i}>{cell}</td>
        ))}
        <td className="flex flex-row justify-center py-1">
          <div className="flex flex-row gap-x-1">{children}</div>
        </td>
      </tr>
    </>
  );
};

export default Tr;
