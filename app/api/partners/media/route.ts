import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, telegramUsername, companyName, position, mediaOutletUrl, socialMediaLinks, logoUrl, mediaType, mediaFrequency, coveragePlan, pressTicketsNeeded } = body;

    // Validasi input
    if (!firstName || !lastName || !email || !phone || !companyName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Buat entri media baru di database
    const media = await prisma.media.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        telegramUsername,
        companyName,
        position,
        mediaOutletUrl,
        socialMediaLinks,
        logoUrl,
        mediaType,
        mediaFrequency,
        coveragePlan,
        pressTicketsNeeded: Number(pressTicketsNeeded),
      },
    });

    return NextResponse.json({ success: true, media }, { status: 201 });
  } catch (error) {
    console.error('Error processing media submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}