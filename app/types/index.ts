export interface Drink {
  id: string
  created_at: string
  name: string
  category: string
  category_label: string
  description: string
  price: number | null
  image_url: string | null
  available: boolean
  sort_order: number
}

export interface Dish {
  id: string
  created_at: string
  name: string
  category: string
  description: string
  price: number | null
  sort_order: number
  available: boolean
}

export interface Tour {
  id: string
  created_at: string
  name: string
  duration: string
  type: string
  description: string
  price: number | null
  image_url: string | null
  whatsapp_message: string
  available: boolean
  sort_order: number
}

export interface GalleryImage {
  id: string
  created_at: string
  image_url: string
  alt: string
  sort_order: number
}

export interface Settings {
  id: number
  whatsapp_number: string
  instagram_url: string
  hero_title: string
  hero_subtitle: string
  hero_image_url: string | null
  hero_video_url: string | null
  experience_image_url: string | null
}
