"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDateLong, formatDateShort, formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import { fetchOrders } from "@/store/ordersSlice";
import { fetchProducts } from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./products.module.scss";

const STORAGE_KEY_PRODUCTS_FILTER = "orders_products_filter";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((s) => s.products);
  const ordersState = useAppSelector((s) => s.orders);
  const locale = useAppSelector((s) => s.settings.locale);
  const [filter, setFilter] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(STORAGE_KEY_PRODUCTS_FILTER) ?? "";
  });

  const localeView = locale === "ru" ? "ru-RU" : "en-US";

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  const types = useMemo(
    () => [...new Set(productsState.list.map((product) => product.type))],
    [productsState.list],
  );

  const filtered = useMemo(
    () =>
      filter
        ? productsState.list.filter((product) => product.type === filter)
        : productsState.list,
    [filter, productsState.list],
  );

  const onFilterChange = (nextFilter: string) => {
    setFilter(nextFilter);
    localStorage.setItem(STORAGE_KEY_PRODUCTS_FILTER, nextFilter);
  };

  if (productsState.loading || ordersState.loading) {
    return <div className="page-card p-3">{t(locale, "loading")}</div>;
  }

  return (
    <section className={`page-card ${styles.productsPage}`}>
      <header className={styles.productsPage__header}>
        <h2 className={styles.productsPage__title}>
          {t(locale, "products")} / {filtered.length}
        </h2>
        <div className={styles.productsPage__filter}>
          <label htmlFor="type-filter">{t(locale, "typeFilter")}</label>
          <select
            id="type-filter"
            value={filter}
            onChange={(event) => onFilterChange(event.target.value)}
          >
            <option value="">{t(locale, "all")}</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className={styles.productsPage__list}>
        {filtered.map((product) => {
          const usd = product.price.find((item) => item.symbol === "USD")?.value ?? 0;
          const uah = product.price.find((item) => item.symbol === "UAH")?.value ?? 0;
          const orderTitle =
            ordersState.list.find((order) => order.id === product.order)?.title ?? "-";

          return (
            <article className={styles.productsPage__item} key={product.id}>
              <div className={styles.productsPage__meta}>
                <strong>{product.title}</strong>
                <span>
                  {t(locale, "serialNumber")}: {product.serialNumber}
                </span>
                <span>
                  {product.type} / {product.isNew ? t(locale, "statusNew") : t(locale, "statusUsed")}
                </span>
                <span>
                  {t(locale, "order")}: {orderTitle}
                </span>
              </div>
              <div className={styles.productsPage__prices}>
                <span>
                  {t(locale, "guarantee")}: {formatDateShort(product.guarantee.start, localeView)} -{" "}
                  {formatDateShort(product.guarantee.end, localeView)}
                </span>
                <span>{formatDateLong(product.date, localeView)}</span>
                <strong>{formatMoney(usd, "USD", localeView)}</strong>
                <strong>{formatMoney(uah, "UAH", localeView)}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
