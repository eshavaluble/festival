// app/partners/sponsors/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { SuccessDialog } from "@/components/SuccessDialog"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  directContact: string
  position: string
  companyName: string
  companyWebsite: string
  companySector: string
  country: string
  budgetRange: string
}

const positionOptions = [
  "Founder / Co-Founder", "CEO", "CTO", "CIO", "COO", "CFO", "CMO", "CRO",
  "Head of Product", "Head of Development", "Lead Developer", "Blockchain Developer",
  "Web Developer", "Smart Contract Developer", "Product Manager", "Project Manager",
  "Marketing Manager", "Community Manager", "Growth Manager", "Business Development Manager",
  "Operations Manager", "Investment Manager", "Analyst", "Researcher", "Engineer",
  "Advisor", "Consultant", "Legal Counsel", "Compliance Officer", "Educator / Trainer",
  "Content Creator", "Writer / Blogger", "Journalist", "Investor", "Trader",
  "Strategist", "Architect", "UX/UI Designer", "Data Scientist", "Cybersecurity Specialist",
  "Auditor", "Other"
]

const sectorOptions = [
  "DeFi", "NFT / Metaverse", "Blockchain Infrastructure", "Crypto Trading", "Smart Contracts",
  "Crypto Mining", "Layer 2 Solutions", "Interoperability Protocols", "Crypto Wallets",
  "Crypto Exchanges (CEX & DEX)", "Stablecoins", "dApps", "Web3 Development",
  "Crypto Staking", "Crypto Lending & Borrowing", "DAO", "Tokenization",
  "Cybersecurity in Blockchain", "Blockchain Consulting", "Regulatory Compliance",
  "Blockchain Gaming", "Supply Chain on Blockchain", "Identity & Authentication",
  "Digital Asset Management", "Crypto Analytics", "Yield Farming", "Cross-Chain Solutions",
  "Decentralized Storage", "Blockchain Education & Training", "Crypto Media & Publications",
  "Charity & Philanthropy on Blockchain", "Crowdfunding & ICOs", "Privacy Coins",
  "Social Impact & Sustainability", "AI & Blockchain Integration", "Blockchain for IoT",
  "Blockchain in Healthcare", "Blockchain in Real Estate", "Other"
]

const budgetRanges = [
  "Less than $5,000", "$5,001 - $10,000", "$10,001 - $20,000",
  "$20,001 - $35,000", "$35,001 - $50,000", "More than $50,000"
]

export default function SponsorForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    directContact: '',
    position: '',
    companyName: '',
    companyWebsite: '',
    companySector: '',
    country: '',
    budgetRange: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/partners/sponsors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      setIsSuccessDialogOpen(true)
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
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6">Become a Sponsor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
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
            <Label htmlFor="phone">Phone Number</Label>
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
            <Label htmlFor="directContact">Direct Contact (Telegram, WhatsApp, Line, etc.)</Label>
            <Input
              id="directContact"
              name="directContact"
              value={formData.directContact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="position">Your Position</Label>
            <Select onValueChange={handleSelectChange('position')} value={formData.position}>
              <SelectTrigger>
                <SelectValue placeholder="Select your position" />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="companyWebsite">Company Website URL</Label>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              type="url"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="companySector">Company Sector</Label>
            <Select onValueChange={handleSelectChange('companySector')} value={formData.companySector}>
              <SelectTrigger>
                <SelectValue placeholder="Select company sector" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="country">Country / Region</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="budgetRange">Budget Range for Sponsoring AirdropFest 2025</Label>
            <Select onValueChange={handleSelectChange('budgetRange')} value={formData.budgetRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </div>
      <SuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title="Application Submitted Successfully"
        description="Thank you for your interest in sponsoring AirdropFest. We'll be in touch soon to discuss sponsorship details!"
      />
    </div>
  )
}