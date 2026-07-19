import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, ShieldAlert, WifiOff, RefreshCw, AlertTriangle, HelpCircle, Star } from 'lucide-react';

interface AIChatProps {
  isOffline: boolean;
  onTriggerOnboarding: () => void;
  selectedZone: string | null;
  selectedGate: string | null;
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
}

function getWelcomeMessage(lang: string) {
  switch (lang) {
    case 'ES':
      return `⚽ **¡Bienvenido a FIFA Fan Navigator 2026!**

Soy tu Asistente de IA seguro, aquí para guiarte en el estadio de manera confiable.

**Guía Rápida**:
• 🏟️ **Puertas del Estadio**: Ingresa tu zona de boleto en la pestaña 'Buscar Mi Asiento' para ver tus puertas de acceso.
• 🚻 **Concursos**: Las concesiones, baños y primeros auxilios están claramente marcados en el mapa interactivo.
• 🚌 **Tránsito Seguro**: Autobuses de enlace y líneas oficiales de metro se encuentran fuera de las puertas.

*¿Cómo puedo ayudarte en tu idioma hoy? Escribe en español, inglés, coreano, japonés o árabe.*`;
    case 'KO':
      return `⚽ **FIFA 팬 네비게이터 2026에 오신 것을 환영합니다!**

안전하고 편안한 매치데이를 위해 실시간으로 경기장 시설과 안전 대피로를 안내하는 다국어 AI 비서입니다.

**빠른 안내 가이드**:
• 🏟️ **전용 게이트**: '내 좌석 찾기' 탭에서 모바일 티켓을 등록하시면 최적의 게이트와 동선이 표시됩니다.
• 🚻 **시설 위치**: 화장실, 구급팀 위치, 식음료(F&B) 코너가 지도 상에 선명하게 안내됩니다.
• 🚌 **대중교통**: 안심 셔틀버스와 공식 메트로 승강장이 경기장 외부 구역에 대기 중입니다.

*오늘 어떤 도움을 드릴까요? 한국어, 영어, 스페인어, 일본어, 아랍어로 편리하게 질문하세요.*`;
    case 'JA':
      return `⚽ **FIFAファンナビゲーター2026へようこそ！**

スタジアム内の安全確認、アメニティ、および交通機関のルートを安全に案内するセキュリティ強化型多言語AIアシスタントです。

**クイックガイド**:
• 🏟️ **スタジアムゲート**: 「座席を探す」タブにチケット情報を登録すると、割り当てられた入場ゲートがマッピングされます。
• 🚻 **コンコース**: 売店、トイレ、救急ステーションがインタラクティブマップ上に表示されます。
• 🚌 **安全な交通機関**: 無料シャトルバスや公式メトロが外門広場から運行されています。

*本日はどのようなご案内をいたしましょうか？ 日本語、英語、韓国語、スペイン語、アラビア語で自由にご質問ください。*`;
    case 'AR':
      return `⚽ **مرحباً بك في مرشد جماهير فيفا 2026!**

أنا مساعدك الذكي الآمن متعدد اللغات هنا لمساعدتك في الممرات والبوابات الأمنية وتسهيل رحلتك ليوم المباراة.

**دليل سريع**:
• 🏟️ **بوابات الملعب**: أدخل منطقة تذكرتك في علامة تبويب 'ابحث عن مقعدي' لتحديد بوابتك المخصصة.
• 🚻 **المرافق**: تتوفر مواقع الأطعمة، دورات المياه، والعيادات الطبية بوضوح على الخريطة التفاعلية.
• 🚌 **النقل الآمن**: تتوفر حافلات النقل المجانية ومحطات المترو الرسمية خارج البوابات الخارجية مباشرة.

*كيف يمكنني مساعدتك بلغتكم اليوم؟ يمكنك الكتابة بالعربية، الإنجليزية، الإسبانية، الكورية أو اليابانية.*`;
    default:
      return `⚽ **Welcome to FIFA Fan Navigator 2026!**

I am your secure, multilingual AI Assistant here to help you navigate matchday safely.

**Quick Guide**:
• 🏟️ **Stadium Gates**: Enter your ticket zone in the 'Gate Finder' tab to map your gates.
• 🚻 **Concourses**: Concessions, restrooms, and first-aid are marked on the map.
• 🚌 **Secure Transit**: Shuttle buses and official metro lines are located outside outer gates.

*How can I assist you in your native language today? Feel free to type in English, Spanish, Korean, Japanese, or Arabic.*`;
  }
}

