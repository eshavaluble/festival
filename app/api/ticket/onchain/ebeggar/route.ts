import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullname, email, phone, evmWallet } = body

    // Validate the input
    if (!fullname || !email || !phone || !evmWallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create a new e-beggar ticket purchase record in the database
    const ticket = await prisma.ticket.create({
      data: {
        fullname,
        email,
        phone,
        evmWallet,
        type: 'e-beggar',
        price: 100, // E-beggar ticket price
        paymentStatus: 'PENDING',
      },
    })

    return NextResponse.json({ success: true, ticket }, { status: 201 })
  } catch (error) {
    console.error('Error processing e-beggar ticket purchase:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}