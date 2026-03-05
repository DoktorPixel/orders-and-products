"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Product } from "@/types/models";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

type Props = {
  products: Product[];
};

export default function OrderValueChart({ products }: Props) {
  const labels = products.map((product) => product.title);
  const values = products.map(
    (product) => product.price.find((item) => item.symbol === "USD")?.value ?? 0,
  );

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "USD",
            data: values,
            backgroundColor: "#5f8df6",
            borderRadius: 8,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
