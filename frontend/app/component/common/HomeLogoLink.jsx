"use client";

import Link from "next/link";
import { goToHomeFromLogo } from "./homeScroll";

const HomeLogoLink = ({ className, onClick, children }) => {
  return (
    <Link
      href="/"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        goToHomeFromLogo(event);
      }}
    >
      {children}
    </Link>
  );
};

export default HomeLogoLink;
