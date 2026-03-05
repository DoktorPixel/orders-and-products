import { CurrencyPrice, Product } from "@/types/models";
import {
  formatDateLongRaw,
  formatDateShortRaw,
  formatMoneyRaw,
  sumByCurrencyRaw,
} from "./format.shared";

export const formatDateLong = (value: string, locale = "ru-RU"): string =>
  formatDateLongRaw(value, locale);

export const formatDateShort = (value: string, locale = "ru-RU"): string =>
  formatDateShortRaw(value, locale);

export const sumByCurrency = (
  products: Product[],
): Record<CurrencyPrice["symbol"], number> => sumByCurrencyRaw(products);

export const formatMoney = (
  amount: number,
  symbol: CurrencyPrice["symbol"],
  locale = "ru-RU",
): string => formatMoneyRaw(amount, symbol, locale);
