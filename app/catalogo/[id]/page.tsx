'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PrimaryButton } from '@/components/Button';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume_ml: number;
  description: string;
  short_description: string;
  olfactory_notes: string;
  image_url?: string;
  category_name: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Erro ao carregar o produto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500">Carregando...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-red-600 mb-4">{error || 'Produto não encontrado'}</p>
          <Link href="/catalogo">
            <button className="bg-amber-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-950">
              Voltar ao Catálogo
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55';
  const message = `Olá! Tenho interesse no perfume ${product.name} (${product.volume_ml}ml) da marca ${product.brand} — preço: R$ ${product.price.toFixed(2)}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/catalogo">Catálogo</Link>
          <span>/</span>
          <span className="text-amber-900 font-semibold">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg h-96 flex items-center justify-center">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={300}
                height={400}
                className="object-contain"
              />
            ) : (
              <div className="text-center">
                <p className="text-6xl mb-4">🧴</p>
                <p className="text-amber-900">Imagem não disponível</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <p className="text-amber-900 text-sm font-semibold uppercase tracking-wider mb-2">
              {product.brand}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {product.name}
            </h1>

            {/* Category */}
            <p className="text-gray-600 mb-4">
              <strong>Categoria:</strong> {product.category_name}
            </p>

            {/* Volume and Price */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-amber-900 text-sm uppercase tracking-wider mb-1">
                    Volume
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {product.volume_ml}ml
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-amber-900 text-sm uppercase tracking-wider mb-1">
                    Preço
                  </p>
                  <p className="text-4xl font-bold text-amber-900">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Olfactory Notes */}
            {product.olfactory_notes && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Notas Olfativas
                </h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {product.olfactory_notes}
                </p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Descrição
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <PrimaryButton>Comprar Agora via WhatsApp</PrimaryButton>
            </a>

            {/* Back Link */}
            <Link href="/catalogo">
              <button className="w-full mt-4 border-2 border-amber-900 text-amber-900 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                Voltar ao Catálogo
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
