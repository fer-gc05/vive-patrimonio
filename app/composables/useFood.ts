export interface FoodItem {
  name: string
  price: string
  description: string
}

export interface FoodGroup {
  group: string
  items: FoodItem[]
}