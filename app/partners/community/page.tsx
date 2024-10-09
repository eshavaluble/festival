'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { SuccessDialog } from "@/components/SuccessDialog"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  telegramUsername: string
  communityName: string
  communityType: string
  communitySize: string
  communityDescription: string
  websiteUrl: string
  socialMediaLinks: string[]
  logoUrl: string
  collaborationIdeas: string
}

const communityTypeOptions = [
  "Crypto Community", "Blockchain Developer Community", "NFT Community",
  "DeFi Community", "Trading Community", "Metaverse Community", "DAO",
  "Gaming Community", "Educational Community", "Investor Community", "Other"
]

const communitySizeOptions = [
  "Less than 1,000", "1,000 - 5,000", "5,001 - 10,000",
  "10,001 - 50,000", "50,001 - 100,000", "More than 100,000"
]

export default function CommunityForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegramUsername: '',
    communityName: '',
    communityType: '',
    communitySize: '',
    communityDescription: '',
    websiteUrl: '',
    socialMediaLinks: [''],
    logoUrl: '',
    collaborationIdeas: ''
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

  const handleSocialMediaLinksChange = (index: number, value: string) => {
    const newLinks = [...formData.socialMediaLinks]
    newLinks[index] = value
    setFormData(prev => ({ ...prev, socialMediaLinks: newLinks }))
  }

  const addSocialMediaLink = () => {
    setFormData(prev => ({ ...prev, socialMediaLinks: [...prev.socialMediaLinks, ''] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/partners/community', {
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
        <h2 className="text-3xl font-extrabold text-center mb-6">Community Partnership Application</h2>
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
            <Label htmlFor="telegramUsername">Telegram Username</Label>
            <Input
              id="telegramUsername"
              name="telegramUsername"
              value={formData.telegramUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="communityName">Community Name</Label>
            <Input
              id="communityName"
              name="communityName"
              value={formData.communityName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="communityType">Community Type</Label>
            <Select onValueChange={handleSelectChange('communityType')} value={formData.communityType}>
              <SelectTrigger>
                <SelectValue placeholder="Select community type" />
              </SelectTrigger>
              <SelectContent>
                {communityTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="communitySize">Community Size</Label>
            <Select onValueChange={handleSelectChange('communitySize')} value={formData.communitySize}>
              <SelectTrigger>
                <SelectValue placeholder="Select community size" />
              </SelectTrigger>
              <SelectContent>
                {communitySizeOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="communityDescription">Community Description</Label>
            <Textarea
              id="communityDescription"
              name="communityDescription"
              value={formData.communityDescription}
              onChange={handleInputChange}
              rows={4}
              required
            />
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
            <Label>Social Media Links</Label>
            {formData.socialMediaLinks.map((link, index) => (
              <Input
                key={index}
                value={link}
                onChange={(e) => handleSocialMediaLinksChange(index, e.target.value)}
                placeholder="e.g., Twitter, Facebook, LinkedIn, Instagram"
                className="mt-2"
              />
            ))}
            <Button type="button" variant="outline" onClick={addSocialMediaLink} className="mt-2">
              Add Another Social Media Link
            </Button>
          </div>
          <div>
            <Label htmlFor="logoUrl">Link to Your Community Logo (SVG or PNG)</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              type="url"
              value={formData.logoUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="collaborationIdeas">Ideas for Collaboration</Label>
            <Textarea
              id="collaborationIdeas"
              name="collaborationIdeas"
              value={formData.collaborationIdeas}
              onChange={handleInputChange}
              placeholder="How do you envision collaborating with AirdropFest?"
              rows={4}
              required
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
        description="Thank you for your interest in partnering with AirdropFest. We'll be in touch soon!"
      />
    </div>
  )
}