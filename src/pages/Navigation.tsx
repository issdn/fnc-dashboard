import Link from "next/link";
import { FC, useState } from "react";
import Icon from "./standard-components/Icon";
import { links } from "./links";
import Button from "./standard-components/Button";

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <nav
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } fixed z-[999] h-screen w-3/4 bg-neutral-900 px-12 py-16 text-xl text-neutral-100 transition-all duration-500 after:text-neutral-100 md:relative md:w-fit`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        icon="chevron_right"
        className="clip absolute left-[96%] top-8 bg-neutral-900 md:hidden"
        iconClassName={`text-5xl transition-all duration-200 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
      <ul className="flex h-full flex-col gap-y-4 overflow-y-auto bg-neutral-900 ">
        {links.map((link) => (
          <li key={link.title} className="capitalize">
            <Link
              href={link.path}
              className="flex flex-row items-center gap-x-4 rounded-xl transition-all duration-500 hover:text-neutral-200"
            >
              <Icon icon={link.icon} />
              <b className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-neutral-200 after:transition-all after:duration-300 hover:after:w-full">
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
