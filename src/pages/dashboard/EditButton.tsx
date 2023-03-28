import type { FC, ReactNode } from "react";
import Modal, { useModal } from "../standard-components/Modal/Modal";
import Button from "../standard-components/Button";
import Icon from "../standard-components/Icon";
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
