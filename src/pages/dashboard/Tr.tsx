import {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

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

const handleMoveToTheNextPreviousTR = (
  e: React.KeyboardEvent<HTMLTableRowElement>,
  onClick: () => void
) => {
  if ((e.target as HTMLTableRowElement).nodeName !== "TR") return;
  if (e.key === "ArrowDown") {
    const nextTr = e.currentTarget.nextElementSibling;
    if (nextTr) {
      (nextTr as HTMLTableRowElement).focus();
    }
  } else if (e.key === "ArrowUp") {
    const prevTr = e.currentTarget.previousElementSibling;
    if (prevTr) {
      (prevTr as HTMLTableRowElement).focus();
    }
  } else if (e.key === " ") {
    e.preventDefault();
    onClick();
  } else if (e.key === "ArrowRight") {
    const childButtons = e.currentTarget.getElementsByTagName("button");
    if (childButtons.length > 0) {
      if (!childButtons[0]) return;
      childButtons[0].focus();
    }
  } else if (e.key === "ArrowLeft") {
    const childButtons = e.currentTarget.getElementsByTagName("button");
    if (childButtons.length > 0) {
      childButtons[childButtons.length - 1]?.focus();
    }
  }
};

const Tr: FC<TrProps> = ({
  row,
  children,
  className = "",
  onClick = () => null,
  selected = false,
}) => {
  const trRef = useRef<HTMLTableRowElement | null>(null);
  useEffect(() => {
    if (trRef.current) {
      const buttonChildren = trRef.current?.getElementsByTagName("button");
      if (buttonChildren?.length > 0) {
        for (const button of buttonChildren) {
          button.onkeydown = (e) => {
            if (e.key === "ArrowLeft") {
              const prevButton = button.previousElementSibling;
              if (prevButton) {
                (prevButton as HTMLButtonElement).focus();
              } else {
                trRef.current?.focus();
              }
            } else if (e.key === "ArrowRight") {
              const nextButton = button.nextElementSibling;
              if (nextButton) {
                (nextButton as HTMLButtonElement).focus();
              } else {
                const nextTr = trRef.current?.nextElementSibling;
                if (nextTr) (nextTr as HTMLTableRowElement).focus();
              }
            } else if (e.key === " ") {
              e.preventDefault();
              button.click();
            }
          };
        }
      }
    }
  }, []);

  return (
    <>
      <tr
        ref={trRef}
        tabIndex={0}
        onKeyDown={(e) =>
          handleMoveToTheNextPreviousTR(e, onClick as () => void)
        }
        onClick={onClick}
        className={`
              ${className}
              ${
                selected
                  ? "bg-slate-700 disabled:bg-slate-300 [&>button]:bg-slate-700"
                  : "disabled:bg-neutral-300 [&:nth-child(2n)>button]:bg-neutral-800 [&:nth-child(2n)]:bg-neutral-800 "
              } 
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
