import type { FC, ReactNode } from "react";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import Icon from "../StandardComponents/Icon";
import Button from "../StandardComponents/Button";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { TRPCError } from "@trpc/server";

type DeleteButtonProps = {
  deleteModalContent: ReactNode;
  className?: string;
  onDelete: () => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  successCallback?: () => void;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  onDelete,
  deleteModalContent,
  className = "",
  successCallback = () => null,
  successMessage = "Deleted successfully.",
  errorMessage = "Couldn't delete.",
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { addToast } = useToastContext();
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
              onClick={async () =>
                await onDelete()
                  .then(() => {
                    closeModal();
                    addToast({ title: successMessage, type: "success" });
                    successCallback?.();
                  })
                  .catch((err: TRPCError) =>
                    addToast({
                      title: errorMessage,
                      message: err.message,
                      type: "error",
                    })
                  )
              }
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
