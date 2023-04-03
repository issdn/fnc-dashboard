import type { FC } from "react";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
type EditButtonProps = {
  className?: string;
  onClick: () => void;
};

const EditButton: FC<EditButtonProps> = ({ onClick, className = "" }) => {
  return (
    <Button onClick={onClick} type="clear" className={className}>
      <Icon icon="edit" className="text-2xl xl:text-3xl" />
    </Button>
  );
};

export default EditButton;
