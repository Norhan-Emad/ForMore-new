
export interface Product {
  sold?: number
  ratingsQuantity?: number
  _id?: string
  title: string
  description: string
  quantity?: number
  price: number
  imageCover: string
  category: Category
  ratingsAverage: number
}

export interface Category {
  name: string
}

