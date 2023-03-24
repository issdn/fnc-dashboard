import type { FC, ReactNode } from "react";
import Link from "next/link";

type NavigationProps = {
  buttonsSpecifiction: {
    icon: ReactNode;
    onClick: () => void;
    url: string;
  }[];
};

const Navigation: FC<NavigationProps> = ({ buttonsSpecifiction }) => {
  return (
    <nav>
      <ul>
        {buttonsSpecifiction.map((bsp) => (
          <li key={bsp.url}>
            <Link href={bsp.url}>{bsp.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
