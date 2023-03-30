import type { FC } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
type MainLayoutProps = { children: React.ReactNode | React.ReactNode[] };

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { route } = useRouter();
  return (
    <div className="flex flex-row">
      <div className="h-screen">
        <Navigation route={route} />
      </div>
      <main className="flex h-screen w-full flex-row justify-center overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
