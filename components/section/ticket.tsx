"use client"

import React from 'react'
import { CheckIcon } from 'lucide-react'

const tiers = [
  {
    name: 'E-Beggar',
    id: 'tier-e-beggar',
    price: '$90',
    description: 'Perfect for those who want to experience AirdropFest.',
    features: [
      'Two (2) days access to AirdropFest main venue',
      'Entry to all keynote speech and panel discussions',
      'Access to the exhibition area featuring the latest in blockchain technology',
      'Participate in interactive workshops and breakout sessions',
      'Networking opportunities with fellow attendees in designated area',
      'Complimentary lunch and refreshment throughout day',
      'Participate in live airdrop hunting and giveaways',
      'Access to (in)side events around the main venue by sponsor',
      'Access to the closing ceremony and official networking party',
    ],
    featured: false,
    bgColor: 'bg-[#00D1FF]',
    textColor: 'text-black',
  },
  {
    name: 'Whale',
    id: 'tier-whale',
    price: '$350',
    description: 'The ultimate AirdropFest experience for crypto whales.',
    features: [
      'All benefits included in E-Beggar Ticket',
      'Priority fast lane registration for seamless entry',
      'Access to exclusive Whale Lounge with premium amenities',
      'Exclusive meet-and-greet sessions with the speakers and industry leaders',
      'Personalized event concierge service for a tailored experience',
      'Gourmet dining experience with a dedicated food and beverage services',
      'Invitation to a private evening side event with a campfire theme after the main event',
      'Special VIP gift bag with exclusive AirdropFest merchandise',
      'Access to a VIP-only chill-out zone with entertainment and relaxation area',
    ],
    featured: true,
    bgColor: 'bg-[#222222]',
    textColor: 'text-white',
  },
]

const Marquee = () => (
  <div className="overflow-hidden bg-[#222222] py-4 w-full">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="inline-flex items-center mx-4">
          <span className="text-white text-4xl sm:text-5xl font-bold">
            GRAB YOUR TICKET NOW
          </span>
          <div className="w-16 h-16 bg-white mx-4" />
        </span>
      ))}
    </div>
  </div>
)

export default function TicketSection() {
  return (
    <section className="relative bg-white font-sans">
      <Marquee />
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-lg gap-8 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-900/10 ${tier.bgColor} ${tier.textColor}`}
            >
              <h3 id={tier.id} className="text-2xl font-bold leading-7">
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
              </p>
              <p className="mt-6 text-base leading-7">
                {tier.description}
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                Soon
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}