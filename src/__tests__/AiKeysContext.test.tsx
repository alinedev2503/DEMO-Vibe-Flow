import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AiKeysProvider, useAiKeys } from "../contexts/AiKeysContext";
import React from "react";

describe("AiKeysContext - BYOK & Limite de Demonstração (2 execuções)", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  function renderAiKeysHook() {
    return renderHook(() => useAiKeys(), {
      wrapper: ({ children }: { children: React.ReactNode }) =>
        React.createElement(AiKeysProvider, null, children),
    });
  }

  it("deve iniciar em modo demonstração com 2 execuções disponíveis quando não houver chave salva", () => {
    const { result } = renderAiKeysHook();

    expect(result.current.isByokActive).toBe(false);
    expect(result.current.demoRunsUsed).toBe(0);
    expect(result.current.maxDemoRuns).toBe(2);
    expect(result.current.remainingDemoRuns).toBe(2);
    expect(result.current.canUseDemo).toBe(true);
  });

  it("deve consumir execuções de demonstração e travar ao atingir o limite de 2", () => {
    const { result } = renderAiKeysHook();

    // 1ª execução de demonstração
    let allowed1 = false;
    act(() => {
      allowed1 = result.current.consumeDemoRun();
    });
    expect(allowed1).toBe(true);
    expect(result.current.demoRunsUsed).toBe(1);
    expect(result.current.remainingDemoRuns).toBe(1);
    expect(result.current.canUseDemo).toBe(true);

    // 2ª execução de demonstração
    let allowed2 = false;
    act(() => {
      allowed2 = result.current.consumeDemoRun();
    });
    expect(allowed2).toBe(true);
    expect(result.current.demoRunsUsed).toBe(2);
    expect(result.current.remainingDemoRuns).toBe(0);
    expect(result.current.canUseDemo).toBe(false);

    // 3ª tentativa deve ser bloqueada e disparar abertura da modal de BYOK
    let allowed3 = true;
    act(() => {
      allowed3 = result.current.consumeDemoRun();
    });
    expect(allowed3).toBe(false);
    expect(result.current.isKeyModalOpen).toBe(true);
  });

  it("deve ativar BYOK quando o usuário salva uma chave e liberar uso ilimitado", () => {
    const { result } = renderAiKeysHook();

    act(() => {
      result.current.saveKey("gemini", "AIzaSyTestApiKey1234567890");
    });

    expect(result.current.isByokActive).toBe(true);
    expect(result.current.keys.gemini).toBe("AIzaSyTestApiKey1234567890");

    // Mesmo com demoRunsUsed no limite, com BYOK o consumo é sempre permitido
    let allowed = false;
    act(() => {
      allowed = result.current.consumeDemoRun();
    });
    expect(allowed).toBe(true);
  });

  it("permite resetar contador de demonstração para testes", () => {
    const { result } = renderAiKeysHook();

    act(() => {
      result.current.consumeDemoRun();
    });
    act(() => {
      result.current.consumeDemoRun();
    });
    expect(result.current.demoRunsUsed).toBe(2);

    act(() => {
      result.current.resetDemoRuns();
    });
    expect(result.current.demoRunsUsed).toBe(0);
    expect(result.current.remainingDemoRuns).toBe(2);
  });
});
