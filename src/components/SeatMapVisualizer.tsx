import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Armchair, Sparkles, Check, HelpCircle } from 'lucide-react';

interface SeatMapVisualizerProps {
  section: string;
  row: string;
  seat: string;
  language: 'EN' | 'ES' | 'KO' | 'AR' | 'JA';
}

export default function SeatMapVisualizer({
  section,
  row,
  seat,
  language
}: SeatMapVisualizerProps) {
  // Parse user seat and row numbers or defaults
  const seatNum = parseInt(seat) || 4;
  const rowClean = row.trim().toUpperCase();

  // Generate simulated seats around the user's seat (e.g., 5 rows, 8 columns)
  // We'll mark most as occupied (red/slate) to match standard World Cup high density (85% full), and a few empty.
  const numRows = 5;
  const numCols = 8;
  const startRowCode = rowClean.charCodeAt(0) ? Math.max(65, rowClean.charCodeAt(0) - 2) : 69; // 'E'
  const startSeatNum = Math.max(1, seatNum - 3);

  // Simple translations for seating status
  const labels = {
    EN: { title: "Section Seating Chart", yours: "Your Seat", full: "Occupied", free: "Available", status: "88% Full", sectionLabel: "SECTION", rowLabel: "ROW", seatLabel: "SEAT" },
    ES: { title: "Mapa de Asientos", yours: "Tu Asiento", full: "Ocupado", free: "Disponible", status: "88% Ocupado", sectionLabel: "SECCIÓN", rowLabel: "FILA", seatLabel: "ASIENTO" },
    KO: { title: "좌석 배치도", yours: "내 좌석", full: "예약됨", free: "예매 가능", status: "88% 만석", sectionLabel: "구역", rowLabel: "열", seatLabel: "좌석" },
    AR: { title: "مخطط المقاعد", yours: "مقعدك", full: "محجوز", free: "متاح", status: "ممتلئ بنسبة ٨٨٪", sectionLabel: "القسم", rowLabel: "الصف", seatLabel: "المقعد" },
    JA: { title: "座席レイアウト", yours: "あなたのお座席", full: "満席", free: "空席", status: "88% 満席", sectionLabel: "ブロック", rowLabel: "列", seatLabel: "座席" },
  };

  const t = labels[language] || labels.EN;

  // Track hover status
  const [hoveredSeat, setHoveredSeat] = useState<{ r: string; s: number; status: string } | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white shadow-lg flex flex-col gap-3" id="seat-map-visualizer-container">
      
      {/* Visual Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Armchair size={15} className="text-amber-400" />
          <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-200">
            {t.title} &bull; <span className="text-fifa-green">{section}</span>
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          {t.status}
        </div>
      </div>

      {/* Seating Grid Stage Frame */}
      <div className="relative bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Stadium Screen / Pitch indicator above */}
        <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-fifa-green to-transparent rounded mb-4 flex items-center justify-center">
          <span className="text-[7px] text-slate-500 tracking-widest uppercase font-black -mt-3">PITCH / FIELD DIRECTION</span>
        </div>

        {/* 5x8 Grid */}
        <div className="flex flex-col gap-1.5 w-full max-w-[280px]">
          {Array.from({ length: numRows }).map((_, rIdx) => {
            const currentRowName = String.fromCharCode(startRowCode + rIdx);
            return (
              <div key={currentRowName} className="flex items-center gap-1.5 justify-between">
                
                {/* Row Label (Left) */}
                <span className="w-4 text-[9px] font-black text-slate-500 text-center select-none">
                  {currentRowName}
                </span>

                {/* Seats Column row */}
                <div className="flex-1 flex justify-between gap-1">
                  {Array.from({ length: numCols }).map((_, cIdx) => {
                    const currentSeatNum = startSeatNum + cIdx;
                    const isUserSeat = currentRowName === rowClean && currentSeatNum === seatNum;
                    
                    // Predictable state based on seat indices (simulate some available seats)
                    const isAvailable = !isUserSeat && (cIdx === 1 || (rIdx === 3 && cIdx === 5));
                    const isOccupied = !isUserSeat && !isAvailable;

                    let seatBg = "bg-slate-800 text-slate-500 border border-slate-700/50";
                    let seatAccent = "";
                    if (isUserSeat) {
                      seatBg = "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 border border-amber-300 ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-900 shadow-[0_0_12px_rgba(245,158,11,0.45)]";
                      seatAccent = "animate-pulse";
                    } else if (isAvailable) {
                      seatBg = "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500";
                    } else if (isOccupied) {
                      seatBg = "bg-slate-800 text-slate-500 hover:bg-slate-700/80 border border-slate-700/40";
                    }

                    return (
                      <button
                        key={cIdx}
                        type="button"
                        className={`flex-1 aspect-square rounded-[4px] flex items-center justify-center transition-all cursor-pointer ${seatBg} ${seatAccent}`}
                        style={{ minWidth: '18px', maxWidth: '28px' }}
                        onMouseEnter={() => setHoveredSeat({
                          r: currentRowName,
                          s: currentSeatNum,
                          status: isUserSeat ? t.yours : isAvailable ? t.free : t.full
                        })}
                        onMouseLeave={() => setHoveredSeat(null)}
                      >
                        {isUserSeat ? (
                          <Sparkles size={8} className="text-slate-950 font-black animate-spin" />
                        ) : isAvailable ? (
                          <div className="w-1 h-1 rounded-full bg-emerald-200" />
                        ) : (
                          <div className="w-0.5 h-0.5 rounded-full bg-slate-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Row Label (Right) */}
                <span className="w-4 text-[9px] font-black text-slate-500 text-center select-none">
                  {currentRowName}
                </span>

              </div>
            );
          })}
        </div>

        {/* Hover info tooltip box inside */}
        <div className="h-4 mt-2 flex items-center justify-center">
          {hoveredSeat ? (
            <span className="text-[8.5px] font-black uppercase text-slate-300 tracking-wide bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              {t.rowLabel} <strong className="text-white">{hoveredSeat.r}</strong> &bull; {t.seatLabel} <strong className="text-white">{hoveredSeat.s}</strong> &bull; <span className={hoveredSeat.status === t.yours ? 'text-amber-400' : hoveredSeat.status === t.free ? 'text-emerald-400' : 'text-slate-400'}>{hoveredSeat.status}</span>
            </span>
          ) : (
            <span className="text-[8px] text-slate-600 uppercase font-bold tracking-tight select-none">
              Hover over seats to inspect neighbors
            </span>
          )}
        </div>

      </div>

      {/* Legend Indicators */}
      <div className="grid grid-cols-3 gap-1 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60 text-[9px] uppercase tracking-wide">
        <div className="flex items-center gap-1.5 justify-center">
          <span className="w-2.5 h-2.5 rounded bg-gradient-to-br from-amber-400 to-amber-500 border border-amber-300 ring-1 ring-amber-400" />
          <span className="text-amber-400 font-extrabold">{t.yours}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center opacity-85">
          <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700/50" />
          <span className="text-slate-400 font-bold">{t.full}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <span className="w-2.5 h-2.5 rounded bg-emerald-600 border border-emerald-500" />
          <span className="text-emerald-400 font-black">{t.free}</span>
        </div>
      </div>

    </div>
  );
}
