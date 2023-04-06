import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Settings = {
  dateFormat: string;
};

const contextSettings: Settings = { dateFormat: "DD/MM/YYYY" };

export const SettingsContext = createContext<
  Settings & {
    setSettings: Dispatch<SetStateAction<Settings>>;
  }
>({ ...contextSettings, setSettings: () => null });

export const SettingsProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [settings, setSettings] = useState(contextSettings);

  return (
    <SettingsContext.Provider value={{ ...settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
