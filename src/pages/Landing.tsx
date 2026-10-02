import {
  Sparkles, Bot, Network, CheckSquare, FileText, Palette, Zap,
  Headphones, Globe, TrendingUp, Users, ArrowRight, Check, Menu,
  X, ChevronRight, Star, Shield, Code, Mail, Play, Cpu, Lock,
  BarChart3, Layers, Workflow, BadgeCheck, Eye, RefreshCw, ChevronDown,
  LayoutDashboard, Settings, CreditCard, ExternalLink, ArrowLeft, Home,
  Code2, MessageCircle, QrCode
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CodePurchaseModal } from "@/components/CodePurchaseModal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Showcase de Telas", href: "#showcase" },
  { label: "Recursos", href: "#features" },
  { label: "Agentes", href: "#agents" },
  { label: "Como funciona", href: "#how" },
  { label: "Preços", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const showcaseScreens = [
  {
    title: "Dashboard Geral",
    path: "/dashboard",
    icon: LayoutDashboard,
    badge: "Métricas & Stats",
    color: "from-violet-500 to-indigo-600",
    shadow: "shadow-violet-500/20",
    desc: "Visão consolidada de desempenho dos agentes virtuais, métricas de execução e resumo executivo."
  },
  {
    title: "Command Center IA",
    path: "/command",
    icon: Zap,
    badge: "Chat & Streaming",
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
    desc: "Chat em tempo real com streaming token-a-token, Thinking Mode do Gemini Pro e sintetização de voz TTS."
  },
  {
    title: "Hub de Agentes",
    path: "/agents",
    icon: Bot,
    badge: "Gerenciamento",
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    desc: "Criação, edição e controle de agentes autônomos com definição de papéis, personas e memórias."
  },
  {
    title: "Fila de Aprovação",
    path: "/approvals",
    icon: CheckSquare,
    badge: "Human-in-the-Loop",
    color: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-500/20",
    desc: "Painel de supervisão de risco em tempo real. Ações de médio e alto risco aguardam validação humana."
  },
  {
    title: "Trilha de Auditoria",
    path: "/audit",
    icon: FileText,
    badge: "Compliance LGPD",
    color: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
    desc: "Logs imutáveis de segurança e auditoria registrando cada evento, ator, timestamp e status."
  },
  {
    title: "MCP Gateway",
    path: "/mcp",
    icon: Network,
    badge: "Integrações REST",
    color: "from-purple-500 to-fuchsia-600",
    shadow: "shadow-purple-500/20",
    desc: "Integração padronizada via Model Context Protocol para conectar CRMs, bancos de dados e APIs externadas."
  },
  {
    title: "Customizador White-Label",
    path: "/branding",
    icon: Palette,
    badge: "Re-Branding",
    color: "from-fuchsia-500 to-pink-600",
    shadow: "shadow-fuchsia-500/20",
    desc: "Personalização completa de identidade visual, logotipo, cores primárias, secundárias e temas."
  },
  {
    title: "Painel Admin RBAC",
    path: "/admin",
    icon: Users,
    badge: "Controle de Acesso",
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    desc: "Gestão avançada de usuários, atribuição de papéis (Admin/Operator) e permissões de sistema."
  },
  {
    title: "Planos & Assinaturas",
    path: "/checkout",
    icon: CreditCard,
    badge: "Monetização SaaS",
    color: "from-emerald-400 to-cyan-500",
    shadow: "shadow-emerald-400/20",
    desc: "Interface de contratação e checkout para vendas recorrentes de planos Starter, Pro e Enterprise."
  },
  {
    title: "Configurações",
    path: "/settings",
    icon: Settings,
    badge: "Chaves & Perfil",
    color: "from-slate-500 to-slate-700",
    shadow: "shadow-slate-500/20",
    desc: "Gerenciamento de perfil de usuário, chaves de API Gemini e preferências de sistema."
  },
  {
    title: "Tela de Login",
    path: "/login",
    icon: Lock,
    badge: "Autenticação",
    color: "from-violet-600 to-purple-800",
    shadow: "shadow-violet-600/20",
    desc: "Tela de entrada segura com suporte a login criptografado PBKDF2 e OAuth social."
  }
];

const stats = [
  { value: 56,   suffix: "+",   label: "Testes automatizados" },
  { value: 100,  suffix: "%",   label: "Cobertura de auditoria" },
  { value: 99.9, suffix: "%",   label: "SLA Enterprise" },
  { value: 3,    suffix: "",    label: "Camadas de segurança" },
];

const features = [
  {
    icon: CheckSquare,
    color: "from-violet-500 to-purple-700",
    glow: "shadow-violet-500/20",
    title: "Approval Queue",
    badge: "Human-in-the-Loop",
    desc: "Toda ação de alto impacto aguarda aprovação humana. Defina níveis de risco — baixo, médio, alto ou crítico — e durma tranquilo. Nenhum agente age por conta própria.",
  },
  {
    icon: FileText,
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    title: "Audit Logs",
    badge: "Compliance",
    desc: "Registro imutável e pesquisável de cada ação. Quem fez, o quê, quando, com qual autorização. Compliance pronto para reguladores, debugging instantâneo.",
  },
  {
    icon: Bot,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    title: "Agent Hub",
    badge: "Multimodal",
    desc: "Crie, pause, duplique e configure agentes com identidade, memória persistente e capacidades multimodais — texto, voz, visão e dados. Estado real, não promessas.",
  },
  {
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
    title: "Command Center",
    badge: "Gemini Flash/Pro",
    desc: "Chat em tempo real com streaming token-a-token, Thinking Mode para raciocínio profundo e síntese de voz TTS. A potência do Gemini, com você no controle.",
  },
  {
    icon: Network,
    color: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
    title: "MCP Gateway",
    badge: "Integrações",
    desc: "Conecte Salesforce, HubSpot, PostgreSQL e qualquer API REST via Model Context Protocol. Integração padronizada, auditada e extensível.",
  },
  {
    icon: Palette,
    color: "from-fuchsia-500 to-purple-600",
    glow: "shadow-fuchsia-500/20",
    title: "White-Label",
    badge: "Revenda",
    desc: "Logo, cores, tipografia, domínio — tudo da sua marca. Plataforma completa para revenda. Seus clientes nunca saberão que é VibeFlow por baixo.",
  },
];

const agents = [
  { icon: TrendingUp, name: "Maya",  role: "Sales Specialist",    cap: ["Texto","Voz","Visão"],     color: "from-emerald-400 to-emerald-600",  status: "online" },
  { icon: Headphones, name: "Nova",  role: "Support Specialist",   cap: ["Texto","Visão"],           color: "from-violet-400 to-purple-600",    status: "online" },
  { icon: Globe,      name: "Atlas", role: "Research Analyst",     cap: ["Texto","Web","Dados"],     color: "from-blue-400 to-cyan-500",        status: "learning" },
  { icon: BarChart3,  name: "Orion", role: "Data Analyst",         cap: ["Texto","Dados"],           color: "from-amber-400 to-orange-500",     status: "idle" },
  { icon: Users,      name: "Luna",  role: "Marketing Specialist", cap: ["Texto","Visão","Web"],     color: "from-pink-400 to-rose-500",        status: "online" },
  { icon: Cpu,        name: "Forge", role: "Project Coordinator",  cap: ["Texto","Voz"],             color: "from-teal-400 to-emerald-500",    status: "paused" },
];

const steps = [
  { n: "01", icon: Bot,      title: "Crie seu agente",       desc: "Defina nome, papel, persona e capacidades. Leva menos de 2 minutos." },
  { n: "02", icon: Network,  title: "Conecte ferramentas",   desc: "MCP Gateway: Salesforce, HubSpot, PostgreSQL, qualquer API REST." },
  { n: "03", icon: Eye,      title: "Supervisione em tempo real", desc: "Dashboard mostra status de todos os agentes e ações pendentes." },
  { n: "04", icon: BadgeCheck, title: "Aprove ações críticas", desc: "Nada de alto impacto roda sem seu clique. Segurança nativa." },
];

const plans = [
  {
    name: "Básico",
    price: "R$ 39",
    period: "/mês",
    desc: "Para começar com IA",
    badge: "",
    features: ["Até 2 agentes ativos", "Command Center básico", "Dashboard com métricas", "Audit logs (7 dias)", "Tema dark/light", "Comunidade Discord"],
    cta: "Assinar Básico",
    featured: false,
  },
  {
    name: "Pro",
    price: "R$ 97",
    period: "/mês",
    desc: "Para times que levam IA a sério",
    badge: "Mais popular",
    features: ["Agentes ilimitados", "MCP Gateway completo", "Approval Queue", "Audit logs ilimitados", "White-label básico", "API Keys", "TTS + Visão", "Suporte prioritário"],
    cta: "Assinar Pro",
    featured: true,
  },
  {
    name: "Plano Plus",
    price: "R$ 297",
    period: "/mês",
    desc: "Para agências e corporações",
    badge: "",
    features: ["Tudo do Pro", "Multi-tenant completo", "SAML / SSO", "On-premise option", "SLA 99.9%", "Gerente de conta dedicado", "Treinamento da equipe", "Semantic firewall avançado"],
    cta: "Assinar Plano Plus",
    featured: false,
  },
];

const testimonials = [
  {
    text: "Finalmente uma plataforma que trata IA com seriedade. Supervisão humana nativa, não como afterthought. O VibeFlow mudou como gerenciamos nossos processos.",
    name: "Rafael M.",
    role: "CTO · Fintech",
    avatar: "RM",
    color: "from-violet-500 to-purple-600",
  },
  {
    text: "Implantamos 6 agentes em 3 dias. O Approval Queue nos deu a confiança que precisávamos para deixar a IA agir em nome da empresa.",
    name: "Carla S.",
    role: "Head of Ops · Scale-up B2B",
    avatar: "CS",
    color: "from-cyan-500 to-blue-600",
  },
  {
    text: "Revendemos para 12 clientes com white-label. O produto é tão completo que nem precisamos customizar nada além do logo.",
    name: "Diego L.",
    role: "CEO · Agência de IA",
    avatar: "DL",
    color: "from-emerald-500 to-teal-600",
  },
];

const faq = [
  { q: "Como funciona a utilização de chaves de IA (BYOK)?", a: "O VibeFlow adota o padrão Bring Your Own Key (BYOK). Para demonstração rápida, visitantes têm até 2 interações gratuitas de teste. Para uso contínuo, cada usuário conecta sua própria chave gratuita do Google AI Studio (ou OpenAI/Claude). Seus dados e limites de cota ficam sob seu controle total, e compradores do código não têm custos de tokens com terceiros." },
  { q: "Como eu controlo o que os agentes fazem?", a: "Toda ação classificada como médio, alto ou crítico entra na Approval Queue e aguarda seu OK antes de executar. Você define os limites, os agentes respeitam." },
  { q: "E se um agente cometer um erro? Como rastreio?", a: "Cada ação é registrada no Audit Log imutável — quem, o quê, quando, com qual autorização. Debugar leva segundos, não horas." },
  { q: "Meus dados ficam seguros?", a: "Banco com adaptador agnóstico (SQLite, Supabase PostgreSQL ou Firebase Firestore). Nenhum dado sai sem sua autorização explícita. JWT + PBKDF2 + rate limiting + Helmet por padrão." },
  { q: "Posso conectar ferramentas que já uso?", a: "Sim. O MCP Gateway conecta Salesforce, HubSpot, PostgreSQL e qualquer API REST. Extensível — adicione novos conectores em minutos." },
  { q: "Preciso de cartão de crédito para testar?", a: "Não. Você pode testar imediatamente na demonstração interativa. Para estender, use uma chave gratuita do Google AI Studio obtida em 30 segundos." },
  { q: "Posso revender para meus clientes?", a: "Sim — white-label completo disponível na licença comercial. Logo, cores, tipografia, domínio próprio. Seus clientes nunca saberão que é VibeFlow." },
  { q: "Funciona com qualquer modelo de IA?", a: "Sim! Suporte nativo ao Google Gemini (Flash, Pro, TTS, Visão), OpenAI (GPT-4o) e Anthropic Claude (3.5 Sonnet), com alternância em 1 clique." },
  { q: "Como é o suporte?", a: "Starter: comunidade Discord. Pro: ticket com resposta em 24h. Enterprise: gerente de conta dedicado + SLA 99.9%." },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((ease * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, suffix = "", label, start }: { value: number; suffix?: string; label: string; start: boolean; [k: string]: unknown }) {
  const count = useCountUp(value, 1400, start);
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-black text-white tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-sm text-slate-400 mt-2 font-medium">{label}</p>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    online: "bg-emerald-400 shadow-emerald-400/60",
    learning: "bg-blue-400 shadow-blue-400/60",
    idle: "bg-slate-400",
    paused: "bg-amber-400 shadow-amber-400/60",
  };
  return (
    <span className={`inline-block size-2 rounded-full shadow-md ${colors[status] ?? "bg-slate-400"} ${status !== "idle" ? "animate-pulse" : ""}`} />
  );
}

function FaqItem({ q, a }: { q: string; a: string; [k: string]: unknown }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${open ? "border-primary/40 bg-white/[0.04]" : "border-white/5 bg-white/[0.02] hover:border-primary/20"}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        <span className="font-semibold text-sm sm:text-base text-white">{q}</span>
        <ChevronDown className={`size-4 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`} />
      </div>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const statsRef = useInView(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0a14] text-white overflow-x-hidden selection:bg-primary/30">

      {/* ── Ambient background blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-[100px]" />
      </div>

      {/* ─────────────── NAV ─────────────── */}
      <nav 
        role="navigation"
        aria-label="Navegação Principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0d0a14]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-[#0d0a14]/60 backdrop-blur-md border-b border-white/5"}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-h-[44px]">
            <div className="size-8 sm:size-9 bg-gradient-to-br from-primary to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-all">
              <Sparkles className="size-4 sm:size-5 text-white" />
            </div>
            <span className="font-black text-base sm:text-lg tracking-tight text-white">
              Vibe<span className="text-primary">Flow</span>
            </span>
          </Link>

          {/* Desktop & Tablet Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map(l => (
              <a 
                key={l.href} 
                href={l.href} 
                className="px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all min-h-[40px] flex items-center"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Tablet Primary Links (768px - 1024px) */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            {navLinks.slice(0, 3).map(l => (
              <a 
                key={l.href} 
                href={l.href} 
                className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions & CTAs */}
          <div className="hidden sm:flex items-center gap-2 md:gap-2.5 lg:gap-3 shrink-0">
            {/* Adquirir Código Badge CTA */}
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold bg-primary/15 border border-primary/35 hover:border-primary/70 text-primary hover:text-white hover:bg-primary rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm active:scale-95 min-h-[38px]"
              title="Comprar código-fonte / SaaS white-label"
            >
              <Code2 className="size-3.5 sm:size-4" />
              <span className="hidden md:inline">Adquirir Código</span>
              <span className="md:hidden">Código</span>
              <span className="px-1.5 py-0.2 bg-primary text-white text-[9px] font-black rounded uppercase">SaaS</span>
            </button>

            {/* Entrar no App */}
            <Link 
              to="/dashboard" 
              className="hidden md:flex px-3 py-2 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all items-center gap-1.5 min-h-[38px]"
            >
              <LayoutDashboard className="size-3.5 lg:size-4 text-primary" /> 
              <span>Entrar</span>
            </Link>

            {/* Testar Demonstração */}
            <Link
              to="/dashboard"
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary to-fuchsia-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-primary/25 flex items-center gap-1.5 min-h-[38px]"
            >
              <span>Testar Demo</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/10 bg-white/5"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile & Tablet Dropdown / Sheet Overlay */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[80vh] opacity-100 border-b border-white/10 shadow-2xl" : "max-h-0 opacity-0 border-b-0"
          }`}
        >
          <div className="px-4 py-5 space-y-4 bg-[#0d0a14]/98 backdrop-blur-2xl border-t border-white/10 max-h-[calc(80vh-4rem)] overflow-y-auto">
            {/* Quick Links Group */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Navegação</p>
              {navLinks.map(l => (
                <a 
                  key={l.href} 
                  href={l.href} 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-all min-h-[44px]"
                >
                  <span>{l.label}</span>
                  <ChevronRight className="size-4 text-slate-500" />
                </a>
              ))}
            </div>

            {/* Showcase Quick Access */}
            <div className="pt-2 border-t border-white/10">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Telas do App</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-200"
                >
                  <LayoutDashboard className="size-4 text-primary" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/command"
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-200"
                >
                  <Zap className="size-4 text-amber-400" />
                  <span>Command IA</span>
                </Link>
                <Link
                  to="/agents"
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-200"
                >
                  <Bot className="size-4 text-emerald-400" />
                  <span>Hub Agentes</span>
                </Link>
                <Link
                  to="/approvals"
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-200"
                >
                  <CheckSquare className="size-4 text-pink-400" />
                  <span>Aprovações</span>
                </Link>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={() => { setMenuOpen(false); setShowPurchaseModal(true); }}
                className="w-full text-center py-3 text-xs sm:text-sm font-bold bg-gradient-to-r from-primary/20 to-fuchsia-600/20 border border-primary/40 text-primary hover:text-white hover:bg-primary rounded-xl flex items-center justify-center gap-2 transition-all min-h-[48px]"
              >
                <Code2 className="size-4" />
                <span>Adquirir Licença ou Código-Fonte</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Link 
                  to="/login" 
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs sm:text-sm font-semibold text-slate-200 border border-white/15 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center min-h-[44px]"
                >
                  Entrar no App
                </Link>
                <Link 
                  to="/dashboard" 
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-fuchsia-600 text-white rounded-xl hover:opacity-95 shadow-lg shadow-primary/30 flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>Testar Demo</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 px-4">

        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#8c2bee 1px,transparent 1px),linear-gradient(90deg,#8c2bee 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-fade-in">
            <Star className="size-3 fill-primary" />
            Showcase Oficial White-Label SaaS · Código Pronto para Revenda
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.0] mb-6">
            <span className="block text-white">Seus agentes de IA.</span>
            <span className="block bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent pb-2">
              Sob seu controle.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Orquestre, monitore e governe agentes de IA autônomos com aprovação humana nativa,
            audit log imutável e integrações via MCP. Explore todas as telas reais abaixo!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#showcase"
              className="group px-8 py-4 bg-gradient-to-r from-primary to-fuchsia-600 text-white font-bold text-base rounded-2xl hover:opacity-90 transition-all shadow-[0_0_40px_rgba(140,43,238,0.35)] flex items-center gap-2"
            >
              Explore a Galeria de Telas
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/dashboard"
              className="group px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold text-base rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="size-4 text-primary" />
              Acessar Painel Interativo
            </Link>
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="group px-8 py-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-base rounded-2xl transition-all flex items-center gap-2 shadow-lg"
            >
              <Code2 className="size-4" />
              Adquirir Código-Fonte
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
            {[
              { icon: Shield,      label: "Approval Queue nativa" },
              { icon: Lock,        label: "JWT + PBKDF2 + Helmet" },
              { icon: FileText,    label: "Audit log imutável" },
              { icon: RefreshCw,   label: "Multi-DB: SQLite/Supabase/Firebase" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon className="size-3 text-primary" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Hero visual — terminal card */}
        <div className="relative z-10 mt-20 w-full max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-[0_0_80px_rgba(140,43,238,0.12)]">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/70" />
                <span className="size-3 rounded-full bg-amber-500/70" />
                <span className="size-3 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono">VibeFlow — Command Center</span>
              </div>
              <Link to="/command" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                Abrir Tela Cheia <ExternalLink className="size-3" />
              </Link>
            </div>
            {/* Fake UI */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[220px]">
              {/* Sidebar mini */}
              <div className="hidden md:flex flex-col gap-2">
                {[
                  { label: "Dashboard", path: "/dashboard" },
                  { label: "Agent Hub", path: "/agents" },
                  { label: "Command Center", path: "/command" },
                  { label: "MCP Gateway", path: "/mcp" },
                  { label: "Approvals", path: "/approvals" },
                  { label: "Audit Logs", path: "/audit" }
                ].map((item, i) => (
                  <Link key={item.label} to={item.path} className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${i === 2 ? "bg-primary/20 text-primary" : "text-slate-500 hover:text-slate-300"}`}>
                    <span className="size-1.5 rounded-full bg-current opacity-60" />
                    {item.label}
                  </Link>
                ))}
              </div>
              {/* Chat area */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="size-7 rounded-full bg-gradient-to-br from-primary to-fuchsia-600 flex items-center justify-center text-[10px] font-bold shrink-0">AI</div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-slate-300 leading-relaxed max-w-xs">
                    Analisei os 47 leads da semana. 12 estão prontos para abordagem. Quer que eu crie um rascunho de e-mail para cada um?
                    <span className="ml-1 inline-block size-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/20 border border-primary/20 rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-white max-w-xs">
                    Sim, mas preciso aprovar cada e-mail antes de enviar.
                  </div>
                  <div className="size-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">Eu</div>
                </div>
                {/* Approval toast */}
                <div className="mt-2 flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                  <CheckSquare className="size-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-300">Aprovação necessária</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">12 e-mails aguardam sua confirmação na Approval Queue</p>
                  </div>
                  <Link to="/approvals" className="ml-auto text-[11px] text-amber-400 font-bold whitespace-nowrap hover:text-amber-300 transition-colors">Revisar →</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Glow below card */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/20 blur-3xl rounded-full" />
        </div>

        {/* Scroll cue */}
        <a href="#showcase" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors animate-bounce">
          <ChevronDown className="size-5" />
        </a>
      </section>

      {/* ─────────────── SHOWCASE GALERIA DE TELAS (NOVA SEÇÃO) ─────────────── */}
      <section id="showcase" className="py-24 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
              <Sparkles className="size-3" /> GALERIA INTERATIVA DA APLICAÇÃO
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
              Explore Cada Tela do Projeto
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base">
              Navegue diretamente pelas páginas reais do VibeFlow para avaliar o design, a arquitetura e a qualidade do código antes de adquirir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseScreens.map((screen) => {
              const ScreenIcon = screen.icon;
              return (
                <div
                  key={screen.path}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Ambient Glow */}
                  <div className="absolute -top-12 -right-12 size-36 bg-gradient-to-br from-primary/10 to-fuchsia-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`size-12 rounded-2xl bg-gradient-to-br ${screen.color} flex items-center justify-center text-white shadow-lg ${screen.shadow} group-hover:scale-110 transition-transform duration-300`}>
                        <ScreenIcon className="size-6" />
                      </div>
                      <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                        {screen.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {screen.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {screen.desc}
                    </p>
                  </div>

                  <Link
                    to={screen.path}
                    className="w-full py-3 bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-primary/30"
                  >
                    Navegar para a Tela
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── PROBLEM ─────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/8 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-red-400 tracking-widest uppercase mb-4">O Problema</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            IA sem controle é um risco que<br className="hidden sm:block" /> sua empresa não pode correr
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-14 text-lg">
            Agentes autônomos que agem sem supervisão geram erros custosos, violações de compliance e desconfiança interna.
            O resultado: toda a produtividade prometida fica na gaveta, por medo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Sem rastreabilidade", desc: "Ações acontecem sem registro. Impossível auditar, debugar ou provar conformidade quando o regulador bater na porta.", color: "border-red-800/40 bg-red-950/20" },
              { title: "Sem supervisão", desc: "Agentes acessam CRMs, bancos e APIs sem aprovação. Um comando errado pode custar contratos, dados ou reputação.", color: "border-orange-800/40 bg-orange-950/20" },
              { title: "Sem confiança", desc: "Sua equipe não confia na IA — então não usa. Todo o investimento e potencial ficam desperdiçados.", color: "border-amber-800/40 bg-amber-950/20" },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border ${item.color} p-6 text-left`}>
                <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                  <X className="size-5 text-red-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FEATURES ─────────────── */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Produto</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">Tudo que você precisa,<br className="hidden sm:block" /> nada que você não precisa</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Seis módulos integrados que transformam a forma como sua equipe opera com inteligência artificial.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute -top-10 -right-10 size-40 bg-gradient-to-br ${f.color} opacity-10 blur-3xl rounded-full`} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`size-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg ${f.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className="size-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 border border-white/10 rounded-full px-2.5 py-1 bg-white/5">{f.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── AGENTS ─────────────── */}
      <section id="agents" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/4 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Agentes</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">Sua equipe digital,<br className="hidden sm:block" /> pronta para trabalhar</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Cada agente tem identidade, memória persistente, capacidades específicas e acesso auditado a ferramentas externas.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((a) => (
              <div key={a.name} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`size-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                    <a.icon className="size-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-white">{a.name}</h3>
                      <StatusDot status={a.status} />
                    </div>
                    <p className="text-xs text-slate-400">{a.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {a.cap.map(c => (
                    <span key={c} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-slate-400">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            + Crie agentes customizados com qualquer papel, persona e capacidades
          </p>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section id="how" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Como funciona</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">Do zero aos agentes rodando<br className="hidden sm:block" /> em menos de 10 minutos</h2>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.n} className={`flex gap-6 lg:gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                    <div className={`inline-flex items-center gap-2 mb-3 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <span className="text-xs font-black text-primary/60 font-mono">{step.n}</span>
                      <div className="h-px w-8 bg-primary/30" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="size-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary/20 to-fuchsia-600/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10 z-10">
                    <step.icon className="size-7 text-primary" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="py-24 relative" ref={statsRef.ref}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map(s => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix ?? ""} label={s.label} start={statsRef.inView} />
            ))}
          </div>
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className={`size-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PRICING ─────────────── */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Preços</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">Simples, transparente,<br className="hidden sm:block" /> sem surpresas</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Comece grátis. Escale quando precisar. Cancele quando quiser.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                  plan.featured
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent shadow-[0_0_60px_rgba(140,43,238,0.15)] scale-[1.03]"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-fuchsia-600 rounded-full text-[11px] font-bold text-white shadow-lg">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-400">{plan.period}</span>}
                </div>
                <p className="text-xs text-slate-500 mt-1.5 mb-6">{plan.desc}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="size-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/dashboard"
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.featured
                      ? "bg-gradient-to-r from-primary to-fuchsia-600 text-white hover:opacity-90 shadow-lg shadow-primary/20"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta} <ArrowRight className="size-3.5" />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-600 mt-8">
            Todos os planos incluem atualizações · Sem lock-in · Cancele a qualquer momento
          </p>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Dúvidas</p>
            <h2 className="text-3xl sm:text-4xl font-black">Perguntas frequentes</h2>
          </div>
          <div className="space-y-3">
            {faq.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        {/* Glow center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-primary/15 blur-3xl rounded-full" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8">
            <Sparkles className="size-3" /> Pronto para testar?
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Explore todo o sistema,<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent"> navegue ao vivo pelas telas.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Acesse a galeria interativa para navegar pelas páginas de Dashboard, Agentes, Fila de Aprovação, Auditoria, White-Label e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#showcase"
              className="group px-10 py-4 bg-gradient-to-r from-primary to-fuchsia-600 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-[0_0_50px_rgba(140,43,238,0.4)] flex items-center gap-2"
            >
              Ver Galeria de Telas
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/dashboard" className="px-10 py-4 text-slate-300 hover:text-white font-medium transition-colors flex items-center gap-2">
              Ir para o Dashboard <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="size-7 bg-gradient-to-br from-primary to-fuchsia-600 rounded-lg flex items-center justify-center">
                <Sparkles className="size-3.5 text-white" />
              </div>
              <span className="font-black tracking-tight">Vibe<span className="text-primary">Flow</span></span>
            </div>
            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { icon: Code, label: "GitHub" },
                { icon: Mail, label: "Email" },
                { icon: Layers, label: "AI Studio" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} aria-label={label} className="size-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-primary/30 hover:bg-white/10 transition-all">
                  <Icon className="size-3.5" />
                </button>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© 2026 VibeFlow. Todos os direitos reservados. Produto Showcase para Venda de Código.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Workflow className="size-3 text-primary" /> Powered by Google Gemini</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="size-3 text-emerald-500" /> Feito com cuidado</span>
            </div>
          </div>
        </div>
      </footer>

      <CodePurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </div>
  );
}
