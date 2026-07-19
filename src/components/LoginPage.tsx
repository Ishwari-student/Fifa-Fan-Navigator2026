import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck, Globe, Trophy, Key, ArrowRight, User, RefreshCw } from 'lucide-react';

const footballHero = '/src/assets/images/football_login_hero_1784473015077.jpg';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; fanId: string }, lang: 'EN' | 'ES' | 'KO' | 'AR' | 'JA') => void;
  initialLanguage: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
}

export default function LoginPage({ onLogin, initialLanguage }: LoginPageProps) {
  const [name, setName] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [lang, setLang] = useState<'EN' | 'ES' | 'KO' | 'AR' | 'JA'>(initialLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const languages = [
    { code: 'EN', label: 'English', flag: '🇺🇸' },
    { code: 'ES', label: 'Español', flag: '🇦🇷' },
    { code: 'KO', label: '한국어', flag: '🇰🇷' },
    { code: 'JA', label: '日本語', flag: '🇯🇵' },
    { code: 'AR', label: 'العربية', flag: '🇪🇬' },
  ] as const;

  const t = {
    EN: {
      welcome: "FIFA Fan Navigator",
      year: "2026",
      tagline: "Your Secure Matchday Gateway",
      subtitle: "Enter your official fan identity to map stadium gates, verify ticket security, order concessions, and access safety corridors.",
      nameLabel: "Your Name",
      ticketLabel: "Ticket ID / Matchday ID",
      ticketPlaceholder: "e.g., FIFA-98421-QA",
      loginBtn: "Authenticate & Enter",
      demoBtn: "Instant VIP Demo Access",
      verifying: "Verifying Cryptographic Ledger...",
      secureBadge: "Encrypted Session",
      error: "Please enter your name and a valid Ticket ID."
    },
    ES: {
      welcome: "FIFA Fan Navigator",
      year: "2026",
      tagline: "Tu Portal Seguro para el Partido",
      subtitle: "Inicia sesión con tu identidad de hincha para localizar puertas, verificar la seguridad de tu entrada y acceder a corredores protegidos.",
      nameLabel: "Tu Nombre",
      ticketLabel: "ID de Entrada / Matchday ID",
      ticketPlaceholder: "ej., FIFA-98421-QA",
      loginBtn: "Autenticar e Ingresar",
      demoBtn: "Acceso Demo VIP al Instante",
      verifying: "Verificando Registro Criptográfico...",
      secureBadge: "Sesión Encriptada",
      error: "Por favor, ingresa tu nombre y un ID de Entrada válido."
    },
    KO: {
      welcome: "FIFA 팬 네비게이터",
      year: "2026",
      tagline: "경기장 안전 통합 관문",
      subtitle: "공식 관람객 정보를 입력하여 배정 게이트 동선, 암호화 티켓 보안 검증, 컨코스 주문 및 안심 통로 혜택을 이용하세요.",
      nameLabel: "사용자 이름",
      ticketLabel: "티켓 ID / Matchday ID",
      ticketPlaceholder: "예: FIFA-98421-QA",
      loginBtn: "인증 완료 및 입장",
      demoBtn: "가상 VIP 패스로 입장하기",
      verifying: "블록체인 인증원 검증 중...",
      secureBadge: "보안 암호화 활성",
      error: "이름과 올바른 티켓 ID를 입력해주세요."
    },
    JA: {
      welcome: "FIFAファンナビゲーター",
      year: "2026",
      tagline: "マッチデイ・セキュリティ認証ゲート",
      subtitle: "スタジアム専用入場ゲートの割り当て、防犯チケット認証、アメニティ案内、および避難誘導を受け取るため認証を行ってください。",
      nameLabel: "お名前",
      ticketLabel: "チケットID / Matchday ID",
      ticketPlaceholder: "例: FIFA-98421-QA",
      loginBtn: "認証してスタジアムに入る",
      demoBtn: "デモ用VIPパスで即時体験",
      verifying: "暗号化認証シールを検証中...",
      secureBadge: "セキュア接続保護中",
      error: "お名前と有効なチケットIDを入力してください。"
    },
    AR: {
      welcome: "مرشد جماهير فيفا",
      year: "2026",
      tagline: "بوابتك الأمنية المعتمدة ليوم المباراة",
      subtitle: "سجل هويتك الرسمية لتحديد مسارات بوابات الملعب، التحقق من صلاحية التذاكر، وطلب الأطعمة، وسلوك الممرات الآمنة.",
      nameLabel: "الاسم الكريم",
      ticketLabel: "معرف التذكرة / Matchday ID",
      ticketPlaceholder: "مثال: FIFA-98421-QA",
      loginBtn: "المصادقة والدخول",
      demoBtn: "دخول فوري بتذكرة VIP تجريبية",
      verifying: "جاري فحص السجل الرقمي المشفر...",
      secureBadge: "جلسة مشفرة آمنة",
      error: "يرجى كتابة الاسم ومعرف التذكرة بشكل صحيح."
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ticketId.trim()) {
      setErrorMsg(t.error);
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      onLogin({
        name: name.trim(),
        email: ticketId.trim().toUpperCase(),
        fanId: "FID-" + Math.floor(100000 + Math.random() * 900000)
      }, lang);
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = () => {
    setName('Lionel Messi');
    setTicketId('FIFA-2026-VIP-GOLD');
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      onLogin({
        name: 'Lionel Messi',
        email: 'FIFA-2026-VIP-GOLD',
        fanId: 'FID-101010'
      }, lang);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Main Outer Container */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row min-h-[600px] z-10"
        id="login-main-card"
      >
        
        {/* Left Visual Column with Football Action illustration */}
        <div className="md:w-1/2 bg-slate-950 relative flex flex-col justify-between p-8 overflow-hidden min-h-[300px] md:min-h-full border-r border-slate-800">
          
          {/* Hero Image Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={footballHero} 
              alt="Football Champions Stadium Celebration" 
              className="w-full h-full object-cover opacity-35 mix-blend-screen scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black italic text-xl shadow-lg shadow-emerald-500/20">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm uppercase tracking-widest text-emerald-400">FIFA WORLD CUP</span>
                <span className="bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">HOST APP</span>
              </div>
              <h2 className="text-xs text-slate-400 font-medium">Official Matchday Supporter Suite</h2>
            </div>
          </div>

          {/* Middle Typography / Slogan */}
          <div className="relative z-10 mt-12 md:mt-0">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400 font-bold mb-4">
              <Trophy size={13} />
              <span>United States • Mexico • Canada 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none text-white">
              {t.welcome} <span className="text-emerald-400">{t.year}</span>
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Bottom Indicators */}
          <div className="relative z-10 pt-8 border-t border-slate-800/60 mt-8 md:mt-0 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{t.secureBadge}</span>
            </div>
            <span>V2.26-Secured</span>
          </div>
        </div>

        {/* Right Authentication Form Column */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-[#0a1122]">
          
          {/* Language Selector at the top right of form */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-6 border-b border-slate-800">
            <span className="text-slate-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <Globe size={13} className="text-emerald-400" />
              <span>Select Language</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${lang === l.code ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                  title={l.label}
                >
                  <span>{l.flag}</span>
                  <span className="text-[10px]">{l.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Core Auth Fields */}
          <div className="my-auto py-8">
            <h3 className="text-lg font-extrabold text-white uppercase tracking-tight mb-1 flex items-center gap-2">
              <Key size={16} className="text-amber-400" />
              <span>{t.tagline}</span>
            </h3>
            <p className="text-slate-400 text-xs mb-6">Enter details from your FIFA wallet to access the High-Density navigator.</p>

            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs px-4 py-2.5 rounded-xl mb-4 font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <User size={10} className="text-emerald-400" />
                  <span>{t.nameLabel}</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lionel Messi"
                  disabled={isLoading}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-slate-500 transition-all"
                />
              </div>

              {/* Matchday ID / Ticket ID */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <LogIn size={10} className="text-amber-400" />
                    <span>{t.ticketLabel}</span>
                  </label>
                  <span className="text-[9px] text-emerald-400 font-extrabold uppercase">Blockchain Secured</span>
                </div>
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder={t.ticketPlaceholder}
                  disabled={isLoading}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-slate-500 tracking-wider transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 disabled:opacity-55 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>{t.verifying}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.loginBtn}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800/80"></div>
                  </div>
                  <span className="relative bg-[#0a1122] px-3 text-[10px] font-bold text-slate-500 uppercase">OR DEMO TEST</span>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-400/20 hover:border-amber-400/40 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy size={13} className="text-amber-400" />
                  <span>{t.demoBtn}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Secure Guarantee */}
          <div className="text-[10px] text-slate-500 text-center leading-relaxed">
            By authenticating, your fan credentials are local-checked and cryptographic. No personal data leaves your device. Supported by official FIFA 2026 security guidelines.
          </div>

        </div>

      </motion.div>
    </div>
  );
}
