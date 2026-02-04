'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
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

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [searchQuery, setSearchQuery] = useState('');
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

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category_name === selectedCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.short_description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  return (
    <>
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Page Title */}
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
            Catálogo de Perfumes
          </h1>
          <p className="text-gray-600 text-lg">Descubra nossas fragrâncias exclusivas</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="md:col-span-1">
            {/* Search */}
            <div className="mb-8 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-4">
                🔍 Pesquisar
              </h3>
              <input
                type="text"
                placeholder="Nome, marca ou descrição"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent transition-all duration-300 bg-white"
              />
            </div>

            {/* Categories */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                📂 Categorias
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-amber-900 to-amber-700 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  Todas as Categorias
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-amber-900 to-amber-700 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 mx-auto border-4 border-amber-200 border-t-amber-900 rounded-full animate-spin"></div>
                  <p className="text-gray-500">Carregando perfumes exclusivos...</p>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600 font-semibold">
                    ✨ Exibindo <span className="text-amber-900">{filteredProducts.length}</span> produto
                    {filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                  {(selectedCategory || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('');
                      }}
                      className="text-amber-900 hover:text-amber-700 font-semibold transition-all duration-300 text-sm"
                    >
                      ✕ Limpar filtros
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
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
              </>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-amber-50 rounded-3xl shadow-lg">
                <p className="text-2xl text-gray-600 mb-6">✕ Nenhum perfume encontrado</p>
                <p className="text-gray-500 mb-8">
                  Tente ajustar seus filtros ou pesquisar por outro termo.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="inline-block bg-gradient-to-r from-amber-900 to-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
