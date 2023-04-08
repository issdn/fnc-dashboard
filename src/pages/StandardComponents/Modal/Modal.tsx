import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import Icon from "../Icon";

type ModalProps = {
  children?: React.ReactNode;
  onClose: ReturnType<typeof useModal>["onClose"];
  isOpen: ReturnType<typeof useModal>["isOpen"];
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose };
};

const _ModalPortal: FC<Omit<ModalProps, "isOpen">> = ({
  onClose,
  children,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.onkeydown = closeOnEscape;
    const target = modalRef.current;
    target?.focus();

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handleMouseUp = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
    } else {
      onClose();
    }
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      className="absolute top-0 left-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-black/70 px-8"
    >
      <div
        ref={modalRef}
        onMouseDown={() => setIsMouseDown(true)}
        className="flex max-h-[85%] w-full animate-scaleY flex-col items-center justify-start gap-y-2 rounded-2xl bg-white p-4 md:w-fit md:max-w-[500px]"
      >
        <div className="flex h-fit w-full flex-row justify-end">
          <Button onClick={onClose} className="rounded-xl">
            <Icon
              className="text-neutral-400 hover:text-neutral-500"
              icon="close"
            />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Modal: FC<ModalProps> = ({ children, onClose, isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <_ModalPortal onClose={onClose}>{children}</_ModalPortal>,
    document.getElementById("__modal-container") as HTMLElement
  );
};

export default Modal;
