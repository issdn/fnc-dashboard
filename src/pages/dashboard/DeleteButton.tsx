import type { FC, ReactNode } from "react";
import Modal, { useModal } from "../standard-components/Modal/Modal";
import Icon from "../standard-components/Icon";
import { UseBaseMutationResult } from "@tanstack/react-query";
import Button from "../standard-components/Button";

type DeleteButtonProps = {
  deleteModalContent: ReactNode;
  className?: string;
  onDelete: UseBaseMutationResult<
    unknown,
    unknown,
    Record<string, string | number | boolean>,
    unknown
  >["mutateAsync"];
};

const DeleteButton: FC<DeleteButtonProps> = ({
  deleteModalContent,
  className = "",
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Button className={className} onClick={openModal}>
        <Icon icon="delete_forever" className="text-2xl xl:text-3xl" />
      </Button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {deleteModalContent}
        <div className="flex w-full flex-row gap-x-2">
          <Button type="primary" className="w-full">
            <Icon className="w-fit" icon="delete_permamently" />
            Delete Permamently
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
