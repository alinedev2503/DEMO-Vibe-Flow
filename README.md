<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="VibeFlow Banner" width="100%" />
</div>

<h1 align="center">🚀 VibeFlow — Autonomous AI Workforce Platform</h1>

<p align="center">
  <strong>Orquestre, monitore e gerencie agentes de IA autônomos com supervisão humana nativa.</strong><br />
  Implante IA com controle, não com medo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT" />
  <img src="https://img.shields.io/badge/versão-1.0.0-brightgreen.svg" alt="v1.0.0" />
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-4.21-000000?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite" alt="SQLite" />
  <img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?logo=google" alt="Google Gemini" />
</p>

---

## 📋 O que é o VibeFlow?

**VibeFlow** é uma plataforma **SaaS completa** para orquestração de **agentes de IA autônomos**, alimentada pelo **Google Gemini**. Ela fornece um centro de comando unificado para implantar, monitorar e gerenciar trabalhadores digitais que executam tarefas de vendas, suporte, pesquisa, marketing e análise de dados — com supervisão humana integrada.

> **Filosofia:** IA é o trabalhador; humanos são os líderes. O VibeFlow reflete essa hierarquia em cada tela.

**🎯 Público-alvo:**
- Startups B2B (20–200 funcionários)
- Equipes de operações e automação
- Agências que revendem IA como serviço
- CTOs que precisam de governança sobre agentes de IA

---

## ✨ Funcionalidades Principais

### 🤖 Agent Hub
Deploy, pausa, duplicação e configuração completa de agentes com capacidades multimodais (texto, áudio, imagem). Interface com busca, filtros e categorização por tipo.

### 🎮 Command Center
Chat em tempo real com Gemini Flash/Pro, suporte a streaming de respostas, Thinking Mode para raciocínio avançado, e conversão de texto para fala (TTS) com voz "Puck".

### 📊 Dashboard Executivo
KPIs em tempo real, matriz de status dos agentes, health do MCP Gateway, insights de segurança em 3 camadas e métricas de uso consolidadas.

### 🔌 MCP Gateway
Conecte ferramentas externas (CRM, e-mail, banco de dados, APIs REST) aos seus agentes de forma segura e centralizada via Model Context Protocol.

### ✅ Approval Queue (Human-in-the-Loop)
Workflow nativo de aprovação humana para ações críticas executadas por agentes. Nenhuma ação de alto impacto roda sem confirmação explícita.

### 📜 Audit Logs
Trilha de auditoria imutável de todas as ações dos agentes com busca full-text, filtros avançados por agente/tipo/data e exportação.

### 🎨 White-Label / Branding
Customização completa da identidade visual: logo, paleta de cores, favicon, nome da plataforma, tipografia — ideal para revenda.

### 👥 Multi-tenant & Permissões
Três níveis de acesso (Admin, Operador, Visualizador) com painel de administração de usuários e isolamento por organização.

### 🔐 Autenticação & Segurança
- Login/registro com JWT + refresh tokens
- Recuperação de senha com token temporário (1h de validade)
- Rate limiting por IP, Helmet, proteção XSS/CSRF
- Senhas hasheadas com bcrypt (12 rounds)

### 🌐 Internacionalização Completa
Interface em **Português (BR)**, **English (US)** e **Español (ES)** — extensível para qualquer idioma.

### 🔑 Bring Your Own Key (BYOK) & Degustação Controlada
- **Modelo BYOK:** Cada usuário ou cliente conecta sua própria chave gratuita (Google Gemini via AI Studio, OpenAI ou Claude), garantindo custo zero de LLM para quem revende ou opera o SaaS.
- **Degustação Controlada para Visitantes:** Visitantes têm até **2 interações gratuitas** no Command Center para validar a interface e a inteligência dos agentes antes de inserir uma chave ou assinar.
- **Validação ao Vivo:** Teste de ping e latência em tempo real direto pela interface (`QuickApiKeyModal`).

---

