"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";
import { useAppSelector } from "@/store";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  const pathname = usePathname();
  const locale = useAppSelector((s) => s.settings.locale);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__avatar}>OP</div>
      <nav className={styles.sidebar__nav}>
        <Link
          href="/orders"
          className={pathname === "/orders" ? styles.sidebar__link_active : ""}
        >
          {t(locale, "orders")}
        </Link>
        <Link
          href="/products"
          className={
            pathname === "/products" ? styles.sidebar__link_active : ""
          }
        >
          {t(locale, "products")}
        </Link>
      </nav>
    </aside>
  );
}
