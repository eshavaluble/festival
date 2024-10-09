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
  companyName: string
  position: string
  mediaOutletUrl: string
  socialMediaLinks: string[]
  logoUrl: string
  mediaType: string
  mediaFrequency: string
  coveragePlan: string
  pressTicketsNeeded: number
}

const positionOptions = [
  "Editor-in-Chief", "Managing Editor", "Senior Editor", "Associate Editor",
  "Journalist", "Reporter", "Correspondent", "Photojournalist", "Videographer",
  "Producer", "Broadcast Journalist", "Social Media Manager", "Content Creator",
  "Blogger", "Podcaster", "Freelance Writer", "Freelance Photographer",
  "Columnist", "Feature Writer", "Investigative Journalist", "Copy Editor",
  "Digital Content Manager", "Marketing and Communications Specialist",
  "PR Specialist", "Press Officer", "Media Relations Manager", "Publisher",
  "News Director", "Graphics Designer", "Multimedia Journalist",
  "Technical Support", "Research Analyst", "Other"
]

const mediaTypeOptions = ["Website", "Social Media", "Blog", "Podcast", "Other"]
const mediaFrequencyOptions = ["International", "National", "Regional"]
const pressTicketsOptions = [1, 2, 3, 4]

export default function MediaForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegramUsername: '',
    companyName: '',
    position: '',
    mediaOutletUrl: '',
    socialMediaLinks: [''],
    logoUrl: '',
    mediaType: '',
    mediaFrequency: '',
    coveragePlan: '',
    pressTicketsNeeded: 1
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pressTicketsNeeded' ? parseInt(value, 10) : value
    }))
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
      const response = await fetch('/api/partners/media', {
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
        <h2 className="text-3xl font-extrabold text-center mb-6">Media Partnership Application</h2>
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
            <Label htmlFor="companyName">Company / Organization Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
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
            <Label htmlFor="mediaOutletUrl">Media Outlet URL</Label>
            <Input
              id="mediaOutletUrl"
              name="mediaOutletUrl"
              type="url"
              value={formData.mediaOutletUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Social Media Links</Label>
            {formData.socialMediaLinks.map((link, index) => (
              <Input
                key={index}
                value={link}
                onChange={(e) => handleSocialMediaLinksChange(index, e.target.value)}
                placeholder="e.g., instagram, X, telegram channel, facebook"
                className="mt-2"
              />
            ))}
            <Button type="button" variant="outline" onClick={addSocialMediaLink} className="mt-2">
              Add Another Social Media Link
            </Button>
          </div>
          <div>
            <Label htmlFor="logoUrl">Link to Your Outlet Logo (SVG or PNG)</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              type="url"
              value={formData.logoUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="mediaType">Type of Your Media Outlet</Label>
            <Select onValueChange={handleSelectChange('mediaType')} value={formData.mediaType}>
              <SelectTrigger>
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                {mediaTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="mediaFrequency">Media Outlet Frequency</Label>
            <Select onValueChange={handleSelectChange('mediaFrequency')} value={formData.mediaFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select media frequency" />
              </SelectTrigger>
              <SelectContent>
                {mediaFrequencyOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="coveragePlan">Describe How You Plan to Cover the Event</Label>
            <Textarea
              id="coveragePlan"
              name="coveragePlan"
              value={formData.coveragePlan}
              onChange={handleInputChange}
              placeholder="e.g., articles, live streaming, interviews, social media content"
              rows={4}
              required
            />
          </div>
          <div>
            <Label htmlFor="pressTicketsNeeded">How Many Press Tickets Do You Need?</Label>
            <Select 
              onValueChange={handleSelectChange('pressTicketsNeeded')} 
              value={formData.pressTicketsNeeded.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of tickets" />
              </SelectTrigger>
              <SelectContent>
                {pressTicketsOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} {option === 4 ? '(only with camera crew)' : ''}
                  </SelectItem>
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
        description="Thank you for your interest in becoming a media partner for AirdropFest. We'll be in touch soon!"
      />
    </div>
  )
}