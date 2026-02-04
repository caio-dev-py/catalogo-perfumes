import { NextResponse } from 'next/server';
import { listCategories, createCategory } from '@/lib/dbClient';

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createCategory(body.name);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
