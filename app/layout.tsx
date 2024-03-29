import SetGlobalState from '@/app/setGlobalState'
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { IProduct } from '@/interfaces/interfaces'
import { URI } from '@/utils/globalUri'
import { Suspense } from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BOUTIQUE',
  description: 'Online Store',
}


async function getProducts() {
  const res = await fetch(`${URI}Product/v1/get/allProducts`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


interface IResponseGetProducts {
  success: boolean,
  products: Array<IProduct>
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { products, success }: IResponseGetProducts = await getProducts()

  return (
    <html lang="en">
      <body className={inter.className}>
      
        <SetGlobalState products={products} success={success}>
          {children}
        </SetGlobalState>
      
      </body>
    </html>
  )
}



