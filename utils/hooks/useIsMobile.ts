import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(null || Boolean);

  const calculateIsMobile = (): void => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    calculateIsMobile();
    window.addEventListener("resize", calculateIsMobile);
  }, []);

  return isMobile;
}
