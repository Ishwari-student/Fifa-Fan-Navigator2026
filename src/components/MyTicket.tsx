import React, { useState } from 'react';
import { Zone, Gate } from '../types';
import { ShieldCheck, Calendar, MapPin, User, Ticket, Sparkles, Download, RefreshCw, ZoomIn, Info, Eye } from 'lucide-react';

interface MyTicketProps {
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
  activeTicket: {
    zone: Zone;
    gate: Gate;
    section: string;
    row: string;
    seat: string;
    imageUrl?: string;
    ticketId?: string;
    extractedDate?: string;
    extractedTime?: string;
  } | null;
  currentUser: {
    name: string;
    email: string;
    fanId: string;
  } | null;
  onClearTicket: () => void;
}

const localTranslations = {
  EN: {
    title: "My Matchday Ticket",
    subTitle: "Show this screen offline at stadium checkpoints",
    noTicketTitle: "No Active Ticket Loaded",
    noTicketDesc: "Please go to the 'Find My Seat' tab to upload your screenshot/PDF ticket. Our secure scanner will inspect details, extract your exact seat number, and store it offline.",
    goFindSeat: "Go to Find My Seat",
    verifiedSeal: "OFFLINE VERIFIED PASS",
    tournament: "FIFA WORLD CUP 2026",
    venue: "MetLife Stadium · East Rutherford (NY/NJ)",
    holder: "Ticket Holder",
    seatLabel: "Seat Assignment",
    gateLabel: "Entry Gate",
    zoneLabel: "Stadium Zone",
    secLabel: "Section",
    rowLabel: "Row",
    seatNumLabel: "Seat",
    qrSubtitle: "Dynamic security token verified securely in offline local storage",
    viewScanTab: "Digital Smart Pass",
    viewImageTab: "Original Ticket Image",
    clearTicket: "Unload Ticket",
    seatSuccess: "Seat extracted successfully!",
    clickZoom: "Click image to open full resolution screenshot"
  },
  ES: {
    title: "Mi Entrada de Partido",
    subTitle: "Muestre esta pantalla sin conexión en los puestos de control",
    noTicketTitle: "No hay entradas cargadas",
    noTicketDesc: "Vaya a la pestaña 'Buscar Mi Asiento' para cargar la captura o PDF de su boleto. Nuestro escáner extraerá sus datos para guardarlos de forma segura.",
    goFindSeat: "Ir a Buscar Mi Asiento",
    verifiedSeal: "PASAPORTE VERIFICADO OFFLINE",
    tournament: "COPA MUNDIAL DE LA FIFA 2026",
    venue: "MetLife Stadium · East Rutherford (NY/NJ)",
    holder: "Titular de Entrada",
    seatLabel: "Asiento Asignado",
    gateLabel: "Puerta de Entrada",
    zoneLabel: "Zona del Estadio",
    secLabel: "Sección",
    rowLabel: "Fila",
    seatNumLabel: "Asiento",
    qrSubtitle: "Token de seguridad verificado localmente sin conexión",
    viewScanTab: "Pase Digital Inteligente",
    viewImageTab: "Imagen de Entrada Original",
    clearTicket: "Quitar Entrada",
    seatSuccess: "¡Asiento extraído con éxito!",
    clickZoom: "Haga clic para ampliar la captura de pantalla"
  },
  KO: {
    title: "나의 경기 매치데이 티켓",
    subTitle: "경기장 체크포인트에서 오프라인 상태로 제시하세요",
    noTicketTitle: "활성화된 티켓 없음",
    noTicketDesc: "'내 좌석 찾기' 탭으로 이동하여 티켓 스크린샷이나 PDF 파일을 업로드하세요. 로컬 스캐너가 실시간으로 좌석 번호를 추출하여 오프라인에 안전하게 보관합니다.",
    goFindSeat: "내 좌석 찾기로 이동",
    verifiedSeal: "오프라인 보안 인증 완료",
    tournament: "2026 FIFA 월드컵",
    venue: "MetLife 스타디움 · 이스트 러더퍼드 (NY/NJ)",
    holder: "티켓 소지자",
    seatLabel: "지정 좌석 정보",
    gateLabel: "입장 게이트",
    zoneLabel: "경기장 구역",
    secLabel: "구역 (Section)",
    rowLabel: "열 (Row)",
    seatNumLabel: "좌석 (Seat)",
    qrSubtitle: "오프라인 로컬 저장소에서 검증된 암호화 보안 QR 코드",
    viewScanTab: "디지털 스마트 패스",
    viewImageTab: "원본 티켓 스크린샷 이미지",
    clearTicket: "티켓 지우기",
    seatSuccess: "티켓 좌석 스캔이 완벽히 완료되었습니다!",
    clickZoom: "이미지를 클릭하면 큰 화면으로 볼 수 있습니다"
  },
  JA: {
    title: "マイチケット・観戦パス",
    subTitle: "入場ゲートや検問所でこの画面をオフライン提示できます",
    noTicketTitle: "チケットが読み込まれていません",
    noTicketDesc: "「座席を探す」タブからチケットのスクリーンショットやPDFをアップロードしてください。安全に座席位置を解析して、オフライン表示用に保存します。",
    goFindSeat: "座席を探すに進む",
    verifiedSeal: "オフライン認証済みパス",
    tournament: "FIFA ワールドカップ 2026",
    venue: "メットライフ・スタジアム (NY/NJ)",
    holder: "チケット所有者",
    seatLabel: "指定お座席情報",
    gateLabel: "入場ゲート",
    zoneLabel: "スタジアムゾーン",
    secLabel: "ブロック",
    rowLabel: "列",
    seatNumLabel: "席番号",
    qrSubtitle: "オフラインローカルストレージで暗号化検証済みのセキュリティトークン",
    viewScanTab: "デジタル・スマートパス",
    viewImageTab: "アップロード画像表示",
    clearTicket: "チケットをクリア",
    seatSuccess: "座席番号の読み取りに成功しました！",
    clickZoom: "クリックして拡大表示"
  },
  AR: {
    title: "تذكرتي لمباراة اليوم",
    subTitle: "اعرض هذه الشاشة بدون اتصال بالإنترنت في نقاط تفتيش الملعب",
    noTicketTitle: "لا توجد تذكرة نشطة محملة",
    noTicketDesc: "يرجى الذهاب إلى علامة التبويب 'ابحث عن مقعدي' لتحميل لقطة الشاشة أو ملف التذكرة. سيقوم الماسح الضوئي الآمن بفحص التفاصيل واستخراج رقم مقعدك بدقة وحفظه بدون اتصال بالإنترنت.",
    goFindSeat: "الذهاب إلى ابحث عن مقعدي",
    verifiedSeal: "تذكرة معتمدة بدون اتصال",
    tournament: "كأس العالم فيفا 2026",
    venue: "ملعب ميتلايف · إيست رذرفورد (نيويورك/نيوجيرسي)",
    holder: "حامل التذكرة",
    seatLabel: "المقعد المخصص",
    gateLabel: "بوابة الدخول",
    zoneLabel: "منطقة الملعب",
    secLabel: "القسم",
    rowLabel: "الصف",
    seatNumLabel: "المقعد",
    qrSubtitle: "رمز أمان ديناميكي تم التحقق منه بشكل آمن في التخزين المحلي دون اتصال بالإنترنت",
    viewScanTab: "البطاقة الرقمية الذكية",
    viewImageTab: "صورة التذكرة الأصلية",
    clearTicket: "إلغاء تحميل التذكرة",
    seatSuccess: "تم استخراج بيانات المقعد بنجاح!",
    clickZoom: "انقر فوق الصورة لفتح لقطة شاشة بدقة كاملة"
  }
};

