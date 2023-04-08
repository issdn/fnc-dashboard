import type { FC } from "react";
import Button from "./Button";
import Icon from "./Icon";

type EditButtonProps = {
  className?: string;
  onClick: () => void;
  isLoading?: boolean;
};

const EditButton: FC<EditButtonProps> = ({
  onClick,
  className = "",
  isLoading = false,
}) => {
  return (
    <Button
      isLoading={isLoading}
      onClick={onClick}
      type="clear"
      className={`rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10 ${className}`}
    >
      <Icon icon="edit" className="text-2xl xl:text-3xl" />
    </Button>
  );
};

export default EditButton;
