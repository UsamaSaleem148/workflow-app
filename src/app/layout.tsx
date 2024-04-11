import MenuBar from './NavBar/NavBar'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WorkFlows App',
  description: 'Develop you WorkFlows',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {
          <>
            <MenuBar />
            {children}
          </>
        }
      </body>
    </html>
  )
}
