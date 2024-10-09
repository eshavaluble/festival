import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, telegramUsername, communityName, communityType, communitySize, communityDescription, websiteUrl, socialMediaLinks, logoUrl, collaborationIdeas } = body;

    // Validasi input
    if (!firstName || !lastName || !email || !phone || !communityName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Buat entri komunitas baru di database
    const community = await prisma.community.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        telegramUsername,
        communityName,
        communityType,
        communitySize,
        communityDescription,
        websiteUrl,
        socialMediaLinks,
        logoUrl,
        collaborationIdeas,
      },
    });

    return NextResponse.json({ success: true, community }, { status: 201 });
  } catch (error) {
    console.error('Error processing community submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}