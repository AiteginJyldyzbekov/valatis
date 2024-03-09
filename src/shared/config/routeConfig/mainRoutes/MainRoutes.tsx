import { NotFoundPage } from 'pages/NotFoundPage'
import { ProductDetailPage } from 'pages/ProductDetailPage'
import { ProductsPage } from 'pages/ProductsPage'
import { type RouteProps } from 'react-router-dom'

export enum MainRoutes {
  PRODUCTS = 'products',
  PRODUCT_DETAIL = 'product',
  NOT_FOUND = 'not_found'
}

export const MainRoutePath: Record<MainRoutes, string> = {
  [MainRoutes.PRODUCTS]: '/',
  [MainRoutes.PRODUCT_DETAIL]: '/product/:id',
  [MainRoutes.NOT_FOUND]: '*'
}

export const MainRouteConfig: Record<MainRoutes, RouteProps> = {
  [MainRoutes.PRODUCTS]: {
    path: MainRoutePath.products,
    element: <ProductsPage />
  },
  [MainRoutes.PRODUCT_DETAIL]: {
    path: MainRoutePath.product,
    element: <ProductDetailPage />
  },
  [MainRoutes.NOT_FOUND]: {
    path: MainRoutePath.not_found,
    element: <NotFoundPage />
  }
}