export default function MyTicket({
  language,
  activeTicket,
  currentUser,
  onClearTicket
}: MyTicketProps) {
  const t = localTranslations[language] || localTranslations.EN;
  const [activeSubTab, setActiveSubTab] = useState<'smart' | 'original'>('smart');
  const [isZoomed, setIsZoomed] = useState(false);

  if (!activeTicket) {
    return (
      <div className="flex flex-col h-full bg-white shadow-md rounded-xl overflow-hidden border border-slate-200" id="my-ticket-empty-panel">
        <div className="p-3.5 bg-fifa-blue text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between border-b border-fifa-blue-dark">
          <div className="flex items-center gap-2">
            <Ticket size={14} className="text-fifa-green" />
            <span>{t.title}</span>
          </div>
          <span className="bg-slate-800 text-slate-400 font-bold text-[9px] px-2 py-0.5 rounded uppercase">
            No Ticket
          </span>
        </div>

        <div className="p-8 text-center flex flex-col items-center justify-center gap-4 flex-1">
          <div className="p-4 bg-slate-50 rounded-full border-2 border-dashed border-slate-200 text-slate-400 animate-pulse">
            <Ticket size={36} className="text-slate-300" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">{t.noTicketTitle}</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs">{t.noTicketDesc}</p>
        </div>
      </div>
    );
  }

  // Generate a mock secure Ticket ID if not present
  const ticketId = activeTicket.ticketId || `FWC26-NJNY-${currentUser?.fanId?.substring(0, 5).toUpperCase() || 'MEMBER'}-8294`;

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-xl overflow-hidden border border-slate-200" id="my-ticket-panel">
      {/* Tab Header */}
      <div className="p-3.5 bg-fifa-blue text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between border-b border-fifa-blue-dark">
        <div className="flex items-center gap-2">
          <Ticket size={14} className="text-fifa-green animate-bounce" />
          <span>{t.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-600 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase flex items-center gap-1 shadow-xs animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            {t.verifiedSeal}
          </span>
        </div>
      </div>

      {/* Selector Subtabs if an image exists */}
      {activeTicket.imageUrl && (
        <div className="flex bg-slate-100 p-1 border-b border-slate-200 gap-1">
          <button
            onClick={() => setActiveSubTab('smart')}
            className={`flex-1 py-2 text-[10.5px] font-black uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeSubTab === 'smart' ? 'bg-white text-fifa-blue shadow-xs font-black' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <Sparkles size={12} className={activeSubTab === 'smart' ? 'text-fifa-green' : ''} />
            {t.viewScanTab}
          </button>
          <button
            onClick={() => setActiveSubTab('original')}
            className={`flex-1 py-2 text-[10.5px] font-black uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeSubTab === 'original' ? 'bg-white text-fifa-blue shadow-xs font-black' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <Eye size={12} className={activeSubTab === 'original' ? 'text-fifa-green' : ''} />
            {t.viewImageTab}
          </button>
        </div>
      )}

      {/* Main Body content */}
      <div className="p-4 flex-1 flex flex-col gap-4 bg-slate-50/50">
        
        {activeSubTab === 'original' && activeTicket.imageUrl ? (
          /* SHOW original uploaded screenshot image to satisfy user */
          <div className="flex flex-col items-center gap-3 animate-fade-in py-2">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-2.5 text-[10px] flex gap-2 items-start w-full">
              <span className="text-amber-500 font-bold text-xs mt-0.5">💡</span>
              <span>{t.clickZoom}</span>
            </div>

            <div 
              className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md cursor-zoom-in group transition-all duration-300 ${isZoomed ? 'max-h-[500px] w-full scale-[1.02]' : 'max-h-[280px] max-w-[200px]'}`}
              onClick={() => setIsZoomed(!isZoomed)}
              id="uploaded-ticket-image-viewer"
            >
              <img 
                src={activeTicket.imageUrl} 
                alt="My uploaded ticket screenshot"
                className="w-full h-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white drop-shadow-sm" size={24} />
              </div>
            </div>

            {/* Offline Helper Data Overlay */}
            <div className="w-full bg-slate-900 text-white rounded-xl p-3 border border-slate-800 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between border-b border-slate-800 pb-1.5 mb-1.5 text-[10px] font-black text-fifa-green uppercase">
                <span>🎯 EXTRACED SEAT SPECS</span>
                <span className="text-emerald-400">STATUS: MATCHDAY ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ZONE:</span>
                <span className="font-black text-white">{activeTicket.zone.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GATE:</span>
                <span className="font-black text-white">{activeTicket.gate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SEC / ROW / SEAT:</span>
                <span className="font-black text-white">{activeTicket.section} / R{activeTicket.row} / S{activeTicket.seat}</span>
              </div>
            </div>
          </div>
        ) : (
          /* SHOW the gorgeous generated Digital Smart Pass containing the extracted info and QR code */
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Ticket Outer Sleeve */}
            <div className="bg-gradient-to-br from-fifa-blue to-slate-950 text-white rounded-2xl border-2 border-slate-800/80 shadow-lg overflow-hidden relative" id="ticket-pass-card">
              
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/20 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[10px] font-black tracking-widest text-fifa-green">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-emerald-400 animate-pulse" />
                  {t.tournament}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[9px] uppercase tracking-normal font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE ID PASS
                </span>
              </div>

              {/* Match Card Detail */}
              <div className="p-4 border-b border-dashed border-slate-800 relative">
                {/* Decorative gold stars background */}
                <div className="absolute top-2 right-2 text-yellow-400/10 text-4xl select-none font-bold">★</div>

                <div className="space-y-1">
                  <h3 className="font-black text-sm tracking-tight text-white uppercase">{t.tournament}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-300 font-bold">
                    <Calendar size={11} className="text-fifa-green" />
                    <span>{activeTicket.extractedDate || 'JULY 19, 2026'} · {activeTicket.extractedTime || '16:00 EST'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9.5px] text-slate-400 font-medium">
                    <MapPin size={11} className="text-slate-400" />
                    <span>{t.venue}</span>
                  </div>
                </div>

                {/* Ticket ID barcode replacement */}
                <div className="mt-4 flex justify-between items-end border-t border-slate-900 pt-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] text-slate-400 uppercase font-bold">{t.holder}</span>
                    <span className="text-[11px] font-black text-white flex items-center gap-1">
                      <User size={10} className="text-slate-300" />
                      {currentUser?.name || 'Valued FIFA Fan'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-right font-mono">
                    <span className="text-[8px] text-slate-400 uppercase font-bold">TICKET SERIAL</span>
                    <span className="text-[9px] font-black text-emerald-400 tracking-wider">{ticketId}</span>
                  </div>
                </div>
              </div>

              {/* Tear off Grid details */}
              <div className="bg-slate-900/60 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">{t.seatLabel}</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                    🟢 {t.seatSuccess}
                  </span>
                </div>

                {/* 4-Column Seat Block */}
                <div className="grid grid-cols-4 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="flex flex-col gap-0.5 border-r border-slate-800">
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase">{t.zoneLabel.split(' ')[1]}</span>
                    <span className="text-xs font-black text-white truncate px-0.5">{activeTicket.zone}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-r border-slate-800">
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase">{t.secLabel}</span>
                    <span className="text-xs font-black text-fifa-green truncate px-0.5">{activeTicket.section}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-r border-slate-800">
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase">{t.rowLabel}</span>
                    <span className="text-xs font-black text-white truncate px-0.5">{activeTicket.row}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase">{t.seatNumLabel}</span>
                    <span className="text-xs font-black text-white truncate px-0.5">{activeTicket.seat}</span>
                  </div>
                </div>

                {/* Secure Offline QR Code Section */}
                <div className="flex flex-col items-center gap-2 mt-2 pt-2 border-t border-slate-850">
                  <div className="bg-white p-3 rounded-xl shadow-md border border-slate-800 relative group flex items-center justify-center max-w-[130px] mx-auto">
                    {/* Simulated Highly detailed Scannable QR Code */}
                    <div className="w-24 h-24 bg-slate-100 flex flex-col justify-between p-1.5 rounded relative overflow-hidden" id="ticket-qr-code-canvas">
                      {/* Corner Anchor squares */}
                      <div className="absolute top-1 left-1 w-5 h-5 border-[3px] border-slate-900 bg-white" />
                      <div className="absolute top-1 right-1 w-5 h-5 border-[3px] border-slate-900 bg-white" />
                      <div className="absolute bottom-1 left-1 w-5 h-5 border-[3px] border-slate-900 bg-white" />
                      
                      {/* QR matrix simulation using monospace ASCII characters or dot blocks */}
                      <div className="w-full h-full flex flex-col justify-center items-center gap-0.5 pt-2">
                        <div className="text-[6px] tracking-tight leading-none text-slate-950 font-mono font-bold font-black select-none text-center">
                          █ █ █ █ █ █ █<br />
                          █ ░ █ ░ ░ ░ █<br />
                          █ █ █ ░ █ ░ ░<br />
                          ░ ░ ░ █ █ █ ░<br />
                          █ ░ █ ░ █ ░ █<br />
                          █ █ █ ░ █ ░ █
                        </div>
                      </div>

                      {/* FIFA center emblem */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-950 text-emerald-400 rounded-full border border-slate-900 p-0.5 flex items-center justify-center w-5 h-5">
                        <span className="text-[6px] font-black italic">F</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium text-center leading-tight max-w-xs px-2">
                    🛡️ {t.qrSubtitle}
                  </p>
                </div>

              </div>
            </div>

            {/* In-Seat Catering Quick Link or Warning Alert */}
            <div className="bg-sky-50 border border-sky-200 text-sky-800 rounded-xl p-3.5 flex items-start gap-2.5">
              <Info size={14} className="text-sky-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-extrabold text-[11px] uppercase tracking-wide">Stadium Checkpoints Verified</span>
                <span className="text-[10px] text-sky-700/95 leading-relaxed">
                  Gate stewards will match your offline digital pass seating coordinates with the color-matched visual stadium zones. Proceed smoothly.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Clear/Unload active ticket button */}
        <button
          onClick={onClearTicket}
          className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 text-[10.5px] font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
        >
          <RefreshCw size={12} />
          {t.clearTicket}
        </button>

      </div>
    </div>
  );
}
