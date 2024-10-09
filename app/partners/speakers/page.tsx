'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { SuccessDialog } from "@/components/SuccessDialog"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  role: string
  airdropKnowledge: boolean
  preferredTopics: string[]
  speakingExperience: string
  companyName: string
  companySector: string
  position: string
  websiteUrl: string
  linkedinUrl: string
  twitterProfile: string
  telegramUsername: string
}

const roleOptions = ["Speaker", "Moderator"]
const topicOptions = ["Airdrop", "Degen", "DeFi", "Trading", "NFT", "GameFi", "Regulation"]
const sectorOptions = [
  "Community", "DAO", "Artificial Intelligence", "Blockchain Infrastructure",
  "Decentralized Finance", "Smart Contract", "Mining", "Wallet", "NFT / Metaverse",
  "Consulting", "Crowdfunding & ICOs", "Exchange (CEX & DEX)", "Media",
  "Hedge Fund, Venture Capital, Market Maker", "Government, Association", "Other"
]
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

export default function SpeakersForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    role: '',
    airdropKnowledge: false,
    preferredTopics: [],
    speakingExperience: '',
    companyName: '',
    companySector: '',
    position: '',
    websiteUrl: '',
    linkedinUrl: '',
    twitterProfile: '',
    telegramUsername: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, airdropKnowledge: checked }))
  }

  const handleTopicChange = (topic: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredTopics: checked
        ? [...prev.preferredTopics, topic]
        : prev.preferredTopics.filter(t => t !== topic)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/partners/speakers', {
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
        <h2 className="text-3xl font-extrabold text-center mb-6">Speaker Application Form</h2>
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
            <Label htmlFor="role">What role are you interested in?</Label>
            <Select onValueChange={handleSelectChange('role')} value={formData.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="airdropKnowledge"
              checked={formData.airdropKnowledge}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="airdropKnowledge">
              Do you have basic knowledge of airdrops and how they work?
            </Label>
          </div>
          <div>
            <Label>Preferred Topics for Discussion</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {topicOptions.map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={topic}
                    checked={formData.preferredTopics.includes(topic)}
                    onCheckedChange={(checked) => handleTopicChange(topic, checked as boolean)}
                  />
                  <Label htmlFor={topic}>{topic}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="speakingExperience">Do you have other speaking experience?</Label>
            <Textarea
              id="speakingExperience"
              name="speakingExperience"
              value={formData.speakingExperience}
              onChange={handleInputChange}
              placeholder="Please provide detail or link to your session recordings"
              rows={4}
            />
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
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="twitterProfile">Twitter Profile</Label>
            <Input
              id="twitterProfile"
              name="twitterProfile"
              value={formData.twitterProfile}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="telegramUsername">Telegram Username</Label>
            <Input
              id="telegramUsername"
              name="telegramUsername"
              value={formData.telegramUsername}
              onChange={handleInputChange}
            />
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
        description="Thank you for your interest in speaking at AirdropFest. We'll review your application and get back to you soon!"
      />
    </div>
  )
}