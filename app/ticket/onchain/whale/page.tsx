'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { client } from "@/app/client";
import { claimTo} from "thirdweb/extensions/erc721";
import { getContract } from "thirdweb";
import { TransactionButton, } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { Check } from 'lucide-react'

interface FormData {
  fullname: string
  email: string
  phone: string
  evmWallet: string
}

export default function WhaleTicket() {
    const chain = defineChain( 1946 );
  
  const Ebeggarticket = getContract({
    client: client,
    chain: chain,
    address: "0xBb1d78c8799b33c5791ED6e49B84429c7106759E"
  });
  
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    evmWallet: ''
  })
  
  const [isBaseChain, setIsBaseChain] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/ticket/onchain/whale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      const data = await response.json()
      console.log('Ticket created:', data.ticket)
      setIsFormSubmitted(true)
      toast({
        title: "Form submitted successfully",
        description: "Your Whale ticket information has been saved.",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          &larr; Back
        </Button>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Whale Ticket"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
              <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="evmWallet">EVM Wallet Address</Label>
                <Input
                  id="evmWallet"
                  name="evmWallet"
                  value={formData.evmWallet}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || isFormSubmitted}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Submitting...' : isFormSubmitted ? 'Submitted' : 'Submit'}
              </Button>
            </form>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Your Order</h3>
              <div className="flex justify-between items-center mb-4">
                <span>Whale ticket</span>
                <span>350 USDT</span>
              </div>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold">Premium Benefits:</h4>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>VIP Lounge Access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Exclusive Meet & Greet</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Priority Seating</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Complimentary Swag Bag</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/placeholder.svg"
                    alt="Base Chain Logo"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>BaseChain</span>
                </div>
                <label htmlFor="basechain" className="flex items-center cursor-pointer">
                  <span className="sr-only">Use BaseChain</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="basechain"
                      className="sr-only"
                      checked={isBaseChain}
                      onChange={(e) => setIsBaseChain(e.target.checked)}
                    />
                    <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                    <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${isBaseChain ? 'transform translate-x-full bg-primary' : ''}`}></div>
                  </div>
                </label>
              </div>
              {isFormSubmitted && (
                   <TransactionButton
                   transaction={() =>
                       claimTo({
                         contract: Ebeggarticket,
                         to: address,
                         quantity: BigInt(1),
                       })
                   }
               >
                 Claim
               </TransactionButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}