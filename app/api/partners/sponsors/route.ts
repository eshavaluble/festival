import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, directContact, position, companyName, companyWebsite, companySector, country, budgetRange } = body;

    // Validasi input
    if (!firstName || !lastName || !email || !phone || !companyName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Buat entri sponsor baru di database
    const sponsor = await prisma.sponsor.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        directContact,
        position,
        companyName,
        companyWebsite,
        companySector,
        country,
        budgetRange,
      },
    });

    return NextResponse.json({ success: true, sponsor }, { status: 201 });
  } catch (error) {
    console.error('Error processing sponsor submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}