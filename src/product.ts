export type BaseProduct = {
  id: number | string
  itemsInStock: number
  image: string
  title: string
  price: number
  categories: string[]
  discountPercent: number
  reviews: {
    rate: number
    id: number | string
    author: string
    text: string
  }[]
  description: string
  additionalImages?: {
    additionalImages: Record<string, string>[]
  }
  [key: string]: unknown
}
