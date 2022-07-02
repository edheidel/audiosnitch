import React from "react";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const calculateIsMobile = (): void => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  React.useEffect(() => {
    calculateIsMobile();
    window.addEventListener("resize", calculateIsMobile);
  }, []);

  return isMobile;
}