## 🖥️ Mapa de Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | Landing Page | Framework PAS: Problem → Agitate → Solution |
| `/login` | Autenticação | Login, registro e recuperação de senha |
| `/dashboard` | Dashboard | KPIs, métricas e visão geral da plataforma |
| `/agents` | Agent Hub | Gerencie, configure e monitore agentes |
| `/command` | Command Center | Chat com IA em tempo real + TTS |
| `/mcp` | MCP Gateway | Conexões com ferramentas externas |
| `/approvals` | Approval Queue | Fila de aprovação de ações críticas |
| `/audit` | Audit Logs | Trilha de auditoria completa |
| `/settings` | Configurações | Perfil, API keys, preferências |
| `/branding` | White-Label | Personalização visual da plataforma |
| `/admin` | Administração | Gestão de usuários e permissões |
| `/checkout` | Planos | Seleção de plano e assinatura |
| `/forgot-password` | Recuperação | Reset de senha por e-mail |

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19.x | Framework UI |
| TypeScript | 5.8 | Type safety |
| Vite | 6.x | Build tool + HMR |
| Tailwind CSS | 4.x | Design system |
| React Router | 7.x | Roteamento lazy-loaded |
| Motion | latest | Animações fluidas |
| Lucide React | latest | Ícones |
| react-helmet-async | latest | SEO |

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Express | 4.21 | Servidor HTTP |
| TypeScript | 5.8 | Type safety |
| better-sqlite3 | 11.x | Banco de dados embedded |
| JWT + bcrypt | latest | Autenticação |
| Helmet | latest | Headers de segurança |
| express-rate-limit | latest | Rate limiting |
| Multer | latest | Upload de arquivos |
| Pino | latest | Logging estruturado |

### IA
| Modelo | ID | Uso |
|---|---|---|
| Gemini 3 Flash | `gemini-3-flash-preview` | Padrão — respostas rápidas |
| Gemini 3.1 Pro | `gemini-3.1-pro-preview` | Raciocínio profundo / Thinking Mode |
| Gemini Flash Lite | `gemini-3.1-flash-lite-preview` | Tarefas leves |
| Gemini Flash Image | `gemini-3.1-flash-image-preview` | Visão / multimodal |
| Gemini TTS | `gemini-2.5-flash-preview-tts` | Síntese de voz (voz "Puck") |

---

## 💰 Como Adquirir este Código

O VibeFlow está disponível para licenciamento e implementação sob medida. Escolha o formato que melhor atende à sua operação:

- **Blueprint do Arquiteto MVP (R$ 52,00):** A estrutura de código base, documentação técnica e arquitetura validada para iniciar seu projeto.
- **Apps com Setup White-Label (R$ 4.100,00):** Código completo, pronto para uso, com suporte a branding personalizado e deploy acelerado.
- **Setup de Automações (R$ 7.100,00 + R$ 520/mês):** Implementação total de agentes, orquestração, segurança avançada e manutenção contínua.

Entre em contato com nossa equipe comercial para iniciar: **suporte@vibeflow.ai**.

---

## 📦 Instalação

