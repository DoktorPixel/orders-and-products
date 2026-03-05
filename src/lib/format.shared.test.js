import test from "node:test";
import assert from "node:assert/strict";
import { formatMoneyRaw, sumByCurrencyRaw } from "./format.shared.js";

test("sumByCurrencyRaw sums USD and UAH", () => {
  const result = sumByCurrencyRaw([
    {
      price: [
        { value: 100, symbol: "USD" },
        { value: 4100, symbol: "UAH" },
      ],
    },
    {
      price: [
        { value: 50, symbol: "USD" },
        { value: 2300, symbol: "UAH" },
      ],
    },
  ]);

  assert.deepEqual(result, { USD: 150, UAH: 6400 });
});

test("formatMoneyRaw formats USD symbol", () => {
  const formatted = formatMoneyRaw(1000, "USD", "en-US");
  assert.match(formatted, /\$/);
});
