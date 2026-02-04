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
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg leading-tight">
              🧴 Perfumes Premium
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-amber-100 mb-6 sm:mb-8 font-light tracking-wide px-2">
              Descubra as melhores fragrâncias para você
            </p>
          </div>
          <Link href="/catalogo">
            <button className="bg-gradient-to-r from-white to-amber-50 text-amber-900 px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 shadow-lg text-sm sm:text-base">
              ✨ Explorar Catálogo
            </button>
          </Link>
        </div>
      </Hero>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-2 sm:mb-4 px-2">
            Categorias
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2">Explore nossas coleções especiais</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-amber-100 hover:border-amber-400">
                <p className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent font-bold text-xs sm:text-sm md:text-lg group-hover:from-amber-700 group-hover:to-amber-500 transition-all duration-300 line-clamp-2">
                  {category.name}
                </p>
                <div className="mt-1 sm:mt-2 h-0.5 w-0 bg-gradient-to-r from-amber-900 to-amber-700 group-hover:w-full transition-all duration-300 mx-auto"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-amber-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-2 sm:mb-4 px-2">
              ✨ Destaques
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2">Nossos perfumes mais procurados</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 mx-auto border-4 border-amber-200 border-t-amber-900 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm sm:text-base">Carregando produtos exclusivos...</p>
              </div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12">
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
                  <button className="bg-gradient-to-r from-amber-900 to-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                    Ver Todos os Perfumes →
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12 bg-white rounded-2xl sm:rounded-3xl shadow-lg px-4">
              <p className="text-gray-500 mb-6 text-sm sm:text-base md:text-lg">Nenhum perfume disponível no momento.</p>
              <Link href="/admin">
                <button className="bg-gradient-to-r from-amber-900 to-amber-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
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
