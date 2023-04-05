import type { FC, ReactNode } from "react";
import Icon from "./Icon";
import Button from "./Button";
import Modal, { useModal } from "./Modal/Modal";

type DeleteButtonProps = {
  className?: string;
  deleteModalContent: ReactNode;
  onDelete: () => Promise<unknown>;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  className = "",
  deleteModalContent,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useModal();
  return (
    <>
      <Button
        onClick={onOpen}
        className={`rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10 ${className}`}
      >
        <Icon icon="delete_forever" className="text-2xl xl:text-3xl" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-y-8">
          {deleteModalContent}
          <div className="flex w-full flex-row gap-x-8">
            <Button
              type="primary"
              onClick={() => onDelete().then(() => onClose())}
            >
              <Icon icon="delete_forever" />
              Delete Permamently
            </Button>
            <Button type="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
