import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zone, Gate } from '../types';
import SeatMapVisualizer from './SeatMapVisualizer';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Compass, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

interface TicketUploaderProps {
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
  onTicketLoaded: (zone: Zone, gate: Gate, details: { section: string; row: string; seat: string; imageUrl?: string }) => void;
  onClearTicket: () => void;
  activeTicket: { zone: Zone; gate: Gate; section: string; row: string; seat: string; imageUrl?: string } | null;
}

const localTranslations = {
  EN: {
    title: "Instant Seat & Gate Finder",
    subtitle: "Upload your mobile matchday ticket to locate your exact stand, assigned gate, and personalized safety corridor.",
    dragDropText: "Drag and drop your digital ticket here",
    orPick: "or click to select PDF or image file",
    processing: "Scanning ticket & validating digital certificate...",
    success: "Ticket verified successfully!",
    demoTitle: "Try with a Demo Tournament Ticket",
    demoSub: "Click any category below to simulate scanning a real 2026 seat pass:",
    viewRoute: "Map Secure Gate Path",
    clear: "Scan Different Ticket",
    ticketHeader: "OFFICIAL MATCH ENTRY PASS",
    section: "Section",
    row: "Row",
    seat: "Seat",
    gate: "Assigned Gate",
    safetyAdv: "Custom Safety Corridor",
    stand: "Stand",
    stadiumEntranceGuide: "Your Matchday Entry Plan:",
    step1: "Access through outer ring via",
    step2: "Your seat is on level 100/200 near section",
    step3: "Nearest safety corridor is green lighted. Keep device secure.",
    manualLabel: "Manually Enter Seat Details",
    enterDetails: "If you don't have a digital file, input your seat details manually below:",
    inputSection: "Section (e.g. N104)",
    inputRow: "Row (e.g. 15)",
    inputSeat: "Seat (e.g. 12)",
    findMySeatBtn: "Generate Walkthrough",
    supportSupporters: "Loud Supporter Zone. High-energy cheering active. Hearing protection suggested for toddlers.",
    supportVip: "Premium Concourse Access. Shorter queues at Lounge concessions.",
    supportFamily: "Family Seating Zone. Close access to play area and baby care.",
    supportGeneral: "General Admission. Highly secure corridor with rapid-exit pathways."
  },
  ES: {
    title: "Buscador de Asientos y Puertas",
    subtitle: "Suba su entrada móvil para ubicar su tribuna exacta, puerta asignada y corredor de seguridad personalizado.",
    dragDropText: "Arrastre y suelte su boleto digital aquí",
    orPick: "o haga clic para seleccionar un archivo PDF o imagen",
    processing: "Escaneando entrada y validando certificado digital...",
    success: "¡Entrada verificada con éxito!",
    demoTitle: "Probar con un Boleto Demo del Torneo",
    demoSub: "Haga clic abajo para simular el escaneo de un pase real del 2026:",
    viewRoute: "Trazar Ruta en el Mapa",
    clear: "Escanear Otra Entrada",
    ticketHeader: "PASE OFICIAL DE ENTRADA",
    section: "Sección",
    row: "Fila",
    seat: "Asiento",
    gate: "Puerta Asignada",
    safetyAdv: "Corredor de Seguridad",
    stand: "Tribuna",
    stadiumEntranceGuide: "Su Plan de Entrada:",
    step1: "Acceda por el anillo exterior por la",
    step2: "Su asiento está en el nivel 100/200 cerca de",
    step3: "El corredor verde está iluminado. Mantenga su celular seguro.",
    manualLabel: "Ingresar Detalles Manualmente",
    enterDetails: "Si no tiene un archivo digital, ingrese los detalles de su asiento aquí:",
    inputSection: "Sección (ej. N104)",
    inputRow: "Fila (ej. 15)",
    inputSeat: "Asiento (ej. 12)",
    findMySeatBtn: "Generar Ruta",
    supportSupporters: "Zona de Animación. Energía alta. Se sugiere protección auditiva para niños.",
    supportVip: "Acceso Premium. Filas más cortas en concesiones del Lounge.",
    supportFamily: "Zona Familiar. Acceso cercano a área de juegos y cuidado de bebés.",
    supportGeneral: "Admisión General. Corredor altamente seguro con salidas rápidas."
  },
  KO: {
    title: "실시간 좌석 & 게이트 조회",
    subtitle: "모바일 매치데이 티켓을 업로드하여 입장 구역, 배정된 게이트 및 개인 맞춤형 안전 이동 통로를 바로 확인하세요.",
    dragDropText: "여기에 디지털 티켓을 끌어서 놓으세요",
    orPick: "또는 클릭하여 PDF나 이미지 파일을 선택하세요",
    processing: "티켓 스캔 및 디지털 인증서 검증 중...",
    success: "티켓 인증에 성공했습니다!",
    demoTitle: "데모용 티켓으로 테스트하기",
    demoSub: "아래 카테고리를 클릭하면 2026년 매치 패스 가상 스캔이 진행됩니다:",
    viewRoute: "안전 게이트 이동 경로 지도 보기",
    clear: "다른 티켓 스캔하기",
    ticketHeader: "공식 매치데이 입장 패스",
    section: "구역 (Section)",
    row: "열 (Row)",
    seat: "좌석 (Seat)",
    gate: "배정된 게이트",
    safetyAdv: "맞춤형 안전 통로",
    stand: "스탠드 (Stand)",
    stadiumEntranceGuide: "오늘의 경기장 입장 안내:",
    step1: "외부 게이트를 통한 입장:",
    step2: "내 좌석은 100/200 레벨 부근 구역에 있습니다:",
    step3: "초록색으로 표시된 안전 통로가 활성화되었습니다. 모바일을 안전하게 소지하세요.",
    manualLabel: "수동으로 좌석 정보 입력하기",
    enterDetails: "디지털 파일이 없으시다면 아래에 직접 좌석 정보를 입력해 주세요:",
    inputSection: "구역 (예: N104)",
    inputRow: "열 (예: 15)",
    inputSeat: "좌석 (예: 12)",
    findMySeatBtn: "안내 경로 생성하기",
    supportSupporters: "열정적인 서포터즈 응원 구역입니다. 소음이 다소 발생할 수 있어, 영유아는 보호 장구가 필요할 수 있습니다.",
    supportVip: "프리미엄 콘코스 입장 혜택이 적용됩니다. 라운지 전용 매점의 대기 줄이 비교적 짧습니다.",
    supportFamily: "가족 관람 존입니다. 플레이 놀이방 및 수유실 가깝게 위치하고 있습니다.",
    supportGeneral: "일반 자유 관람 석입니다. 신속한 퇴장이 가능한 안전 대피로와 직결되어 있습니다."
  },
  AR: {
    title: "مكتشف المقعد والبوابة الفوري",
    subtitle: "قم بتحميل تذكرة المباراة الخاصة بك لتحديد موقع مدرجك بالضبط، بوابتك المخصصة، وممر الأمان المخصص لك.",
    dragDropText: "اسحب وأسقط تذكرتك الرقمية هنا",
    orPick: "أو انقر لاختيار ملف PDF أو صورة",
    processing: "جاري فحص التذكرة والتحقق من الشهادة الرقمية...",
    success: "تم التحقق من التذكرة بنجاح!",
    demoTitle: "جرب باستخدام تذكرة تجريبية للبطولة",
    demoSub: "انقر فوق أي فئة أدناه لمحاكاة فحص تذكرة حقيقية لعام 2026:",
    viewRoute: "تحديد مسار البوابة الآمنة",
    clear: "فحص تذكرة أخرى",
    ticketHeader: "تذكرة الدخول الرسمية للمباراة",
    section: "القسم",
    row: "الصف",
    seat: "المقعد",
    gate: "البوابة المخصصة",
    safetyAdv: "ممر الأمان المخصص",
    stand: "المدرج",
    stadiumEntranceGuide: "خطة دخول الملعب الخاصة بك:",
    step1: "الدخول عبر الحلقة الخارجية من خلال",
    step2: "يقع مقعدك في المستوى 100/200 بالقرب من القسم",
    step3: "ممر الأمان المضيء باللون الأخضر نشط. حافظ على أمان جهازك.",
    manualLabel: "أدخل تفاصيل المقعد يدوياً",
    enterDetails: "إذا لم يكن لديك ملف تذكرة، أدخل تفاصيل مقعدك يدوياً أدناه:",
    inputSection: "القسم (مثال: N104)",
    inputRow: "الصف (مثال: 15)",
    inputSeat: "المقعد (مثال: 12)",
    findMySeatBtn: "توليد خطة الدخول",
    supportSupporters: "منطقة المشجعين الصاخبة. تشجيع عالي ومستمر. يُنصح بحماية السمع للأطفال.",
    supportVip: "دخول مميز للممرات القريبة من صالات كبار الشخصيات مع طوابير أقصر.",
    supportFamily: "منطقة العائلات. بالقرب من منطقة ألعاب الأطفال ورعاية الرضع.",
    supportGeneral: "الدخول العام. ممر آمن للغاية مع مسارات خروج سريعة وميسرة."
  },
  JA: {
    title: "座席＆ゲートナビ",
    subtitle: "モバイルマッチチケットをアップロードして、正確なスタンド、指定された入場ゲート、およびパーソナライズされた安全通路を特定します。",
    dragDropText: "ここにデジタルチケットをドラッグ＆ドロップ",
    orPick: "またはクリックしてPDFや画像ファイルを選択",
    processing: "チケットのスキャン及びデジタル証明書の認証中...",
    success: "チケット認証に成功しました！",
    demoTitle: "デモ用のチケットで試す",
    demoSub: "以下のカテゴリーをクリックして、2026年大会のパススキャンをシミュレートします：",
    viewRoute: "マップでルートを確認する",
    clear: "別のチケットをスキャン",
    ticketHeader: "公式観戦チケット入場パス",
    section: "ブロック",
    row: "列",
    seat: "座席番号",
    gate: "指定ゲート",
    safetyAdv: "専用安全通路",
    stand: "スタンド",
    stadiumEntranceGuide: "本日の入場計画:",
    step1: "外周サークルから入場するゲート:",
    step2: "お座席はレベル100/200の付近です。ブロック:",
    step3: "緑に点灯した安全誘導路を進んでください。スマホは安全な場所に保管してください。",
    manualLabel: "手動で座席情報を入力する",
    enterDetails: "デジタルチケットファイルをお持ちでない場合は、以下に座席情報を手動で入力してください：",
    inputSection: "ブロック名 (例: N104)",
    inputRow: "列 (例: 15)",
    inputSeat: "座席番号 (例: 12)",
    findMySeatBtn: "案内ガイドを生成",
    supportSupporters: "サポーター専用熱狂エリア。大声での歓声が響きます。小さなお子様は防音対策を推奨します。",
    supportVip: "プレミアムコンコースエリア。ラウンジ内の売店をスムーズにご利用いただけます。",
    supportFamily: "ファミリー観戦エリア。キッズスペースや授乳室が近くに完備されています。",
    supportGeneral: "一般アクセスエリア。迅速な避難が可能な防犯・安全優先通路が指定されています。"
  }
};

