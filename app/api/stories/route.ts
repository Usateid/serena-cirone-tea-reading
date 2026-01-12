import { NextRequest, NextResponse } from 'next/server';
import { Story } from '@/lib/types';

// Simulazione storage (in produzione usare database)
let stories: Story[] = [];

export async function GET() {
  // In produzione, leggi da database
  // Per ora restituiamo un array vuoto, la logica è client-side
  return NextResponse.json({ stories: [] });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const story: Story = {
      id: Date.now().toString(),
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      duration: parseInt(body.duration),
      audioUrl: body.audioUrl,
      createdAt: new Date().toISOString(),
    };

    // In produzione, salva su database
    stories.push(story);

    return NextResponse.json({ success: true, story });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const index = stories.findIndex((s) => s.id === body.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      );
    }

    stories[index] = { ...stories[index], ...body };

    return NextResponse.json({ success: true, story: stories[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID required' },
        { status: 400 }
      );
    }

    stories = stories.filter((s) => s.id !== id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
