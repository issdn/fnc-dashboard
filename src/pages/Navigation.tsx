import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Icon from "./StandardComponents/Icon";
import { links } from "./links";
import Button from "./StandardComponents/Button";

type NavigationProps = {
  route: string;
};

const Navigation: FC<NavigationProps> = ({ route }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } fixed z-[999] h-full w-3/4 bg-neutral-900 text-xl text-neutral-100 transition-all duration-500 after:text-neutral-100 md:relative md:w-fit`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="clip absolute left-[96%] top-8 bg-neutral-900 md:hidden"
      >
        <Icon
          className={`text-5xl transition-all duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          icon="chevron_right"
        />
      </Button>
      <ul className="flex h-full flex-col gap-y-4 overflow-y-auto bg-neutral-900 px-10 py-16">
        {links.map((link) => (
          <li key={link.title} className="capitalize">
            <Link
              href={link.path}
              className="flex flex-row items-center gap-x-4 rounded-xl px-2 outline-none transition-all duration-500 hover:text-neutral-200 focus:outline-neutral-100"
            >
              <Icon icon={link.icon} />
              <b
                className={`relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] ${
                  route === link.path ? "after:w-full" : "after:w-0"
                } after:bg-neutral-200 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.title}
              </b>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
