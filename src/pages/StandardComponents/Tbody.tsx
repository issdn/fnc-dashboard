import type { FC } from "react";
import type Tr from "./Tr";

type TbodyProps = {
  children: React.ReactElement<HTMLTableRowElement | typeof Tr>[];
};

const Tbody: FC<TbodyProps> = ({ children }) => {
  return <tbody className="font-bolder w-full">{children}</tbody>;
};

export default Tbody;
