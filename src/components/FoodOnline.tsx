import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../translations';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  Truck, 
  MapPin, 
  Sparkles, 
  Clock, 
  Coffee, 
  Coins, 
  UtensilsCrossed,
  AlertCircle
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  nameES: string;
  nameKO: string;
  nameAR: string;
  nameJA: string;
  description: string;
  descriptionES: string;
  descriptionKO: string;
  descriptionAR: string;
  descriptionJA: string;
  price: number;
  calories: number;
  category: 'food' | 'drink' | 'snack';
  image: string;
}

const MENU_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    name: 'FIFA Golden Double Burger',
    nameES: 'Hamburguesa Doble de Oro FIFA',
    nameKO: 'FIFA 골든 더블 버거',
    nameAR: 'فيفا برجر مزدوج ذهبي',
    nameJA: 'FIFAゴールデンダブルバーガー',
    description: 'Two premium beef patties, melted cheddar, signature golden sauce, served with artisan brioche.',
    descriptionES: 'Dos carnes premium, cheddar derretido, salsa dorada exclusiva, servida en pan brioche artesanal.',
    descriptionKO: '프리미엄 소고기 패티 2장, 녹아내리는 체다 치즈, 시그니처 골든 소스, 수제 브리오슈 번.',
    descriptionAR: 'قطعتان من لحم البقر الممتاز، جبنة شيدر ذائبة، صلصة ذهبية مميزة، تقدم مع خبز بريوش.',
    descriptionJA: '極上ビーフパティ2枚、とろけるチェダーチーズ、秘伝ゴールデンソース、特製ブリオッシュバンズ。',
    price: 14.50,
    calories: 780,
    category: 'food',
    image: '🍔'
  },
  {
    id: 'f2',
    name: 'Super Kick Chilli Nachos',
    nameES: 'Nachos Super Kick con Chile',
    nameKO: '슈퍼 킥 칠리 나쵸',
    nameAR: 'سوبر كيك تشيلي ناتشوز',
    nameJA: 'スーパーキック・チリナチョス',
    description: 'Crisp tortilla chips loaded with hot spicy beef, warm cheese sauce, fresh jalapeños, and cool cream.',
    descriptionES: 'Tortillas de maíz crujientes con carne picante, salsa de queso caliente, jalapeños y crema.',
    descriptionKO: '매콤한 소고기, 따뜻한 치즈 소스, 신선한 할라피뇨, 상큼한 사워크림이 어우러진 바삭한 나쵸.',
    descriptionAR: 'رقائق التورتيلا المقرمشة المحملة باللحم البقري الحار، صلصة الجبن الدافئة، الهالبينو والكريمة.',
    descriptionJA: '焼きたてトルティーヤチップスにピリ辛チリミート、温かいチーズソース、ハラペーニョ、サワークリーム。',
    price: 11.00,
    calories: 620,
    category: 'food',
    image: '🍿'
  },
  {
    id: 'f3',
    name: 'Gluten-Free Stadium Pretzel',
    nameES: 'Pretzel de Estadio Sin Gluten',
    nameKO: '글루텐 프리 스타디움 프레첼',
    nameAR: 'بريتزل الملعب الخالي من الغلوتين',
    nameJA: 'グルテンフリー・スタジアムプレッツェル',
    description: 'Warm, soft-baked salted pretzel accompanied by artisan spicy honey mustard dip.',
    descriptionES: 'Pretzel salado caliente y suave acompañado de un aderezo de mostaza y miel picante artesanal.',
    descriptionKO: '따뜻하고 부드럽게 구워진 소금 프레첼, 프리미엄 스파이시 허니 머스타드 소스 제공.',
    descriptionAR: 'بريتزل مملح دافئ وناعم مخبوز طازجاً، يقدم مع صلصة خردل العسل الحارة.',
    descriptionJA: '焼き立てのソフトプレッツェル、岩塩仕立て。特製ハニーマスタードソース添え。',
    price: 7.50,
    calories: 340,
    category: 'snack',
    image: '🥨'
  },
  {
    id: 'd1',
    name: 'Budweiser Zero (Non-Alcoholic)',
    nameES: 'Budweiser Zero (Sin Alcohol)',
    nameKO: '버드와이저 제로 (무알코올)',
    nameAR: 'بودوايزر زيرو (خالي من الكحول)',
    nameJA: 'バドワイザー ゼロ (ノンアルコール)',
    description: 'The official ice-cold non-alcoholic tournament refreshment. Zero sugar, maximum flavor.',
    descriptionES: 'El refresco oficial helado y sin alcohol del torneo. Cero azúcar, máximo sabor.',
    descriptionKO: '얼음처럼 차가운 공식 토너먼트 지정 무알코올 음료. 제로 슈거, 최고의 청량감.',
    descriptionAR: 'مشروب البطولة الرسمي الخالي من الكحول والمبرد بالثلج. خالي من السكر، طعم كامل.',
    descriptionJA: 'キンキンに冷えた大会公式ノンアルコールビール。糖質ゼロ、のどごし抜群。',
    price: 6.00,
    calories: 50,
    category: 'drink',
    image: '🍺'
  },
  {
    id: 'd2',
    name: 'Matchday Energy Elixir',
    nameES: 'Elíxir de Energía Matchday',
    nameKO: '매치데이 에너지 일릭서',
    nameAR: 'إكسير الطاقة يوم المباراة',
    nameJA: 'マッチデイ・エナジー・エリクサー',
    description: 'Refreshing blueberry and citrus active hydration booster with essential matchday electrolytes.',
    descriptionES: 'Refrescante bebida de arándanos y cítricos con electrolitos esenciales para el partido.',
    descriptionKO: '필수 전해질을 가득 담은 청량한 블루베리 및 시트러스 액티브 수분 보충제.',
    descriptionAR: 'مشروب ترطيب نشط بنكهة التوت البري والحمضيات مع الإلكتروليتات اللازمة ليوم المباراة.',
    descriptionJA: 'すっきりブルーベリー＆シトラス風味。スタジアム観전用必須電解質配合の水分補給ドリンク。',
    price: 5.50,
    calories: 120,
    category: 'drink',
    image: '🥤'
  }
];

