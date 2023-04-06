import type { FC } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import { SettingsProvider } from "./settingsContext";
type MainLayoutProps = { children: React.ReactNode | React.ReactNode[] };

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { route } = useRouter();
  return (
    <SettingsProvider>
      <div className="flex flex-row">
        <div className="h-screen">
          <Navigation route={route} />
        </div>
        <main className="flex h-screen w-full flex-row justify-center overflow-hidden">
          <div className="flex h-full w-full flex-col gap-y-8 gap-x-8 overflow-y-auto md:p-8">
            {children}
          </div>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default MainLayout;
