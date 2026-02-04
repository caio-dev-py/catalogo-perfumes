# Perfumes Premium - Catálogo Online

Um website moderno e elegante de catálogo de perfumes, desenvolvido com Next.js, React e Tailwind CSS.

##  Características Principais

### Páginas
- **Home**: Hero com apresentação da marca, categorias e destaques
- **Catálogo**: Listagem completa com busca e filtros por categoria
- **Detalhes do Perfume**: Informações completas com notas olfativas
- **Painel Admin**: Gerenciamento de perfumes e categorias

### Funcionalidades
-  Integração com WhatsApp para compras
-  Sistema de busca por nome, marca ou categoria
-  Design responsivo e elegante
-  Banco de dados SQLite integrado
-  API REST completa
-  Painel administrativo completo
-  Suporte a imagens de produtos

##  Como Começar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Configurar WhatsApp

Edite `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+5511999999999
```

### Popular Banco de Dados

Visite: http://localhost:3000/api/init

##  Estrutura

```
app/
 api/
    categories/
    init/
    products/
 admin/
 catalogo/
 page.tsx

components/
 Button.tsx
 Footer.tsx
 Hero.tsx
 Navigation.tsx
 ProductCard.tsx

lib/
 db.ts
 seed.ts
```

##  Fluxo de Compra

1. Selecione um perfume
2. Clique em "Comprar Agora"
3. WhatsApp abre com mensagem pré-formatada

##  Banco de Dados

SQLite com `better-sqlite3` para melhor performance.

**Tabelas**: categories, products

##  Design

- Cores: Tons de âmbar (amber-900)
- Responsivo: Mobile, Tablet, Desktop
- Elegante e sofisticado

##  API Endpoints

**Produtos**
- GET /api/products
- GET /api/products/[id]
- POST /api/products
- PUT /api/products/[id]
- DELETE /api/products/[id]

**Categorias**
- GET /api/categories
- POST /api/categories

##  Categorias

1. Perfumes Masculinos
2. Perfumes Femininos
3. Perfumes Unissex
4. Importados
5. Nacionais
6. Árabes

---

**Desenvolvido com  para lojas de perfumes premium**
