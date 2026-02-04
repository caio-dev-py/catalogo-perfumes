import { NextRequest, NextResponse } from 'next/server';
import { listProducts, createProduct } from '@/lib/dbClient';

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await createProduct(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
