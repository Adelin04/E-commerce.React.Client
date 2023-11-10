import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import NavBarAdmin from './componentAdmin/navBarAdmin'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BOUTIQUE',
  description: 'Online Store',
}

// import type LayoutProps  from 'types/pageWithLayout';
type LayoutProps = ({ children }: { children: ReactElement }) => ReactElement

const AdminLayout: LayoutProps = ({ children }) => {
  return (
    <div className='layoutAdmin h-full w-full'>
      
      {children}
    </div>
  )
}
export default AdminLayout