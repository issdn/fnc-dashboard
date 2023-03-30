import type { FC, ReactNode } from "react";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
type EditButtonProps = {
  className?: string;
  editForm: ReactNode;
};

const EditButton: FC<EditButtonProps> = ({ editForm, className = "" }) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Button onClick={openModal} type="clear" className={className}>
        <Icon icon="edit" className="text-2xl xl:text-3xl" />
      </Button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {editForm}
      </Modal>
    </>
  );
};

export default EditButton;
