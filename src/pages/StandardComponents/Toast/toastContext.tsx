import { useContext } from "react";
import React from "react";
import type { useToast } from "./hooks";

type ToastProviderProps = {
  children: React.ReactNode;
  addToast: ReturnType<typeof useToast>["addToast"];
};

export const ToastContext = React.createContext<{
  addToast: ReturnType<typeof useToast>["addToast"];
}>({
  addToast: () => {
    throw new Error(
      "addToast not implemented. Check if you are using the ToastProvider"
    );
  },
});

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  addToast,
}) => {
  return (
    <ToastContext.Provider value={{ addToast: addToast }}>
      {children}
    </ToastContext.Provider>
  );
};
