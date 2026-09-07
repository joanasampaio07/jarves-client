import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  KeyRound, 
  CreditCard,
  Headphones,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../lib/sound';

export const LockScreen: React.FC = () => {
  const { 
    loginWithGoogle, 
    loginWithMicrosoft, 
    loginWithEmail, 
    registerWithEmail, 
    isLoading 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Por favor, informe o e-mail utilizado na sua compra.');
      sounds.playWarning();
      return;
    }

    if (!password || password.length < 4) {
      setError('Informe sua senha de acesso.');
      sounds.playWarning();
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        if (!name.trim()) {
          setError('Informe seu nome completo.');
          setIsSubmitting(false);
          return;
        }
        await registerWithEmail(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'E-mail ou senha incorretos. Verifique os dados da sua compra.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Falha ao autenticar com Google.');
    }
  };

  const handleMicrosoftAuth = async () => {
    setError(null);
    try {
      await loginWithMicrosoft();
    } catch (err) {
      setError('Falha ao autenticar com Microsoft.');
    }
  };

  return (
    <div className="min-h-screen bg-[#02050e] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Glows & Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,242,254,0.15),transparent_60%)] pointer-events-none" />
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

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono font-semibold">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
            <span>ACESSO RESTRITO</span>
          </div>

          <a
            href="https://pay.kiwify.com.br/YriEkod"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-rajdhani font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <span>Liberar Acesso (R$ 29)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Presentation & Kiwify Plan */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>SISTEMA EXCLUSIVO PARA ASSINANTES KIWIFY</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black font-rajdhani text-white leading-tight tracking-wide">
                DESPERTE O PODER DO <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">JARVES AI</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Central de Inteligência Artificial e Comando Neural com <strong>Voz em Tempo Real</strong>, saudações automáticas personalizadas, gestão de tarefas, rotina financeira e produtividade de elite.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Voz Neural 3D</h4>
                  <p className="text-[11px] text-slate-400">Interação por fala e escuta fluida</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Cota Diária 200 req</h4>
                  <p className="text-[11px] text-slate-400">Processamento ultra-rápido</p>
                </div>
              </div>
            </div>

            {/* Kiwify Price Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#061430] to-[#03091c] border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.15)] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">PLANO MENSAL OFICIAL</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black font-rajdhani text-white">R$ 29,00</span>
                    <span className="text-xs text-slate-400 font-mono">/ mês</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Liberado imediatamente via PIX ou Cartão.</p>
                </div>

                <a
                  href="https://pay.kiwify.com.br/YriEkod"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-rajdhani font-black text-sm uppercase tracking-wider text-center shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>ASSINAR AGORA NO KIWIFY</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Login Box for Existing Buyers */}
          <div className="lg:col-span-5 w-full">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#040a1c]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
              
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-1">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani text-white tracking-wide">
                  JÁ COMPROU NO KIWIFY?
                </h3>
                <p className="text-xs text-slate-400">
                  Faça login com o e-mail da sua compra para desbloquear o JARVES.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Social Login Buttons */}
              <div className="space-y-2 mb-6">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 font-medium text-xs flex items-center justify-center gap-3 transition-all hover:bg-slate-800"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Entrar com Conta Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleMicrosoftAuth}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 font-medium text-xs flex items-center justify-center gap-3 transition-all hover:bg-slate-800"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  <span>Entrar com Conta Microsoft</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-[#040a1c] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  OU COM SEU E-MAIL
                </span>
                <div className="border-t border-slate-800 w-full" />
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">SEU NOME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">E-MAIL DA COMPRA</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">SENHA</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-rajdhani font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Verificando Licença...</span>
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'ACESSAR MEU PAINEL' : 'CRIAR MEU ACESSO'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-[11px] text-cyan-400 hover:underline font-mono"
                >
                  {mode === 'login' 
                    ? 'Primeira vez aqui após a compra? Cadastre sua senha' 
                    : 'Já cadastrou sua senha? Faça login'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 M&S Consultoria. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Kiwify Checkout Seguro</span>
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
