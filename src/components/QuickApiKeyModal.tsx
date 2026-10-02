import { useState, useEffect } from "react";
import { 
  Key, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  Eye, 
  EyeOff, 
  X, 
  Cpu, 
  Zap, 
  Lock, 
  AlertCircle,
  Code2,
  RefreshCw
} from "lucide-react";
import { useAiKeys, AI_PROVIDERS, type AiProvider } from "@/contexts/AiKeysContext";
import { useToast } from "@/contexts/ToastContext";
import { CodePurchaseModal } from "./CodePurchaseModal";

interface QuickApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function QuickApiKeyModal({
  isOpen,
  onClose,
  title,
  description,
}: QuickApiKeyModalProps) {
  const { 
    keys, 
    activeProvider, 
    setActiveProvider, 
    saveKey, 
    testConnection, 
    demoRunsUsed, 
    maxDemoRuns,
    isByokActive 
  } = useAiKeys();
  const { toast } = useToast();

  const [selectedProvider, setSelectedProvider] = useState<AiProvider>(activeProvider);
  const [keyValue, setKeyValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedProvider(activeProvider);
      setKeyValue(keys[activeProvider] || "");
      setTestResult(null);
    }
  }, [isOpen, activeProvider, keys]);

  const handleProviderChange = (p: AiProvider) => {
    setSelectedProvider(p);
    setKeyValue(keys[p] || "");
    setTestResult(null);
  };

  const handleTest = async () => {
    if (!keyValue.trim()) {
      setTestResult({
        success: false,
        message: "Digite ou cole uma chave de API antes de testar.",
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testConnection(selectedProvider, keyValue.trim());
      setTestResult(res);
      if (res.success) {
        toast(`Conexão com ${AI_PROVIDERS[selectedProvider].name} validada com sucesso!`, "success");
      }
    } catch {
      setTestResult({
        success: false,
        message: "Erro inesperado ao testar conexão.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const trimmed = keyValue.trim();
    if (!trimmed) {
      toast("Por favor, forneça uma chave de API válida.", "error");
      return;
    }

    saveKey(selectedProvider, trimmed);
    if (selectedProvider !== activeProvider) {
      setActiveProvider(selectedProvider);
    }

    toast(`Chave de API ${AI_PROVIDERS[selectedProvider].name} ativada!`, "success");
    onClose();
  };

  if (!isOpen) return null;

  const currentProviderInfo = AI_PROVIDERS[selectedProvider];
  const isLimitReached = !isByokActive && demoRunsUsed >= maxDemoRuns;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isLimitReached) onClose();
        }}
      >
        <div 
          className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-primary/20 my-8 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 size-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-60 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button (only when limit not strictly locking or allowed to cancel) */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="size-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="size-11 rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
              <Key className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {title || (isLimitReached ? "Limite de Teste Gratuito Atingido" : "Configurar Chave de API")}
                </h3>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Modelo BYOK (Bring Your Own Key)
              </span>
            </div>
          </div>

          {/* Limit Notice if applicable */}
          {isLimitReached ? (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-300 block mb-1">Você utilizou seus 2 testes de demonstração gratuitos.</strong>
                Para continuar interagindo e orquestrando agentes autônomos sem limites e com total privacidade, insira sua própria chave de API (Google AI Studio gratuita, OpenAI ou Claude) ou adquira o código-fonte do SaaS.
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              {description || "O VibeFlow é 100% agnóstico e seguro. Ao inserir sua própria chave de API, você utiliza o app com custo zero na plataforma e controle total das suas cotas."}
            </p>
          )}

          {/* Provider Tabs */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Selecione o Provedor de IA
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["gemini", "openai", "anthropic"] as AiProvider[]).map((p) => {
                const info = AI_PROVIDERS[p];
                const isSelected = selectedProvider === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleProviderChange(p)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[70px] ${
                      isSelected
                        ? "bg-primary/15 border-primary text-white shadow-md shadow-primary/20"
                        : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold truncate">{info.name.split(" ")[0]}</span>
                      {info.recommended && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                          Grátis
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 truncate mt-1">
                      {info.id === "gemini" ? "Gemini 3 & Flash" : info.id === "openai" ? "GPT-4o / Mini" : "Claude 3.5"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Provider Details & Quick Link */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200">
                {currentProviderInfo.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {currentProviderInfo.pricingInfo}
              </p>
            </div>
            <a
              href={currentProviderInfo.consoleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-xs font-bold transition-colors shrink-0"
              title="Criar chave gratuita no console oficial"
            >
              <span>Obter Chave</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {/* API Key Input */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Sua Chave de API ({currentProviderInfo.name})
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={keyValue}
                onChange={(e) => {
                  setKeyValue(e.target.value);
                  setTestResult(null);
                }}
                placeholder={currentProviderInfo.placeholder}
                className="w-full pl-4 pr-24 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg"
                  title={showPassword ? "Ocultar chave" : "Mostrar chave"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Lock className="size-3" /> Armazenada de forma isolada e segura apenas no seu navegador.
            </p>
          </div>

          {/* Test Result Message */}
          {testResult && (
            <div className={`mb-5 p-3.5 rounded-2xl text-xs flex items-start gap-2.5 border ${
              testResult.success 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}>
              {testResult.success ? (
                <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">
                {testResult.message}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting || !keyValue.trim()}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  <span>Validando...</span>
                </>
              ) : (
                <>
                  <Zap className="size-3.5 text-amber-400" />
                  <span>Testar Conexão</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!keyValue.trim()}
              className="w-full sm:flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-primary to-fuchsia-600 hover:opacity-95 text-white text-xs font-bold transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="size-4" />
              <span>Salvar e Ativar Chave</span>
            </button>
          </div>

          {/* Alternative: Acquire Code */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>Quer a solução pronta para sua equipe ou clientes?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                setShowPurchaseModal(true);
              }}
              className="text-primary hover:underline font-bold inline-flex items-center gap-1"
            >
              <Code2 className="size-3.5" />
              <span>Adquirir Código do SaaS</span>
            </button>
          </div>
        </div>
      </div>

      {showPurchaseModal && (
        <CodePurchaseModal 
          isOpen={showPurchaseModal} 
          onClose={() => setShowPurchaseModal(false)} 
        />
      )}
    </>
  );
}
