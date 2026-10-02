# VibeFlow — Product Requirements Document (PRD)

**Versão:** 1.0.0  
**Data:** Julho 2026  
**Status:** Aprovado — Em Desenvolvimento  
**Autor:** Equipe VibeFlow

---

## 1. Visão Geral do Produto

**VibeFlow** é uma plataforma SaaS B2B para **orquestração de agentes de IA autônomos**. Ela fornece um centro de comando unificado onde equipes podem implantar, monitorar, aprovar e auditar trabalhadores digitais que executam tarefas de vendas, suporte, pesquisa, marketing e análise de dados — todos alimentados pelo Google Gemini.

### Proposta de Valor
> "Implante uma equipe de agentes de IA tão facilmente quanto você contrata um freelancer — com controle total, trilha de auditoria e aprovação humana integrada."

---

## 2. Problema

### Contexto
Empresas de médio porte querem automatizar fluxos de trabalho com IA mas enfrentam:

| Problema | Impacto |
|---|---|
| Ferramentas de IA isoladas (ChatGPT, Gemini, Claude) sem orquestração | Fragmentação operacional |
| Falta de visibilidade sobre o que os agentes estão fazendo | Risco de compliance |
| Nenhum mecanismo de aprovação antes de ações críticas | Exposição a erros custosos |
| Impossibilidade de white-label para revenda | Perda de oportunidade de mercado |
| Logs de IA espalhados em múltiplas plataformas | Auditoria impossível |

### Dor Central
Equipes de operações **não confiam** nos agentes de IA porque não conseguem **ver, controlar e auditar** o que eles fazem. O resultado: subutilização da IA por medo de erros.

---

## 3. Solução

VibeFlow resolve isso com uma abordagem **Human-in-the-Loop First**:

```
Agente executa tarefa → Ação crítica detectada → Humano aprova/rejeita
                     ↓
               Log imutável gerado automaticamente
                     ↓
               Dashboard atualizado em tempo real
```

---

## 4. Público-alvo

### Perfis de Usuário (Personas)

#### 🎯 Persona 1 — "Ana, a Ops Manager" (Usuária Principal)
- **Cargo:** Gerente de Operações, startup B2B de 50 funcionários
- **Dores:** Gerencia 5 ferramentas de IA diferentes, sem visão consolidada
- **Objetivo:** Dashboard único para monitorar todos os agentes
- **Uso diário:** Dashboard, Approval Queue, Audit Logs

#### 💼 Persona 2 — "Carlos, o Sales Rep"
- **Cargo:** Representante de Vendas
- **Dores:** Gasta 3h/dia em tarefas repetitivas de CRM
- **Objetivo:** Usar agentes para prospectar e atualizar registros
- **Uso diário:** Command Center, Agent Hub

#### 🔑 Persona 3 — "Beatriz, a CTO"
- **Cargo:** CTO, agência de tecnologia
- **Dores:** Clientes pedem soluções de IA, mas ela precisa de governança
- **Objetivo:** White-label VibeFlow para revender com a marca da agência
- **Uso diário:** Branding, Admin, configuração de permissões

#### 🔍 Persona 4 — "Ricardo, o Compliance Officer"
- **Cargo:** Compliance, empresa regulada
- **Dores:** Precisa provar que nenhuma ação de IA foi executada sem autorização
- **Objetivo:** Exportar trilha de auditoria para reguladores
- **Uso diário:** Audit Logs

---

## 5. Funcionalidades e Requisitos

### 5.1 Funcionalidades Core (P0 — Essencial)

#### Agent Hub
- **Req-001:** Usuário pode criar, editar, pausar, duplicar e excluir agentes
- **Req-002:** Cada agente tem: nome, papel, persona, status, capacidades e configurações de memória
- **Req-003:** Status dos agentes: Online, Aprendendo, Ocioso, Pausado
- **Req-004:** Capacidades: Texto, Visão, Voz, Web, Dados (selecionável por agente)
- **Req-005:** Busca e filtro por nome, tipo e status

#### Command Center
- **Req-006:** Chat em tempo real com Gemini Flash/Pro
- **Req-007:** Streaming de respostas (token a token)
- **Req-008:** Thinking Mode: raciocínio visível (Gemini Pro)
- **Req-009:** Síntese de voz TTS (voz "Puck", 48kHz)
- **Req-010:** Histórico de conversa na sessão atual

#### Dashboard
- **Req-011:** KPIs: agentes ativos, tarefas completadas, tempo médio de resposta, taxa de aprovação
- **Req-012:** Matriz de status de todos os agentes em tempo real
- **Req-013:** Health check do MCP Gateway
- **Req-014:** Alertas de segurança em 3 camadas

#### MCP Gateway
- **Req-015:** Interface para registrar e testar conexões externas
- **Req-016:** Conectores: Salesforce, HubSpot, PostgreSQL (fase 1: mock; fase 2: real)
- **Req-017:** Status de saúde de cada conexão (ativa/inativa/erro)
- **Req-018:** Log de chamadas por conector