### Pré-requisitos
- **Node.js** 18+
- **npm** 9+
- Chave de API do **Google Gemini** ([gratuita no AI Studio](https://aistudio.google.com/apikey))

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/alinedev2503/-AI-SaaS-Vibe-Flow.git
cd -AI-SaaS-Vibe-Flow

# 2. Configure as variáveis de ambiente
cp .env.example .env.local
# Abra .env.local e adicione sua GEMINI_API_KEY

# 3. Instale as dependências
npm install

# 4. Execute o setup inicial (cria banco de dados, verifica tipos)
npm run setup

# 5. Inicie em modo de desenvolvimento
npm run dev:all
```

Acesse **http://localhost:3000** 🎉

### Credenciais de teste (SQLite local)

```
Email: admin@vibeflow.ai
Senha: admin123
```

---

## 📁 Estrutura do Projeto

```
vibeflow/
├── src/                        # Frontend React
│   ├── components/
│   │   └── layout/             # Shell: Layout, Sidebar, Header
│   ├── contexts/               # ThemeContext, LanguageContext, ToastContext
│   ├── lib/                    # gemini.ts, mcp.ts, api.ts, utils.ts
│   ├── locales/                # pt-BR.ts, en-US.ts, es-ES.ts
│   ├── pages/                  # Todas as páginas da aplicação
│   └── __tests__/              # Testes unitários (Vitest)
├── server/                     # Backend Express
│   ├── db/
│   │   ├── adapters/           # SQLite, Supabase, Firebase
│   │   └── migrations/         # Scripts SQL de migração
│   ├── lib/                    # Utilitários do servidor
│   ├── middleware/             # Auth, admin, rate-limit
│   └── routes/                 # auth, agents, tools, audit, settings
├── scripts/                    # Setup, seed, utils
├── data/                       # SQLite DB e uploads locais
├── public/                     # Assets estáticos
├── tests/                      # Testes de integração
├── .github/                    # GitHub Actions CI/CD
├── COMPLETE.md                 # Documentação completa consolidada
└── .env.example                # Template de variáveis de ambiente
```

---

## 🚀 Instruções de Deploy

O VibeFlow foi projetado para deploy rápido em nuvem com escalabilidade. Siga estas diretrizes:

### 1. Build de Produção
Garanta que o ambiente esteja limpo e o build otimizado:
```bash
npm run build
npm start
```

### 2. Infraestrutura Recomendada: Google Cloud Run
Para uma experiência robusta (o padrão recomendado):
1. **Containerização:** Utilize o `Dockerfile` fornecido.
2. **Deploy via CLI:**
```bash
gcloud builds submit --tag gcr.io/SEU_PROJETO/vibeflow
gcloud run deploy vibeflow --image gcr.io/SEU_PROJETO/vibeflow \
  --platform managed --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=sua_chave,STRIPE_WEBHOOK_SECRET=seu_segredo
```
3. **Variáveis de Ambiente:** Configure todas as variáveis sensíveis no console do Cloud Run (Secrets Manager recomendado).

---

## 🗄️ Comparação de Bancos de Dados

O VibeFlow é agnóstico ao provedor de dados. Escolha a opção ideal para o seu volume de dados e necessidades de governança:

| Provedor | Tipo | Ideal para | Vantagem Principal |
|---|---|---|---|
| **SQLite** | Local/Embed | Desenvolvimento, Prototipagem, App Single-user | Velocidade, custo zero, simplicidade |
| **Firebase (Firestore)** | NoSQL Cloud | Apps com alta leitura/escrita, Real-time, Multi-tenant | Escala automática, SDKs robustos, sem manutenção |
| **Supabase (PostgreSQL)**| Relacional | Projetos enterprise, dados relacionais complexos | Poder do SQL, suporte a queries complexas |

*Para alternar entre eles, ajuste a variável de ambiente `DB_TYPE` (`sqlite`, `firebase`, ou `supabase`).*

---

## 🔒 Segurança

| Proteção | Implementação |
|---|---|
| Autenticação | JWT com expiração configurável |
| Senhas | bcrypt (12 rounds) |
| Rate Limiting | 100 req/min por IP |
| Headers | Helmet (CSP, HSTS, X-Frame) |
| Recuperação | Token seguro com TTL de 1h |
| Validação | express-validator em todas as rotas |
| XSS/CSRF | Sanitização de entrada |
| Audit | Trilha imutável de todas as ações |
| Agentes | Firewall semântico em 3 camadas |

Consulte [SECURITY.md](./SECURITY.md) para política completa de segurança e reporte de vulnerabilidades.

---

## 🗺️ Roadmap

| Fase | Status | Descrição |
|---|---|---|
| Fase 1 — Foundation | ✅ Completa | UI completa, Gemini integrado, mock data |
| Fase 2 — Backend Real | ✅ Completa | Auth, JWT, SQLite, API REST |
| Fase 3 — Agent Intelligence | 🔄 Em andamento | Memória persistente, agent-to-agent |
| Fase 4 — Integrations | 📅 Planejada | Salesforce real, Slack, webhooks |
| Fase 5 — Enterprise | 💡 Futuro | SSO, SOC2, marketplace de agentes |

Veja o [ROADMAP.md](./ROADMAP.md) completo para todos os detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) para entender o fluxo de trabalho, convenções de commit e como abrir PRs.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja [LICENSE](./LICENSE) para mais informações.

---

## 📞 Suporte

- 📧 Email: suporte@vibeflow.ai
- 🐛 Issues: [GitHub Issues](https://github.com/alinedev2503/-AI-SaaS-Vibe-Flow/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/alinedev2503/-AI-SaaS-Vibe-Flow/discussions)

---

<p align="center">
  <strong>VibeFlow</strong> — Autonomia com supervisão. IA com controle. 🤖✨
</p>
