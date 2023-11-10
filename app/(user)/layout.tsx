// import '../app/globals.css'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import type { Metadata } from 'next'

//  Component
import Header from '../component/header'
import Footer from '../component/footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'BOUTIQUE',
    description: 'Online Store',
}

type LayoutProps = ({ children }: { children: ReactElement }) => ReactElement

const MainLayout: LayoutProps = ({ children }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%', width: '100%' }}>

            <Header />
            {children}
            <Footer />
        </div>
    )
}
export default MainLayout
