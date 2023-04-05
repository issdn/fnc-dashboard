import type { FC } from "react";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
import Modal from "../StandardComponents/Modal/Modal";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<unknown>;
  children?: React.ReactNode;
};

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-y-8">
        {children}
        <div className="flex w-full flex-row gap-x-8">
          <Button type="primary" onClick={onDelete}>
            <Icon icon="delete_forever" />
            Delete Permamently
          </Button>
          <Button type="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
