import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: {
    default: "Nana - Software Engineer | AI & Robotics Blog",
    template: "%s | Nana's Blog"
  },
  description: 'I explore intelligent systems, applied machine learning, robotics integration, and the craft of explaining complex ideas clearly.',
  keywords: ['AI', 'Robotics', 'Machine Learning', 'Software Engineering', 'Blog'],
  authors: [{ name: 'Nana' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nanakay007.github.io',
    siteName: "Nana's Blog",
    title: "Nana - Software Engineer | AI & Robotics Blog",
    description: 'I explore intelligent systems, applied machine learning, robotics integration, and the craft of explaining complex ideas clearly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nana - Software Engineer | AI & Robotics Blog",
    description: 'I explore intelligent systems, applied machine learning, robotics integration, and the craft of explaining complex ideas clearly.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

