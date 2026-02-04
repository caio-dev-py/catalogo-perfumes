'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume_ml: number;
  short_description: string;
  image_url?: string;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.slice(0, 6));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <Hero>
        <div className="space-y-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              🧴 Perfumes Premium
            </h1>
            <p className="text-2xl text-amber-100 mb-8 font-light tracking-wide">
              Descubra as melhores fragrâncias para você
            </p>
          </div>
          <Link href="/catalogo">
            <button className="bg-gradient-to-r from-white to-amber-50 text-amber-900 px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-lg">
              ✨ Explorar Catálogo
            </button>
          </Link>
        </div>
      </Hero>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-4">
            Categorias
          </h2>
          <p className="text-gray-600 text-lg">Explore nossas coleções especiais</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-amber-100 hover:border-amber-400">
                <p className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold text-lg group-hover:from-amber-700 group-hover:to-amber-500 transition-all duration-300">
                  {category.name}
                </p>
                <div className="mt-2 h-0.5 w-0 bg-gradient-to-r from-amber-900 to-amber-700 group-hover:w-full transition-all duration-300 mx-auto"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-amber-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-4">
              ✨ Destaques
            </h2>
            <p className="text-gray-600 text-lg">Nossos perfumes mais procurados</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 mx-auto border-4 border-amber-200 border-t-amber-900 rounded-full animate-spin"></div>
                <p className="text-gray-500">Carregando produtos exclusivos...</p>
              </div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                      opacity: 0,
                    }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link href="/catalogo">
                  <button className="bg-gradient-to-r from-amber-900 to-amber-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Ver Todos os Perfumes →
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
              <p className="text-gray-500 mb-6 text-lg">Nenhum perfume disponível no momento.</p>
              <Link href="/admin">
                <button className="bg-gradient-to-r from-amber-900 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  ➕ Adicionar Perfume
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
