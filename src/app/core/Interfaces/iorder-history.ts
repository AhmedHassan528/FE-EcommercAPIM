export interface IorderHostory {
  id: number
  cartId: number
  totalAmount: number
  paymentMethodType: string
  status: boolean
  statusMess: string
  customerName: string
  addressId: number
  addressName: string
  city: string
  address: string
  phoneNumber: string
  items: Item[]
  orderDate: string
}

export interface Item {
  id: number
  orderId: number
  count: number
  price: number
  productId: number
  productName: string
  productImage: string
  productDescription: string
  category: string
  brand: string
  categoryId: number
  brandId: number
}
