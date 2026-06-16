import type { Product } from "../types/Product";

const image = (label: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
      <rect width="480" height="320" rx="28" fill="#111827"/>
      <rect x="32" y="32" width="416" height="256" rx="22" fill="${color}" opacity="0.18"/>
      <rect x="74" y="92" width="332" height="136" rx="18" fill="${color}"/>
      <text x="240" y="174" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${label}</text>
    </svg>`,
  )}`;

export const products: Product[] = [
  {
    id: "rtx-4060",
    name: "NVIDIA GeForce RTX 4060",
    category: "gpu",
    brand: "NVIDIA",
    price: 2199.9,
    image: image("GPU", "#2563eb"),
    specs: {
      memoria: "8 GB GDDR6",
      interface: "PCIe 4.0",
    },
  },
  {
    id: "ryzen-5-7600",
    name: "AMD Ryzen 5 7600",
    category: "cpu",
    brand: "AMD",
    price: 1299.9,
    image: image("CPU", "#dc2626"),
    specs: {
      nucleos: 6,
      threads: 12,
      socket: "AM5",
    },
  },
  {
    id: "kingston-fury-16",
    name: "Kingston Fury 16 GB DDR5",
    category: "ram",
    brand: "Kingston",
    price: 1349.9,
    image: image("RAM", "#16a34a"),
    specs: {
      capacidade: "16 GB",
      frequencia: "5600 MHz",
    },
  },
  {
    id: "ssd-nvme-1tb",
    name: "SSD NVMe 1 TB",
    category: "storage",
    brand: "Kingston",
    price: 429.9,
    image: image("SSD", "#0891b2"),
    specs: {
      capacidade: "1 TB",
      leitura: "3500 MB/s",
    },
  },
  {
    id: "fonte-650w",
    name: "Fonte 650 W 80 Plus Bronze",
    category: "psu",
    brand: "Corsair",
    price: 399.9,
    image: image("PSU", "#ca8a04"),
    specs: {
      potencia: "650 W",
      certificacao: "80 Plus Bronze",
    },
  },
  {
    id: "b650m",
    name: "Placa-mae B650M",
    category: "motherboard",
    brand: "Gigabyte",
    price: 899.9,
    image: image("MB", "#7c3aed"),
    specs: {
      socket: "AM5",
      memoria: "DDR5",
    },
  },
];
