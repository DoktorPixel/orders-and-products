export const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: "/monitor.png",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2018-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 1,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 2,
    serialNumber: 5678,
    isNew: 0,
    photo: "/monitor.png",
    title: "Product 2",
    type: "Monitors",
    specification: "Specification 2",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2018-06-29 12:09:33",
    },
    price: [
      { value: 200, symbol: "USD", isDefault: 0 },
      { value: 5200, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-06-29 12:09:33",
  },
];

export const orders = [
  { id: 1, title: "Order 1", date: "2017-06-29 12:09:33", description: "desc" },
  { id: 2, title: "Order 2", date: "2017-06-29 12:09:33", description: "desc" },
];
