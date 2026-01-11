import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    // On récupère les trades triés par date croissante pour le graphique
    const trades = await prisma.trade.findMany({
      orderBy: { date: 'asc' }, 
    });
    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
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
        contracts: parseFloat(body.contracts), // Ajout
        entryPrice: parseFloat(body.entryPrice),
        exitPrice: parseFloat(body.exitPrice),
        pnl: parseFloat(body.pnl),
        rr: parseFloat(body.rr),
        date: body.date,
      },
    });
    return NextResponse.json(trade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
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
        contracts: parseFloat(data.contracts), // Ajout
        entryPrice: parseFloat(data.entryPrice),
        exitPrice: parseFloat(data.exitPrice),
        pnl: parseFloat(data.pnl),
        rr: parseFloat(data.rr),
        date: data.date,
      },
    });
    return NextResponse.json(trade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await prisma.trade.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}