const DEMO_TICKETS = [
  { label: "🏅 Category 1 - VIP (West)", zone: "West" as Zone, gate: "Gate G" as Gate, section: "W115", row: "8", seat: "24", textStyle: "text-indigo-700 bg-indigo-50 border-indigo-200", support: "supportVip" },
  { label: "🔥 Supporters Section (South)", zone: "South" as Zone, gate: "Gate E" as Gate, section: "S202", row: "4", seat: "11", textStyle: "text-emerald-700 bg-emerald-50 border-emerald-200", support: "supportSupporters" },
  { label: "👨‍👩‍👧 Family Section (North)", zone: "North" as Zone, gate: "Gate A" as Gate, section: "N104", row: "15", seat: "3", textStyle: "text-sky-700 bg-sky-50 border-sky-200", support: "supportFamily" },
  { label: "🎟️ General Admission (East)", zone: "East" as Zone, gate: "Gate C" as Gate, section: "E120", row: "21", seat: "109", textStyle: "text-amber-700 bg-amber-50 border-amber-200", support: "supportGeneral" },
];

export default function TicketUploader({
  language,
  onTicketLoaded,
  onClearTicket,
  activeTicket
}: TicketUploaderProps) {
  const t = localTranslations[language] || localTranslations.EN;

  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanStepLog, setScanStepLog] = useState('');
  const [simulatedValidationMode, setSimulatedValidationMode] = useState<'authentic' | 'counterfeit'>('authentic');
  const [analysisDetails, setAnalysisDetails] = useState<{
    fileName: string;
    fileType: string;
    isVerified: boolean;
    extractedYear: number;
    extractedDate: string;
    extractedTime: string;
    qrCodeStatus?: string;
    errorReason: string;
  } | null>(null);
  
  // Manual Input states
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualSection, setManualSection] = useState('');
  const [manualRow, setManualRow] = useState('');
  const [manualSeat, setManualSeat] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScanSimulation = (zone: Zone, gate: Gate, section: string, row: string, seat: string, imageUrl?: string) => {
    setIsProcessing(true);
    setUploadProgress(0);
    setErrorMessage('');
    setAnalysisDetails(null);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            onTicketLoaded(zone, gate, { section, row, seat, imageUrl });
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processUploadedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    // Reset previous states
    setErrorMessage('');
    setAnalysisDetails(null);
    setScanStepLog('');

    // Check if the file format is a PDF or a screenshot image (png, jpg, jpeg)
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = validTypes.includes(file.type) || file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg');

    if (!isPDF && !isImage) {
      setErrorMessage(
        language === 'EN' ? "⚠️ Invalid file format. Please upload a PDF file or an Image screenshot (PNG, JPG, JPEG) to extract matching ticket timestamps." :
        language === 'ES' ? "⚠️ Formato de archivo no válido. Suba un PDF o un pantallazo de imagen (PNG, JPG, JPEG) para verificar." :
        language === 'KO' ? "⚠️ 올바르지 않은 파일 형식입니다. 스크린샷 이미지(PNG, JPG)나 PDF 파일 형식으로 업로드해 주세요." :
        language === 'JA' ? "⚠️ 無効なファイル形式です。スクリーンショット（PNG, JPG）またはPDF形式でアップロードしてください。" :
        "⚠️ صيغة غير صالحة. يرجى تحميل ملف PDF أو صورة لقطة شاشة (PNG, JPG) لاستخراج معلومات التذكرة."
      );
      return;
    }

    // Read file as Data URL (base64) so we can preserve and display the user's uploaded ticket offline!
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      runSimulation(file, isPDF, base64Url);
    };
    reader.readAsDataURL(file);
  };

  const runSimulation = (file: File, isPDF: boolean, base64Url: string) => {
    setIsProcessing(true);
    setUploadProgress(0);

    const formatLabel = isPDF ? 'PDF Document' : 'Screenshot Image';

    // Steps mimicking QR scanning, tournament year alignment, match schedule checks, and signature audit.
    const steps = [
      { progress: 10, log: language === 'EN' ? `Extracting files & reading OCR grids (${formatLabel})...` : "Extrayendo archivos y leyendo cuadrículas de OCR..." },
      { progress: 30, log: language === 'EN' ? "Scanning ticket QR Code signature payload..." : "Escaneando firma criptográfica del código QR..." },
      { progress: 55, log: language === 'EN' ? "Checking tournament credentials (Year: 2026, Kickoff verification)..." : "Verificando credenciales del torneo (Año 2026)..." },
      { progress: 80, log: language === 'EN' ? "Matching extracted timestamps with active matchday schedule..." : "Cruzando marcas de tiempo con el calendario oficial..." },
      { progress: 100, log: language === 'EN' ? "Audit complete. Generating forensic report..." : "Auditoría completada. Generando informe forense..." }
    ];

    let currentStepIndex = 0;

    // Detect if file is counterfeit based on file name keywords OR selected validation mode
    const isNameCounterfeit = /fake|bad|expired|invalid|2024|2025|counterfeit|copy/i.test(file.name);
    const isCounterfeit = isNameCounterfeit || simulatedValidationMode === 'counterfeit';

    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setUploadProgress(step.progress);
        setScanStepLog(step.log);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setScanStepLog('');

          const fileTypeStr = isPDF ? "PDF Document" : "Screenshot Image (OCR Active)";

          if (isCounterfeit) {
            // Counterfeit route: Check fails on year (2024), incorrect time, or fake QR code signature
            const wrongReasonMessages = {
              EN: "Outdated match credentials detected. The uploaded ticket belongs to a past tournament (Year: 2024/2025). 2026 FIFA World Cup matches require a valid 2026-stamped ticket. Additionally, the QR Code cryptographic checksum is counterfeit or unverified.",
              ES: "Se detectaron credenciales obsoletas de un torneo anterior (Año: 2024/2025). La Copa Mundial de la FIFA 2026 requiere un boleto válido con fecha de 2026 y firma del código QR autorizada.",
              KO: "만료된 이전 토너먼트 티켓(연도: 2024/2025)이 감지되었습니다. 2026 FIFA 월드컵 게이트 입장을 위해 올해(2026년)의 올바른 티켓 파일을 다시 업로드해 주세요. 또한 QR 코드 암호화 서명 검증에 실패했습니다.",
              JA: "過去の大会チケット情報が検出されました（年：2024/2025）。2026年FIFAワールドカップの入場には、今年（2026年）の有効な電子チケットが必要です。また、QRコードの署名確認に失敗しました（偽造の疑い）。",
              AR: "تم الكشف عن تذكرة قديمة تابعة لبطولة سابقة (عام: 2024/2025). يتطلب دخول كأس العالم فيفا 2026 تذكرة صالحة لعام 2026 مع توقيع رمز QR مشفر وصالح."
            };

            setAnalysisDetails({
              fileName: file.name,
              fileType: fileTypeStr,
              isVerified: false,
              extractedYear: 2024,
              extractedDate: "July 19th, 2024 (Expired)",
              extractedTime: "14:30 EST (Match Over)",
              qrCodeStatus: "⚠️ CRYPTO SIGNATURE MISMATCH (UNVERIFIED)",
              errorReason: wrongReasonMessages[language] || wrongReasonMessages.EN
            });

            setErrorMessage(
              language === 'EN' ? "⚠️ Authentication Failed: Outdated match year or counterfeit QR signature detected. Please upload a valid 2026 ticket." :
              language === 'ES' ? "⚠️ Fallo de Autenticación: Año de entrada desactualizado o código QR falso. Por favor, suba el boleto de este año de la Copa Mundial 2026." :
              language === 'KO' ? "⚠️ 인증 실패: 오래되거나 잘못된 연도 또는 유효하지 않은 QR 서명이 감지되었습니다. 2026년 월드컵 티켓을 다시 업로드해 주세요." :
              language === 'JA' ? "⚠️ 認証に失敗しました：古い大会のチケット、または不正なQRコード署名が検出されました。今年（2026年）のチケットをアップロードしてください。" :
              "⚠️ فشل المصادقة: تم الكشف عن سنة تذكرة قديمة أو توقيع رمز QR غير صالح. يرجى تحميل تذكرة كأس العالم 2026."
            );
          } else {
            // Authentic Route: Extract seat specs from filename or fallback to nice defaults
            let section = "W115";
            let row = "14";
            let seat = "24";

            // OCR-style filename parser to extract Section, Row, Seat directly
            const secMatch = file.name.match(/([NSEWnsew])[-_ ]*(\d{3})/);
            if (secMatch) {
              section = secMatch[1].toUpperCase() + secMatch[2];
            }
            const rowMatch = file.name.match(/row[-_ ]*(\d+)/i) || file.name.match(/r[-_ ]*(\d+)/i);
            if (rowMatch) {
              row = rowMatch[1];
            }
            const seatMatch = file.name.match(/seat[-_ ]*(\d+)/i) || file.name.match(/s[-_ ]*(\d+)/i);
            if (seatMatch) {
              seat = seatMatch[1];
            }

            // Deduce Zone & Gate based on Stand letter prefix
            let zone: Zone = 'North';
            let gate: Gate = 'Gate A';
            const cleanSec = section.toUpperCase();
            if (cleanSec.startsWith('S')) {
              zone = 'South';
              gate = 'Gate E';
            } else if (cleanSec.startsWith('E')) {
              zone = 'East';
              gate = 'Gate C';
            } else if (cleanSec.startsWith('W')) {
              zone = 'West';
              gate = 'Gate G';
            }

            setAnalysisDetails({
              fileName: file.name,
              fileType: fileTypeStr,
              isVerified: true,
              extractedYear: 2026,
              extractedDate: "July 19th, 2026 (Live Matchday)",
              extractedTime: "16:00 EST (Gates Open)",
              qrCodeStatus: "✅ SECURE FIFA CRYPTO SIGNATURE OK (MATCHDAY ID: 8294)",
              errorReason: language === 'EN' ? `Ticket parsed successfully! Seat extracted: Section ${section}, Row ${row}, Seat ${seat}. Click below to map.` : `¡Entrada analizada con éxito! Asiento extraído: Sección ${section}, Fila ${row}, Asiento ${seat}.`
            });

            // Smoothly complete the action and load the ticket!
            setTimeout(() => {
              onTicketLoaded(zone, gate, { section, row, seat, imageUrl: base64Url });
            }, 1400);
          }
        }, 500);
      }
    }, 450);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSection.trim()) {
      setErrorMessage(language === 'EN' ? 'Section code is required.' : 'Se requiere código de sección.');
      return;
    }

    // Determine Stand Zone based on Section letter prefix (N, S, E, W)
    let zone: Zone = 'North';
    let gate: Gate = 'Gate A';

    const cleanSec = manualSection.trim().toUpperCase();
    if (cleanSec.startsWith('S')) {
      zone = 'South';
      gate = 'Gate E';
    } else if (cleanSec.startsWith('E')) {
      zone = 'East';
      gate = 'Gate C';
    } else if (cleanSec.startsWith('W')) {
      zone = 'West';
      gate = 'Gate G';
    } else {
      // Default fallback
      zone = 'North';
      gate = 'Gate A';
    }

    startScanSimulation(
      zone, 
      gate, 
      cleanSec, 
      manualRow.trim() || '12', 
      manualSeat.trim() || '4'
    );
  };

  const getZoneBadgeStyle = (zone: Zone) => {
    if (zone === 'North') return 'bg-sky-500 text-white border-sky-600';
    if (zone === 'East') return 'bg-amber-500 text-slate-950 border-amber-600';
    if (zone === 'South') return 'bg-emerald-500 text-slate-950 border-emerald-600';
    return 'bg-indigo-600 text-white border-indigo-700';
  };

  const getSupportAdvice = (zone: Zone) => {
    if (zone === 'North') return t.supportFamily;
    if (zone === 'East') return t.supportGeneral;
    if (zone === 'South') return t.supportSupporters;
    return t.supportVip;
  };

  return (
    <div className="flex flex-col h-full shadow-md rounded-xl overflow-hidden" id="ticket-seat-panel">
      {/* Dynamic Sub-header */}
      <div className="p-3.5 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between border-b border-slate-950">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-fifa-green" />
          <span>{t.title}</span>
        </div>
        <span className="text-[9px] bg-fifa-green/10 text-fifa-green border border-fifa-green/20 px-2 py-0.5 rounded font-black tracking-wide flex items-center gap-1">
          <Sparkles size={10} /> SECURED
        </span>
      </div>

      <div className="p-4 bg-white border border-slate-200 border-t-0 flex-1 flex flex-col gap-4 rounded-b-xl">
        <AnimatePresence mode="wait">
          {!activeTicket ? (
            <motion.div
              key="uploader-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{t.title}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{t.subtitle}</p>
              </div>

              {/* Simulated Mode Selector for validation testing */}
              <div className="bg-slate-100 p-1 rounded-lg flex items-center justify-between text-[10px] font-bold gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSimulatedValidationMode('authentic')}
                  className={`flex-1 text-center py-1.5 px-1 rounded-md transition-all cursor-pointer ${
                    simulatedValidationMode === 'authentic' 
                      ? 'bg-fifa-green text-white shadow-xs font-black' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  🟢 {language === 'EN' ? "Simulate Valid 2026 Ticket" : "Simular Entrada Válida 2026"}
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedValidationMode('counterfeit')}
                  className={`flex-1 text-center py-1.5 px-1 rounded-md transition-all cursor-pointer ${
                    simulatedValidationMode === 'counterfeit' 
                      ? 'bg-rose-600 text-white shadow-xs font-black' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  🔴 {language === 'EN' ? "Simulate Fake/Expired Check" : "Simular Falsificaciones"}
                </button>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragActive 
                    ? 'border-fifa-green bg-emerald-50/50 scale-[1.01]' 
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-400'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  className="hidden"
                />

                {isProcessing ? (
                  <div className="flex flex-col items-center gap-3 py-2 w-full max-w-xs">
                    <RefreshCw size={28} className="text-fifa-blue animate-spin" />
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-wide">{t.processing}</span>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-fifa-green h-full rounded-full transition-all duration-150" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white rounded-full border border-slate-200 text-slate-400 shadow-xs">
                      <Upload size={22} className="text-slate-500" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 leading-none">{t.dragDropText}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{t.orPick}</span>
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex gap-2 items-center">
                  <AlertTriangle size={15} className="shrink-0" />
                  <span className="font-semibold">{errorMessage}</span>
                </div>
              )}

              {/* Dynamic Forensic Audit report card */}
              {analysisDetails && (
                <div className={`p-4 border rounded-xl flex flex-col gap-3 animate-fade-in ${
                  analysisDetails.isVerified 
                    ? 'bg-emerald-50 border-emerald-200 text-slate-800' 
                    : 'bg-rose-50 border-rose-200 text-slate-800'
                }`} id="forensic-audit-report">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={16} className={analysisDetails.isVerified ? "text-emerald-600" : "text-rose-600"} />
                      <span className="font-extrabold text-[11px] uppercase tracking-wider text-slate-900">
                        {language === 'EN' ? "Forensic Ticket Audit Report" : "Auditoría de Entrada de Boletos"}
                      </span>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-black tracking-wide uppercase ${
                      analysisDetails.isVerified 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-rose-600 text-white'
                    }`}>
                      {analysisDetails.isVerified ? "PASSED" : "FAILED / REFUSED"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono leading-relaxed">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">File Type:</span>
                      <span className="font-extrabold text-slate-700">{analysisDetails.fileType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Extracted Year:</span>
                      <span className={`font-extrabold ${analysisDetails.extractedYear === 2026 ? "text-emerald-600" : "text-rose-600 line-through"}`}>
                        {analysisDetails.extractedYear} {analysisDetails.extractedYear !== 2026 && "(OUTDATED)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Match Date Check:</span>
                      <span className="font-extrabold text-slate-700">{analysisDetails.extractedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Match Time Check:</span>
                      <span className="font-extrabold text-slate-700">{analysisDetails.extractedTime}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">QR Code Cryptographic Signature:</span>
                      <span className={`font-black tracking-tight ${analysisDetails.isVerified ? "text-emerald-600" : "text-rose-600"}`}>
                        {analysisDetails.qrCodeStatus || "FAILED"}
                      </span>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed font-semibold border ${
                    analysisDetails.isVerified 
                      ? 'bg-emerald-100/50 border-emerald-300 text-emerald-950' 
                      : 'bg-rose-100/50 border-rose-300 text-rose-950'
                  }`}>
                    {analysisDetails.errorReason}
                  </div>
                </div>
              )}

              {/* Demo Selectors */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-2">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={11} className="text-fifa-green animate-pulse" /> {t.demoTitle}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.demoSub}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_TICKETS.map((demo) => (
                    <button
                      key={demo.section}
                      type="button"
                      onClick={() => startScanSimulation(demo.zone, demo.gate, demo.section, demo.row, demo.seat)}
                      className={`p-2 rounded border text-left text-[10px] font-black transition-all hover:shadow-xs hover:border-slate-400 cursor-pointer flex items-center justify-between ${demo.textStyle}`}
                    >
                      <span>{demo.label}</span>
                      <ArrowRight size={10} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Input Toggle */}
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualInput(!showManualInput)}
                  className="text-[10px] font-extrabold text-fifa-blue uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <FileText size={12} /> {t.manualLabel}
                </button>

                {showManualInput && (
                  <form onSubmit={handleManualSubmit} className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 animate-fade-in">
                    <div className="flex flex-col gap-1 col-span-3 text-[9px] font-black text-slate-500 uppercase tracking-wide mb-1">
                      {t.enterDetails}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">{t.inputSection}</label>
                      <input
                        type="text"
                        value={manualSection}
                        onChange={(e) => setManualSection(e.target.value)}
                        placeholder="N104"
                        className="p-1.5 border border-slate-300 rounded bg-white text-slate-900 text-xs font-bold uppercase focus:outline-none focus:ring-1 focus:ring-fifa-green"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">{t.inputRow}</label>
                      <input
                        type="text"
                        value={manualRow}
                        onChange={(e) => setManualRow(e.target.value)}
                        placeholder="12"
                        className="p-1.5 border border-slate-300 rounded bg-white text-slate-900 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-fifa-green"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">{t.inputSeat}</label>
                      <input
                        type="text"
                        value={manualSeat}
                        onChange={(e) => setManualSeat(e.target.value)}
                        placeholder="4"
                        className="p-1.5 border border-slate-300 rounded bg-white text-slate-900 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-fifa-green"
                      />
                    </div>
                    <button
                      type="submit"
                      className="col-span-3 mt-2 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      {t.findMySeatBtn}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ticket-card-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3.5"
            >
              {/* FIFA World Cup Golden Ticket Card Mock */}
              <div className="relative overflow-hidden bg-slate-950 text-white rounded-xl border border-amber-500/35 shadow-lg flex flex-col">
                
                {/* Visual side band decoration */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />

                {/* Card Header */}
                <div className="p-3 border-b border-slate-900 flex justify-between items-center pl-4 bg-slate-900/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400 animate-pulse" />
                    <span className="text-[9px] font-black tracking-widest text-amber-400 uppercase">{t.ticketHeader}</span>
                  </div>
                  <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded font-bold tracking-wider text-slate-300">2026 WORLD CUP</span>
                </div>

                {/* Ticket Details Panel */}
                <div className="p-4 grid grid-cols-3 gap-y-3 gap-x-2 pl-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.stand}</span>
                    <span className="text-xs font-black text-white uppercase">{activeTicket.zone} Stand</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.gate}</span>
                    <span className="text-xs font-black text-amber-400">{activeTicket.gate}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.section}</span>
                    <span className="text-xs font-black text-white">{activeTicket.section}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.row}</span>
                    <span className="text-xs font-black text-slate-200">{activeTicket.row}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.seat}</span>
                    <span className="text-xs font-black text-slate-200">{activeTicket.seat}</span>
                  </div>
                  <div className="flex flex-col text-right justify-end">
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-black uppercase tracking-wider inline-block">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Subfooter advice inside card */}
                <div className="p-2.5 bg-slate-900 border-t border-slate-900/60 pl-4 text-[9px] text-slate-400 leading-tight">
                  {getSupportAdvice(activeTicket.zone)}
                </div>
              </div>

              {/* Seating chart interactive layout visualizer */}
              <SeatMapVisualizer
                section={activeTicket.section}
                row={activeTicket.row}
                seat={activeTicket.seat}
                language={language}
              />

              {/* Step by Step Concierge Entrance Advice */}
              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg flex flex-col gap-2">
                <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Compass size={14} className="text-emerald-700 shrink-0" />
                  {t.stadiumEntranceGuide}
                </h4>

                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">1</div>
                    <p className="text-slate-700">
                      {t.step1} <strong className="text-slate-950 font-bold underline">{activeTicket.gate}</strong>.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">2</div>
                    <p className="text-slate-700">
                      {t.step2} <strong className="text-slate-950 font-bold">{activeTicket.section}</strong>. {t.stand} {activeTicket.zone} is fully clear.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">3</div>
                    <p className="text-slate-700">
                      {t.step3}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => onTicketLoaded(activeTicket.zone, activeTicket.gate, { section: activeTicket.section, row: activeTicket.row, seat: activeTicket.seat })}
                  className="flex-1 bg-fifa-blue hover:bg-opacity-95 text-white font-black py-2.5 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  <MapPin size={13} className="text-fifa-green animate-bounce" />
                  {t.viewRoute}
                </button>
                <button
                  type="button"
                  onClick={onClearTicket}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded text-xs transition-colors cursor-pointer uppercase tracking-wider border border-slate-300"
                >
                  {t.clear}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
