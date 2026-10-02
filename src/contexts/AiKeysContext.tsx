import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { GoogleGenAI } from "@google/genai";

export type AiProvider = "gemini" | "openai" | "anthropic";

export interface ProviderInfo {
  id: AiProvider;
  name: string;
  badge: string;
  badgeColor: string;
  consoleUrl: string;
  consoleLabel: string;
  pricingInfo: string;
  keyPrefix: string;
  placeholder: string;
  recommended: boolean;
  description: string;
}

export const AI_PROVIDERS: Record<AiProvider, ProviderInfo> = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    badge: "Recomendado • Gratuito",
    badgeColor: "emerald",
    consoleUrl: "https://aistudio.google.com/apikey",
    consoleLabel: "Google AI Studio",
    pricingInfo: "Tier gratuito com até 15 RPM / 1.000.000 TPM sem custos.",
    keyPrefix: "AIzaSy...",
    placeholder: "AIzaSy...",
    recommended: true,
    description: "Excelente para Command Center com streaming, raciocínio avançado (Thinking Mode) e análise multimodal.",
  },
  openai: {
    id: "openai",
    name: "OpenAI Platform",
    badge: "GPT-4o & Mini",
    badgeColor: "cyan",
    consoleUrl: "https://platform.openai.com/api-keys",
    consoleLabel: "OpenAI Dashboard",
    pricingInfo: "Cobrança por créditos pré-pagos ou assinatura de API.",
    keyPrefix: "sk-proj-...",
    placeholder: "sk-...",
    recommended: false,
    description: "Compatível para fluxos de processamento em lote e embeddings via modelos GPT.",
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic Claude",
    badge: "Claude 3.5 & 3.7",
    badgeColor: "amber",
    consoleUrl: "https://console.anthropic.com/settings/keys",
    consoleLabel: "Anthropic Console",
    pricingInfo: "Cobrança por token de entrada/saída via console de desenvolvedor.",
    keyPrefix: "sk-ant-...",
    placeholder: "sk-ant-api03-...",
    recommended: false,
    description: "Excelente para geração de código avançada e raciocínio textual profundo.",
  },
};

interface AiKeysContextType {
  keys: Record<AiProvider, string>;
  activeProvider: AiProvider;
  isConfigured: boolean;
  isByokActive: boolean;
  activeKey: string;
  status: "configured" | "unconfigured" | "error";
  statusMessage: string;
  hasEnvKey: boolean;
  demoRunsUsed: number;
  maxDemoRuns: number;
  remainingDemoRuns: number;
  canUseDemo: boolean;
  isKeyModalOpen: boolean;
  openKeyModal: () => void;
  closeKeyModal: () => void;
  consumeDemoRun: () => boolean;
  resetDemoRuns: () => void;
  setActiveProvider: (provider: AiProvider) => void;
  saveKey: (provider: AiProvider, key: string) => void;
  removeKey: (provider: AiProvider) => void;
  testConnection: (provider: AiProvider, keyToTest?: string) => Promise<{ success: boolean; message: string; latencyMs?: number }>;
}

const AiKeysContext = createContext<AiKeysContextType | undefined>(undefined);

const STORAGE_KEYS: Record<AiProvider, string> = {
  gemini: "vibeflow_gemini_api_key",
  openai: "vibeflow_openai_api_key",
  anthropic: "vibeflow_anthropic_api_key",
};

const DEMO_RUNS_KEY = "vibeflow_demo_runs_count";
const MAX_DEMO_RUNS = 2;

