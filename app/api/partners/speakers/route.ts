import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, country, role, airdropKnowledge, preferredTopics, speakingExperience, companyName, companySector, position, websiteUrl, linkedinUrl, twitterProfile, telegramUsername } = body;

    // Validasi input
    if (!firstName || !lastName || !email || !phone || !companyName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Buat entri speaker baru di database
    const speaker = await prisma.speaker.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        country,
        role,
        airdropKnowledge,
        preferredTopics,
        speakingExperience,
        companyName,
        companySector,
        position,
        websiteUrl,
        linkedinUrl,
        twitterProfile,
        telegramUsername,
      },
    });

    return NextResponse.json({ success: true, speaker }, { status: 201 });
  } catch (error) {
    console.error('Error processing speaker submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}