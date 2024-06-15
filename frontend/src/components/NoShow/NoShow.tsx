"use client";

import { usePathname } from "next/navigation";

const NoShow = ({ children }: any) => {
  const pahtname = usePathname();

  return (
    <div className={pahtname === "/successcheckout" ? "hidden" : ""}>
      {children}
    </div>
  );
};

export default NoShow;
