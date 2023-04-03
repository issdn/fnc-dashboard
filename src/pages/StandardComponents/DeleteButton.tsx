import type { FC } from "react";
import Icon from "./Icon";
import Button from "./Button";

type DeleteButtonProps = {
  className?: string;
  onClick?: () => void;
};

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, className = "" }) => {
  return (
    <Button onClick={onClick} className={className}>
      <Icon icon="delete_forever" className="text-2xl xl:text-3xl" />
    </Button>
  );
};

export default DeleteButton;
