import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Singleton pour éviter les erreurs de connexion multiples en dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const trades = await prisma.trade.findMany({
      orderBy: { date: 'desc' }, // Les plus récents en premier
    });
    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trades' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const trade = await prisma.trade.create({
      data: {
        symbol: body.symbol,
        direction: body.direction,
        setup: body.setup,
        entryPrice: parseFloat(body.entryPrice),
        exitPrice: parseFloat(body.exitPrice),
        pnl: parseFloat(body.pnl),
        date: body.date, // On garde la date en String pour simplifier (YYYY-MM-DD) ou new Date(body.date) selon ton schema
      },
    });
    return NextResponse.json(trade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create trade' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    const trade = await prisma.trade.update({
      where: { id: id },
      data: {
        symbol: data.symbol,
        direction: data.direction,
        setup: data.setup,
        entryPrice: parseFloat(data.entryPrice),
        exitPrice: parseFloat(data.exitPrice),
        pnl: parseFloat(data.pnl),
        date: data.date,
      },
    });
    return NextResponse.json(trade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update trade' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await prisma.trade.delete({
      where: { id: body.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete trade' }, { status: 500 });
  }
}