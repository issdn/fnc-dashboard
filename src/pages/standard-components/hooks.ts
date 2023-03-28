import { useState } from "react";

export const useVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return {
    isVisible,
    toggleVisibility,
  };
};
