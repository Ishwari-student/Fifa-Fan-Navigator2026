import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  QrCode, 
  Database, 
  Cpu, 
  Lock, 
  Unlock, 
  ScanLine, 
  AlertOctagon, 
  CheckCircle, 
  FileCheck, 
  Radio, 
  RefreshCw,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Zone, Gate } from '../types';

interface TicketInvestigatorProps {
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
  activeTicket: { zone: Zone; gate: Gate; section: string; row: string; seat: string; imageUrl?: string } | null;
  onSelectTicket: (zone: Zone, gate: Gate, details: { section: string; row: string; seat: string; imageUrl?: string }) => void;
}

interface ForensicResult {
  status: 'VERIFIED' | 'FRAUD_DETECTED' | 'SUSPENDED' | 'IDLE';
  ticketId: string;
  holder: string;
  seat: string;
  ledgerIndex: string;
  errors: string[];
}

export default function TicketInvestigator({ language, activeTicket, onSelectTicket }: TicketInvestigatorProps) {
  const [activeSubTab, setActiveSubTab] = useState<'investigate' | 'scan'>('investigate');
  
  // Investigation States
  const [searchId, setSearchId] = useState('');
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigationStep, setInvestigationStep] = useState(0);
  const [forensicResult, setForensicResult] = useState<ForensicResult>({
    status: 'IDLE',
    ticketId: '',
    holder: '',
    seat: '',
    ledgerIndex: '',
    errors: []
  });

  // Scanner States
  const [isScanningAtGate, setIsScanningAtGate] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [isGateUnlocked, setIsGateUnlocked] = useState(false);

  // Translations
  const investigatorTranslations = {
    EN: {
      investigatorTitle: "FIFA Anti-Fraud & Gate Entry System",
      investigatorSub: "Protect your matchday. Verify ticket authenticity via FIFA's secure cryptographic ledger or scan your verified pass at the gate turnstile.",
      tabInvestigate: "Anti-Fraud Detector",
      tabScan: "Gate Entry Scanner",
      
      // Fraud detector
      placeholderId: "Paste Ticket ID or Blockchain Hash...",
      detectBtn: "Analyze Seating Credentials",
      analyzingText: "Querying Secure Host Cryptography...",
      step1: "Checking cryptographic hash signatures...",
      step2: "Cross-referencing global seat reservation logs...",
      step3: "Validating holographic signature seal keys...",
      
      statusVerified: "OFFICIAL VERIFIED MATCHDAY PASS",
      statusFraud: "CRITICAL FRAUD DETECTED!",
      statusSuspended: "TICKET SUSPENDED / VOIDED",
      verifiedMsg: "This ticket contains genuine matchday digital seals. Authentic seating and security access guaranteed.",
      fraudMsg: "ALERT: This ticket features counter-feit metadata. Signature hash mismatched or double-allocated in the seating matrix.",
      suspendedMsg: "This ticket was reported lost or refunded. Entry turnstiles are locked.",
      
      sampleTickets: "Test Forensic Scenarios:",
      sampleValid: "Verify Genuine Ticket",
      sampleInvalid: "Detect Fake Seat Pass",
      sampleVoid: "Check Voided Ticket",
      
      // Gate scanner
      scanHeading: "Secure Turnstile Gate Access",
      scanSub: "Place your mobile pass near the gate's reader or align the QR code to verify security and unlock your path.",
      scanBtn: "Simulate Gate Scan",
      scanningNFC: "Transmitting NFC & Cryptographic Handshake...",
      scannedSuccess: "GATE ACCESS GRANTED!",
      scannedSub: "Turnstile turn unlocked. Please follow the illuminated green safe corridor to your seat.",
      secureGateBadge: "SECURE SCANNER: GATE UNLOCKED",
      gateGuide: "Gate Directions:",
      gateProceed: "Proceed through Outer Ring:",
      gateWalk: "Look for Green light indicators heading towards Section"
    },
    ES: {
      investigatorTitle: "Sistema de Antifraude y Escáner de Puerta",
      investigatorSub: "Proteja su día de partido. Verifique la autenticidad de su entrada con el registro criptográfico o escanee su pase en la puerta.",
      tabInvestigate: "Detector de Fraude",
      tabScan: "Escáner de Entrada",
      
      placeholderId: "Pegue el ID de Entrada o Hash de Blockchain...",
      detectBtn: "Analizar Credenciales de Asiento",
      analyzingText: "Consultando Criptografía del Servidor...",
      step1: "Verificando firmas de hash criptográficas...",
      step2: "Cruzando datos con el registro global de asientos...",
      step3: "Validando sellos de firma holográfica...",
      
      statusVerified: "PASE OFICIAL DE PARTIDO VERIFICADO",
      statusFraud: "¡FRAUDE CRÍTICO DETECTADO!",
      statusSuspended: "ENTRADA SUSPENDIDA / ANULADA",
      verifiedMsg: "Esta entrada contiene sellos digitales legítimos. Se garantiza asiento auténtico y acceso seguro.",
      fraudMsg: "ALERTA: Esta entrada presenta metadatos falsificados o duplicación en la matriz de asientos del estadio.",
      suspendedMsg: "Esta entrada fue reportada como perdida o reembolsada. Los molinetes de acceso están bloqueados.",
      
      sampleTickets: "Casos de Prueba de Seguridad:",
      sampleValid: "Verificar Entrada Real",
      sampleInvalid: "Detectar Pase Falso",
      sampleVoid: "Chequear Entrada Anulada",
      
      scanHeading: "Acceso Seguro a Puerta de Molinete",
      scanSub: "Acerque su pase al lector de la puerta o alinee el código QR para verificar la seguridad y desbloquear su entrada.",
      scanBtn: "Simular Escaneo en Puerta",
      scanningNFC: "Transmitiendo NFC y Sello de Seguridad...",
      scannedSuccess: "¡ACCESO DE PUERTA CONCEDIDO!",
      scannedSub: "Molinete desbloqueado. Por favor, siga el corredor seguro iluminado en verde hacia su asiento.",
      secureGateBadge: "ESCÁNER SEGURO: PUERTA ABIERTA",
      gateGuide: "Guía de Entrada:",
      gateProceed: "Proceda por el anillo exterior por:",
      gateWalk: "Siga las luces verdes hacia la Sección"
    },
    KO: {
      investigatorTitle: "FIFA 안티프로드 검증 & 게이트 스캐너",
      investigatorSub: "안전한 매치데이를 위해 블록체인 원장 연동으로 모조/복제 티켓을 즉시 탐지하고, 모바일 패스를 가상 태그하여 게이트 스위치를 안전하게 작동시킵니다.",
      tabInvestigate: "위조 티켓 탐지기",
      tabScan: "게이트 입장 스캐너",
      
      placeholderId: "티켓 고유 해시 키 입력...",
      detectBtn: "좌석 크립토 검증 시작",
      analyzingText: "보안 호스트 데이터베이스 조회 중...",
      step1: "암호화 해시 서명 무결성 검사 중...",
      step2: "경기장 예약 시트 원장 중복 여부 확인 중...",
      step3: "디지털 홀로그램 위조 방지 씰 검증 중...",
      
      statusVerified: "공식 인증된 매치 패스",
      statusFraud: "🚨 위조/복제 티켓 감지됨!",
      statusSuspended: "사용 중지 / 취소된 티켓",
      verifiedMsg: "이 티켓은 정식 발급된 디지털 암호 서명을 포함하고 있습니다. 정식 좌석 배정 및 보안 구역 입장을 보장합니다.",
      fraudMsg: "경고: 위조된 메타데이터가 발견되었습니다. 시트 블록이 중복 할당되었거나 서명 해시가 원장과 다릅니다.",
      suspendedMsg: "이 티켓은 분실 혹은 환불 처리되어 비활성화되었습니다. 입장 게이트 통과가 금지됩니다.",
      
      sampleTickets: "보안 테스트 시나리오:",
      sampleValid: "정식 티켓 검증",
      sampleInvalid: "위조 티켓 적발",
      sampleVoid: "무효 티켓 확인",
      
      scanHeading: "지능형 입장 게이트 통과",
      scanSub: "모바일 패스의 QR 코드 혹은 원격 NFC를 인식하여 실시간 게이트 게이트웨이를 락 해제합니다.",
      scanBtn: "게이트 태그 시뮬레이션",
      scanningNFC: "NFC 무선 신호 및 이중 암호 확인 중...",
      scannedSuccess: "게이트 통과 승인 완료!",
      scannedSub: "턴스타일 잠금이 해제되었습니다. 바닥에 안내된 초록색 안심 조명 유도로를 따라 가세요.",
      secureGateBadge: "보안 스캐너: 게이트 잠금 해제됨",
      gateGuide: "입장 가이드:",
      gateProceed: "배정된 게이트 진입:",
      gateWalk: "구역으로 향하는 녹색 안심 동선을 확인하세요:"
    },
    JA: {
      investigatorTitle: "FIFA 偽造防止＆ゲート入場システム",
      investigatorSub: "公式暗号ブロックチェーン原簿によるチケットの偽造・重複検知。また、入場ゲートでモバイルパスをスキャンしセキュリティを解除します。",
      tabInvestigate: "偽造チケット検出",
      tabScan: "ゲート入場スキャナー",
      
      placeholderId: "チケット暗号キーまたはハッシュを入力...",
      detectBtn: "お座席資格のデジタル監査",
      analyzingText: "安全なホストデータベースに問い合わせ中...",
      step1: "暗号化ハッシュ署名のチェック中...",
      step2: "グローバル座席予約台帳と重複照会中...",
      step3: "デジタルホログラム透かしの正当性を検証中...",
      
      statusVerified: "公式マッチパス検証完了",
      statusFraud: "🚨 偽造チケットを検出しました！",
      statusSuspended: "チケット無効化 / サスペンド",
      verifiedMsg: "本チケットには正規品としてのデジタル署名が含まれています。確実な座席とセキュアな入場を保証します。",
      fraudMsg: "警告: 偽装されたデータ、または重複登録された予約情報を検知しました。スタジアム警備室へ連絡してください。",
      suspendedMsg: "このチケットは紛失または払戻が申請されています。入場ゲートのターンテーブルはロックされます。",
      
      sampleTickets: "セキュリティ検証パターン:",
      sampleValid: "正規チケット監査",
      sampleInvalid: "偽造チケット監査",
      sampleVoid: "失効チケット監査",
      
      scanHeading: "ゲートターンテーブル非接触スキャン",
      scanSub: "モバイルパスのQRコードまたはNFC読み取り部分にかざして、安全認証を解除して入場します。",
      scanBtn: "ゲート通過テスト",
      scanningNFC: "NFC通信・セキュアハンドシェイクを実行中...",
      scannedSuccess: "スタジアムゲート通過許可！",
      scannedSub: "ゲートのロックが解除されました。緑のセーフティラインに沿ってお座席へお進みください。",
      secureGateBadge: "セキュアスキャナー：ゲート解除完了",
      gateGuide: "ゲート案内:",
      gateProceed: "こちらの指定外門よりお入りください：",
      gateWalk: "安全誘導灯に沿って次のブロックへお進みください："
    },
    AR: {
      investigatorTitle: "نظام كشف التذاكر المزورة والمصادقة الأمنية للبوابات",
      investigatorSub: "احمِ رحلتك وتأكد من موثوقية تذكرتك عبر السجل الرقمي المعتمد، أو امسح بطاقتك لتمرير البوابة الأمنية.",
      tabInvestigate: "كاشف التزوير",
      tabScan: "ممر البوابة الذكي",
      
      placeholderId: "ألصق رمز التذكرة أو الرمز الرقمي المشفر...",
      detectBtn: "تدقيق وتحليل التذكرة",
      analyzingText: "الاتصال بقاعدة بيانات الفيفا المركزية المشفرة...",
      step1: "التحقق من صحة التوقيعات الرقمية الهاش...",
      step2: "مطابقة التذاكر لمنع تكرار أو حجز نفس المقعد...",
      step3: "تحليل العلامة المائية الهولوغرامية الإلكترونية...",
      
      statusVerified: "تذكرة رسمية معتمدة ومؤمنة",
      statusFraud: "تنبيه: تم اكتشاف تذكرة مزيفة!",
      statusSuspended: "تم تعليق التذكرة / ملغاة",
      verifiedMsg: "تحتوي هذه التذكرة على أختام وتواقيع أصلية وموثقة. المقعد والدخول مؤمنان بالكامل.",
      fraudMsg: "تحذير: تحتوي التذكرة على بيانات تالفة أو مكررة. تم حظر هذا الرمز لمنع دخول المتسللين.",
      suspendedMsg: "تم الإبلاغ عن هذه التذكرة كمفقودة أو مسترجعة. تم إغلاق بوابات الدخول تلقائياً.",
      
      sampleTickets: "سيناريوهات فحص الأمان:",
      sampleValid: "فحص تذكرة أصلية",
      sampleInvalid: "كشف تذكرة مزيفة",
      sampleVoid: "فحص تذكرة ملغاة",
      
      scanHeading: "عبور البوابات الدوارة الذكي",
      scanSub: "ضع تذكرتك الرقمية أمام قارئ البوابة أو وجه الكود QR لفتح بوابة الدخول الآمنة.",
      scanBtn: "محاكاة العبور والمسح",
      scanningNFC: "الاتصال اللاسلكي السريع والتحقق من التوقيع...",
      scannedSuccess: "تم السماح بالعبور - البوابة مفتوحة!",
      scannedSub: "تم فتح البوابة الدوارة. تفضل بالدخول واتبع الممر المضيء بالأخضر للوصول بأمان لمقعدك.",
      secureGateBadge: "قارئ أمني: البوابة مفتوحة",
      gateGuide: "توجيهات الدخول:",
      gateProceed: "ادخل عبر الحلقة الخارجية من:",
      gateWalk: "اتبع إشارات الممر الأخضر للقسم"
    }
  };
  const t = investigatorTranslations[language] || investigatorTranslations.EN;

  // Simulate Forensic Investigation
  const runForensicAnalysis = (presetType: 'VALID' | 'FAKE' | 'VOID') => {
    setIsInvestigating(true);
    setInvestigationStep(1);
    setForensicResult({ status: 'IDLE', ticketId: '', holder: '', seat: '', ledgerIndex: '', errors: [] });

    // Step transitions
    setTimeout(() => setInvestigationStep(2), 500);
    setTimeout(() => setInvestigationStep(3), 1000);

    setTimeout(() => {
      setIsInvestigating(false);
      setInvestigationStep(0);

      if (presetType === 'VALID') {
        setForensicResult({
          status: 'VERIFIED',
          ticketId: "TKT-FIFA-2026-894102-X",
          holder: "L. Messi (Registered Fan)",
          seat: "South Stand • Section S202 • Row 4 • Seat 11",
          ledgerIndex: "TX-993-BLOCK-8841",
          errors: []
        });
        // Auto-load into active ticket
        onSelectTicket('South' as Zone, 'Gate E' as Gate, { section: 'S202', row: '4', seat: '11' });
      } else if (presetType === 'FAKE') {
        setForensicResult({
          status: 'FRAUD_DETECTED',
          ticketId: "TKT-FAKE-CLONE-44210",
          holder: "UNREGISTERED USER",
          seat: "North Stand • Section N104 • Row 15 • Seat 3",
          ledgerIndex: "HASH_MISMATCH_LEDGER_ALERT",
          errors: [
            "Holographic seal key digital signature does not match official database",
            "Mismatched security certificate layout",
            "Duplicate seat request: Seat already claimed by high-priority pass ID 9942"
          ]
        });
      } else {
        setForensicResult({
          status: 'SUSPENDED',
          ticketId: "TKT-VOIDED-99321",
          holder: "S. Kruse (Refunded Request)",
          seat: "West Stand • Section W115 • Row 8 • Seat 24",
          ledgerIndex: "TX-REFUND-883",
          errors: [
            "Ticket reported missing or stolen by the original purchaser",
            "Financial refund issued; ticket deactivated on 2026-07-18"
          ]
        });
      }
    }, 1600);
  };

  // Simulate Gate NFC scanner pass
  const handleSimulateGateScan = () => {
    if (!activeTicket) return;
    setIsScanningAtGate(true);
    setScanStep(1);
    setIsGateUnlocked(false);

    // Transitions
    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => {
      setIsScanningAtGate(false);
      setScanStep(0);
      setIsGateUnlocked(true);
    }, 1600);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden" id="ticket-investigator-module">
      
      {/* Header bar */}
      <div className="bg-slate-900 text-white p-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-amber-400 animate-pulse" />
          <h2 className="font-extrabold text-sm uppercase tracking-wider">{t.investigatorTitle}</h2>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{t.investigatorSub}</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          onClick={() => { setActiveSubTab('investigate'); setIsGateUnlocked(false); }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border-b-2 ${activeSubTab === 'investigate' ? 'border-fifa-blue text-fifa-blue bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Cpu size={14} />
          <span>{t.tabInvestigate}</span>
        </button>
        <button
          onClick={() => setActiveSubTab('scan')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border-b-2 ${activeSubTab === 'scan' ? 'border-fifa-blue text-fifa-blue bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <QrCode size={14} />
          <span>{t.tabScan}</span>
        </button>
      </div>

      {/* Body content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: ANTI-FRAUD FORENSIC DETECTOR */}
          {activeSubTab === 'investigate' && (
            <motion.div
              key="investigate-subview"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              {/* Search Panel */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder={t.placeholderId}
                    disabled={isInvestigating}
                    className="w-full pl-9 pr-3 py-3 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-fifa-blue bg-white text-slate-900"
                  />
                </div>
                <button
                  onClick={() => runForensicAnalysis('VALID')}
                  disabled={isInvestigating}
                  className="bg-slate-900 hover:bg-slate-950 text-white font-bold px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Database size={13} />
                  <span>{t.detectBtn.split(' ')[0]}</span>
                </button>
              </div>

              {/* Progress and simulation */}
              {isInvestigating && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
                    <RefreshCw size={14} className="animate-spin text-fifa-blue" />
                    <span>{t.analyzingText}</span>
                  </div>
                  
                  {/* Step Indicators */}
                  <div className="space-y-1.5 text-[10px] font-bold text-slate-500">
                    <div className={`flex items-center gap-2 ${investigationStep >= 1 ? 'text-slate-900' : ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${investigationStep >= 1 ? 'bg-fifa-green animate-pulse' : 'bg-slate-300'}`} />
                      <span>{t.step1}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${investigationStep >= 2 ? 'text-slate-900' : ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${investigationStep >= 2 ? 'bg-fifa-green animate-pulse' : 'bg-slate-300'}`} />
                      <span>{t.step2}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${investigationStep >= 3 ? 'text-slate-900' : ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${investigationStep >= 3 ? 'bg-fifa-green animate-pulse' : 'bg-slate-300'}`} />
                      <span>{t.step3}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Result display */}
              {!isInvestigating && forensicResult.status !== 'IDLE' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`border rounded-xl p-4 space-y-3.5 ${
                    forensicResult.status === 'VERIFIED' 
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                      : forensicResult.status === 'FRAUD_DETECTED'
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  
                  {/* Status Headline Badge */}
                  <div className="flex items-center justify-between border-b pb-2 border-current/15">
                    <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-tight">
                      {forensicResult.status === 'VERIFIED' ? (
                        <>
                          <ShieldCheck size={16} className="text-emerald-600 animate-bounce" />
                          <span>{t.statusVerified}</span>
                        </>
                      ) : forensicResult.status === 'FRAUD_DETECTED' ? (
                        <>
                          <AlertOctagon size={16} className="text-rose-600 animate-pulse" />
                          <span className="text-rose-600">{t.statusFraud}</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert size={16} className="text-amber-600" />
                          <span className="text-amber-600">{t.statusSuspended}</span>
                        </>
                      )}
                    </div>
                    <span className="text-[9px] font-bold opacity-75">{forensicResult.ledgerIndex}</span>
                  </div>

                  {/* Body explanation */}
                  <div className="text-[11px] font-medium leading-relaxed">
                    <p className="font-bold">
                      {forensicResult.status === 'VERIFIED' ? t.verifiedMsg : forensicResult.status === 'FRAUD_DETECTED' ? t.fraudMsg : t.suspendedMsg}
                    </p>
                    
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] bg-white/50 p-2.5 rounded border border-current/10">
                      <div>
                        <span className="opacity-60 block uppercase font-bold text-[8px]">TICKET ID / HASH</span>
                        <span className="font-mono font-bold select-all">{forensicResult.ticketId}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block uppercase font-bold text-[8px]">HOLDER</span>
                        <span className="font-bold">{forensicResult.holder}</span>
                      </div>
                      <div className="col-span-2 border-t pt-1.5 mt-1 border-current/10">
                        <span className="opacity-60 block uppercase font-bold text-[8px]">SEATING REGISTERED</span>
                        <span className="font-bold">{forensicResult.seat}</span>
                      </div>
                    </div>
                  </div>

                  {/* Errors block (If Fake/Suspended) */}
                  {forensicResult.errors.length > 0 && (
                    <div className="bg-rose-950/5 border border-rose-200 rounded p-2.5 space-y-1">
                      <span className="text-[8px] uppercase font-black text-rose-700 tracking-wider">FORENSIC SECURITY ANALYSIS:</span>
                      {forensicResult.errors.map((err, i) => (
                        <div key={i} className="flex gap-1.5 items-start text-[10px] text-rose-800 font-bold">
                          <span>•</span>
                          <p>{err}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action instructions if verified */}
                  {forensicResult.status === 'VERIFIED' && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => setActiveSubTab('scan')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase py-1.5 px-3 rounded flex items-center gap-1 cursor-pointer"
                      >
                        <span>Scan at gate turnstile</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  )}

                </motion.div>
              )}

              {/* Forensic scenarios picker */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{t.sampleTickets}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => runForensicAnalysis('VALID')}
                    className="p-2 border border-emerald-200 hover:border-emerald-400 bg-emerald-50/20 text-emerald-800 text-[10px] font-black rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ShieldCheck size={12} className="text-emerald-600" />
                    <span>{t.sampleValid}</span>
                  </button>
                  <button
                    onClick={() => runForensicAnalysis('FAKE')}
                    className="p-2 border border-rose-200 hover:border-rose-400 bg-rose-50/20 text-rose-800 text-[10px] font-black rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <AlertOctagon size={12} className="text-rose-600" />
                    <span>{t.sampleInvalid}</span>
                  </button>
                  <button
                    onClick={() => runForensicAnalysis('VOID')}
                    className="p-2 border border-amber-200 hover:border-amber-400 bg-amber-50/20 text-amber-800 text-[10px] font-black rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ShieldAlert size={12} className="text-amber-600" />
                    <span>{t.sampleVoid}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: GATE ENTRY PASS SCANNER */}
          {activeSubTab === 'scan' && (
            <motion.div
              key="scan-subview"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              
              {!activeTicket ? (
                <div className="p-6 text-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 space-y-2">
                  <Lock size={28} className="mx-auto text-slate-400" />
                  <p className="text-xs font-bold uppercase tracking-tight">No Active Verified Ticket Loaded</p>
                  <p className="text-[10px] text-slate-400">Please load or verify a ticket first in the "Anti-Fraud Detector" or "Ticket Finder" to generate your gate pass.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Interactive NFC / QR Pass Ticket */}
                  <div className="bg-slate-950 text-white rounded-xl overflow-hidden border border-slate-800 shadow-md relative">
                    
                    {/* Glowing scanning feedback line */}
                    {isScanningAtGate && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg animate-pulse" />
                    )}

                    <div className="p-3 bg-slate-900 border-b border-slate-950 flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-slate-300">
                      <span>SECURE CONTACTLESS PASS</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-widest">
                        FIFA VERIFIED
                      </span>
                    </div>

                    <div className="p-4 flex flex-col items-center text-center space-y-4">
                      
                      {/* Ticket Basic Details */}
                      <div>
                        <div className="text-[10px] text-slate-400 font-extrabold uppercase">ASSIGNED GATE</div>
                        <div className="text-2xl font-black text-amber-400">{activeTicket.gate}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5 font-semibold">
                          Stand {activeTicket.zone} • Section {activeTicket.section} • Row {activeTicket.row} • Seat {activeTicket.seat}
                        </div>
                      </div>

                      {/* Mock QR Scan Animation */}
                      <div className="p-4 bg-white rounded-xl border-4 border-slate-900 relative">
                        <QrCode size={120} className="text-slate-950" />
                        <ScanLine size={135} className="absolute -top-2 left-2 text-emerald-500 animate-bounce opacity-85" />
                        
                        {isScanningAtGate && (
                          <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-white font-black text-xs uppercase animate-pulse">
                            <Radio size={24} className="text-emerald-400 animate-spin" />
                          </div>
                        )}
                      </div>

                      {/* Instructions */}
                      <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
                        {t.scanSub}
                      </p>

                      {/* Interactive Trigger Button */}
                      <button
                        onClick={handleSimulateGateScan}
                        disabled={isScanningAtGate}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isScanningAtGate ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            <span>{t.scanningNFC}</span>
                          </>
                        ) : (
                          <>
                            <Radio size={13} className="animate-pulse" />
                            <span>{t.scanBtn}</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>

                  {/* Scanning outcome turnstile trigger */}
                  <AnimatePresence>
                    {isGateUnlocked && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-950 space-y-3.5"
                      >
                        <div className="flex items-center gap-2 border-b border-emerald-500/15 pb-2">
                          <Unlock size={16} className="text-emerald-600 animate-bounce" />
                          <span className="font-black text-xs uppercase text-emerald-600">{t.scannedSuccess}</span>
                        </div>
                        
                        <p className="text-xs text-slate-700 font-medium">
                          {t.scannedSub}
                        </p>

                        <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-700 font-semibold flex flex-col gap-2 shadow-xs">
                          <h4 className="font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1 text-[11px]">
                            <Compass size={13} className="text-emerald-600" />
                            <span>{t.gateGuide}</span>
                          </h4>
                          
                          <div className="flex items-center gap-1 text-[11px]">
                            <span className="text-slate-500 font-bold">{t.gateProceed}</span>
                            <span className="bg-slate-100 text-slate-950 px-2 py-0.5 rounded font-black border border-slate-200">{activeTicket.gate}</span>
                          </div>
                          
                          <div className="text-[11px]">
                            <span className="text-slate-500 font-bold">{t.gateWalk} </span>
                            <strong className="text-slate-950 underline">{activeTicket.section}</strong>.
                          </div>

                          <div className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 font-extrabold uppercase flex items-center gap-1.5 mt-1">
                            <CheckCircle size={12} />
                            <span>{t.secureGateBadge}</span>
                          </div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
