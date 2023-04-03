import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import Icon from "../Icon";

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
    const [isMouseDown, setIsMouseDown] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const target = modalRef.current;
      target?.focus();
    }, []);

    const handleMouseUp = () => {
      if (isMouseDown) {
        setIsMouseDown(false);
      } else {
        closeModal();
      }
    };

    return (
      <div
        onClick={handleMouseUp}
        className="absolute top-0 left-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-black/70 px-8"
      >
        {isOpen && (
          <div
            ref={modalRef}
            tabIndex={0}
            className="flex w-full animate-scaleY flex-col items-center justify-start gap-y-2 rounded-2xl bg-white p-4 md:w-fit md:max-w-[500px]"
          >
            <div className="flex h-fit w-full flex-row justify-end">
              <Button onClick={closeModal} className="rounded-xl">
                <Icon
                  className="text-neutral-400 hover:text-neutral-500"
                  icon="close"
                />
              </Button>
            </div>
            {children}
          </div>
        )}
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
