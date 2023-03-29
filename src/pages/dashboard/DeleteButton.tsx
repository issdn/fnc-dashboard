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
        <div className="flex flex-col gap-y-8">
          {deleteModalContent}
          <div className="flex w-full flex-row gap-x-8">
            <Button type="primary">
              <Icon icon="delete_forever" />
              Delete Permamently
            </Button>
            <Button type="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
