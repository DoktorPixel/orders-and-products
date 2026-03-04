"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeOrder } from "@/store/ordersSlice";

export default function OrdersPage() {
  const orders = useSelector((s: RootState) => s.orders);
  const products = useSelector((s: RootState) => s.products);
  const dispatch = useDispatch();

  return (
    <div className="container p-3">
      <h2>Приходы / {orders.length}</h2>
      <ul className="list-group">
        {orders.map((o) => {
          const count = products.filter((p) => p.order === o.id).length;
          return (
            <li
              key={o.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <strong>{o.title}</strong>
                <div>Продуктов: {count}</div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeOrder(o.id))}
              >
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
