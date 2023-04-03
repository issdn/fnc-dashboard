import type { FC } from "react";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
import Modal from "../StandardComponents/Modal/Modal";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import type { TRPCError } from "@trpc/server";

type DeleteModalProps = {
  isDeleteOpenModal: boolean;
  closeDeleteModal: () => void;
  onDelete: () => Promise<unknown>;
  onSuccessMessage?: string;
  onErrorMessage?: string;
  children?: React.ReactNode;
};

const DeleteModal: FC<DeleteModalProps> = ({
  isDeleteOpenModal,
  closeDeleteModal,
  onDelete,
  onSuccessMessage = "Deleted successfully.",
  onErrorMessage = "Couldn't delete.",
  children,
}) => {
  const { addToast } = useToastContext();
  return (
    <Modal isOpen={isDeleteOpenModal} closeModal={closeDeleteModal}>
      <div className="flex flex-col gap-y-8">
        {children}
        <div className="flex w-full flex-row gap-x-8">
          <Button
            type="primary"
            onClick={() =>
              onDelete()
                .then(() => {
                  addToast({
                    title: onSuccessMessage,
                    type: "success",
                  });
                  closeDeleteModal();
                })
                .catch((err: TRPCError) =>
                  addToast({
                    title: onErrorMessage,
                    message: err.message,
                    type: "error",
                  })
                )
            }
          >
            <Icon icon="delete_forever" />
            Delete Permamently
          </Button>
          <Button type="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
