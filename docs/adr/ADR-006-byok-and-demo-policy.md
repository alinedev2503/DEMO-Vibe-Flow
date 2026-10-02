# ADR-006: Política de BYOK (Bring Your Own Key) e Ambiente de Demonstração

- **Status:** Aceito
- **Data:** 2026-10-02
- **Decisores:** Arquiteto de Software, Product Manager e Engenharia de Segurança

---

## 1. Contexto

O VibeFlow é comercializado como código-fonte completo, template white-label e SaaS pronto para revenda. Como a plataforma orquestra múltiplos agentes autônomos que realizam chamadas intensivas a modelos de linguagem (Google Gemini, OpenAI e Claude), subsidiar tokens centralmente no servidor geraria custos operacionais imprevisíveis e risco de abuso por visitantes ou usuários não autorizados.

Ao mesmo tempo, para visitantes que chegam na Landing Page ou testam a demonstração, exigir imediatamente a configuração de uma chave de API geraria fricção no onboarding e queda drástica nas taxas de conversão de venda.

## 2. Problema

Como permitir que visitantes degustem o valor real da plataforma de forma interativa e sem fricção, ao mesmo tempo garantindo que:
1. O proprietário do SaaS ou comprador do código-fonte tenha **custo zero de infraestrutura de LLM** para usuários ativos.
2. Cada cliente/organização tenha controle e governança sobre seus próprios dados, cotas e gastos de IA.
3. Não haja risco de vazamento de credenciais mestras em ambiente de demonstração pública.

## 3. Decisão

Implementamos uma estratégia arquitetural híbrida baseada em **BYOK (Bring Your Own Key)** e **Ambiente de Demonstração Controlado**:

### 3.1. Ambiente de Demonstração (Visitantes / Test-Drive)
- O visitante pode realizar até **2 interações de demonstração gratuitas** no Command Center para validar a fluidez, interface e comportamento dos agentes.
- Um contador visual reativo (`demoRunsUsed` / `remainingDemoRuns`) exibe o progresso transparente (`X de 2 testes disponíveis`).
- Ao esgotar os 2 testes gratuitos, o sistema bloqueia novas execuções e abre a `QuickApiKeyModal` ou convida o usuário a adquirir o código-fonte/licença comercial.

### 3.2. Modelo BYOK (Usuários Registrados / Produção)
- Cada usuário/cliente insere sua própria chave de API diretamente pelo painel:
  - **Google Gemini** (Recomendado — com tier gratuito no Google AI Studio: 15 RPM / 1.000.000 TPM).
  - **OpenAI** (GPT-4o / GPT-4o Mini).
  - **Anthropic Claude** (Claude 3.5 Sonnet / Haiku).
- O sistema valida a integridade e conectividade da chave via ping em tempo real antes de salvar.
- Com o BYOK ativado (`isByokActive = true`), o uso da plataforma torna-se **ilimitado**, com privacidade total para o usuário e custo zero de API para o administrador.

## 4. Consequências

- **Positivas:**
  - **Custo Operacional Zero:** O dono da plataforma não paga por tokens de terceiros.
  - **Fator de Conversão de Venda:** Compradores do código adoram o modelo BYOK porque podem revender o SaaS sem provisionar saldo de API para cada cliente.
  - **Fricção Mínima na Demo:** Visitantes conseguem testar o app imediatamente sem precisar ter conta ou chave no momento do primeiro acesso.
  - **Governança e Privacidade:** Dados dos clientes não transitam pela conta de terceiros.
- **Negativas / Mitigações:**
  - Usuários leigos precisam obter uma chave de API: mitigado incluindo links diretos de 1 clique (`https://aistudio.google.com/apikey`) e instruções passo a passo na interface.
