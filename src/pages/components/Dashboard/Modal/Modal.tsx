import { FC, useState } from "react";
import { createPortal } from "react-dom";
import IconButton from "../../IconButton";

type ModalProps = {
  children?: React.ReactNode;
  closeModal: ReturnType<typeof useModal>["closeModal"];
  isOpen: ReturnType<typeof useModal>["isOpen"];
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};

const Modal: FC<ModalProps> = ({ children, closeModal, isOpen }) => {
  const ModalPortal = () => {
    return (
      <div className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-black/70 px-8">
        <div className="flex min-h-[25%] w-full animate-scaleY flex-col items-center justify-start gap-y-2 rounded-2xl bg-white p-4 md:w-fit">
          <div className="flex h-fit w-full flex-row justify-end">
            <IconButton
              onClick={closeModal}
              icon="close"
              className="rounded-xl"
              iconClassName="text-neutral-400 hover:text-neutral-500"
            />
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalPortal />,
    document.getElementById("__modal-container") as HTMLElement
  );
};

export default Modal;
