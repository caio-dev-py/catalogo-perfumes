# 🔐 Guia: Logout e Gerenciamento de Admins

## ✅ Logout Implementado

Um botão de logout foi adicionado no canto superior direito do **Painel Administrativo** (`/admin`).

- **Botão:** 🚪 Logout (em vermelho)
- **Localização:** Topo da página, ao lado do título
- **Função:** Clique para fazer logout e retornar ao login
- **Segurança:** Remove o cookie `admin_token` da sessão

### Como Funciona
1. Clique no botão **🚪 Logout**
2. Confirme a ação
3. Você será redirecionado para `/admin/login`

---

## 👥 Gerenciamento de Admins

### 1. **Adicionar Novo Admin**

Existem 3 formas de adicionar um novo administrador:

#### **Opção A: Via Node.js Script (RECOMENDADO)**

```bash
node manage-admins.js add seu_usuario sua_senha
```

**Exemplo:**
```bash
node manage-admins.js add joao senha123
```

#### **Opção B: Via cURL (Terminal/PowerShell)**

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"novo_user","password":"senha123","secret":"change_this_to_a_strong_secret"}'
```

**No Windows PowerShell:**
```powershell
$body = @{
    username = "novo_user"
    password = "senha123"
    secret = "change_this_to_a_strong_secret"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/admin/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

#### **Opção C: Criar script Node.js customizado**

Crie um arquivo `add-admin.js`:

```javascript
const fetch = require('node-fetch');

(async () => {
  const username = 'novo_admin';
  const password = 'senha_forte_123';
  const secret = 'change_this_to_a_strong_secret';

  const res = await fetch('http://localhost:3000/api/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, secret }),
  });

  const data = await res.json();
  console.log(res.ok ? '✅ Admin criado!' : '❌ Erro:', data);
})();
```

Execute:
```bash
node add-admin.js
```

---

### 2. **Deletar/Remover Admin**

#### **Opção A: Via Script**

```bash
node manage-admins.js delete seu_usuario
```

O script mostrará instruções para executar no Supabase.

#### **Opção B: Diretamente no Supabase (RECOMENDADO)**

1. Abra [https://app.supabase.com](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **SQL Editor**
4. Crie uma nova query:

```sql
DELETE FROM public.admins WHERE username = 'seu_usuario';
```

5. Clique em **Run**
6. ✅ Admin removido!

#### **Opção C: Usar Interface Web (em desenvolvimento)**

No painel admin, clique em **"Gerenciar Admins"** para ver instruções e outras opções.

---

### 3. **Variáveis de Ambiente Importantes**

No arquivo `.env.local`, configure:

```env
# Chave de segurança para criar novos admins (MUDE PARA ALGO FORTE!)
ADMIN_SECRET_KEY=change_this_to_a_strong_secret

# Credenciais do Supabase
SUPABASE_URL=https://sssxvwgyebehdehwhuec.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Importante:** Troque `ADMIN_SECRET_KEY` para uma chave forte e segura!

---

## 📋 Tabela de Referência Rápida

| Ação | Comando | Local |
|------|---------|-------|
| **Fazer Logout** | Botão UI | `/admin` → 🚪 Logout |
| **Adicionar Admin** | `node manage-admins.js add user pass` | Terminal |
| **Remover Admin** | `node manage-admins.js delete user` | Terminal / Supabase |
| **Ver Admins** | Supabase Table Editor | https://app.supabase.com |
| **Resetar Senha** | Editar em Supabase | https://app.supabase.com |

---

## 🔒 Segurança

- **Senhas:** Armazenadas em texto simples (recomenda-se migrar para hashing com bcrypt em produção)
- **Cookies:** Tokens com validade de 7 dias
- **Secret Key:** Mude `ADMIN_SECRET_KEY` para algo forte
- **Não compartilhe:** Nunca commit `.env.local` ou `ADMIN_SECRET_KEY` no repositório

---

## 🐛 Troubleshooting

### "Erro: ADMIN_SECRET_KEY inválida"
Verifique se o valor em `.env.local` está correto e corresponde ao usado no script.

### "Admin não foi criado"
- Verifique a conexão com o Supabase
- Confirme que `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão corretos
- Certifique-se de que a tabela `admins` existe no Supabase

### "Não consigo fazer login"
- Verifique o nome de usuário e senha
- Certifique-se de que o admin foi criado corretamente
- Limpe cookies do navegador

---

## 📚 Próximos Passos

1. **Hash de senhas:** Integre `bcrypt` para armazenar senhas de forma segura
2. **Autenticação JWT:** Implemente tokens JWT em vez de simples cookies
3. **Painel Web:** Crie interface para gerenciar admins sem scripts
4. **Logs de auditoria:** Registre quando admins são criados/deletados

---

**Criado em:** 2026-02-04  
**Versão:** 1.0
