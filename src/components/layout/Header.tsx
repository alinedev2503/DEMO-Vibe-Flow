import { Search, Bell, ShieldCheck, Home, Sparkles, Key, LogOut, User as UserIcon, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAiKeys, AI_PROVIDERS } from "../../contexts/AiKeysContext";
import { useAuth } from "../../contexts/AuthContext";
import { CodePurchaseModal } from "../CodePurchaseModal";
import { QuickApiKeyModal } from "../QuickApiKeyModal";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export function Header({ onToggleMobileMenu }: HeaderProps) {
  const { t } = useLanguage();
  const { 
    isConfigured, 
    isByokActive, 
    activeProvider, 
    openKeyModal, 
    isKeyModalOpen, 
    closeKeyModal, 
    remainingDemoRuns, 
    maxDemoRuns 
  } = useAiKeys();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <header className="h-16 border-b border-border-muted bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 lg:px-8 sticky top-0 z-20 w-full lg:ml-64 lg:w-[calc(100%-16rem)] transition-all">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Mobile / Tablet Menu Toggle */}
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              aria-label="Abrir menu de navegação"
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <Menu className="size-5" />
            </button>
          )}

          {/* Back to Showcase Button */}
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold transition-all shadow-sm shrink-0 group min-h-[36px]"
            title="Voltar para a Página Inicial / Showcase de Telas"
          >
            <Home className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Voltar ao Showcase</span>
            <span className="sm:hidden">Showcase</span>
          </Link>

          {/* AI Key Status Indicator Button */}
          <button
            type="button"
            onClick={openKeyModal}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 min-h-[36px] ${
              isByokActive
                ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-sm"
                : remainingDemoRuns > 0
                  ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 shadow-sm"
                  : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse hover:animate-none shadow-sm shadow-rose-500/10"
            }`}
            title={
              isByokActive
                ? `Chave BYOK ativa (${AI_PROVIDERS[activeProvider].name}). Clique para gerenciar.`
                : remainingDemoRuns > 0
                  ? `Modo Demonstração: ${remainingDemoRuns} de ${maxDemoRuns} testes restantes. Clique para inserir sua chave.`
                  : "Limite de demonstração atingido. Clique para inserir sua chave de API."
            }
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isByokActive ? "bg-emerald-400" : remainingDemoRuns > 0 ? "bg-amber-400" : "bg-rose-400"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isByokActive ? "bg-emerald-500" : remainingDemoRuns > 0 ? "bg-amber-500" : "bg-rose-500"
              }`}></span>
            </span>
            <Key className="size-3.5 shrink-0" />
            <span className="hidden md:inline">
              {isByokActive 
                ? `BYOK (${AI_PROVIDERS[activeProvider].name.split(" ")[0]})` 
                : remainingDemoRuns > 0 
                  ? `Demo (${remainingDemoRuns}/${maxDemoRuns})` 
                  : "Inserir Chave"}
            </span>
          </button>

          {/* Search Bar on Desktop / Tablets */}
          <div className="relative w-full max-w-xs hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-primary/5 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-xs outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500" 
              placeholder={t('header.searchPlaceholder')}
            />
          </div>
          
          {/* MCP Status pill on wide screens */}
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('header.mcpConnected')}</span>
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Prominent Buy Code CTA Button */}
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary to-fuchsia-600 hover:from-primary/90 hover:to-fuchsia-500 text-white text-xs font-black transition-all shadow-md shadow-primary/25 border border-primary/40 animate-pulse hover:animate-none hover:scale-105 min-h-[36px]"
            title="Adquira a licença comercial ou o código-fonte deste SaaS"
          >
            <Sparkles className="size-3.5 text-amber-300" />
            <span className="hidden md:inline">Adquirir Código-Fonte</span>
            <span className="md:hidden">Código</span>
          </button>

          <button className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-primary/10 rounded-lg relative transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center" title="Notificações">
            <Bell className="size-4 sm:size-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
          </button>
          
          <button className="hidden sm:flex p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-primary/10 rounded-lg transition-colors min-h-[36px] min-w-[36px] items-center justify-center" title="Segurança">
            <ShieldCheck className="size-5" />
          </button>
          
          <div className="h-6 sm:h-8 w-[1px] bg-border-muted mx-0.5 sm:mx-1"></div>
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(prev => !prev)}
              aria-label="Abrir menu de usuário"
              className="flex items-center gap-2 sm:gap-3 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left min-h-[40px]"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">
                  {user?.name || "Alex Rivera"}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {user?.role === "admin" ? t('header.platformAdmin') : user?.role === "operator" ? "Operador" : "Visualizador"}
                </p>
              </div>
              <div className="size-8 sm:size-10 rounded-full bg-gradient-to-tr from-primary to-accent-cyan p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center overflow-hidden">
                  <img 
                    src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAEDfjRXoeZlHub0rO43nIpQRONGJQ6h2fEPkYsLVlvMNaBey71u8MATZ5jqDxyIIImZE_SnNMgjcxC7OcSurkgcamBOLDmMSDp3xp-Apu2q9f0x6gHxWYv1Il4N-prkBzy1aRcd5UeWpI5EdkpCAsJpzZEA_V8eTHTVZHug4VL9QFfcVYbQp6StmtsBNwASWdWOhPh3n_8tL-aIOChx0-dCNL_pv5m6c_p_7hLgtLubHocGpu558-SPGiXOFDJdhjuh9gY8-rqjYtV"} 
                    alt="User Profile" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border-muted rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-border-muted mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || "Alex Rivera"}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email || "alex.rivera@vibeflow.ai"}</p>
                </div>

                <Link
                  to="/settings?tab=profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary transition-all min-h-[40px]"
                >
                  <UserIcon className="size-4 text-primary" />
                  <span>{t('settings.profileInfo')}</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary transition-all min-h-[40px]"
                >
                  <Key className="size-4 text-primary" />
                  <span>Configurações & Chaves</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all mt-1 min-h-[40px]"
                >
                  <LogOut className="size-4" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <CodePurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />

      <QuickApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={closeKeyModal}
      />
    </>
  );
}

