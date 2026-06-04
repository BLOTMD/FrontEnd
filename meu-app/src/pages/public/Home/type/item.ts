export type ItemCategory =
  | "gpu"
  | "cpu"
  | "ram"
  | "ssd"
  | "motherboard"
  | "psu"
  | "case"
  | "monitor"
  | "peripheral";

export type Item = {
  id: string;
  slug: string;

  name: string;
  brand: string;
  category: ItemCategory;

  description: string;
  images: string[];

  price: {
    current: number;
    old?: number;
    currency: "BRL";
    installments?: string;
  };

  stock: {
    available: boolean;
    quantity: number;
  };

  tags: string[];

  specs: Record<string, string | number | boolean>;

  performance?: {
    score?: number;
    fps1080p?: number;
    fps1440p?: number;
    fps4k?: number;
    powerConsumption?: number;
  };

  compatibility?: {
    socket?: string;
    chipset?: string[];
    recommendedPsu?: number;
    ramType?: string;
    formFactor?: string;
  };

  createdAt: string;
  updatedAt: string;
};