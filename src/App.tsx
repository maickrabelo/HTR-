import React, { useState, useRef } from 'react';
import {
  Activity,
  Headphones,
  Lock,
  Send,
  CheckCircle2,
  HeartHandshake,
  ExternalLink,
  FileText,
  AlertCircle
} from 'lucide-react';

const REPORT_URL = 'https://soia.app.br/report/associacao-da-casa-da-dialise';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [showEscutaModal, setShowEscutaModal] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Form state for Canal de Escuta
  const [escutaType, setEscutaType] = useState('acolhimento');
  const [escutaMessage, setEscutaMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [escutaProtocol, setEscutaProtocol] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-slate-100 font-sans select-none overflow-hidden">
      {/* Top Header - Clean & Minimalist */}
      <header className="flex-none bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Title & Brand */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm sm:text-base text-white tracking-tight truncate">
                Associação da Casa da Diálise
              </h1>
              <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Relatório SOIA • Riscos Psicossociais NR-01
              </p>
            </div>
          </div>

          {/* Right Action: CANAL DE ESCUTA */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                setEscutaProtocol(null);
                setShowEscutaModal(true);
              }}
              className="group inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-xs font-bold tracking-wide uppercase bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 hover:border-emerald-400 transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
              title="Acessar Canal de Escuta & Acolhimento"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Headphones className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>CANAL DE ESCUTA</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area: 100% Fluid Embed */}
      <main className="flex-1 relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm pointer-events-none">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-cyan-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <p className="mt-3 text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
              Carregando relatório SOIA...
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Associação da Casa da Diálise
            </p>
          </div>
        )}

        {/* Fallback Warning banner if taking long or blocked */}
        {hasError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 max-w-md w-full mx-4 bg-amber-950/90 border border-amber-800/80 text-amber-200 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-amber-100">
                Problema ao exibir o relatório embutido?
              </p>
              <p className="text-amber-300/90 leading-relaxed">
                Alguns navegadores com bloqueadores podem limitar frames externos. Você pode abrir o relatório diretamente no SOIA.
              </p>
              <div className="pt-2 flex gap-2">
                <a
                  href={REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Abrir link direto
                </a>
                <button
                  type="button"
                  onClick={handleReload}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full-width Responsive Iframe */}
        <div className="relative w-full h-full flex items-center justify-center">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={REPORT_URL}
            title="Relatório SOIA - Associação da Casa da Diálise"
            className={`w-full h-full border-0 bg-white transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            allow="fullscreen; clipboard-read; clipboard-write; display-capture"
            loading="eager"
            onLoad={() => {
              setIsLoading(false);
            }}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </div>
      </main>

      {/* Modal: Canal de Escuta & Acolhimento */}
      {showEscutaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-900/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-left my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-950/90 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Canal de Escuta & Acolhimento
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <Lock className="w-3 h-3" /> 100% Confidencial
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Associação da Casa da Diálise • Gestão de Riscos NR-01
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEscutaModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            {escutaProtocol ? (
              <div className="space-y-4 py-2 text-center animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-950 border border-emerald-600/60 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Manifestação Registrada com Sucesso!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Sua mensagem foi recebida com total sigilo. A equipe de gestão de pessoas e saúde ocupacional cuidará deste registro de acordo com as diretrizes da NR-01.
                </p>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 inline-block text-left w-full max-w-sm">
                  <p className="text-[11px] text-slate-400">Número de Protocolo Sigiloso:</p>
                  <p className="font-mono text-base font-bold text-emerald-400 select-all tracking-wider">
                    {escutaProtocol}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Guarde este código caso deseje consultar desdobramentos futuros.
                  </p>
                </div>

                {/* Emergency note */}
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-left text-xs text-cyan-200/90 flex items-start gap-2.5">
                  <HeartHandshake className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-cyan-200">Precisa de acolhimento emocional imediato?</p>
                    <p className="text-[11px] text-cyan-300/80 mt-0.5">
                      Você pode ligar gratuitamente para o CVV (Centro de Valorização da Vida) pelo número <strong>188</strong>, disponível 24 horas por dia com apoio sigiloso.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEscutaProtocol(null);
                      setEscutaMessage('');
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    Novo Registro
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEscutaModal(false)}
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!escutaMessage.trim()) return;
                  const newProtocol = `ESC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                  setEscutaProtocol(newProtocol);
                }}
                className="space-y-4 text-xs"
              >
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed">
                  <p className="text-[11px] text-slate-400">
                    O <strong>Canal de Escuta</strong> é um espaço seguro e acolhedor para colaboradores da Associação da Casa da Diálise expressarem sentimentos, sobrecargas, relatos confidenciais ou sugestões, prevenindo riscos psicossociais.
                  </p>
                </div>

                {/* Type of manifestation */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">
                    Tipo de Manifestação
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'acolhimento', label: 'Acolhimento Psicológico' },
                      { id: 'sobrecarga', label: 'Relato de Sobrecarga / Estresse' },
                      { id: 'sugestao', label: 'Sugestão de Clima & Bem-Estar' },
                      { id: 'confidencial', label: 'Comunicação Ética / Sigilosa' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEscutaType(item.id)}
                        className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                          escutaType === item.id
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium'
                            : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">
                    Seu relato ou mensagem <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={escutaMessage}
                    onChange={(e) => setEscutaMessage(e.target.value)}
                    placeholder="Escreva livremente aqui sobre o que você está vivenciando, sentindo ou necessitando no ambiente de trabalho..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs transition-all"
                  />
                </div>

                {/* Anonymous switch */}
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className={`w-4 h-4 ${isAnonymous ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        Manter relato anônimo
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Sua identidade não será associada a este envio.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                {/* Non-anonymous fields */}
                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950/30 rounded-xl border border-slate-800 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">
                        Seu Nome (opcional)
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Nome completo"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">
                        Contato / E-mail / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="Para retorno sigiloso"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-500" />
                    Criptografia & sigilo absoluto
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEscutaModal(false)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={!escutaMessage.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-md shadow-emerald-950 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Enviar ao Canal
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
