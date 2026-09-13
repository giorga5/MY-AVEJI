export type CategoryIconKey =
  | "sofa"
  | "table"
  | "chair"
  | "bed"
  | "wardrobe"
  | "lamp"
  | "default";

export interface Category {
  id: string;
  name: string;
  icon_key: CategoryIconKey;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  storage_path: string;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  is_featured: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  product_images?: ProductImage[];
}

export interface SiteSettings {
  id: number;
  store_name: string;
  tagline: string | null;
  hero_headline: string | null;
  hero_subtext: string | null;
  about_text: string | null;
  phone: string | null;
  phone_2: string | null;
  whatsapp_number: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  address: string | null;
  business_hours: string | null;
  map_embed_url: string | null;
  updated_at: string;
}

export interface ActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}
