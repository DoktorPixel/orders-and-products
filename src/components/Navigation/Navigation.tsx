"use client";
import Link from "next/link";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__avatar}>👤</div>
      <nav className={styles.sidebar__nav}>
        <Link href="/orders">Приход</Link>
        <Link href="/products">Продукты</Link>
      </nav>
    </aside>
  );
}
