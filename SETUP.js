#!/usr/bin/env node

/**
 * INSTRUÇÕES DE CONFIGURAÇÃO IMPORTANTES
 * 
 * Este arquivo contém informações críticas para fazer o projeto funcionar corretamente.
 */

const instructions = {
  titulo: "🧴 PERFUMES PREMIUM - INSTRUÇÕES DE SETUP",
  
  passo1_instalacao: {
    titulo: "1️⃣ INSTALAÇÃO",
    comandos: [
      "cd 'e:\\Catálogo Perfumes\\catalogo-perfumes'",
      "npm install"
    ],
    duracao: "~2-3 minutos"
  },

  passo2_desenvolvimento: {
    titulo: "2️⃣ EXECUTAR EM DESENVOLVIMENTO",
    comando: "npm run dev",
    resultado: "Abre em http://localhost:3000",
    mantenha_terminal: "SIM - Mantenha o terminal aberto enquanto desenvolve"
  },

  passo3_banco_dados: {
    titulo: "3️⃣ POPULAR BANCO DE DADOS",
    opcao1: "Visite http://localhost:3000/api/init",
    opcao2: "Ou acesse o Admin e adicione produtos manualmente",
    resultado: "Banco de dados será preenchido com 6 perfumes de exemplo"
  },

  passo4_whatsapp: {
    titulo: "4️⃣ CONFIGURAR WHATSAPP (IMPORTANTE!)",
    arquivo: ".env.local",
    variavelAtual: "NEXT_PUBLIC_WHATSAPP_NUMBER=+55",
    parar: "EDITE ESTE ARQUIVO E ADICIONE SEU NÚMERO",
    exemplo: "NEXT_PUBLIC_WHATSAPP_NUMBER=+5511999999999",
    formato: "+55 + DDD + Número (sem formatação)",
    notas: [
      "55 = Brasil (país)",
      "11 = DDD (São Paulo)",
      "999999999 = Número sem 9 inicial",
      "SEM hífen, espaço ou parênteses"
    ]
  },

  estrutura_criada: {
    titulo: "5️⃣ ESTRUTURA DE ARQUIVOS CRIADA",
    diretorios: {
      app: ["api/products", "api/categories", "api/init", "admin/", "catalogo/"],
      components: ["Button", "Footer", "Hero", "Navigation", "ProductCard"],
      lib: ["db.ts (banco de dados)", "seed.ts (dados de exemplo)"],
      data: ["perfumes.db (criado automaticamente)"]
    }
  },

  paginas_acesso: {
    titulo: "6️⃣ PÁGINAS PARA ACESSAR",
    urls: [
      { nome: "Home", url: "http://localhost:3000", descricao: "Página inicial com destaques" },
      { nome: "Catálogo", url: "http://localhost:3000/catalogo", descricao: "Listagem completa de perfumes" },
      { nome: "Admin", url: "http://localhost:3000/admin", descricao: "Painel de gerenciamento" },
      { nome: "Inicializar BD", url: "http://localhost:3000/api/init", descricao: "Carregar dados de exemplo" }
    ]
  },

  build_producao: {
    titulo: "7️⃣ BUILD PARA PRODUÇÃO",
    comandos: [
      "npm run build",
      "npm run start"
    ],
    url: "Acesse http://localhost:3000"
  },

  recursos: {
    titulo: "8️⃣ O QUE FOI CRIADO",
    items: [
      "✅ Home page com hero, categorias e destaques",
      "✅ Catálogo com busca (nome, marca, descrição)",
      "✅ Filtro por categoria",
      "✅ Página de detalhes do perfume",
      "✅ Integração com WhatsApp para compras",
      "✅ Painel admin completo (CRUD)",
      "✅ Banco de dados SQLite",
      "✅ API REST",
      "✅ Design responsivo (mobile/tablet/desktop)",
      "✅ 6 perfumes de exemplo pré-carregados"
    ]
  },

  categorias_sistema: {
    titulo: "9️⃣ CATEGORIAS NO SISTEMA",
    items: [
      "1. Perfumes Masculinos",
      "2. Perfumes Femininos",
      "3. Perfumes Unissex",
      "4. Importados",
      "5. Nacionais",
      "6. Árabes"
    ]
  },

  fluxo_compra: {
    titulo: "🔟 FLUXO DE COMPRA",
    passos: [
      "1. Cliente clica em 'Comprar Agora'",
      "2. WhatsApp abre automaticamente",
      "3. Mensagem vem pré-formatada com:",
      "   - Nome do perfume",
      "   - Volume (ml)",
      "   - Marca",
      "   - Preço",
      "4. Cliente envia ou ajusta a mensagem"
    ]
  },

  troubleshooting: {
    titulo: "🆘 PROBLEMAS COMUNS",
    problemas: [
      {
        erro: "Porta 3000 já está em uso",
        solucao: "npm run dev -- -p 3001"
      },
      {
        erro: "Erro ao conectar banco de dados",
        solucao: "Delete .next/data e reinicie o servidor"
      },
      {
        erro: "Imagens não carregam",
        solucao: "Adicione URLs de imagem válidas no admin"
      },
      {
        erro: "WhatsApp não abre",
        solucao: "Verifique .env.local com número correto"
      }
    ]
  },

  notas_finais: {
    titulo: "✨ NOTAS FINAIS",
    items: [
      "Este é um projeto completo e funcional",
      "Pode ser usado como base para produção",
      "Todos os dados são salvos no banco SQLite",
      "O banco é criado automaticamente em data/perfumes.db",
      "Você pode excluir data/perfumes.db para resetar",
      "Visite /api/init novamente para recarregar dados de exemplo",
      "Customize as cores no Tailwind (procure por 'amber-900')",
      "Adicione suas próprias imagens de perfumes"
    ]
  }
};

console.log("📖 PERFUMES PREMIUM - SETUP COMPLETO\n");
console.log("========================================\n");

Object.values(instructions).forEach(section => {
  if (section.titulo) {
    console.log(`\n${section.titulo}`);
    console.log("----------------------------------------");
    
    if (section.comandos) {
      console.log("Comandos:");
      section.comandos.forEach(cmd => console.log(`  $ ${cmd}`));
    }
    
    if (section.urls) {
      section.urls.forEach(url => {
        console.log(`  ${url.nome}: ${url.url}`);
        console.log(`    → ${url.descricao}`);
      });
    }
    
    if (section.items) {
      section.items.forEach(item => console.log(`  ${item}`));
    }
    
    if (section.passos) {
      section.passos.forEach(passo => console.log(`  ${passo}`));
    }
    
    if (section.parar) {
      console.log(`\n⚠️  ${section.parar}`);
    }
    
    if (section.exemplo) {
      console.log(`\nExemplo:\n  ${section.exemplo}`);
    }
    
    if (section.notas) {
      console.log("\nFormato:");
      section.notas.forEach(nota => console.log(`  • ${nota}`));
    }
    
    if (section.problemasComuns) {
      console.log("\nProblemas Comuns:");
      section.problemas.forEach(p => {
        console.log(`  ❌ ${p.erro}`);
        console.log(`     ✅ ${p.solucao}`);
      });
    }
  }
});

console.log("\n========================================");
console.log("🚀 Está tudo pronto para começar!");
console.log("📞 Para suporte: consulte README.md");
console.log("========================================\n");