interface FoodOnlineProps {
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
  activeTicket: { zone: string; gate: string; section: string; row: string; seat: string; imageUrl?: string } | null;
}

export default function FoodOnline({
  language,
  activeTicket
}: FoodOnlineProps) {
  const t = translations[language] || translations.EN;

  // Cart state
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderStep, setOrderStep] = useState<'menu' | 'tracking'>('menu');
  const [trackingStep, setTrackingStep] = useState(0);

  // Manual delivery coordinates (used if no ticket uploaded)
  const [deliverySection, setDeliverySection] = useState(activeTicket?.section || '');
  const [deliveryRow, setDeliveryRow] = useState(activeTicket?.row || '');
  const [deliverySeat, setDeliverySeat] = useState(activeTicket?.seat || '');

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const copy = { ...prev };
      if (copy[itemId] <= 1) {
        delete copy[itemId];
      } else {
        copy[itemId] -= 1;
      }
      return copy;
    });
  };

  const clearCart = () => setCart({});

  const cartTotal = MENU_ITEMS.reduce((sum, item) => {
    const qty = cart[item.id] || 0;
    return sum + (item.price * qty);
  }, 0);

  const totalItems = Object.keys(cart).reduce((sum, key) => sum + (cart[key] || 0), 0);

  const getLocalizedName = (item: FoodItem) => {
    if (language === 'ES') return item.nameES;
    if (language === 'KO') return item.nameKO;
    if (language === 'AR') return item.nameAR;
    if (language === 'JA') return item.nameJA;
    return item.name;
  };

  const getLocalizedDesc = (item: FoodItem) => {
    if (language === 'ES') return item.descriptionES;
    if (language === 'KO') return item.descriptionKO;
    if (language === 'AR') return item.descriptionAR;
    if (language === 'JA') return item.descriptionJA;
    return item.description;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartTotal <= 0) return;
    
    setIsOrdering(true);

    // Simulate ordering process and runner delivery tracking
    setTimeout(() => {
      setOrderStep('tracking');
      setIsOrdering(false);
      setTrackingStep(0);

      // Advance runner tracking steps
      const steps = [
        () => setTrackingStep(1), // Kitchen preparing
        () => setTrackingStep(2), // Runner dispatched
        () => setTrackingStep(3), // runner near section
        () => setTrackingStep(4), // Arrived at seat
      ];

      steps.forEach((func, idx) => {
        setTimeout(func, (idx + 1) * 4500);
      });
    }, 1500);
  };

  const sec = deliverySection || activeTicket?.section || 'N104';
  const rw = deliveryRow || activeTicket?.row || '15';
  const st = deliverySeat || activeTicket?.seat || '3';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md flex flex-col overflow-hidden h-full min-h-[550px]" id="food-delivery-panel">
      
      {/* Decorative header */}
      <div className="relative h-28 bg-slate-950 text-white flex flex-col justify-end p-4 overflow-hidden">
        
        {/* Dynamic Stadium/Football pattern overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative z-10">
          <span className="text-[9px] bg-fifa-green text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-wider mb-1 inline-block">
            IN-SEAT CATERING
          </span>
          <h2 className="text-lg font-black tracking-tight uppercase leading-none">{t.foodTitle}</h2>
          <p className="text-[10px] text-slate-300 mt-1 font-semibold">{t.foodSub}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {orderStep === 'menu' ? (
          <motion.div
            key="menu-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100"
          >
            
            {/* Menu Items List */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[380px] lg:max-h-[520px] space-y-3">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <UtensilsCrossed size={12} className="text-fifa-green" />
                {t.foodMenu}
              </h3>

              <div className="space-y-2.5">
                {MENU_ITEMS.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div 
                      key={item.id}
                      className="group flex gap-3 p-3 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-200/60 transition-all hover:shadow-xs items-center"
                    >
                      {/* Emoji Icon Badge */}
                      <span className="text-2xl p-2 bg-white rounded-lg border border-slate-200 select-none transform group-hover:scale-105 transition-transform">
                        {item.image}
                      </span>

                      {/* Content details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-xs text-slate-900 truncate">{getLocalizedName(item)}</h4>
                          <span className="text-[8px] bg-slate-200 px-1 rounded text-slate-500 font-bold">{item.calories} kcal</span>
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">{getLocalizedDesc(item)}</p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-slate-900">${item.price.toFixed(2)}</span>
                        
                        {qty > 0 ? (
                          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="w-5 h-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-5 text-center text-xs font-black text-slate-900">{qty}</span>
                            <button
                              type="button"
                              onClick={() => addToCart(item.id)}
                              className="w-5 h-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(item.id)}
                            className="w-7 h-7 bg-fifa-blue text-white rounded-full flex items-center justify-center font-bold hover:bg-opacity-90 hover:scale-105 transition-all cursor-pointer shadow-xs"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart & Checkout Panel */}
            <div className="w-full lg:w-80 bg-slate-50/50 p-4 flex flex-col justify-between max-h-[350px] lg:max-h-[520px]">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShoppingBag size={12} className="text-fifa-green" />
                    {t.foodCart} ({totalItems})
                  </h3>
                  {totalItems > 0 && (
                    <button 
                      type="button"
                      onClick={clearCart}
                      className="text-[9px] font-bold text-rose-600 hover:underline uppercase"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {totalItems === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                    <span className="text-3xl filter saturate-50 select-none">🍕</span>
                    <p className="text-[10px] text-slate-400 font-bold">{t.foodEmptyCart}</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] lg:max-h-[220px] overflow-y-auto pr-1">
                    {MENU_ITEMS.map(item => {
                      const qty = cart[item.id] || 0;
                      if (qty <= 0) return null;
                      return (
                        <div key={item.id} className="flex justify-between items-center text-[10px] border-b border-slate-150 pb-1.5 bg-white p-2 rounded border border-slate-200">
                          <div className="font-extrabold text-slate-800 truncate max-w-[120px]">{getLocalizedName(item)}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">x{qty}</span>
                            <span className="font-black text-slate-900">${(item.price * qty).toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Delivery info & Checkout validation */}
              <form onSubmit={handlePlaceOrder} className="mt-4 border-t border-slate-200 pt-3 flex flex-col gap-2.5">
                
                {/* Seat autofill feedback */}
                {activeTicket ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center gap-2">
                    <Truck size={14} className="text-emerald-600 shrink-0" />
                    <div className="text-[10px] text-emerald-800 font-semibold leading-tight">
                      {t.foodOrderingForSeat} <strong className="font-black text-emerald-950 underline">{activeTicket.zone} &bull; Section {activeTicket.section} &bull; Row {activeTicket.row} &bull; Seat {activeTicket.seat}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle size={13} className="text-amber-600 shrink-0" />
                      <span className="text-[9.5px] font-black uppercase text-amber-800">{t.foodDeliveryNotice}</span>
                    </div>
                    
                    {/* Manual coordinates inputs */}
                    <div className="grid grid-cols-3 gap-1">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[8px] text-slate-500 font-bold">Section</label>
                        <input 
                          type="text" 
                          required
                          value={deliverySection}
                          onChange={e => setDeliverySection(e.target.value)}
                          placeholder="N104"
                          className="p-1 border border-slate-300 rounded text-[10px] font-black uppercase bg-white text-slate-900"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[8px] text-slate-500 font-bold">Row</label>
                        <input 
                          type="text" 
                          required
                          value={deliveryRow}
                          onChange={e => setDeliveryRow(e.target.value)}
                          placeholder="15"
                          className="p-1 border border-slate-300 rounded text-[10px] font-black bg-white text-slate-900"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[8px] text-slate-500 font-bold">Seat</label>
                        <input 
                          type="text" 
                          required
                          value={deliverySeat}
                          onChange={e => setDeliverySeat(e.target.value)}
                          placeholder="3"
                          className="p-1 border border-slate-300 rounded text-[10px] font-black bg-white text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center text-xs border-b border-slate-150 pb-2">
                  <span className="font-extrabold text-slate-500 uppercase text-[10px]">{t.foodTotal}</span>
                  <span className="font-black text-slate-900 text-sm">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={cartTotal <= 0 || isOrdering}
                  className="w-full bg-fifa-green text-slate-950 font-black py-2.5 rounded-lg text-xs hover:bg-opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                >
                  {isOrdering ? (
                    <>
                      <Clock size={13} className="animate-spin text-slate-950" />
                      <span>Placing secure order...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={13} className="text-slate-950" />
                      <span>{t.foodOrderBtn}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="tracking-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-6 flex flex-col justify-center items-center gap-5 text-center bg-slate-50"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-xs">
              <Check size={28} className="font-black" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-sm tracking-tight">{t.foodOrderSuccess}</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                {t.foodDeliveringTo}: <span className="font-bold underline text-slate-900">Section {sec}, Row {rw}, Seat {st}</span>
              </p>
            </div>

            {/* Runner progress tracker timeline */}
            <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-4 shadow-xs mt-2">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-3 text-left">Delivery Runner Tracker</h4>
              
              <div className="space-y-4">
                
                {/* Step 1: Prep */}
                <div className="flex gap-3 text-left">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${trackingStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {trackingStep >= 1 ? <Check size={10} /> : "1"}
                    </div>
                    <div className={`w-0.5 h-6 ${trackingStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-extrabold ${trackingStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>FIFA Kitchen: Order Preparing</p>
                    <p className="text-[9px] text-slate-400">Matchday grill is sizzling. Quality check active.</p>
                  </div>
                </div>

                {/* Step 2: Dispatched */}
                <div className="flex gap-3 text-left">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${trackingStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {trackingStep >= 2 ? <Check size={10} /> : "2"}
                    </div>
                    <div className={`w-0.5 h-6 ${trackingStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-extrabold ${trackingStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Runner Dispatched</p>
                    <p className="text-[9px] text-slate-400">Secure runner departed stadium kitchens with thermal bag.</p>
                  </div>
                </div>

                {/* Step 3: Concourse section */}
                <div className="flex gap-3 text-left">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${trackingStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {trackingStep >= 3 ? <Check size={10} /> : "3"}
                    </div>
                    <div className={`w-0.5 h-6 ${trackingStep >= 4 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-extrabold ${trackingStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Runner near Section {sec}</p>
                    <p className="text-[9px] text-slate-400">Approaching entry concourse. Please keep your seat ticket visible.</p>
                  </div>
                </div>

                {/* Step 4: Arrived */}
                <div className="flex gap-3 text-left">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${trackingStep >= 4 ? 'bg-emerald-500 text-white animate-bounce' : 'bg-slate-200 text-slate-600'}`}>
                      <MapPin size={10} />
                    </div>
                  </div>
                  <div>
                    <p className={`text-[11px] font-extrabold ${trackingStep >= 4 ? 'text-slate-900' : 'text-slate-400'}`}>Arrived at Row {rw}, Seat {st}</p>
                    <p className="text-[9px] text-slate-400">Enjoy your snack! Safe matches & let us cheer together.</p>
                  </div>
                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                setOrderStep('menu');
                clearCart();
              }}
              className="py-2 px-5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-950 transition-colors cursor-pointer uppercase tracking-wider"
            >
              Order Something Else
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