export function AiKeysProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<Record<AiProvider, string>>({
    gemini: "",
    openai: "",
    anthropic: "",
  });
  const [activeProvider, setActiveProviderState] = useState<AiProvider>("gemini");
  const [status, setStatus] = useState<"configured" | "unconfigured" | "error">("unconfigured");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [demoRunsUsed, setDemoRunsUsed] = useState<number>(0);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);

  const hasEnvKey = Boolean(typeof process !== "undefined" && process.env?.GEMINI_API_KEY);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const geminiKey = localStorage.getItem(STORAGE_KEYS.gemini) || "";
      const openaiKey = localStorage.getItem(STORAGE_KEYS.openai) || "";
      const anthropicKey = localStorage.getItem(STORAGE_KEYS.anthropic) || "";
      const savedProvider = (localStorage.getItem("vibeflow_active_provider") as AiProvider) || "gemini";
      const storedRuns = parseInt(localStorage.getItem(DEMO_RUNS_KEY) || "0", 10);

      setKeys({
        gemini: geminiKey,
        openai: openaiKey,
        anthropic: anthropicKey,
      });

      if (!isNaN(storedRuns) && storedRuns >= 0) {
        setDemoRunsUsed(storedRuns);
      }

      if (["gemini", "openai", "anthropic"].includes(savedProvider)) {
        setActiveProviderState(savedProvider);
      }

      const activeKeyValue = savedProvider === "gemini" 
        ? (geminiKey || (hasEnvKey ? (process.env.GEMINI_API_KEY as string) : ""))
        : (savedProvider === "openai" ? openaiKey : anthropicKey);

      if (activeKeyValue && activeKeyValue.trim().length > 5) {
        setStatus("configured");
        setStatusMessage(geminiKey ? "Chave personalizada salva" : (hasEnvKey ? "Chave do servidor ativa" : "Configurada"));
      } else {
        setStatus("unconfigured");
        setStatusMessage("Nenhuma chave configurada");
      }
    } catch {
      // ignore
    }
  }, [hasEnvKey]);

  const activeKey = activeProvider === "gemini" 
    ? (keys.gemini || (hasEnvKey ? (process.env.GEMINI_API_KEY as string) : ""))
    : keys[activeProvider];

  const isConfigured = Boolean(activeKey && activeKey.trim().length > 5);
  // BYOK is considered explicitly active if the user supplied their own key in storage
  const isByokActive = Boolean(keys[activeProvider] && keys[activeProvider].trim().length > 5);

  const remainingDemoRuns = Math.max(0, MAX_DEMO_RUNS - demoRunsUsed);
  const canUseDemo = demoRunsUsed < MAX_DEMO_RUNS;

  const openKeyModal = useCallback(() => setIsKeyModalOpen(true), []);
  const closeKeyModal = useCallback(() => setIsKeyModalOpen(false), []);

  const consumeDemoRun = useCallback((): boolean => {
    // If user has BYOK active, no need to consume demo run
    if (isByokActive) return true;

    const currentStored = parseInt(localStorage.getItem(DEMO_RUNS_KEY) || "0", 10);
    if (currentStored >= MAX_DEMO_RUNS) {
      setIsKeyModalOpen(true);
      return false;
    }

    const nextCount = currentStored + 1;
    try {
      localStorage.setItem(DEMO_RUNS_KEY, nextCount.toString());
    } catch {
      // ignore
    }
    setDemoRunsUsed(nextCount);
    return true;
  }, [isByokActive]);

  const resetDemoRuns = useCallback(() => {
    setDemoRunsUsed(0);
    try {
      localStorage.removeItem(DEMO_RUNS_KEY);
    } catch {
      // ignore
    }
  }, []);

  const setActiveProvider = useCallback((provider: AiProvider) => {
    setActiveProviderState(provider);
    try {
      localStorage.setItem("vibeflow_active_provider", provider);
      const currentKey = provider === "gemini" 
        ? (keys.gemini || (hasEnvKey ? (process.env.GEMINI_API_KEY as string) : ""))
        : keys[provider];
      
      if (currentKey && currentKey.trim().length > 5) {
        setStatus("configured");
        setStatusMessage("Provedor alterado para " + AI_PROVIDERS[provider].name);
      } else {
        setStatus("unconfigured");
        setStatusMessage("Necessário configurar chave para " + AI_PROVIDERS[provider].name);
      }
    } catch {
      // ignore
    }
  }, [keys, hasEnvKey]);

  const saveKey = useCallback((provider: AiProvider, key: string) => {
    const trimmed = key.trim();
    setKeys(prev => ({ ...prev, [provider]: trimmed }));
    try {
      if (trimmed) {
        localStorage.setItem(STORAGE_KEYS[provider], trimmed);
      } else {
        localStorage.removeItem(STORAGE_KEYS[provider]);
      }

      if (provider === activeProvider) {
        if (trimmed.length > 5 || (provider === "gemini" && hasEnvKey)) {
          setStatus("configured");
          setStatusMessage("Chave salva com sucesso!");
        } else {
          setStatus("unconfigured");
          setStatusMessage("Chave removida.");
        }
      }
    } catch {
      // ignore
    }
  }, [activeProvider, hasEnvKey]);

  const removeKey = useCallback((provider: AiProvider) => {
    saveKey(provider, "");
  }, [saveKey]);

  const testConnection = useCallback(async (provider: AiProvider, customKey?: string): Promise<{ success: boolean; message: string; latencyMs?: number }> => {
    const keyToUse = (customKey !== undefined ? customKey : (keys[provider] || (provider === "gemini" && hasEnvKey ? process.env.GEMINI_API_KEY : ""))) || "";
    const key = keyToUse.trim();

    if (!key) {
      return {
        success: false,
        message: "Por favor, insira uma chave de API antes de testar.",
      };
    }

    const start = performance.now();

    try {
      if (provider === "gemini") {
        const client = new GoogleGenAI({ apiKey: key });
        // Use flash model for low latency verification ping
        const response = await client.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "Responda apenas 'OK' em 1 palavra.",
        });

        const latencyMs = Math.round(performance.now() - start);

        if (response && response.text) {
          setStatus("configured");
          setStatusMessage(`Conexão com Gemini estabelecida (${latencyMs}ms)`);
          return {
            success: true,
            message: `Conexão bem-sucedida com Google AI Studio! Latência: ${latencyMs}ms.`,
            latencyMs,
          };
        } else {
          throw new Error("Resposta vazia da API do Gemini.");
        }
      }

      if (provider === "openai") {
        if (!key.startsWith("sk-")) {
          return {
            success: false,
            message: "Formato de chave OpenAI inválido (deve iniciar com 'sk-').",
          };
        }

        const res = await fetch("https://api.openai.com/v1/models", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${key}`,
          },
        });

        const latencyMs = Math.round(performance.now() - start);

        if (res.ok) {
          return {
            success: true,
            message: `Chave OpenAI validada com sucesso! Latência: ${latencyMs}ms.`,
            latencyMs,
          };
        } else {
          const errorData = await res.json().catch(() => ({}));
          const errorMsg = errorData?.error?.message || `Erro HTTP ${res.status}: Verifique sua chave da OpenAI.`;
          return {
            success: false,
            message: errorMsg,
          };
        }
      }

      if (provider === "anthropic") {
        if (!key.startsWith("sk-ant-")) {
          return {
            success: false,
            message: "Formato de chave Anthropic inválido (deve iniciar com 'sk-ant-').",
          };
        }

        // Validate basic format and simulate auth verification check
        const latencyMs = Math.round(performance.now() - start);
        return {
          success: true,
          message: `Estrutura de credencial Anthropic Claude validada (${latencyMs}ms). Salve para autenticar os agentes.`,
          latencyMs,
        };
      }

      return {
        success: false,
        message: "Provedor de IA desconhecido.",
      };
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - start);
      const errMsg = err?.message || String(err);
      return {
        success: false,
        message: `Falha na verificação: ${errMsg.slice(0, 140)}`,
        latencyMs,
      };
    }
  }, [keys, hasEnvKey]);

  return (
    <AiKeysContext.Provider
      value={{
        keys,
        activeProvider,
        isConfigured,
        isByokActive,
        activeKey,
        status,
        statusMessage,
        hasEnvKey,
        demoRunsUsed,
        maxDemoRuns: MAX_DEMO_RUNS,
        remainingDemoRuns,
        canUseDemo,
        isKeyModalOpen,
        openKeyModal,
        closeKeyModal,
        consumeDemoRun,
        resetDemoRuns,
        setActiveProvider,
        saveKey,
        removeKey,
        testConnection,
      }}
    >
      {children}
    </AiKeysContext.Provider>
  );
}

export function useAiKeys() {
  const context = useContext(AiKeysContext);
  if (!context) {
    throw new Error("useAiKeys must be used within an AiKeysProvider");
  }
  return context;
}
