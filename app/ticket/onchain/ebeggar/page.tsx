'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  fullname: string
  email: string
  phone: string
  evmWallet: string
}

export default function EBeggarTicket() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    evmWallet: ''
  })
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
      const response = await fetch('/api/ticket/onchain/ebeggar', {
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
        description: "Your ticket information has been saved.",
      })
      
      // Redirect to the mint page
      router.push('/ticket/onchain/ebeggar/mint')
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
              alt="E-Beggar Ticket"
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
          </div>
        </div>
      </div>
    </div>
  )
}