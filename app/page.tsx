'use client'

import Hero from '@/components/section/hero' 
import WhatIsAirdropfest from '@/components/section/whatis'
import TicketSection from '@/components/section/ticket'
import PartnersSection from '@/components/section/partners'
import OnboardAndFAQSection from '@/components/section/onboard'
export default function Page() {
  return (
    <div>
      <Hero />

      <WhatIsAirdropfest/>
      
      < TicketSection/>

      <PartnersSection/>
      <OnboardAndFAQSection/>
    </div>
  )
}
