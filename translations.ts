export interface TranslationKeys {
  title: string;
  subtitle: string;
  offlineMode: string;
  howToUse: string;
  emergencyTitle: string;
  emergencyAlert: string;
  mapTab: string;
  gateTab: string;
  transitTab: string;
  chatTab: string;
  ticketUploaderTab: string;
  investigateTab: string;
  safetyCharter: string;
  safetyCharterDesc: string;
  seekSignage: string;
  emergencyHelpline: string;
  welcomeModalTitle: string;
  welcomeModalSub: string;
  welcomeModalSetup: string;
  welcomeModalStep1Title: string;
  welcomeModalStep1Desc: string;
  welcomeModalStep2Title: string;
  welcomeModalStep2Desc: string;
  welcomeModalStep3Title: string;
  welcomeModalStep3Desc: string;
  welcomeModalButton: string;
  offlineStickyBar: string;
  
  // New Food Online Keys
  foodTitle: string;
  foodSub: string;
  foodDeliveryNotice: string;
  foodMenu: string;
  foodCart: string;
  foodEmptyCart: string;
  foodTotal: string;
  foodOrderBtn: string;
  foodOrderSuccess: string;
  foodOrderingForSeat: string;
  foodDeliveringTo: string;
  
  // Auth simulation keys
  signIn: string;
  signOut: string;
  signingIn: string;
  welcomeBack: string;
  authModalTitle: string;
  authModalSub: string;
  enterMatchdayID: string;
  authButton: string;
}

