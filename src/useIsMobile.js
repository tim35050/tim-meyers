import { useEffect, useState } from "react";

export function useIsMobile(bp = 768) {
  const [m, setM] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= bp,
  );
  useEffect(() => {
    const onR = () => setM(window.innerWidth <= bp);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [bp]);
  return m;
}
