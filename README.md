# Next Auth v5 - Advanced Repository (2024)

![image](https://camo.githubusercontent.com/b75e91243ebf112aa9ea6045d97ee08c782376d48d7a384b2fb5f660cebd328c/68747470733a2f2f6b6f726162692d65636f6d6d657263652d61646d696e2e76657263656c2e6170702f5f6e6578742f696d6167653f75726c3d68747470732533412532462532467265732e636c6f7564696e6172792e636f6d253246646e636d6a7034317a253246696d61676525324675706c6f616425324676313730343134363539372532466a73716363616e33676a74636f6f7372627974612e706e6726773d3139323026713d3735)

This is a repository for Next Auth v5 (2024)

Once finished this Project will have the following Key Features:
- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two factor verification
- 👥 User roles (Admin & User)
- 🔓 Login component (Opens in redirect or modal)
- 📝 Register component
- 🤔 Forgot password component
- ✅ Verification component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session
- 🔄 Exploring next-auth callbacks
- 👤 useCurrentUser hook
- 🛂 useRole hook
- 🧑 currentUser utility
- 👮 currentRole utility
- 🖥️ Example with server component
- 💻 Example with client component
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔐 Protect Server Actions for admins only
- 📧 Change email with new verification in Settings page
- 🔑 Change password with old password confirmation in Settings page
- 🔔 Enable/disable two-factor auth in Settings page
- 🔄 Change user role in Settings page (for development purposes only)

## For the env file use this template:
```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=""
DIRECT_URL=""

# NextAuth
AUTH_SECRET=""
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Resend Mail
RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=""
```

Project Progress:
- [x] Project structure
- [x] Landing page
- [x] Login Component (Redirect)
- [x] Register Component
- [x] Login Button
- [x] Social Login Component
- [x] Credentials Provider
- [x] OAuth Provider
- [x] User Roles
- [x] Email Verification
- [x] Forgot Password Component
- [x] 2FA
- [x] Hooks
- [x] Role Gate
- [x] Protect API Routes for Admins only
- [x] Protect Server Actions for Admins only
- [x] Change Email
- [x] Enable / disable 2FA in settings

# Gestão Simples

Sistema de gestão empresarial para ME, MEI e EPP.

## Migração do Banco de Dados

### Atualização do Schema (Março 2023)

Foram feitas as seguintes alterações no schema:

1. **Modelo Tenant**:
   - Removido o campo `slug`

2. **Modelo Company**:
   - Removido o campo `slug`
   - Adicionados novos campos para dados cadastrais:
     - `legal_name`: Razão Social
     - `registration_type`: Tipo de inscrição (CNPJ, CPF ou Estrangeiro)
     - `registration_number`: Número de inscrição (CNPJ, CPF, etc.)
     - `state_registration`: Inscrição Estadual
     - `municipal_registration`: Inscrição Municipal
     - `suframa_registration`: Inscrição Suframa
     - `tax_regime`: Regime Tributário
     - Diversos campos de endereço
     - `active`: Status de atividade da empresa

3. **Modelo User**:
   - Adicionado o campo `birthDate`: Data de aniversário do usuário

### Aplicando as Migrações

Siga estes passos para atualizar seu banco de dados:

1. Gere uma nova migração do Prisma:
   ```bash
   npx prisma migrate dev --name remove_slugs_add_company_fields
   ```

2. **OU** Execute o script SQL diretamente:
   ```bash
   psql -U seu_usuario -d seu_banco -f prisma/migrations/migration_script.sql
   ```

3. Gere o cliente Prisma atualizado:
   ```bash
   npx prisma generate
   ```

4. Reinicie o aplicativo:
   ```bash
   npm run dev
   ```

## Desenvolvimento

### Instalação de Dependências

```bash
npm install
# ou
yarn
# ou
pnpm install
```

### Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.