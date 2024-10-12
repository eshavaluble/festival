"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const partnerCategories = [
  { name: 'SPONSORS', partners: [] },
  { name: 'MEDIA', partners: [
     { name: 'XYZONEMEDIA', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/media%20partner-assets/xyzone-zkCQ4SBRxYi7l0LWWK9g9iXNB51lGA.svg',
	link: 'https://xyzonemedia.com' },
  ] },
  { name: 'COMMUNITY', partners: [
   { name: 'Stress Capital', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/stress-capital/sc-hover-uUTZKiTbbxoDc0n4eK8OlBV6wgai8a.svg',
	link: 'https://x.com/stresscapitals' },
    { name: 'Indonesia Paham Bitcoin', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/indonesia-paham-bitcoin/ipb-hover-e8HCzUmJS63iyeGQbtc2teQ0tZsi6w.svg',
	link: 'https://t.me/indonesiapahambitcoin' },
    { name: 'Cryptoiz', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/cryptoiz/cryptoiz-hover-3YsZIfIawaSRxiSSGaVAPmEjoQHCzJ.svg',
	link: 'https://cryptoizresearch.com' },
    { name: 'Airdrop Empire', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-empire/ae-hover-A2sx01x1SNrycZ8OfycWDCH5mpvuSi.svg',
	link: 'https://t.me/yogiczbaeng' },
    { name: 'Airdrop Gunnery', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-gunnery/ag-hover-kKVF6eGUvzYNyrmlPPq8j1bewkppc0.svg',
	link: 'https://t.me/AirdropGunnery' },
    { name: 'ZuperHunt', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/zuperhunt/zh-hover-F7Mgi6VTMZfBu7861m0a80mriQ68gO.svg',
	link: 'https://x.com/ZuperHunt' },
    { name: 'Please Do Something', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/please-do-something/pds-hover-QHOXyyy6pbIeoriOfOCpDzYXytkbOl.svg',
	link: 'http://discord.gg/pdsdao' },
    { name: 'CryptoProID', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/cryptoproid-airdrop/ca-hover-p9GyD7M3XaLJCLvn3cpBKeErN6MmYu.svg',
	link: 'https://t.me/CryptoProID' },
    { name: 'Gado-Gado Web3', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/gado-gado-web3/ggw-hover-0W6f8zDmutoKpjePbU7UI0hMdsW0Q0.svg',
	link: 'https://t.me/GadoGadoWeb3' },
    { name: 'Airdrop Cuan Indonesia', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-cuan-indonesia/aci-hover-0w8Vsr8jLKxr5EmAmxxC0mwUQ7qYr2.svg',
	link: 'https://t.me/airdropscuanindo' },
    { name: 'Manta Indonesia', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/manta-indonesia/mi-hover-q5fkbTOdnmpCt6f5frZ2IjChCYeji5.svg',
	link: 'https://t.me/mantaindonesia' },
    { name: 'Keluh Kesah Pemain Cryptocurrency', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/keluh-kesah-pemain-cryptocurrency/kkpc-hover-Ti8wKmtAlLwKZBkdECfHZSXrZwlUsA.svg',
	link: 'https://kkpc.carrd.co' },
    { name: 'Crypto Rooms', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/crypto-rooms/cr-hover-Cq5NTWTUj4DIVcEj7WO9rg8xPaEWEr.svg',
	link: 'https://t.me/CryptoS_Rooms' },
    { name: 'DFAM Alpha', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/dfam-alpha/dfam-hover-WmB3EZYgWR3xYwmXFixuMLFWhzj6w2.svg',
	link: 'https://x.com/dfam_alpha' },
    { name: 'Sekuya Family', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/sekuya-family/sf-hover-RldwKJ2ESwbX4ZUzSwdyev8hSKMUX8.svg',
	link: 'https://t.me/sekuyaofficial' },
    { name: 'Happy Cuan Airdrop', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/happy-cuan-airdrop/hca-hover-8RurK9ytP2jzuCXDx8T5jBkWY4IHZ9.svg',
	link: 'https://t.me/HappyCuanAirdrop' },
    { name: 'Airdrop ASC', 
	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-asc/asc-hover-TIsRnUQUNDEKSw2U80d7ZPzFxtlaDM.svg',
	link: 'https://t.me/AIRDROPASC' },
    { name: 'Malang Crypto Alliance', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/malang-crypto-alliance/mca-hover-bAekzRytcjiFkcPPqDzeyWkHParj9R.svg',
	link: 'https://taplink.cc/malangcrypto' },
    { name: 'Crypto Galaxy', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/crypto-galaxy/cg-hover-6rRFbMLGFy5TFM1Rq6Zkyxxjs2bRQU.svg',
	link: 'https://discord.gg/N4GnZnYy' },
    { name: 'Riky Testnet Hunter', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/riky-testnet-hunter/rth-hover-cyTjuRxxnNihUPakuQk0i0Kr5duYM9.svg',
	link: 'https://t.me/RikyTestnet' },
    { name: 'Airdrop Sultan Indonesia', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-sultan-indonesia/asi-hover-Bos6boROkmTon175wRGZwYRoRhNlKm.svg',
	link: 'https://t.me/airdropsultanindonesia' },
    { name: 'WINGFO', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/wingfo/wingo-hover-xnDQV5QVsqBkCt2p6mvgjsW0NoXl0Q.svg',
	link: 'https://t.me/infomindao' },
    { name: 'Pelita Bangsa Academy', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/pelita-bangsa-academy/pba-hover-cZWFNNjOoBeSh9ogM1d3TAGLxZ8t98.svg',
	link: 'https://linktr.ee/pelitabangsa.co.id' },
    { name: 'Pejuang Crypto ID', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/pejuang-crypto-id/pci-hover-SqNimovmdPV3EvT3gw7qqmkpREtD5c.svg',
	link: 'https://t.me/PejuangCryptoID' },
    { name: 'ZTH Crypto', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/zth-crypto/zc-hover-4HU6cm9tenbJfGUsUf4jYtXSjUlbsz.svg',
	link: 'https://linktr.ee/zthcrypto' },
    { name: 'Cryptoindo Jogja', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/cryptoindo-jogja/cij-hover-ZMz9BEz3dVvOc3XCKGXXGEGWU7OeRk.svg',
	link: 'https://linktr.ee/CryptoIndoJogja' },
    { name: 'Airdrop Sambil Rebahan', 
 	logo: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/community-partner-assets/airdrop-sambil-rebahan/asr-hover-NxuCYu3ZEvrybPHK6gIh6jx7ReMuWd.svg',
	link: 'https://t.me/kingfeeder' },
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
