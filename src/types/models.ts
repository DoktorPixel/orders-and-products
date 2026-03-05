export type CurrencyPrice = {
  value: number;
  symbol: "USD" | "UAH";
  isDefault: 0 | 1;
};

export type Product = {
  id: number;
  serialNumber: number;
  isNew: 0 | 1;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: CurrencyPrice[];
  order: number;
  date: string;
};

export type Order = {
  id: number;
  title: string;
  date: string;
  description: string;
  customer: string;
};
