import type { FC, ReactNode } from "react";

import type { Category } from "@prisma/client";
import Modal, { useModal } from "../standard-components/Modal/Modal";
import Button from "../standard-components/Button";
import EditButton from "./EditButton";

type EditableTrProps = {
  category: Omit<Category, "id">;
  className?: string;
  index: number;
  children: ReactNode | ReactNode[];
};

const EditableTr: FC<EditableTrProps> = ({
  category,
  children,
  className = "",
}) => {
  return (
    <>
      <tr className={`${className}`}>
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
