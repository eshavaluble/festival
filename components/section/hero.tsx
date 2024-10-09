'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    attendees: 0,
    companies: 0,
    speakers: 0,
    partners: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) => ({
        attendees: Math.min(prev.attendees + 50, 2800),
        companies: Math.min(prev.companies + 10, 500),
        speakers: Math.min(prev.speakers + 5, 180),
        partners: Math.min(prev.partners + 2, 60),
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between px-4 py-6 md:px-8 lg:px-16">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=50&width=100"
              alt="Airdropfest Logo"
              width={100}
              height={50}
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-white hover:text-gray-200 transition-colors">
              Become Sponsor
            </Link>
            <Link href="#" className="text-white hover:text-gray-200 transition-colors">
              Onboard
            </Link>
            <Link href="#" className="text-white hover:text-gray-200 transition-colors">
              Guide
            </Link>
          </div>
          <div className="hidden md:block">
            <Button
              className="bg-white text-black hover:bg-[#00D1FF] hover:text-white transition-colors"
            >
              Get Ticket
            </Button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </nav>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-90 md:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Link href="#" className="text-white text-xl">
                Become Sponsor
              </Link>
              <Link href="#" className="text-white text-xl">
                Onboard
              </Link>
              <Link href="#" className="text-white text-xl">
                Guide
              </Link>
              <Button
                className="bg-white text-black hover:bg-[#00D1FF] hover:text-white transition-colors"
              >
                Get Ticket
              </Button>
            </div>
          </div>
        )}
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              AIRDROPFEST 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              World's Largest and First Crypto Airdrop Festival
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Attendees', value: animatedStats.attendees },
              { label: 'Companies', value: animatedStats.companies },
              { label: 'Speakers', value: animatedStats.speakers },
              { label: 'Partners', value: animatedStats.partners },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}+
                </div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}