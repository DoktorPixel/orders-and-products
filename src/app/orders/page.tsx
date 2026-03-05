"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { formatDateLong, formatDateShort, formatMoney, sumByCurrency } from "@/lib/format";
import { t } from "@/lib/i18n";
import { fetchOrders, removeOrderCascade } from "@/store/ordersSlice";
import { fetchProducts } from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Order } from "@/types/models";
import styles from "./orders.module.scss";

const OrderValueChart = dynamic(
  () => import("@/components/OrderValueChart/OrderValueChart"),
  { ssr: false },
);
const OrderMap = dynamic(() => import("@/components/OrderMap/OrderMap"), {
  ssr: false,
});

const STORAGE_KEY_SELECTED_ORDER = "orders_products_selected_order";

type DeleteForm = {
  confirmation: string;
};

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector((s) => s.orders);
  const productsState = useAppSelector((s) => s.products);
  const locale = useAppSelector((s) => s.settings.locale);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY_SELECTED_ORDER);
    return stored ? Number(stored) : null;
  });
  const [toDelete, setToDelete] = useState<Order | null>(null);

  const localeView = locale === "ru" ? "ru-RU" : "en-US";

  const { register, handleSubmit, formState, reset } = useForm<DeleteForm>({
    defaultValues: { confirmation: "" },
  });

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedOrderId !== null) {
      localStorage.setItem(STORAGE_KEY_SELECTED_ORDER, String(selectedOrderId));
    }
  }, [selectedOrderId]);

  const selectedOrder = useMemo(
    () => ordersState.list.find((order) => order.id === selectedOrderId) ?? null,
    [ordersState.list, selectedOrderId],
  );

  const selectedProducts = useMemo(
    () =>
      selectedOrder
        ? productsState.list.filter((product) => product.order === selectedOrder.id)
        : [],
    [productsState.list, selectedOrder],
  );

  const sums = useMemo(() => sumByCurrency(selectedProducts), [selectedProducts]);

  const removeCurrentOrder = () => {
    if (!toDelete) return;
    dispatch(removeOrderCascade(toDelete.id));
    if (selectedOrderId === toDelete.id) {
      setSelectedOrderId(null);
    }
    setToDelete(null);
    reset();
  };

  const openDeleteModal = (order: Order) => {
    setToDelete(order);
  };

  if (ordersState.loading || productsState.loading) {
    return <div className="page-card p-3">{t(locale, "loading")}</div>;
  }

  return (
    <section className={styles.ordersPage}>
      <div className={`page-card ${styles.ordersPage__list}`}>
        <h2 className={styles.ordersPage__title}>
          {t(locale, "orders")} / {ordersState.list.length}
        </h2>
        <div className={styles.ordersPage__listItems}>
          {ordersState.list.map((order) => {
            const orderProducts = productsState.list.filter((p) => p.order === order.id);
            const total = sumByCurrency(orderProducts);
            const isActive = selectedOrderId === order.id;

            return (
              <article
                key={order.id}
                className={`${styles.ordersPage__item} ${
                  isActive ? styles.ordersPage__item_active : ""
                }`}
              >
                <div className={styles.ordersPage__meta}>
                  <strong>{order.title}</strong>
                  <span>
                    {t(locale, "productsCount")}: {orderProducts.length}
                  </span>
                  <span>
                    {t(locale, "createdAt")}: {formatDateShort(order.date, localeView)}
                  </span>
                  <span>{formatDateLong(order.date, localeView)}</span>
                  <span>
                    {t(locale, "amount")}: {formatMoney(total.USD, "USD", localeView)} /{" "}
                    {formatMoney(total.UAH, "UAH", localeView)}
                  </span>
                </div>
                <div className={styles.ordersPage__btns}>
                  <button
                    type="button"
                    className={styles.ordersPage__btnOpen}
                    onClick={() =>
                      setSelectedOrderId((prev) => (prev === order.id ? null : order.id))
                    }
                  >
                    {isActive ? t(locale, "close") : t(locale, "open")}
                  </button>
                  <button
                    type="button"
                    className={styles.ordersPage__btnRemove}
                    onClick={() => openDeleteModal(order)}
                  >
                    {t(locale, "remove")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className={`page-card ${styles.ordersPage__details}`}>
        {!selectedOrder ? (
          <div className={styles.ordersPage__empty}>{t(locale, "noSelection")}</div>
        ) : (
          <div className={styles.ordersPage__detailsGrid}>
            <div className={styles.ordersPage__detailRow}>
              <span>{t(locale, "order")}</span>
              <strong>{selectedOrder.title}</strong>
            </div>
            <div className={styles.ordersPage__detailRow}>
              <span>{t(locale, "customer")}</span>
              <strong>{selectedOrder.customer}</strong>
            </div>
            <div className={styles.ordersPage__detailRow}>
              <span>{t(locale, "amount")}</span>
              <strong>
                {formatMoney(sums.USD, "USD", localeView)} /{" "}
                {formatMoney(sums.UAH, "UAH", localeView)}
              </strong>
            </div>
            <div className={styles.ordersPage__section}>
              <h3>{t(locale, "chartTitle")}</h3>
              <OrderValueChart products={selectedProducts} />
            </div>
            <div className={styles.ordersPage__section}>
              <h3>{t(locale, "mapTitle")}</h3>
              <OrderMap />
            </div>
          </div>
        )}
      </div>

      {toDelete && (
        <div className={styles.ordersPage__modalBackdrop}>
          <div className={styles.ordersPage__modal}>
            <h3>{t(locale, "confirmDeletion")}</h3>
            <p>
              {toDelete.title}. {t(locale, "typeDelete")}
            </p>
            <form onSubmit={handleSubmit(removeCurrentOrder)}>
              <div className={styles.ordersPage__field}>
                <input
                  {...register("confirmation", {
                    required: true,
                    validate: (value) => value === "DELETE",
                  })}
                  placeholder="DELETE"
                />
                {formState.errors.confirmation && (
                  <span className={styles.ordersPage__error}>
                    {t(locale, "typeDelete")}
                  </span>
                )}
              </div>
              <div className={styles.ordersPage__modalActions}>
                <button
                  type="button"
                  className={styles.ordersPage__cancel}
                  onClick={() => {
                    setToDelete(null);
                    reset();
                  }}
                >
                  {t(locale, "cancel")}
                </button>
                <button type="submit" className={styles.ordersPage__confirm}>
                  {t(locale, "confirm")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
