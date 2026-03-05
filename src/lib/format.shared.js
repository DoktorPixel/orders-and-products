const normalizeDateString = (value) => value.replace(" ", "T");

export const formatDateLongRaw = (value, locale = "ru-RU") =>
  new Date(normalizeDateString(value)).toLocaleString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatDateShortRaw = (value, locale = "ru-RU") =>
  new Date(normalizeDateString(value)).toLocaleDateString(locale);

export const sumByCurrencyRaw = (products) =>
  products.reduce(
    (acc, product) => {
      for (const item of product.price) {
        acc[item.symbol] += item.value;
      }
      return acc;
    },
    { USD: 0, UAH: 0 },
  );

export const formatMoneyRaw = (amount, symbol, locale = "ru-RU") => {
  if (symbol === "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(amount);
};
