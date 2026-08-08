import foodData from '~/data/food.json'

export interface FoodItem {
  name: string
  price: string
  description: string
}

export interface FoodGroup {
  group: string
  items: FoodItem[]
}

export const useFood = () => {
  const foodGroups = foodData as FoodGroup[]

  return {
    foodGroups
  }
}
