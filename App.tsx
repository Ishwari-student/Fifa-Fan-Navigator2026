import React, { useState, useEffect } from 'react';
import { Zone, Gate, AmenityType } from './types';
import StadiumMap from './components/StadiumMap';
import MyTicket from './components/MyTicket';
import TransitInfo from './components/TransitInfo';
import AIChat from './components/AIChat';
import OnboardingOverlay from './components/OnboardingOverlay';
import TicketUploader from './components/TicketUploader';
import FoodOnline from './components/FoodOnline';
import LoginPage from './components/LoginPage';
import LiveMatchTicker from './components/LiveMatchTicker';
import TicketInvestigator from './components/TicketInvestigator';
import { translations } from './translations';
import {
  MapPin,
  Ticket,
  Bus,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Info,
  Award,
  Globe,
  HelpCircle,
  WifiOff,
  Phone,
  CheckCircle,
  X,
  Layers,
  Utensils,
  LogIn,
  LogOut,
  User,
  Coffee,
  RefreshCw
} from 'lucide-react';

export default function App() {
  // Navigation & Interactive states
  const [activeTab, setActiveTab] = useState<'map' | 'ticket' | 'gate' | 'transit' | 'chat' | 'food' | 'investigate'>('ticket');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedGate, setSelectedGate] = useState<Gate | null>(null);
  const [filteredAmenityType, setFilteredAmenityType] = useState<AmenityType | 'all'>('all');
  
  // Multilingual & Ticket Upload States
  const [language, setLanguage] = useState<'EN' | 'ES' | 'KO' | 'AR' | 'JA'>('EN');
  const [activeTicket, setActiveTicket] = useState<{ zone: Zone; gate: Gate; section: string; row: string; seat: string; imageUrl?: string } | null>(null);

  // Offline & Onboarding States
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // User Authentication Simulation
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; fanId: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);

  // Trigger Onboarding automatically for first-time visitors
  useEffect(() => {
    const hasSeen = localStorage.getItem('has_seen_fifa_onboarding');
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('has_seen_fifa_onboarding', 'true');
  };

  const handleTicketLoaded = (zone: Zone, gate: Gate, details: { section: string; row: string; seat: string; imageUrl?: string }) => {
    setActiveTicket({
      zone,
      gate,
      section: details.section,
      row: details.row,
      seat: details.seat,
      imageUrl: details.imageUrl
    });
    setSelectedZone(zone);
    setSelectedGate(gate);
    
    // Auto focus the Interactive Map view so they immediately see the green corridor mapped
    setActiveTab('map');

    // Scroll map container into view smoothly on mobile
    setTimeout(() => {
      document.getElementById('desktop-map-viewport')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleClearTicket = () => {
    setActiveTicket(null);
  };

  const triggerResetAll = () => {
    setSelectedZone(null);
    setSelectedGate(null);
    setFilteredAmenityType('all');
  };

  const t = translations[language] || translations.EN;

  if (!currentUser) {
    return (
      <LoginPage
        onLogin={(user, lang) => {
          setCurrentUser(user);
          setLanguage(lang);
        }}
        initialLanguage={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800" id="app-root">
      
      {/* Sticky High-Contrast Emergency Alert Banner */}
      <div 
        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all text-center animate-pulse"
        onClick={() => setShowEmergencyModal(true)}
        id="emergency-alert-banner"
      >
        <span className="bg-white text-rose-700 px-1.5 py-0.5 rounded text-[10px] uppercase font-black">
          {t.emergencyTitle}
        </span>
        <span className="font-semibold">{t.emergencyAlert}</span>
      </div>

      {/* Persistent Global Navigation Header */}
      <header className="bg-fifa-blue text-white shadow-md border-b border-fifa-blue-dark sticky top-0 z-40" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Element */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-fifa-green flex items-center justify-center font-black text-slate-950 shadow-md shadow-emerald-500/20 italic text-xl">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl tracking-tight uppercase leading-none">
                  {t.title} <span className="text-fifa-green">2026</span>
                </h1>
                <span className="text-[9px] bg-fifa-green/20 text-fifa-green font-extrabold px-2 py-0.5 rounded-full border border-fifa-green/30 tracking-wider">
                  HIGH DENSITY LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium tracking-wide mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            
            {/* Live Flag Translator / Indicator */}
            <div className="flex bg-white/10 rounded-lg p-1 text-[10px] font-black tracking-wide uppercase select-none">
              {([
                { code: 'EN', label: '🇺🇸 EN' },
                { code: 'ES', label: '🇦🇷 ES' },
                { code: 'KO', label: '🇰🇷 KO' },
                { code: 'JA', label: '🇯🇵 JA' },
                { code: 'AR', label: '🇪🇬 AR' }
              ] as const).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${language === lang.code ? 'bg-white text-fifa-blue font-black shadow-sm' : 'opacity-70 text-white hover:opacity-100 hover:bg-white/5'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Sign In / Sign Out Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                <div className="w-5 h-5 rounded-full bg-fifa-green text-slate-950 flex items-center justify-center font-bold text-[10px] uppercase">
                  {currentUser.name[0] || 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] text-slate-300 font-bold leading-none">{t.welcomeBack},</span>
                  <span className="text-[10px] font-black leading-none text-white truncate max-w-[85px]">{currentUser.name}</span>
                </div>
                <button
                  onClick={() => setCurrentUser(null)}
                  className="text-white hover:text-rose-400 p-0.5 ml-1 cursor-pointer transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-md cursor-pointer"
              >
                <LogIn size={12} className="text-slate-950" />
                <span>{t.signIn}</span>
              </button>
            )}

            {/* Offline Mode Toggle Switch */}
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-[11px] font-bold text-slate-300">{t.offlineMode}</span>
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isOffline ? 'bg-fifa-green' : 'bg-slate-600'}`}
                id="offline-mode-toggle"
                title="Toggle offline map and local helper mode"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isOffline ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>

            {/* How to Use Help Trigger */}
            <button
              onClick={() => setShowOnboarding(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#001C4F] hover:bg-[#002b7a] text-white rounded-lg border border-white/20 transition-colors text-[11px] font-bold cursor-pointer"
              title="Open onboarding instructions"
            >
              <HelpCircle size={14} className="text-fifa-green" />
              <span>{t.howToUse}</span>
            </button>

            {/* Header Help Tag */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 rounded-md font-extrabold animate-pulse flex items-center gap-1.5 text-xs text-white border border-rose-500 cursor-pointer shadow-sm"
            >
              <ShieldAlert size={14} />
              <span>HELP: +1-800-FIFA</span>
            </button>
          </div>
        </div>
      </header>

      {/* Offline Alert Sticky Bar */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-bold text-center border-b border-amber-600 flex items-center justify-center gap-2 animate-fade-in">
          <WifiOff size={14} className="shrink-0" />
          <span>{t.offlineStickyBar}</span>
        </div>
      )}

      {/* Main App Dashboard Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6" id="dashboard-main-view">
        
        {/* Live Matchday Feed Ticker */}
        <LiveMatchTicker language={language} />
        
        {/* Mobile-Only Tab Selectors (Hidden on Large Screens) */}
        <div className="lg:hidden flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 mb-4 shadow-sm overflow-x-auto scrollbar-none" id="mobile-tabs-container">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 min-w-[70px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'map' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <MapPin size={13} /> {t.mapTab}
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'ticket' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <Layers size={13} /> {t.ticketUploaderTab}
          </button>
          <button
            onClick={() => setActiveTab('gate')}
            className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'gate' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <Ticket size={13} /> {t.gateTab}
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`flex-1 min-w-[70px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'transit' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <Bus size={13} /> {t.transitTab}
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 min-w-[70px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'food' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <Utensils size={13} /> {t.foodTitle.replace('FIFA ', '')}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 min-w-[75px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'chat' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <MessageSquare size={13} /> {t.chatTab}
          </button>
          <button
            onClick={() => setActiveTab('investigate')}
            className={`flex-1 min-w-[85px] py-2.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-b-2 ${activeTab === 'investigate' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
          >
            <ShieldCheck size={13} /> {t.investigateTab.split(' ')[0]}
          </button>
        </div>

        {/* Desktop-Precision Grid (Map always active on left, Sub-tools change on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1: The Interactive Stadium Map (Visible on Desktop always, or on Map tab on mobile) */}
          <div className={`lg:col-span-7 ${activeTab === 'map' ? 'block' : 'hidden lg:block'}`} id="desktop-map-viewport">
            <StadiumMap
              selectedZone={selectedZone}
              setSelectedZone={setSelectedZone}
              selectedGate={selectedGate}
              setSelectedGate={setSelectedGate}
              filteredAmenityType={filteredAmenityType}
              setFilteredAmenityType={setFilteredAmenityType}
              isOffline={isOffline}
            />
          </div>

          {/* COLUMN 2: Subtools Panel (Varies on desktop based on selectors; shows active tab content on mobile) */}
          <div className={`lg:col-span-5 flex flex-col gap-5 ${activeTab !== 'map' ? 'block' : 'hidden lg:flex'}`} id="desktop-tools-viewport">
            
            {/* Desktop-Only Tab Selectors on top of subtools */}
            <div className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm" id="desktop-tool-tabs">
              <button
                onClick={() => setActiveTab('ticket')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${activeTab === 'ticket' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
              >
                <Layers size={14} /> {t.ticketUploaderTab}
              </button>
              <button
                onClick={() => setActiveTab('gate')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${activeTab === 'gate' || activeTab === 'map' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
              >
                <Ticket size={14} /> {t.gateTab}
              </button>
              <button
                onClick={() => setActiveTab('transit')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${activeTab === 'transit' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
              >
                <Bus size={14} /> {t.transitTab}
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${activeTab === 'food' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
              >
                <Utensils size={14} /> {t.foodTitle.replace('FIFA ', '')}
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${activeTab === 'chat' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
              >
                <MessageSquare size={14} /> {t.chatTab}
              </button>
              <button
                onClick={() => setActiveTab('investigate')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${activeTab === 'investigate' ? 'bg-fifa-blue text-white border-fifa-green shadow-xs' : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
              >
                <ShieldCheck size={14} /> {t.investigateTab}
              </button>
            </div>

            {/* Render Active Tab / Sub-component */}
            <div className="flex-1">
              {activeTab === 'ticket' && (
                <TicketUploader
                  language={language}
                  onTicketLoaded={handleTicketLoaded}
                  onClearTicket={handleClearTicket}
                  activeTicket={activeTicket}
                />
              )}
              {activeTab === 'gate' && (
                <MyTicket
                  language={language}
                  activeTicket={activeTicket}
                  currentUser={currentUser}
                  onClearTicket={handleClearTicket}
                />
              )}
              {activeTab === 'transit' && (
                <TransitInfo />
              )}
              {activeTab === 'food' && (
                <FoodOnline
                  language={language}
                  activeTicket={activeTicket}
                />
              )}
              {activeTab === 'chat' && (
                <AIChat
                  isOffline={isOffline}
                  onTriggerOnboarding={() => setShowOnboarding(true)}
                  selectedZone={selectedZone}
                  selectedGate={selectedGate}
                  language={language}
                />
              )}
              {activeTab === 'investigate' && (
                <TicketInvestigator
                  language={language}
                  activeTicket={activeTicket}
                  onSelectTicket={handleTicketLoaded}
                />
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Persistent Stadium Safety Quick Indicators Footer */}
      <footer className="bg-white border-t border-slate-150 py-6 mt-auto text-xs text-slate-500" id="global-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <Award size={15} className="text-emerald-600" />
            <span className="font-bold text-slate-700">{t.safetyCharter}</span>
            <span className="text-slate-300">|</span>
            <span>{t.safetyCharterDesc}</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
              <ShieldAlert size={12} /> {t.seekSignage}
            </span>
            <span>{t.emergencyHelpline}: **+1 (800) 555-FIFA**</span>
          </div>

         </div>
      </footer>

      {/* Emergency Assistance Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4" id="emergency-modal">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-4 border-rose-600 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert size={20} />
                <h3 className="font-black tracking-tight text-lg uppercase">Emergency Medical & Security</h3>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-center">
                <div className="text-[10px] uppercase font-extrabold text-rose-600 tracking-wider">stadium helpline number</div>
                <div className="text-2xl font-black text-rose-950 mt-1 flex items-center justify-center gap-1.5 select-all">
                  <Phone size={20} className="text-rose-600" />
                  <span>+1 (800) 555-FIFA</span>
                </div>
                <div className="text-xs text-rose-800 font-bold mt-1">(+1 800-555-3432)</div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p className="font-bold text-slate-800">Please do not hesitate to act immediately:</p>
                <div className="flex gap-2 items-start">
                  <span className="text-rose-600 font-extrabold mt-0.5">&bull;</span>
                  <p><strong>Find a Steward</strong>: Locate any physical stadium steward, crew, or security guard wearing the neon World Cup vests immediately. They can request emergency medics with instant radios.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-rose-600 font-extrabold mt-0.5">&bull;</span>
                  <p><strong>Explain clearly</strong>: Give them your exact Section number (e.g. North Concourse Section N105) and current Gate.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-rose-600 font-extrabold mt-0.5">&bull;</span>
                  <p><strong>Unreliable network</strong>: If your cell network drops, use the stadium public landline boxes positioned next to any First Aid clinic.</p>
                </div>
              </div>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md mt-2 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle size={15} />
                I Understand, Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Onboarding Wizard Overlay */}
      {showOnboarding && (
        <OnboardingOverlay onClose={handleCloseOnboarding} language={language} />
      )}

      {/* simulated user auth modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4" id="auth-modal">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-fifa-blue">
                <User size={20} className="text-[#001C4F]" />
                <h3 className="font-black tracking-tight text-lg uppercase text-slate-900">{t.authModalTitle}</h3>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSigningIn(true);
              setTimeout(() => {
                setCurrentUser({
                  name: authName.trim() || "Matchday Guest #2026",
                  email: authEmail.trim() || "fan@fifa2026.com",
                  fanId: "FID-" + Math.floor(100000 + Math.random() * 900000)
                });
                setIsSigningIn(false);
                setShowAuthModal(false);
              }, 1200);
            }} className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">{t.authModalSub}</p>
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="Lionel Messi"
                  className="p-3 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-fifa-green focus:outline-none bg-white text-slate-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">{t.enterMatchdayID}</label>
                <input
                  type="text"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="messi10@argentina.com"
                  className="p-3 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-fifa-green focus:outline-none bg-white text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full bg-slate-950 text-white font-black py-3 rounded-xl text-xs transition-colors shadow-md mt-2 cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wide hover:bg-slate-900 disabled:opacity-50"
              >
                {isSigningIn ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>{t.signingIn}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} className="text-fifa-green" />
                    <span>{t.authButton}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