#### Approval Queue
- **Req-019:** Fila de ações pendentes de aprovação humana
- **Req-020:** Card por ação: agente, tipo, descrição, impacto estimado, timestamp
- **Req-021:** Botões: Aprovar / Rejeitar com campo de comentário opcional
- **Req-022:** Notificação visual quando nova ação entra na fila

#### Audit Logs
- **Req-023:** Log imutável de todas as ações dos agentes
- **Req-024:** Campos: timestamp, agente, tipo, descrição, status, usuário responsável
- **Req-025:** Busca full-text e filtros por agente, tipo e período
- **Req-026:** Paginação (50 registros por página)

### 5.2 Funcionalidades Importantes (P1)

#### Autenticação & Segurança
- **Req-027:** Login com email/senha + JWT
- **Req-028:** Registro de novos usuários
- **Req-029:** Recuperação de senha com token por e-mail (TTL: 1h)
- **Req-030:** Rate limiting: 100 req/min por IP
- **Req-031:** Sessões invalidadas no logout

#### Multi-tenant & Permissões
- **Req-032:** 3 níveis de acesso: Admin, Operador, Visualizador
- **Req-033:** Admin pode criar/editar/desativar usuários
- **Req-034:** Visualizador não pode modificar agentes ou aprovar ações

#### White-Label / Branding
- **Req-035:** Upload de logo (PNG/SVG, max 2MB)
- **Req-036:** Seleção de cor primária com preview ao vivo
- **Req-037:** Nome customizável da plataforma
- **Req-038:** Prévia em tempo real das customizações

#### Internacionalização
- **Req-039:** pt-BR, en-US, es-ES no lançamento
- **Req-040:** Detecção automática do idioma do browser
- **Req-041:** Seletor de idioma persistente (localStorage)

#### Bring Your Own Key (BYOK) & Demonstração Controlada
- **Req-042:** Modelo BYOK agnóstico para provedores de IA (Google Gemini, OpenAI, Anthropic Claude) sem retenção de segredos no servidor.
- **Req-043:** Verificação ativa de ping/latência e conectividade antes de persistir chaves.
- **Req-044:** Ambiente de demonstração permite até duas utilizações gratuitas de degustação no Command Center para novos visitantes.
- **Req-045:** Bloqueio gracioso com modal rápida (QuickApiKeyModal) ao esgotar a cota de 2 testes, convidando para BYOK ou compra de licença.

### 5.3 Funcionalidades Futuras (P2)

- Notificações por e-mail e Slack para aprovações pendentes
- Relatórios de uso e custo por agente (tokens consumidos)
- Agendamento de tarefas (cron-like)
- RAG — Retrieval-Augmented Generation com bases de conhecimento próprias
- Marketplace de templates de agentes
- SSO / SAML para empresas

---

## 6. Requisitos Não-Funcionais

| Requisito | Meta |
|---|---|
| Tempo de resposta da IA (p95) | < 500ms para início do stream |
| Carregamento do dashboard | < 2s |
| Disponibilidade | 99.9% uptime (SLA) |
| Integridade dos audit logs | 100% — nenhum log pode ser deletado |
| Segurança | Nenhuma ação crítica sem aprovação humana |
| Escalabilidade | Suportar 100 agentes simultâneos por organização |

---

## 7. Métricas de Sucesso

| Métrica | Meta (90 dias pós-lançamento) |
|---|---|
| MRR (Receita Recorrente Mensal) | R$ 15.000 |
| Usuários ativos | 50 organizações |
| NPS | > 40 |
| Churn mensal | < 5% |
| Ações aprovadas via queue | > 95% (sem bypass) |
| Tempo médio de onboarding | < 10 minutos |

---

## 8. Premissas e Restrições

### Premissas
- O usuário tem uma chave de API do Google Gemini
- A infra de deploy é Cloud Run ou servidor próprio com Node.js 18+
- O banco de dados SQLite é suficiente para a fase inicial (< 10k registros/dia)

### Restrições
- Sem dependência de banco de dados externo na fase 1 (SQLite embedded)
- Sem SDK de terceiros para auth na fase 1 (JWT próprio)
- Aplicativo deve funcionar offline para leitura (dashboard, audit logs)

---

## 9. Fora do Escopo (v1.0)

- App mobile nativo (iOS/Android)
- Treinamento fine-tuning de modelos
- Billing e cobrança automática via Stripe (UI apenas)
- Integração com provedores de IA além do Gemini

---

## 10. Dependências Técnicas

```
Frontend:  React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS 4
IA:        Google GenAI SDK (@google/genai) — Gemini Flash/Pro/TTS
Backend:   Express 4 + TypeScript + better-sqlite3
Auth:      JWT (jsonwebtoken) + bcrypt
Segurança: helmet + express-rate-limit + express-validator
Logging:   pino (estruturado, JSON)
Testes:    Vitest + Testing Library
CI/CD:     GitHub Actions
```

---

*Última atualização: Julho 2026 | Próxima revisão: Outubro 2026*
