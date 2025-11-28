export interface IProduct {
  id: number
  numSold: number
  ratingsQuantity: number
  title: string
  description: string
  price: number
  viewCount: number
  likeCount: number
  imageCover: string
  images: string[]
  category: Category
  brand: Brand
}

export interface Category {
  id: number
  name: string
  image: string
}

export interface Brand {
  id: number
  name: string
  image: string
}
