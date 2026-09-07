import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  CreditCard,
  Headphones,
  ExternalLink,
  Bot,
  Activity,
  Cpu,
  Clock,
  Layers,
  KeyRound,
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../lib/sound';

export const LockScreen: React.FC = () => {
  const { 
    loginWithGoogle, 
    loginWithMicrosoft, 
    loginWithEmail, 
    isLoading 
  } = useAuth();

  // Se o cliente vem do link do e-mail pós-compra do Kiwify (ex: ?auth=true ou ?login=true ou ?email=...)
  const [showBuyerLogin, setShowBuyerLogin] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Detecta se o cliente clicou no link de entrega enviado pelo Kiwify
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') || params.get('login') || params.get('access') || params.get('email')) {
      setShowBuyerLogin(true);
      if (params.get('email')) {
        setEmail(params.get('email') || '');
      }
    }
  }, []);

  const handleBuyerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Por favor, informe o e-mail da sua compra no Kiwify.');
      sounds.playWarning();
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password || 'kiwify123');
    } catch (err: any) {
      setError('Falha ao autenticar acesso.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialBuyerLogin = async (provider: 'google' | 'microsoft') => {
    if (!email || !email.includes('@')) {
      setError('Digite seu e-mail no campo acima antes de conectar.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (provider === 'google') {
        await loginWithGoogle(email, name || undefined);
      } else {
        await loginWithMicrosoft(email, name || undefined);
      }
    } catch (err) {
      setError('Falha na autenticação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02050e] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Glows & Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,242,254,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09183415_1px,transparent_1px),linear-gradient(to_bottom,#09183415_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-cyan-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-rajdhani text-xl font-bold tracking-wider text-white">
              M&S CONSULTORIA
            </h1>
            <p className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
              JARVES AI PROTOCOL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono font-semibold">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
            <span>SISTEMA BLOQUEADO</span>
          </div>

          <a
            href="https://pay.kiwify.com.br/YriEkod"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-rajdhani font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all flex items-center gap-2"
          >
            <span>Adquirir Licença (R$ 29)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Top Notification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
          <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>ÁREA EXCLUSIVA PARA CLIENTES COM LICENÇA KIWIFY</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-3xl space-y-4 mb-8">
          <h2 className="text-4xl sm:text-6xl font-black font-rajdhani text-white leading-tight tracking-wide">
            DESPERTE O PODER DO <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,242,254,0.3)]">
              JARVES NEURAL AI
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            O ecossistema definitivo de Inteligência Artificial com <strong>Voz Neural em Tempo Real</strong>, saudações automáticas por horário, gestão de produtividade e controle de tarefas para o seu dia a dia.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-left">
          <div className="p-4 rounded-2xl bg-[#040a1c]/80 border border-cyan-500/20 backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-rajdhani">Voz Neural 3D</h4>
            <p className="text-xs text-slate-400">Conversação fluida por voz com fala e escuta em tempo real.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#040a1c]/80 border border-cyan-500/20 backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-rajdhani">Saudação por Horário</h4>
            <p className="text-xs text-slate-400">Identificação de Bom dia, Boa tarde e Boa noite automática.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#040a1c]/80 border border-cyan-500/20 backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-rajdhani">Cota Diária 200 req</h4>
            <p className="text-xs text-slate-400">Estabilidade máxima e modelos LLaMA 3.3 e Gemini Flash.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#040a1c]/80 border border-cyan-500/20 backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-rajdhani">Gestão & Hábitos</h4>
            <p className="text-xs text-slate-400">Controle completo de tarefas, rotina financeira e metas diárias.</p>
          </div>
        </div>

        {/* Pricing & Kiwify Checkout Showcase */}
        <div className="w-full max-w-2xl p-8 rounded-3xl bg-gradient-to-b from-[#07173a] to-[#03091c] border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(0,242,254,0.2)] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
              LICENÇA DE ACESSO EXCLUSIVA
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl sm:text-6xl font-black font-rajdhani text-white">R$ 29,00</span>
              <span className="text-sm text-slate-400 font-mono">/ mês</span>
            </div>
            <p className="text-xs text-slate-300">
              Acesso completo liberado instantaneamente após a confirmação do pagamento via PIX ou Cartão.
            </p>
          </div>

          {/* MAIN BUY BUTTON */}
          <a
            href="https://pay.kiwify.com.br/YriEkod"
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-rajdhani font-black text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <CreditCard className="w-6 h-6" />
            <span>ASSINAR AGORA NO KIWIFY (R$ 29/MÊS)</span>
            <ArrowRight className="w-6 h-6" />
          </a>

          {/* Security Badges */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Checkout 100% Seguro Kiwify</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Garantia Incondicional 7 Dias</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Liberação Imediata</span>
            </span>
          </div>

          {/* How Access Works Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left text-xs text-slate-400 space-y-1">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Como você receberá o seu acesso?</span>
            </p>
            <p>
              Assim que o seu pagamento for aprovado no Kiwify, você receberá automaticamente um e-mail de boas-vindas com o seu link exclusivo de ativação para entrar no seu JARVES!
            </p>
          </div>
        </div>

        {/* Buyer Email Activation Trigger (Discreet footer link for customers arriving via Kiwify email) */}
        <div className="mt-8">
          <button
            onClick={() => setShowBuyerLogin(!showBuyerLogin)}
            className="text-xs text-slate-500 hover:text-cyan-400 font-mono transition-colors underline"
          >
            {showBuyerLogin ? 'Ocultar ativação manual' : 'Já comprou e recebeu o e-mail do Kiwify? Clique para ativar seu acesso'}
          </button>
        </div>

        {/* Modal de Ativação do Comprador (Apenas abre se a pessoa veio com o e-mail ou clicou no link pós-venda) */}
        {showBuyerLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#040817] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,242,254,0.2)] text-left relative">
              <button 
                onClick={() => setShowBuyerLogin(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
              >
                ✕
              </button>

              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani text-white">
                  ATIVAÇÃO DO SEU JARVES
                </h3>
                <p className="text-xs text-slate-400">
                  Informe o mesmo e-mail cadastrado na sua compra do Kiwify para entrar.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleBuyerLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    SEU NOME COMPLETO
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Silva"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    E-MAIL UTILIZADO NA COMPRA (KIWIFY)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-rajdhani font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Verificando...' : 'ENTRAR NO MEU PAINEL'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSocialBuyerLogin('google')}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium hover:border-cyan-400 transition-all text-center"
                >
                  Conectar com Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialBuyerLogin('microsoft')}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium hover:border-cyan-400 transition-all text-center"
                >
                  Conectar com Microsoft
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 M&S Consultoria. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Kiwify Checkout Oficial</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-cyan-400" />
            <span>Suporte: mesconsultoria@gmail.com</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
