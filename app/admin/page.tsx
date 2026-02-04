'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume_ml: number;
  short_description: string;
  description?: string;
  olfactory_notes?: string;
  image_url?: string;
  category_id: number;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formProduct, setFormProduct] = useState({
    name: '',
    brand: '',
    price: '',
    volume_ml: '',
    short_description: '',
    description: '',
    olfactory_notes: '',
    category_id: '',
    image_url: '',
  });

  const [formCategory, setFormCategory] = useState({
    name: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  // Product Form Handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formProduct.category_id) {
      alert('Selecione uma categoria');
      return;
    }

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formProduct,
            price: parseFloat(formProduct.price),
            volume_ml: parseInt(formProduct.volume_ml),
            category_id: parseInt(formProduct.category_id),
          }),
        });

        if (res.ok) {
          alert('Perfume atualizado com sucesso!');
          setEditingProduct(null);
          fetchData();
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formProduct,
            price: parseFloat(formProduct.price),
            volume_ml: parseInt(formProduct.volume_ml),
            category_id: parseInt(formProduct.category_id),
          }),
        });

        if (res.ok) {
          alert('Perfume criado com sucesso!');
          fetchData();
        }
      }

      resetProductForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar perfume');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormProduct({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      volume_ml: product.volume_ml.toString(),
      short_description: product.short_description,
      description: product.description || '',
      olfactory_notes: product.olfactory_notes || '',
      category_id: product.category_id.toString(),
      image_url: product.image_url || '',
    });
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este perfume?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Perfume deletado com sucesso!');
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao deletar perfume');
    }
  };

  const resetProductForm = () => {
    setFormProduct({
      name: '',
      brand: '',
      price: '',
      volume_ml: '',
      short_description: '',
      description: '',
      olfactory_notes: '',
      category_id: '',
      image_url: '',
    });
    setEditingProduct(null);
  };

  // Category Form Handlers
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formCategory),
      });

      if (res.ok) {
        alert('Categoria criada com sucesso!');
        setFormCategory({ name: '' });
        fetchData();
      } else {
        alert('Erro: Categoria pode já existir');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Erro ao salvar categoria');
    }
  };

  return (
    <>
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-4">
          ⚙️ Painel Administrativo
        </h1>
        <p className="text-gray-600 text-lg mb-12">Gerencie todos os produtos e categorias</p>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 font-bold transition-all duration-300 relative ${
              activeTab === 'products'
                ? 'text-amber-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🧴 Perfumes
            {activeTab === 'products' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-900 to-amber-700 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-8 py-3 font-bold transition-all duration-300 relative ${
              activeTab === 'categories'
                ? 'text-amber-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📂 Categorias
            {activeTab === 'categories' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-900 to-amber-700 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg border-2 border-amber-100">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-6">
                {editingProduct ? '✏️ Editar Perfume' : '➕ Criar Novo Perfume'}
              </h2>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProduct.name}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent transition-all duration-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProduct.brand}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, brand: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preço *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formProduct.price}
                      onChange={(e) =>
                        setFormProduct({ ...formProduct, price: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Volume (ml) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formProduct.volume_ml}
                      onChange={(e) =>
                        setFormProduct({ ...formProduct, volume_ml: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    required
                    value={formProduct.category_id}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, category_id: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição Curta *
                  </label>
                  <textarea
                    required
                    value={formProduct.short_description}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        short_description: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição Completa
                  </label>
                  <textarea
                    value={formProduct.description}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas Olfativas
                  </label>
                  <textarea
                    value={formProduct.olfactory_notes}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        olfactory_notes: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    value={formProduct.image_url}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, image_url: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-950"
                  >
                    {editingProduct ? 'Atualizar' : 'Criar'}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Perfumes ({products.length})
              </h2>

              {loading ? (
                <p className="text-gray-500">Carregando...</p>
              ) : products.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.brand} • {product.volume_ml}ml
                          </p>
                          <p className="text-sm text-amber-900 font-semibold">
                            R$ {product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-semibold"
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhum perfume cadastrado ainda.</p>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Criar Nova Categoria
              </h2>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome da Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCategory.name}
                    onChange={(e) =>
                      setFormCategory({ name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-950"
                >
                  Criar Categoria
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Categorias ({categories.length})
              </h2>

              {loading ? (
                <p className="text-gray-500">Carregando...</p>
              ) : categories.length > 0 ? (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <p className="font-semibold text-gray-800">
                        {category.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
