import type { FC, ReactNode } from "react";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import Icon from "../StandardComponents/Icon";
import Button from "../StandardComponents/Button";

type DeleteButtonProps = {
  deleteModalContent: ReactNode;
  className?: string;
  onDelete: () => Promise<void>;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  onDelete,
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
            <Button
              onClick={async () => await onDelete().then(() => closeModal())}
              type="primary"
            >
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
