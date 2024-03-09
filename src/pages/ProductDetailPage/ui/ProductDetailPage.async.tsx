import { lazy } from 'react'

export const ProductDetailPageAsync = lazy(async () => await import('./ProductDetailPage'))
