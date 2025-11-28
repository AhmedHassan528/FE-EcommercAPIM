export interface ICart {
  id: number
  cartOwner: string
  products: Product[]
  totalCartPrice: number
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  count: number
  price: number
  productId: number
  product: Product2
  cartId: number
}

export interface Product2 {
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
