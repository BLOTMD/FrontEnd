export type Product = {
  id: string;
  name: string;
  category: "cpu" | "gpu" | "ram" | "motherboard" | "storage" | "psu" | "case" | "peripheral";
  brand: string;
  price: number;
  image: string;
  specs: {
    [key: string]: string | number;
  };
};