export const translations: Record<'EN' | 'ES' | 'KO' | 'AR' | 'JA', TranslationKeys> = {
  EN: {
    title: "FIFA Fan Navigator",
    subtitle: "Secure Multilingual Concourse & Gate Companion",
    offlineMode: "Offline Mode",
    howToUse: "How To Use",
    emergencyTitle: "ALERT",
    emergencyAlert: "Medical or Security Emergency inside the stadium? Click here immediately. Helpline: +1 (800) 555-FIFA",
    mapTab: "Map View",
    gateTab: "My Ticket",
    transitTab: "Transit Options",
    chatTab: "Navigator AI",
    ticketUploaderTab: "Find My Seat",
    investigateTab: "Gate & Security Pass",
    safetyCharter: "FIFA Fan Safety & Privacy Charter 2026",
    safetyCharterDesc: "Zero Data Logging • SSL Encrypted",
    seekSignage: "Seek Physical Signage",
    emergencyHelpline: "Emergency Matchday Center",
    welcomeModalTitle: "Welcome to the Tournament!",
    welcomeModalSub: "Your secure, multilingual AI companion engineered to guide you through gates, amenities, and transit paths safely.",
    welcomeModalSetup: "Quick 3-Step Setup Guide",
    welcomeModalStep1Title: "“Where to go” · Interactive Map",
    welcomeModalStep1Desc: "Look at the main Interactive Map tab. It displays seating quadrants, live concessions, restrooms, and security gate boundaries clearly.",
    welcomeModalStep2Title: "“What to open” · Gate Finder & Tickets",
    welcomeModalStep2Desc: "Tap the 'Gate Finder' or 'Find My Seat' panels. Use them to pinpoint direct entrances, load matchday tickets, and identify exact seat locations.",
    welcomeModalStep3Title: "“Safe Browsing Check” · Privacy & Flow",
    welcomeModalStep3Desc: "Allow location access so the map guides you accurately. Rest assured, your location is processed locally. Always keep your eyes on your surroundings.",
    welcomeModalButton: "Got it, Let's Navigate!",
    offlineStickyBar: "OFFLINE FALLBACK ACTIVATED • Satellite coordinates and AI Assistant are running in local-secured storage mode.",
    
    // Food keys
    foodTitle: "FIFA Fast Food & Delivery",
    foodSub: "Skip the long concourse queues! Order authentic stadium delicacies and soft drinks directly delivered to your seat.",
    foodDeliveryNotice: "Hot delivery active for validated seat holders only.",
    foodMenu: "Matchday Menu",
    foodCart: "Your Order Cart",
    foodEmptyCart: "Your cart is empty. Tap any delicacy to add!",
    foodTotal: "Estimated Total",
    foodOrderBtn: "Submit Order & Deliver to Seat",
    foodOrderSuccess: "🎉 Order Confirmed! Our stadium runner is preparing your delivery. ETA: 8-10 minutes.",
    foodOrderingForSeat: "Ordering for Seat:",
    foodDeliveringTo: "Delivering to",

    // Auth keys
    signIn: "Sign In",
    signOut: "Sign Out",
    signingIn: "Verifying Matchday ID...",
    welcomeBack: "Welcome back",
    authModalTitle: "Access Matchday Portal",
    authModalSub: "Enter your tournament ticket hash or Fan ID to unlock secure personalized routes and in-seat catering.",
    enterMatchdayID: "Matchday Ticket ID or Email",
    authButton: "Verify & Enter Portal"
  },
  ES: {
    title: "Navegador de Fanáticos",
    subtitle: "Compañero Concurrente y de Puerta Multilingüe Seguro",
    offlineMode: "Modo sin Conexión",
    howToUse: "Cómo usar",
    emergencyTitle: "ALERTA",
    emergencyAlert: "¿Emergencia médica o de seguridad dentro del estadio? Haga clic aquí de inmediato. Línea de ayuda: +1 (800) 555-FIFA",
    mapTab: "Mapa",
    gateTab: "Mi Entrada",
    transitTab: "Tránsito",
    chatTab: "IA de Navegación",
    ticketUploaderTab: "Buscar Mi Asiento",
    investigateTab: "Acceso y Antifraude",
    safetyCharter: "Carta de Privacidad y Seguridad del Fanático de la FIFA 2026",
    safetyCharterDesc: "Sin registro de datos • Encriptado SSL",
    seekSignage: "Busque Señalización Física",
    emergencyHelpline: "Centro de Emergencia Matchday",
    welcomeModalTitle: "¡Bienvenido al Torneo!",
    welcomeModalSub: "Su compañero seguro e inteligente diseñado para guiarlo a través de puertas, servicios y rutas de tránsito con total seguridad.",
    welcomeModalSetup: "Guía de Configuración Rápida en 3 Pasos",
    welcomeModalStep1Title: "“A dónde ir” · Mapa Interactivo",
    welcomeModalStep1Desc: "Observe la pestaña del Mapa Interactivo. Muestra claramente cuadrantes de asientos, concesiones, baños y límites de puertas.",
    welcomeModalStep2Title: "“Qué abrir” · Buscador de Puertas",
    welcomeModalStep2Desc: "Toque los paneles 'Buscar Puerta' o 'Buscar Mi Asiento'. Úselos para ubicar entradas directas, cargar boletos e identificar su asiento exacto.",
    welcomeModalStep3Title: "“Navegación Segura” · Privacidad",
    welcomeModalStep3Desc: "Permita el acceso a la ubicación para guiarlo con precisión. Su ubicación se procesa localmente. Mantenga siempre la vista en su entorno.",
    welcomeModalButton: "¡Entendido, vamos a navegar!",
    offlineStickyBar: "MODO SIN CONEXIÓN ACTIVADO • Las coordenadas y la IA se ejecutan de manera segura en almacenamiento local.",

    // Food keys
    foodTitle: "FIFA Fast Food y Entrega",
    foodSub: "¡Evite las largas filas! Ordene comida rápida oficial y bebidas frías directamente a su asiento verificado.",
    foodDeliveryNotice: "Entrega express activa solo para titulares de boletos verificados.",
    foodMenu: "Menú del Partido",
    foodCart: "Su Carrito de Compras",
    foodEmptyCart: "Su carrito está vacío. ¡Toque un producto para agregarlo!",
    foodTotal: "Total Estimado",
    foodOrderBtn: "Confirmar Pedido y Enviar a mi Asiento",
    foodOrderSuccess: "🎉 ¡Pedido Confirmado! El repartidor del estadio está en camino. Tiempo estimado: 8-10 minutos.",
    foodOrderingForSeat: "Ordenando para el Asiento:",
    foodDeliveringTo: "Entregando en",

    // Auth keys
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    signingIn: "Verificando ID de Partido...",
    welcomeBack: "Bienvenido",
    authModalTitle: "Acceder al Portal del Fanático",
    authModalSub: "Ingrese su código de boleto o ID de Fanático para desbloquear rutas personalizadas y entrega de comida.",
    enterMatchdayID: "ID de Boleto o Correo Electrónico",
    authButton: "Verificar e Ingresar"
  },
  KO: {
    title: "FIFA 팬 네비게이터",
    subtitle: "안전한 다국어 콘코스 및 게이트 동반자",
    offlineMode: "오프라인 모드",
    howToUse: "사용 방법",
    emergencyTitle: "긴급 상황",
    emergencyAlert: "경기장 내 의료 또는 보안 긴급 상황인가요? 즉시 여기를 클릭하세요. 헬프라인: +1 (800) 555-FIFA",
    mapTab: "지도 보기",
    gateTab: "내 티켓",
    transitTab: "교통수단 옵션",
    chatTab: "네비게이터 AI",
    ticketUploaderTab: "내 좌석 찾기",
    investigateTab: "게이트 패스 & 위조 검증",
    safetyCharter: "FIFA 팬 안전 및 개인정보 보호 헌장 2026",
    safetyCharterDesc: "데이터 로그 무저장 • SSL 암호화 적용",
    seekSignage: "실제 물리적 안내판 참고",
    emergencyHelpline: "긴급 매치데이 센터",
    welcomeModalTitle: "토너먼트에 오신 것을 환영합니다!",
    welcomeModalSub: "게이트, 아메니티 및 환승 경로를 통해 안전하게 안내하도록 인지 설계된 다국어 AI 동반자입니다.",
    welcomeModalSetup: "빠른 3단계 설정 가이드",
    welcomeModalStep1Title: "“어디로 가야 하나요” · 대화형 지도",
    welcomeModalStep1Desc: "메인 대화형 지도 탭을 확인하세요. 좌석 구역, 실시간 매점, 화장실 및 보안 게이트 경계가 표시됩니다.",
    welcomeModalStep2Title: "“무엇을 열어야 하나요” · 게이트 및 좌석 찾기",
    welcomeModalStep2Desc: "게이트 찾기 또는 내 좌석 찾기 패널을 누르세요. 최단 입장 경로와 정확한 좌석 위치를 확인할 수 있습니다.",
    welcomeModalStep3Title: "“안전한 브라우징 확인” · 개인정보 보호",
    welcomeModalStep3Desc: "정확한 길 안내를 위해 위치 정보 액세스를 허용해주세요. 위치 데이터는 로컬에서 안전하게 처리됩니다. 보행 중에는 주변을 항상 주의해 주세요.",
    welcomeModalButton: "확인했습니다, 출발!",
    offlineStickyBar: "오프라인 폴백 활성화됨 • 인공지능 지원 및 위성 좌표가 로컬 보안 모드로 작동 중입니다.",

    // Food keys
    foodTitle: "FIFA 패스트푸드 및 배달",
    foodSub: "대기 줄을 서지 마세요! 경기장 공식 푸드와 음료를 좌석으로 직접 신속하게 배달받으세요.",
    foodDeliveryNotice: "인증된 좌석 소지자에게만 신속 배달이 제공됩니다.",
    foodMenu: "경기장 푸드 메뉴",
    foodCart: "나의 장바구니",
    foodEmptyCart: "장바구니가 비어 있습니다. 음식을 선택하여 추가하세요!",
    foodTotal: "예상 총액",
    foodOrderBtn: "주문하기 및 좌석으로 배달받기",
    foodOrderSuccess: "🎉 주문이 성공적으로 접수되었습니다! 경기장 스태프가 신속히 배달 중입니다. 예상 시간: 8~10분.",
    foodOrderingForSeat: "주문 좌석 번호:",
    foodDeliveringTo: "배달 장소:",

    // Auth keys
    signIn: "로그인",
    signOut: "로그아웃",
    signingIn: "매치데이 ID 확인 중...",
    welcomeBack: "환영합니다",
    authModalTitle: "매치데이 포털 접속",
    authModalSub: "티켓 해시 코드나 팬 ID를 입력하여 개인 맞춤 경로 가이드 및 좌석 음식 배달 서비스를 활성화하세요.",
    enterMatchdayID: "티켓 ID 또는 이메일 주소 입력",
    authButton: "인증 및 포털 입장"
  },
  AR: {
    title: "مرشد جماهير فيفا",
    subtitle: "مرافق الممرات والبوابات الآمن متعدد اللغات",
    offlineMode: "وضع عدم الاتصال",
    howToUse: "كيفية الاستخدام",
    emergencyTitle: "طوارئ",
    emergencyAlert: "حالة طوارئ طبية أو أمنية داخل الملعب؟ اضغط هنا فوراً. خط المساعدة: +1 (800) 555-FIFA",
    mapTab: "عرض الخريطة",
    gateTab: "تذكرتي",
    transitTab: "خيارات النقل",
    chatTab: "مساعد الذكاء الاصطناعي",
    ticketUploaderTab: "ابحث عن مقعدي",
    investigateTab: "العبور وكشف التزوير",
    safetyCharter: "ميثاق أمان وخصوصية جماهير الفيفا 2026",
    safetyCharterDesc: "بدون تسجيل بيانات • مشفر بالكامل",
    seekSignage: "انتبه للافتات الإرشادية",
    emergencyHelpline: "مركز طوارئ يوم المباراة",
    welcomeModalTitle: "مرحباً بك في البطولة!",
    welcomeModalSub: "مرافقك الآمن متعدد اللغات المعتمد بالذكاء الاصطناعي لإرشادك عبر البوابات والخدمات ومسارات النقل بأمان.",
    welcomeModalSetup: "دليل الإعداد السريع في 3 خطوات",
    welcomeModalStep1Title: "“أين تذهب” · الخريطة التفاعلية",
    welcomeModalStep1Desc: "انظر إلى الخريطة التفاعلية. تعرض بوضوح قطاعات المدرجات، الخدمات المباشرة، دورات المياه، وحدود البوابات الأمنية.",
    welcomeModalStep2Title: "“ماذا تفتح” · الباحث عن البوابات والمقاعد",
    welcomeModalStep2Desc: "اضغط على لوحة 'الباحث عن البوابات' أو 'ابحث عن مقعدي' لتحديد المداخل المباشرة وتحميل التذاكر ومعرفة موقع مقعدك بالضبط.",
    welcomeModalStep3Title: "“التحقق من التصفح الآمن” · الخصوصية",
    welcomeModalStep3Desc: "اسمح بالوصول إلى الموقع للحصول على توجيهات دقيقة. تتم معالجة بيانات الموقع محلياً بالكامل. انتبه دائماً لمحيطك أثناء المشي.",
    welcomeModalButton: "حسناً، فلنبدأ التصفح!",
    offlineStickyBar: "تم تفعيل وضع عدم الاتصال • تعمل الخرائط وتوجيهات المساعد من الذاكرة المحلية الآمنة.",

    // Food keys
    foodTitle: "فيفا اطلب طعامك لـ مقعدك",
    foodSub: "تجنب طوابير الانتظار الطويلة! اطلب وجبات ومشروبات فيفا الرسمية وسيتم توصيلها مباشرة إلى مقعدك المحدد.",
    foodDeliveryNotice: "تتوفر خدمة التوصيل السريع للمقاعد المؤكدة فقط.",
    foodMenu: "قائمة طعام يوم المباراة",
    foodCart: "سلة الطلبات الخاصة بك",
    foodEmptyCart: "السلة فارغة حالياً. اضغط على أي وجبة لإضافتها!",
    foodTotal: "المجموع الكلي التقريبي",
    foodOrderBtn: "تأكيد الطلب والتوصيل إلى المقعد",
    foodOrderSuccess: "🎉 تم تأكيد طلبك بنجاح! يقوم عداء الملعب بتحضير طلبك حالياً وتوصيله. الوقت المقدر: 8-10 دقائق.",
    foodOrderingForSeat: "الطلب للمقعد رقم:",
    foodDeliveringTo: "التوصيل إلى",

    // Auth keys
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    signingIn: "جاري التحقق من هوية المباراة...",
    welcomeBack: "مرحباً بك مجدداً",
    authModalTitle: "الدخول إلى بوابة يوم المباراة",
    authModalSub: "أدخل رمز التذكرة أو رقم تعريف المشجع لفتح مسارات التوجيه المخصصة وخدمات التوصيل.",
    enterMatchdayID: "رقم التذكرة أو البريد الإلكتروني",
    authButton: "تحقق ودخول البوابة"
  },
  JA: {
    title: "FIFAファンナビゲーター",
    subtitle: "安全な多言語コンコース＆ゲート同行ツール",
    offlineMode: "オフラインモード",
    howToUse: "使い方",
    emergencyTitle: "緊急事態",
    emergencyAlert: "スタジアム内で医療または警備の緊急事態ですか？すぐにここをクリック。ヘルプライン: +1 (800) 555-FIFA",
    mapTab: "マップビュー",
    gateTab: "マイチケット",
    transitTab: "交通案内",
    chatTab: "ナビゲーターAI",
    ticketUploaderTab: "座席を探す",
    investigateTab: "ゲートパス＆偽造検証",
    safetyCharter: "FIFAファン安全＆プライバシー憲章2026",
    safetyCharterDesc: "データログゼロ • SSL暗号化保護",
    seekSignage: "現地の頭上看板を優先確認",
    emergencyHelpline: "マッチデイ緊急センター",
    welcomeModalTitle: "トーナメントへようこそ！",
    welcomeModalSub: "ゲート、アメニティ、安全な歩行経路をスムーズに案内するセキュリティ強化型の多言語AIコンパニオンです。",
    welcomeModalSetup: "かんたん3ステップ設定ガイド",
    welcomeModalStep1Title: "「どこへ行くか」 · インタラクティブマップ",
    welcomeModalStep1Desc: "インタラクティブマップを確認してください。観客席エリア、売店、トイレ、セキュリティゲートの境界が視覚的に表示されます。",
    welcomeModalStep2Title: "「何を開くか」 · ゲート＆チケットファインダー",
    welcomeModalStep2Desc: "「ゲートファインダー」または「座席を探す」タブをタップします。直接入場できる入り口、チケット情報、正確な座席位置を確認できます。",
    welcomeModalStep3Title: "「安全な歩行確認」 · プライバシーと安全",
    welcomeModalStep3Desc: "位置情報の許可を有効にすると安全に案内されます。位置データはローカルのみで処理されます。歩行中は周囲に注意してください。",
    welcomeModalButton: "了解しました、ナビを開始！",
    offlineStickyBar: "オフラインモード有効中 • 位置座標とAIアシスタントはローカルの暗号化ストレージで稼働しています。",

    // Food keys
    foodTitle: "FIFAフード・イン・シート注文",
    foodSub: "長い行列に並ぶ必要はありません！試合中の公式軽食やドリンクをお座席まで直接お届けします。",
    foodDeliveryNotice: "チケットをお持ちの確認済み座席のみにデリバリーランナーが急行します。",
    foodMenu: "スタジアムフードメニュー",
    foodCart: "現在のカート",
    foodEmptyCart: "カートは空です。メニューからアイテムを選択して追加してください。",
    foodTotal: "予想合計金額",
    foodOrderBtn: "注文を確定してお座席まで届ける",
    foodOrderSuccess: "🎉 ご注文が確定しました！お届け担当のランナーがご準備しています。お届け予定：8〜10分",
    foodOrderingForSeat: "お座席での注文番号:",
    foodDeliveringTo: "お届け先",

    // Auth keys
    signIn: "サインイン",
    signOut: "サインアウト",
    signingIn: "チケットIDを照合中...",
    welcomeBack: "おかえりなさい",
    authModalTitle: "ファン専用ポータルへアクセス",
    authModalSub: "観戦チケットのハッシュコードまたはファンIDを入力して、お座席まで届くお食事注文やカスタム経路ガイドをご利用ください。",
    enterMatchdayID: "チケットIDまたはメールアドレス",
    authButton: "照合してポータルへ入る"
  }
};
