import { Order, Product } from "@/types/models";

export const products: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: "/next.svg",
    title: "Dell UltraSharp U2723QE",
    type: "Monitors",
    specification: "27-inch, 4K, IPS Black",
    guarantee: {
      start: "2024-01-10 10:20:00",
      end: "2027-01-10 10:20:00",
    },
    price: [
      { value: 620, symbol: "USD", isDefault: 1 },
      { value: 24600, symbol: "UAH", isDefault: 0 },
    ],
    order: 1,
    date: "2024-01-10 10:20:00",
  },
  {
    id: 2,
    serialNumber: 7823,
    isNew: 0,
    photo: "/next.svg",
    title: "HP ProBook 450 G9",
    type: "Laptops",
    specification: "15.6-inch, i7, 16GB RAM",
    guarantee: {
      start: "2023-11-04 09:00:00",
      end: "2026-11-04 09:00:00",
    },
    price: [
      { value: 980, symbol: "USD", isDefault: 1 },
      { value: 38700, symbol: "UAH", isDefault: 0 },
    ],
    order: 1,
    date: "2023-11-04 09:00:00",
  },
  {
    id: 3,
    serialNumber: 5190,
    isNew: 1,
    photo: "/next.svg",
    title: "Cisco Catalyst C1000",
    type: "Networking",
    specification: "24 ports, PoE",
    guarantee: {
      start: "2024-02-18 13:45:00",
      end: "2029-02-18 13:45:00",
    },
    price: [
      { value: 540, symbol: "USD", isDefault: 1 },
      { value: 21400, symbol: "UAH", isDefault: 0 },
    ],
    order: 2,
    date: "2024-02-18 13:45:00",
  },
  {
    id: 4,
    serialNumber: 9021,
    isNew: 1,
    photo: "/next.svg",
    title: "Lenovo ThinkPad T14",
    type: "Laptops",
    specification: "14-inch, Ryzen 7, 32GB RAM",
    guarantee: {
      start: "2024-05-22 11:10:00",
      end: "2027-05-22 11:10:00",
    },
    price: [
      { value: 1240, symbol: "USD", isDefault: 1 },
      { value: 49000, symbol: "UAH", isDefault: 0 },
    ],
    order: 2,
    date: "2024-05-22 11:10:00",
  },
  {
    id: 5,
    serialNumber: 2244,
    isNew: 0,
    photo: "/next.svg",
    title: "LG 34WN80C",
    type: "Monitors",
    specification: "34-inch, ultrawide",
    guarantee: {
      start: "2022-08-02 08:15:00",
      end: "2025-08-02 08:15:00",
    },
    price: [
      { value: 510, symbol: "USD", isDefault: 1 },
      { value: 20200, symbol: "UAH", isDefault: 0 },
    ],
    order: 3,
    date: "2022-08-02 08:15:00",
  },
  {
    id: 6,
    serialNumber: 4432,
    isNew: 1,
    photo: "/next.svg",
    title: "Ubiquiti UniFi U6-LR",
    type: "Networking",
    specification: "Wi-Fi 6 access point",
    guarantee: {
      start: "2025-01-08 16:30:00",
      end: "2028-01-08 16:30:00",
    },
    price: [
      { value: 210, symbol: "USD", isDefault: 1 },
      { value: 8300, symbol: "UAH", isDefault: 0 },
    ],
    order: 4,
    date: "2025-01-08 16:30:00",
  },
];

export const orders: Order[] = [
  {
    id: 1,
    title: "Office Upgrade - Kyiv",
    date: "2024-01-12 12:30:00",
    description: "Workplaces modernization, phase 1",
    customer: "Nova Group",
  },
  {
    id: 2,
    title: "Branch IT Refresh - Lviv",
    date: "2024-02-25 15:20:00",
    description: "Infrastructure replacement and expansion",
    customer: "Sunline LLC",
  },
  {
    id: 3,
    title: "Call Center Display Wall",
    date: "2022-08-03 10:45:00",
    description: "New monitoring wall for operators",
    customer: "Blue River",
  },
  {
    id: 4,
    title: "Warehouse Wi-Fi Expansion",
    date: "2025-01-10 09:10:00",
    description: "Wireless coverage for all sections",
    customer: "LogiTrans",
  },
];