function getQuickPrompts(lang: string) {
  switch (lang) {
    case 'ES':
      return [
        { label: '¿Cómo usar?', text: 'How do I use this application?' },
        { label: '¿Cómo llego al metro?', text: '¿Cómo llego a la estación de metro más cercana? ¿Es segura?' },
        { label: '¿Dónde están los baños?', text: '¿Dónde se encuentran los baños de la zona Norte?' },
        { label: 'Reportar Emergencia', text: 'I need medical assistance / emergency first aid immediately!' },
        { label: '¿Taxis no oficiales?', text: 'Is it safe to take a private taxi waiting outside the gates?' },
      ];
    case 'KO':
      return [
        { label: '사용 방법은?', text: 'How do I use this application?' },
        { label: '지하철 안전 경로', text: '가장 가까운 메트로 역으로 가는 안전한 이동 통로는 어디인가요?' },
        { label: '북구역 화장실 위치', text: '북구역 콘코스 화장실 및 패스트푸드 점은 어디에 있나요?' },
        { label: '응급/의료 지원 신고', text: 'I need medical assistance / emergency first aid immediately!' },
        { label: '사설 택시 안전한가요?', text: 'Is it safe to take a private taxi waiting outside the gates?' },
      ];
    case 'JA':
      return [
        { label: '使い方は？', text: 'How do I use this application?' },
        { label: 'メトロ乗車ルート', text: '最寄りのメトロ中央駅への安全な徒歩ルートを教えてください。' },
        { label: 'コンコースのトイレ', text: '北側エリアのコンコース内トイレはどこですか？' },
        { label: '医療・警備緊急通報', text: 'I need medical assistance / emergency first aid immediately!' },
        { label: '非公認タクシーは安全？', text: 'Is it safe to take a private taxi waiting outside the gates?' },
      ];
    case 'AR':
      return [
        { label: 'كيفية الاستخدام؟', text: 'How do I use this application?' },
        { label: 'كيف أصل للمترو؟', text: 'كيف أصل إلى محطة المترو الأقرب؟ وهل المسار آمن؟' },
        { label: 'أين تقع الحمامات؟', text: 'أين تقع دورات مياه القطاع الشمالي؟' },
        { label: 'الإبلاغ عن حالة طوارئ', text: 'I need medical assistance / emergency first aid immediately!' },
        { label: 'التكاسي غير المرخصة؟', text: 'Is it safe to take a private taxi waiting outside the gates?' },
      ];
    default:
      return [
        { label: 'How to use?', text: 'How do I use this application?' },
        { label: 'How to get to metro?', text: 'How do I get to the nearest metro station? Is it safe?' },
        { label: 'Where are restrooms?', text: 'Where are the restrooms on the North concourse?' },
        { label: 'Report Emergency / Injury', text: 'I need medical assistance / emergency first aid immediately!' },
        { label: 'Unlicensed Taxis?', text: 'Is it safe to take a private taxi waiting outside the gates?' },
      ];
  }
}

