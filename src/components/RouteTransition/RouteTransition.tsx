"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./RouteTransition.module.scss";

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={styles.routeTransition}>
      {children}
    </div>
  );
}
