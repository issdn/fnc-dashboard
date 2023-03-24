import type { FC } from "react";

import IconButton from "../IconButton";
import Modal, { useModal } from "./Modal/Modal";
import CategoryForm from "./CategoryForm";
import { api } from "~/utils/api";
import type { Category } from "@prisma/client";

type EditableTrProps = {
  id: string;
  category: Omit<Category, "id">;
  className?: string;
  index: number;
};

const EditableTr: FC<EditableTrProps> = ({
  id,
  category,
  className = "",
  index,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <tr className={className}>
        {Object.values(category).map((cell, i) => (
          <td key={i}>{cell}</td>
        ))}
        <td className="flex flex-row justify-center gap-x-1 py-1">
          <IconButton
            onClick={openModal}
            icon="edit"
            style="clear"
            className={`${className} ${
              index % 2 === 0
                ? "w-fit rounded-xl bg-neutral-900 text-neutral-100 outline-neutral-100 hover:bg-neutral-800 disabled:bg-neutral-300"
                : "w-fit rounded-xl bg-neutral-800 text-neutral-100 outline-neutral-100 hover:bg-neutral-700 disabled:bg-neutral-300"
            }`}
          />
          <IconButton
            style={
              index % 2 === 0 ? "primaryContrast" : "primaryLighterContrast"
            }
            icon="delete_forever"
            className="w-fit px-1.5 py-0.5"
            iconClassName="text-2xl"
          />
        </td>
      </tr>
      <Modal key={index} isOpen={isOpen} closeModal={closeModal}>
        <CategoryForm
          onSubmit={(values) =>
            api.database.editCategory
              .useMutation()
              .mutate({ id: id, ...values })
          }
          initialValues={{
            name: category.name,
            monthly_treshold: category.monthly_treshold,
          }}
        />
      </Modal>
    </>
  );
};

export default EditableTr;