export default function AIChat({
  isOffline,
  onTriggerOnboarding,
  selectedZone,
  selectedGate,
  language,
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: getWelcomeMessage(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Dynamically swap initial welcome message if user hasn't typed anything yet
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: getWelcomeMessage(language),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Quick Precooked Prompts
  const quickPrompts = getQuickPrompts(language);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Client-side quick checks (Security & Emergency first)
    const lowerText = textToSend.toLowerCase();

    // 1. Secret / Password / Credit Card Guardrail
    const containsSecrets = /(password|credit\s*card|cvv|pin|passport\s*number|\b[0-9]{13,19}\b)/i.test(lowerText);
    if (containsSecrets) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🛡️ **Security Guardrail Triggered**: 
For your digital safety, please **never** enter passwords, credit cards, full passport numbers, or bank codes into this chat. The FIFA Fan Navigator does not require any credentials to guide you.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 600);
      return;
    }

    // 2. Emergency Interception (instant response without network dependency)
    const isEmergency = /(emergency|injured|hurt|first\s*aid|medical|heart\s*attack|fight|security|stole|bleeding|unconscious|police|ambulance|die|died)/i.test(lowerText);
    if (isEmergency) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🚨 **URGENT EMERGENCY REPORT DETECTED**

If you or someone near you has a medical emergency or a security issue, please act immediately:

1. **Call Stadium Emergency Helpline**: **+1 (800) 555-FIFA** (or **+1 800-555-3432**) immediately.
2. **Alert Stadium Crew**: Seek the nearest physical stadium steward, security officer, or staff member. They are trained to dispatch stadium medics instantly.
3. **Stay in Place**: If it is safe to do so, remain in your position so emergency teams can find you.

*Si tiene una emergencia médica o de seguridad, busque de inmediato a un personal del estadio o llame al número anterior.*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isEmergency: true,
          },
        ]);
        setIsLoading(false);
      }, 400);
      return;
    }

    // 3. Check for "how to use" trigger directly
    if (lowerText.includes("how to use") || lowerText.includes("how do i use") || lowerText.includes("instructions")) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Sure! I have activated our **Interactive Onboarding Assistant**. Here is how to use this app:

