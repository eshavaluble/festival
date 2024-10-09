"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const partnerCategories = [
  { name: 'SPONSORS', partners: [] },
  { name: 'MEDIA', partners: [] },
  { name: 'COMMUNITY', partners: [
    { name: 'Airdrop ASC', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-asc/asc-hover-TIsRnUQUNDEKSw2U80d7ZPzFxtlaDM.svg' },
    { name: 'Airdrop Cuan Indonesia', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-cuan-indonesia/aci-hover-0w8Vsr8jLKxr5EmAmxxC0mwUQ7qYr2.svg' },
    { name: 'Airdrop Empire', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-empire/ae-hover-A2sx01x1SNrycZ8OfycWDCH5mpvuSi.svg' },
    { name: 'Airdrop Gunnery', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-gunnery/ag-hover-qCEXEuZNagCCfOTfunN3Zkao5Pu1VD.svg' },
    { name: 'Airdrop Sambil Rebahan', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-sambil-rebahan/asr-hover-NxuCYu3ZEvrybPHK6gIh6jx7ReMuWd.svg' },
    { name: 'Crypto Galaxy', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/crypto-galaxy/cg-hover-6rRFbMLGFy5TFM1Rq6Zkyxxjs2bRQU.svg' },
    { name: 'Indonesia Paham Bitcoin', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/indonesia-paham-bitcoin/ipb-hover-e8HCzUmJS63iyeGQbtc2teQ0tZsi6w.svg' },
    { name: 'Happy Cuan Airdrop', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/happy-cuan-airdrop/hca-hover-8RurK9ytP2jzuCXDx8T5jBkWY4IHZ9.svg' },
    { name: 'Crypto Rooms', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/crypto-rooms/cr-hover-Cq5NTWTUj4DIVcEj7WO9rg8xPaEWEr.svg' },
    { name: 'Keluh Kesah Pemain Cryptocurrency', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/keluh-kesah-pemain-cryptocurrency/kkpc-hover-Ti8wKmtAlLwKZBkdECfHZSXrZwlUsA.svg' },
    { name: 'DFAM Alpha', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/dfam-alpha/dfam-hover-WmB3EZYgWR3xYwmXFixuMLFWhzj6w2.svg' },
    { name: 'Gado Gado Web3', logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/gado-gado-web3/ggw-hover-0W6f8zDmutoKpjePbU7UI0hMdsW0Q0.svg' },
  ]},
  { name: 'KOL', partners: [] },
]

const PartnerLogo = ({ name, logo }: { name: string, logo: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-full aspect-[3/2] transition-transform duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={logo}
        alt={name}
        layout="fill"
        objectFit="contain"
        className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-100 grayscale'}`}
      />
    </div>
  )
}

export default function PartnersSection() {
  const [activeCategory, setActiveCategory] = useState('COMMUNITY')
  const [isSticky, setIsSticky] = useState(false)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect()
        setIsSticky(top <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-white text-black font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl py-16">
          Our Partners
        </h2>
        <div ref={stickyRef} className={`${isSticky ? 'sticky top-0 z-10' : ''}`}>
          <div className={`flex flex-wrap justify-center gap-4 py-8 ${isSticky ? 'bg-black' : ''}`}>
            {partnerCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  activeCategory === category.name
                    ? 'bg-[#00D1FF] text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 py-16">
          {partnerCategories
            .find((category) => category.name === activeCategory)
            ?.partners.map((partner) => (
              <PartnerLogo key={partner.name} name={partner.name} logo={partner.logo} />
            ))}
        </div>
      </div>
    </section>
  )
}