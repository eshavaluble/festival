"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDownIcon } from 'lucide-react'

const roles = [
  { name: 'Sponsor', image: '/images/sponsor.jpg', link: '/sponsor' },
  { name: 'Speaker', image: '/images/speaker.jpg', link: '/speaker' },
  { name: 'Media Partner', image: '/images/media-partner.jpg', link: '/media-partner' },
  { name: 'Community Partner', image: '/images/community-partner.jpg', link: '/community-partner' },
]

const faqs = [
  { question: "What is AirdropFest?", answer: "AirdropFest is the world's largest crypto airdrop festival, bringing together enthusiasts, projects, and industry leaders to explore the latest in blockchain technology and participate in exciting airdrop opportunities." },
  { question: "When is AirdropFest 2025?", answer: "The exact dates for AirdropFest 2025 will be announced soon. Stay tuned to our official channels for the latest updates." },
  { question: "Where is AirdropFest held?", answer: "The venue for AirdropFest 2025 will be revealed closer to the event. We're working on securing a location that can accommodate our growing community and provide an unforgettable experience." },
  { question: "How can I participate?", answer: "You can participate in AirdropFest in several ways: as an attendee, sponsor, speaker, or partner. Each role offers unique opportunities to engage with the crypto community and shape the future of blockchain technology." },
]

export default function OnboardAndFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white py-24 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get on board for AirdropFest 2025
              </h2>
              <p className="text-lg text-gray-600">
                Become key player in airdropFest 2025. Choose your role and join us in making history
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {roles.map((role) => (
                <Link key={role.name} href={role.link} className="group relative overflow-hidden rounded-lg">
                  <Image
                    src={role.image}
                    alt={role.name}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-xl font-semibold text-white">{role.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <button
                  className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-900 bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDownIcon 
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="mt-2 p-6 bg-white border border-gray-200 rounded-lg">
                    <p className="text-base text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}