import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Trophy, Users, Flame, Volume2, Shield, Calendar, RefreshCw } from 'lucide-react';

interface LiveMatchTickerProps {
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
}

export default function LiveMatchTicker({ language }: LiveMatchTickerProps) {
  const [matchMinute, setMatchMinute] = useState(74);
  const [score, setScore] = useState({ home: 2, away: 1 });
  const [lastEvent, setLastEvent] = useState('⚽ GOAL! J. Alvarez (68\') scores with a spectacular volley!');
  const [liveFansCount, setLiveFansCount] = useState(82410);

  // Translate match labels
  const tickerTranslations = {
    EN: {
      liveBadge: "LIVE MATCHDAY STATUS",
      stadium: "MetLife Stadium, East Rutherford",
      matchPhase: "World Cup Grand Finale 2026",
      density: "Crowd Density",
      atmosphere: "Noise & Atmosphere",
      highAtmosphere: "Extremely Intense (98 dB)",
      feedHeader: "Live Match Feed",
      capacity: "82,500 Max Capacity",
      teamHome: "Argentina",
      teamAway: "Germany",
      scheduleTitle: "🏆 TODAY'S MATCHDAY SCHEDULE & KICKOFF TIMES",
      match1: "Argentina vs Germany (LIVE)",
      match2: "USA vs England (Today 21:00 • Gates open 18:00)",
      match3: "Canada vs France (Tomorrow 16:00)",
      timingWarning: "🚨 SECURITY NOTICE: Strict gate check-in closes 15 minutes prior to kickoff. Verify your gate pass early to secure your entry corridor and bypass long wait times."
    },
    ES: {
      liveBadge: "ESTADO DEL PARTIDO EN VIVO",
      stadium: "MetLife Stadium, East Rutherford",
      matchPhase: "Gran Final de la Copa del Mundo 2026",
      density: "Densidad de Público",
      atmosphere: "Ruido y Atmósfera",
      highAtmosphere: "Extremadamente Intenso (98 dB)",
      feedHeader: "Eventos en Vivo",
      capacity: "Capacidad Máx: 82.500",
      teamHome: "Argentina",
      teamAway: "Alemania",
      scheduleTitle: "🏆 CRONOGRAMA DE HOY Y HORARIOS DE INICIO",
      match1: "Argentina vs Alemania (EN VIVO)",
      match2: "EE. UU. vs Inglaterra (Hoy 21:00 • Puertas 18:00)",
      match3: "Canadá vs Francia (Mañana 16:00)",
      timingWarning: "🚨 AVISO DE SEGURIDAD: El ingreso estricto cierra 15 minutos antes del inicio. Verifique su pase con anticipación para asegurar su ingreso y evitar retrasos."
    },
    KO: {
      liveBadge: "실시간 경기 진행 상황",
      stadium: "멧라이프 스타디움, 이스트 러더퍼드",
      matchPhase: "2026 FIFA 월드컵 결승전",
      density: "관중 밀집도",
      atmosphere: "경기장 응원 데시벨",
      highAtmosphere: "매우 열정적임 (98 dB)",
      feedHeader: "실시간 경기 업데이트",
      capacity: "최대 수용 인원: 82,500명",
      teamHome: "아르헨티나",
      teamAway: "독일",
      scheduleTitle: "🏆 오늘의 경기 일정 및 킥오프 시간",
      match1: "아르헨티나 vs 독일 (실시간)",
      match2: "미국 vs 잉글랜드 (오늘 21:00 • 게이트 개방 18:00)",
      match3: "캐나다 vs 프랑스 (내일 16:00)",
      timingWarning: "🚨 보안 안내 사항: 정밀 보안 검색 및 티켓 대조는 킥오프 15분 전에 마감됩니다. 혼잡을 피하고 안전하게 입장할 수 있도록 미리 티켓을 인증해 주세요."
    },
    JA: {
      liveBadge: "ライブ・スタジアム状況",
      stadium: "メットライフ・スタジアム",
      matchPhase: "2026年ワールドカップ グランドフィナーレ",
      density: "観客密度",
      atmosphere: "騒音度・スタジアムの熱気",
      highAtmosphere: "極めて高熱気 (98 dB) - 聴覚保護推奨",
      feedHeader: "ライブイベントフィード",
      capacity: "最大収容 82,500人",
      teamHome: "アルゼンチン",
      teamAway: "ドイツ",
      scheduleTitle: "🏆 本日の試合日程・キックオフ時間一覧",
      match1: "アルゼンチン vs ドイツ (LIVE)",
      match2: "アメリカ vs イングランド (本日21:00開始 • 開門18:00)",
      match3: "カナダ vs フランス (明日16:00)",
      timingWarning: "🚨 保安上の注意: キックオフ15分前に入場制限を行います。混雑緩和とスムーズな安全通路通過のため、お早めにチケットのデジタル認証を完了させてください。"
    },
    AR: {
      liveBadge: "حالة المباراة المباشرة",
      stadium: "ملعب ميتلايف، إيست رذرفورد",
      matchPhase: "نهائي كأس العالم الكبير 2026",
      density: "كثافة الحضور الجماهيري",
      atmosphere: "مستوى الضجيج والتشجيع",
      highAtmosphere: "مرتفع وصاخب جداً (98 ديسيبل)",
      feedHeader: "الأحداث المباشرة للمباراة",
      capacity: "السعة القصوى 82,500 مشجع",
      teamHome: "الأرجنتين",
      teamAway: "ألمانيا",
      scheduleTitle: "🏆 جدول مباريات اليوم ومواقيت ركلة البداية",
      match1: "الأرجنتين ضد ألمانيا (مباشر)",
      match2: "أمريكا ضد إنجلترا (اليوم 21:00 • فتح البوابات 18:00)",
      match3: "كندا ضد فرنسا (غداً الساعة 16:00)",
      timingWarning: "🚨 تنبيه أمني: يغلق فحص الدخول الصارم قبل 15 دقيقة من ركلة البداية. تحقق من بطاقتك مبكراً لتأمين ممر الدخول الخاص بك وتجنب الازدحام عند البوابات الدوارة."
    }
  };
  const t = tickerTranslations[language] || tickerTranslations.EN;

  // Simulate tick-by-tick changes
  useEffect(() => {
    const timer = setInterval(() => {
      setMatchMinute((prev) => {
        if (prev >= 90) return 74; // Loop simulation
        return prev + 1;
      });

      // Random event ticker
      const events = [
        `🔄 SUB: L. Martinez comes on for J. Alvarez (Argentina)`,
        `⚠️ YELLOW CARD: J. Kimmich (Germany) for a hard tackle`,
        `🧤 SPECTACULAR SAVE! E. Martinez blocks a powerful shot from L. Sané!`,
        `📣 Crowd chanting intense chants in South Stand supporters zone!`,
        `⚽ GOAL! J. Alvarez (68') scores with a spectacular volley!`,
        `🚨 Security reminds fans to stay behind the yellow safety lines at row 1.`,
      ];
      setLastEvent(events[Math.floor(Math.random() * events.length)]);
      
      // Slight fluctuation in live count
      setLiveFansCount((prev) => prev + Math.floor(Math.random() * 9) - 4);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#031535] to-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-6" id="live-match-ticker">
      {/* Upper bar */}
      <div className="bg-slate-950/70 border-b border-slate-800/60 px-4 py-2 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
          </span>
          <span className="font-extrabold text-rose-500 tracking-wider text-[10px] uppercase">{t.liveBadge}</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 font-bold text-[10px] uppercase flex items-center gap-1">
            <Calendar size={11} className="text-emerald-400" />
            {t.matchPhase}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">{t.stadium}</div>
      </div>

      {/* Main scoreboard block */}
      <div className="p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Teams and score */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-center md:justify-start">
          
          {/* Home team */}
          <div className="flex flex-col items-center gap-1.5 min-w-[70px]">
            <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-xl shadow-lg border border-slate-700/60 select-none">
              🇦🇷
            </div>
            <span className="font-black text-xs text-white uppercase tracking-tight">{t.teamHome}</span>
            <span className="text-[9px] text-slate-400 font-bold">HOME</span>
          </div>

          {/* Active Score display */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black tabular-nums tracking-tighter text-white">{score.home}</span>
              <span className="text-slate-500 font-bold text-xl">:</span>
              <span className="text-3xl sm:text-4xl font-black tabular-nums tracking-tighter text-white">{score.away}</span>
            </div>
            <div className="mt-1 bg-rose-600/25 border border-rose-500/35 text-rose-400 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>MIN {matchMinute}'</span>
            </div>
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-1.5 min-w-[70px]">
            <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-xl shadow-lg border border-slate-700/60 select-none">
              🇩🇪
            </div>
            <span className="font-black text-xs text-white uppercase tracking-tight">{t.teamAway}</span>
            <span className="text-[9px] text-slate-400 font-bold">AWAY</span>
          </div>

        </div>

        {/* Live event & Stadium stats right side */}
        <div className="w-full md:w-auto flex-1 max-w-md bg-slate-950/40 border border-slate-800/40 rounded-xl p-3.5 flex flex-col gap-3">
          
          {/* Real-time Ticker Event */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
              <Trophy size={11} className="text-emerald-400" />
              <span>{t.feedHeader}</span>
            </span>
            <div className="h-7 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lastEvent}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-slate-200 font-semibold leading-snug italic"
                >
                  {lastEvent}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/40 text-[11px]">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase text-[9px] flex items-center gap-1">
                <Users size={11} className="text-slate-400" />
                {t.density}
              </span>
              <span className="font-black text-slate-200">{liveFansCount.toLocaleString()} / <span className="text-slate-500 font-medium text-[9px]">{t.capacity}</span></span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase text-[9px] flex items-center gap-1">
                <Volume2 size={11} className="text-slate-400" />
                {t.atmosphere}
              </span>
              <span className="font-black text-amber-400 flex items-center gap-1">
                <Flame size={11} className="text-amber-500 animate-pulse animate-bounce" />
                {t.highAtmosphere}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Match Day Schedule & Timing Alert */}
      <div className="bg-slate-950/70 border-t border-slate-800/60 p-4 text-xs" id="matchday-kickoff-schedule">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={13} className="text-emerald-400" />
          <span className="font-extrabold text-slate-200 uppercase tracking-wider text-[10px]">{t.scheduleTitle}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800 flex items-center justify-between" id="schedule-item-1">
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-slate-200 text-[11px]">{t.match1}</span>
              <span className="text-[10px] text-rose-400 font-extrabold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                MIN {matchMinute}'
              </span>
            </div>
            <span className="text-[9px] bg-rose-600/20 text-rose-400 border border-rose-500/30 font-black px-2 py-0.5 rounded uppercase tracking-wider">LIVE</span>
          </div>
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800 flex items-center justify-between" id="schedule-item-2">
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-slate-200 text-[11px]">{t.match2}</span>
              <span className="text-[10px] text-amber-400 font-extrabold uppercase">Starts in 2h 40m</span>
            </div>
            <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-black px-2 py-0.5 rounded uppercase tracking-wider">UPCOMING</span>
          </div>
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800 flex items-center justify-between" id="schedule-item-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-slate-300 text-[11px]">{t.match3}</span>
              <span className="text-[10px] text-slate-400 font-medium">Tomorrow at 16:00</span>
            </div>
            <span className="text-[9px] bg-slate-800 text-slate-400 border border-slate-700/50 font-black px-2 py-0.5 rounded uppercase tracking-wider">TOMORROW</span>
          </div>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/20 text-amber-300/90 rounded-xl p-3 flex items-start gap-2.5 leading-relaxed" id="timing-notice-alert">
          <span className="mt-0.5 text-amber-400 text-sm">⚠️</span>
          <span className="text-[10.5px] font-semibold">{t.timingWarning}</span>
        </div>
      </div>
    </div>
  );
}
