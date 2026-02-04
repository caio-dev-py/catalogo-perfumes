import { getDb, initializeDatabase } from '@/lib/db';

const sampleProducts = [
  {
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    price: 450.00,
    volume_ml: 100,
    description: 'Uma fragrância moderna e sofisticada que combina notas de madeira com especiarias. Ideal para o homem contemporâneo que busca elegância e distinção.',
    short_description: 'Fragrância masculina moderna e sofisticada',
    olfactory_notes: 'Notas de saída: Bergamota, Limão\nNotas de corpo: Gálbano, Incenso\nNotas base: Cedro, Âmbar',
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1595643707802-0b402bbdc77f?w=400'
  },
  {
    name: 'Coco Mademoiselle',
    brand: 'Chanel',
    price: 480.00,
    volume_ml: 100,
    description: 'Uma fragrância elegante e sensual que traz a essência da feminilidade moderna. Notas de laranja e jasmim criam uma composição refinada e sofisticada.',
    short_description: 'Fragrância feminina elegante e sensual',
    olfactory_notes: 'Notas de saída: Laranja, Bergamota\nNotas de corpo: Jasmim, Rosa\nNotas base: Âmbar, Baunilha',
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1596643707802-0b402bbdc77f?w=400'
  },
  {
    name: 'Acqua di Parma Blu Mediterraneo',
    brand: 'Acqua di Parma',
    price: 520.00,
    volume_ml: 150,
    description: 'Uma fragrância unissex que evoca a essência do Mediterrâneo. Com notas frescas de limão Siciliano e verbena, é perfeita para qualquer ocasião.',
    short_description: 'Fragrância unissex fresca e mediterrânea',
    olfactory_notes: 'Notas de saída: Limão Siciliano\nNotas de corpo: Verbena, Alecrim\nNotas base: Ambroxano, Madeira',
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1606599810694-10ad433be757?w=400'
  },
  {
    name: 'Sacentum Aqua de Cheiro',
    brand: 'Sacentum',
    price: 89.90,
    volume_ml: 100,
    description: 'Uma fragrância brasileira que combina frescor e sofisticação. Ideal para o dia a dia, com notas cítricas e florais delicadas.',
    short_description: 'Fragrância brasileira fresca e sofisticada',
    olfactory_notes: 'Notas de saída: Bergamota, Limão\nNotas de corpo: Jasmim, Magnólia\nNotas base: Almíscares, Madeira',
    category_id: 5,
    image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'
  },
  {
    name: 'Arabian Oud Premium',
    brand: 'Luxe Arabia',
    price: 650.00,
    volume_ml: 100,
    description: 'Um fragância árabe de luxo que apresenta notas profundas e ricas de oud. Uma criação sofisticada para momentos especiais.',
    short_description: 'Fragrância árabe premium com oud',
    olfactory_notes: 'Notas de saída: Rosa Otomana\nNotas de corpo: Oud, Almíscares\nNotas base: Âmbar, Baunilha',
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'
  },
  {
    name: 'Dior Sauvage',
    brand: 'Christian Dior',
    price: 420.00,
    volume_ml: 100,
    description: 'Uma fragrância masculina icônica que combina frescor e masculinidade. Notas de ambroxano e pimenta criam uma combinação irresistível.',
    short_description: 'Fragrância masculina ícone de estilo',
    olfactory_notes: 'Notas de saída: Bergamota, Ambroxano\nNotas de corpo: Pimenta, Madeira\nNotas base: Cedro, Âmbar',
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1621293954002-24ee0f2e6e04?w=400'
  }
];

export function seedDatabase() {
  try {
    const db = getDb();
    initializeDatabase();

    // Check if products already exist
    const stmt = db.prepare('SELECT COUNT(*) as count FROM products');
    const result = stmt.get() as { count: number };

    if (result.count === 0) {
      const insertProduct = db.prepare(`
        INSERT INTO products (name, brand, price, volume_ml, description, short_description, olfactory_notes, category_id, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      sampleProducts.forEach((product) => {
        insertProduct.run(
          product.name,
          product.brand,
          product.price,
          product.volume_ml,
          product.description,
          product.short_description,
          product.olfactory_notes,
          product.category_id,
          product.image_url
        );
      });

      console.log('Database seeded with sample products!');
    } else {
      console.log('Database already has products, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