• **Step 1 ("Where to go")**: Click on the **Interactive Map** tab to see your stand zone, gates, concessions, restrooms, and first-aid locations.
• **Step 2 ("What to open")**: Tap the **'Gate Finder'** or **'Transit Options'** buttons on your screen to find secure entrances and shuttle loops.
• **Step 3 ("Safe Browsing Check")**: Allow location access for precise guiding. Rest assured your privacy is secure, and remember to **keep an eye on your physical surroundings** while walking.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        onTriggerOnboarding();
        setIsLoading(false);
      }, 500);
      return;
    }

    // If Offline Mode is active, generate high-quality smart fallback
    if (isOffline) {
      setTimeout(() => {
        let fallbackText = "";
        if (lowerText.includes("gate") || lowerText.includes("ticket") || lowerText.includes("entry") || lowerText.includes("entrar")) {
          fallbackText = `**Stadium Security Gate Guide (OFFLINE)**:
• **North Stand**: Use **Gate A** or **Gate B** (VIP/Cat 1/Cat 3).
• **East Stand**: Use **Gate C** or **Gate D** (Cat 2/Cat 3).
• **South Stand**: Use **Gate E** or **Gate F** (Supporters/Cat 2).
• **West Stand**: Use **Gate G** or **Gate H** (Cat 1/VIP).

*Safety Warning: Always check physical overhead signage. Do not enter restricted exit-only zones.*`;
        } else if (lowerText.includes("metro") || lowerText.includes("bus") || lowerText.includes("transit") || lowerText.includes("taxi") || lowerText.includes("rideshare")) {
          fallbackText = `**Real-Time Transportation Guide (OFFLINE)**:
• **FIFA Shuttle Bus**: Safe, free loops from Gate A and Gate E Plazas to central hubs.
• **Metro Gold Line**: Arena Central Station is a 10-minute walk via the well-lit secure path.
• **Lot C Pickup**: Registered Ride-Sharing operates from Lot C. Only board vehicles matching your app.
• **Alert**: Avoid unregistered, unlicensed private taxis operating outside official zones!`;
        } else if (lowerText.includes("restroom") || lowerText.includes("bathroom") || lowerText.includes("food") || lowerText.includes("concession") || lowerText.includes("shop") || lowerText.includes("beer")) {
          fallbackText = `**Stadium Concourse Amenities (OFFLINE)**:
• **Restrooms**: Positioned near all major sector entries in North, South, East, West stands.
• **First-Aid Stations**: Gate A and Gate E Annex areas.
• **Fan Shops**: West Plaza Gate G & East Entry Plaza.
• **Concessions**: Food & drink concessions are situated along Level 1 and Level 2 Concourses.`;
        } else {
          fallbackText = `⚽ **FIFA Fan Navigator (Offline)**:
I am currently operating in offline mode. I can answer questions about:
1. **Stadium Gates** (e.g., "Which gate for North stand?")
2. **Concourse Amenities** (e.g., "Where is first aid?")
3. **Safe Transportation** (e.g., "How to get to the Metro?")

*For safety, prioritize physical overhead signage and avoid unlicensed private taxis.*`;
        }

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 800);
      return;
    }

    // Server-side active Gemini request
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: language,
          history: messages.slice(-10).map(m => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isEmergency: data.isEmergency,
        },
      ]);
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `⚠️ **Connection Timeout**: The stadium cellular network appears heavily congested. 
          
I have automatically switched your session to **Local Fallback Mode**. Tap 'Offline Mode' in the top bar to continue browsing stadium maps, gate finder tools, and transit options without network dependency.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md flex flex-col h-[520px] overflow-hidden" id="ai-chat-panel">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between rounded-t-xl">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">AI Assistant</p>
          <h2 className="text-base font-black text-slate-900">Navigator 2026</h2>
        </div>
        <span className={`text-[9px] font-extrabold flex items-center gap-1.5 px-2.5 py-1 rounded-full ${isOffline ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800 animate-pulse'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-fifa-green'}`} />
          {isOffline ? 'Offline Fallback' : 'Secure Connection'}
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white" id="chat-messages-container">
        {messages.map((m) => {
          const isBot = m.sender === 'bot';
          return (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${isBot ? 'self-start mr-auto' : 'self-end ml-auto'}`}
            >
              {/* Message Bubble */}
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs ${
                  isBot
                    ? m.isEmergency
                      ? 'bg-rose-50 text-rose-950 border border-rose-200 rounded-tl-none font-medium'
                      : 'bg-slate-100 text-slate-800 border border-slate-200/60 rounded-tl-none'
                    : 'bg-fifa-green text-slate-950 p-3 rounded-2xl rounded-tr-none font-bold shadow-xs'
                }`}
              >
                {m.text}
              </div>
              {/* Timestamp */}
              <span className={`text-[9px] text-slate-400 mt-1 px-1.5 ${!isBot ? 'text-right' : 'text-left'}`}>
                {m.timestamp} · {isBot ? 'ENGLISH FIRST' : 'DETECTED'}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 p-3 bg-slate-50 rounded-2xl border border-slate-150 self-start mr-auto max-w-[85%] rounded-tl-none animate-pulse">
            <RefreshCw size={12} className="animate-spin text-fifa-blue" />
            <span>Analyzing matchday guidelines...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Helper & Input Box */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2.5">
        
        {/* Suggest buttons slider */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.text)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-black tracking-wide uppercase transition-all cursor-pointer ${
                qp.label.includes('Emergency')
                  ? 'bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-fifa-green hover:text-fifa-blue shadow-xs'
              }`}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input box styled as requested */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isOffline ? "Type a stadium question (Offline mode)..." : "Ask Navigator AI..."}
            className="w-full p-3 pr-12 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-fifa-green bg-white text-slate-900 placeholder-slate-400 font-medium"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
          />
          <button
            type="button"
            onClick={() => handleSendMessage(inputText)}
            className="absolute right-1.5 w-8 h-8 bg-fifa-blue rounded-md text-white flex items-center justify-center font-bold hover:bg-opacity-90 transition-all cursor-pointer"
            disabled={isLoading || !inputText.trim()}
          >
            &rarr;
          </button>
        </div>

        <p className="text-[9px] text-center text-slate-400 uppercase tracking-tighter">
          Your privacy is protected. Location data is only used for local guidance.
        </p>
      </div>
    </div>
  );
}
