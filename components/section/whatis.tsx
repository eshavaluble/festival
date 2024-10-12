"use client";

import Image from 'next/image'

const eventCards = [
  { title: 'KEYNOTES AND PANELS', image: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/whats-in-airdropfest-assets/keynotes-panel-IrUAwNjxvP4fxqhssw238mldn2ItlM.png' },
  { title: 'PROJECT SHOWCASE', image: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/whats-in-airdropfest-assets/project-showcase-9wSHSSffA4H937llvMtaSiT4Jm1kFq.png' },
  { title: 'REAL-LIFE AIRDROP', image: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/whats-in-airdropfest-assets/real-life-airdrop-dmDBvTgvlXiRl9iR68wvUHmliMh9Xj.png' },
  { title: 'SIDE EVENT', image: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/whats-in-airdropfest-assets/(in)side-event-u5tykPJnzI0KPoZRFVtRIg5VGfAYE5.png' },
  { title: 'GAMES', image: 'https://ap3xadopsrl8habm.public.blob.vercel-storage.com/whats-in-airdropfest-assets/games-9QZUJgTggLK8pWv0lYGbNCZvpZujc6.png' },
]

const audienceCategories = [
  'AIRDROP HUNTER, DEGEN, WEB3',
  'USER, TRADER, CRYPTO',
  'ENTHUSIAST, AND NO-COINER...'
]

export default function WhatIsAirdropfest() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10 sm:mb-16">
          WHAT&apos;S IN AIRDROPFEST 2025?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <EventCard card={eventCards[0]} />
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          {eventCards.slice(1).map((card, index) => (
            <div key={index} className="relative">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <EventCard card={card} />
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10 sm:mb-16">
            AIRDROPFEST IS DEFINITELY FOR
          </h2>
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {audienceCategories.map((category, index) => (
              <AudienceCard key={index} text={category} image={`https://ap3xadopsrl8habm.public.blob.vercel-storage.com/audience-${index + 1}-${Math.random().toString(36).substr(2, 9)}.jpg`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EventCard({ card }: { card: { title: string; image: string } }) {
  return (
    <div className="relative overflow-hidden h-full aspect-[523/507]">
      <Image
        src={card.image}
        alt={card.title}
        layout="fill"
        objectFit="cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
          {card.title.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h3>
      </div>
    </div>
  )
}

function AudienceCard({ text, image }: { text: string; image: string }) {
  return (
    <div className="relative overflow-hidden h-24 rounded-lg w-full">
      <Image
        src={image}
        alt={text}
        layout="fill"
        objectFit="cover"
        sizes="(max-width: 500px) 100vw, 500px"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40">
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center">
          {text}
        </p>
      </div>
    </div>
  )
}
