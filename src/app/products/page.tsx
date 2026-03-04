"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";

export default function ProductsPage() {
  const products = useSelector((s: RootState) => s.products);
  const [filter, setFilter] = useState("");

  const types = [...new Set(products.map((p) => p.type))];
  const filtered = filter
    ? products.filter((p) => p.type === filter)
    : products;

  return (
    <div className="container p-3">
      <h2>Продукты / {filtered.length}</h2>

      <select
        className="form-select w-25 mb-3"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Все</option>
        {types.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <ul className="list-group">
        {filtered.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{p.title}</strong>
              <div>{p.type}</div>
            </div>
            <div>
              {p.price.map((pr) => (
                <div key={pr.symbol}>
                  {pr.value} {pr.symbol}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
