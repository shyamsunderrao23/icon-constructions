import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  ShieldCheck, Award, Users, Building2, MapPin,
  ArrowRight, ArrowLeft, CheckCircle2, Sparkles,
  ChevronDown, ChevronRight, X, Sliders, Menu, Target, Eye, Compass, Globe,
  FileText, HeartHandshake, ShieldAlert, Scale, Check,
  HardHat, Leaf, BookOpen, Clock, Phone, Mail, ArrowUpRight
} from 'lucide-react';

export default function AboutPage({ onNavigate, onBack }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'vision' | 'policy' | 'legacy'

  const navigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (onBack) {
      onBack();
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 30 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const stats = [
    { value: "50+", label: "Years Legacy", desc: "Since 1975 across Telangana" },
    { value: "100+", label: "Landmark Executions", desc: "Civic buildings, bridges & campuses" },
    { value: "25M+", label: "Safe Man-Hours", desc: "Zero-harm safety record" },
    { value: "100%", label: "On-Time Handover", desc: "Trusted government vendor" }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#07132c] font-sans antialiased selection:bg-[#c5a059] selection:text-white">

      {/* ── TOP NOTICE BAR ─── */}
      <div className="bg-[#c5a059] text-white text-xs py-2 sm:py-2.5 px-4 sm:px-8 shadow-sm font-medium border-b border-[#b88f44]">
        <div className="w-full flex items-center justify-center text-center">
          <p className="text-white text-xs sm:text-[13px] font-semibold tracking-wide">
            <span className="opacity-95">Class-1 Government Empaneled Contractor</span>
            <span className="mx-2 opacity-60">•</span>
            <span className="opacity-95">50+ Years Engineering Legacy</span>
            <span className="mx-2 opacity-60">•</span>
            <span className="opacity-95">ISO 9001 Quality Certified</span>
            <span className="hidden md:inline mx-2 opacity-60">•</span>
            <span className="hidden md:inline opacity-95">Official Portal: iconconstructions.com</span>
          </p>
        </div>
      </div>

      {/* ── HEADER / NAVBAR ─── */}
      <header className="sticky top-0 z-40 bg-[#F8F7F3] shadow-sm border-b border-slate-200 transition-all duration-300">
        <div className="w-full px-6 sm:px-10 lg:px-14 h-16 sm:h-18 flex items-center justify-between gap-6 relative">

          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center shrink-0 py-0.5 cursor-pointer bg-transparent border-0" title="Return to Home">
            <img
              src="/logo.png"
              alt="Icon Constructions Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </button>

          {/* Desktop Nav */}
          <div className="flex items-center gap-6 xl:gap-8">
            <nav className="hidden lg:flex items-center gap-1 xl:gap-6">
              <button className="px-3 py-2 text-xs xl:text-sm font-bold tracking-wide text-[#c5a059] cursor-pointer bg-transparent border-0 border-b-2 border-[#c5a059]">
                About Us
              </button>
              <button onClick={() => navigate('projects')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Projects
              </button>
              <button onClick={() => navigate('expertise')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Expertise
              </button>
              <button onClick={() => navigate('contact')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Contact Us
              </button>
            </nav>

            <button
              onClick={() => navigate('home')}
              className="hidden lg:flex items-center gap-2 bg-[#07132c] text-[#e5be6b] hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-none hover:bg-[#0b1e3d] transition-all duration-200 cursor-pointer border border-[#c5a059]/40 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-1.5 bg-transparent border-0 text-[#0d214a] hover:text-[#c5a059] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ── LEFT SIDEBAR MOBILE DRAWER ─── */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          mobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay */}
        <div 
          className={`fixed inset-0 bg-[#07132c]/75 backdrop-blur-sm transition-opacity duration-300 ${
            mobileNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileNavOpen(false)}
        />

        {/* Drawer Panel (Left Slide-in) */}
        <div 
          className={`fixed top-0 left-0 bottom-0 w-[340px] sm:w-[380px] max-w-[90vw] bg-[#F8F7F3] text-[#07132c] shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-out border-r border-slate-300 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8F7F3]">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Icon Constructions Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <span className="text-[#07132c] font-sans text-sm font-black tracking-wider block">ICON</span>
                <span className="text-[#c5a059] text-[9px] font-bold tracking-widest uppercase block -mt-0.5">CONSTRUCTIONS</span>
              </div>
            </div>
            <button 
              onClick={() => setMobileNavOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-[#07132c] border border-slate-300 hover:border-[#c5a059] transition-colors cursor-pointer bg-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="p-5 space-y-2 flex-1 overflow-y-auto">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] mb-3 px-1">
              Menu Navigation
            </div>
            <button 
              onClick={() => { navigate('home'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/40 text-left cursor-pointer"
            >
              <span className="font-bold">About Us</span>
              <ChevronRight className="w-4 h-4 text-[#c5a059]" />
            </button>
            <button 
              onClick={() => { navigate('projects'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { navigate('expertise'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Expertise</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { navigate('contact'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Drawer Footer & Fast Action */}
          <div className="p-5 border-t border-slate-200 bg-[#EFECE6] space-y-3">
            <button 
              onClick={() => { navigate('contact'); setMobileNavOpen(false); }}
              className="w-full bg-[#07132c] hover:bg-[#0b1e3d] text-[#e5be6b] font-black uppercase tracking-widest text-xs py-3.5 px-4 shadow-md transition-all cursor-pointer border border-[#c5a059]/40 flex items-center justify-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <div className="text-[11px] text-slate-600 space-y-0.5 pt-1">
              <p className="font-bold text-[#07132c] text-[11px]">Class-1 Empaneled Contractor</p>
              <p className="text-[10px] text-slate-500">50+ Years Engineering Legacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ─── */}
      <section className="relative w-full overflow-hidden bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 data-aos="fade-up" className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
            About Icon Constructions
          </h1>

          <p data-aos="fade-up" data-aos-delay="100" className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Delivering landmark government complexes, multi-span river bridges, and educational campuses across Telangana founded upon visionary engineering, zero-compromise policy, and a proud 50-year legacy.
          </p>

          {/* Tab Filter Navigation (0 border radius) */}
          <div data-aos="fade-up" data-aos-delay="150" className="flex flex-wrap items-center justify-center gap-0 pt-6">
            <div className="inline-flex border border-slate-300 rounded-none overflow-hidden shadow-xs bg-white">
              {[
                { id: 'all', label: 'All Pillars' },
                { id: 'vision', label: 'Our Vision' },
                { id: 'policy', label: 'Our Policy' },
                { id: 'legacy', label: 'Our Legacy' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-none text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border-r border-slate-300 last:border-r-0 ${
                    activeTab === tab.id
                      ? 'bg-[#07132c] text-[#e5be6b] font-black'
                      : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#07132c]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ─── */}
      <section className="bg-[#07132c] text-white py-12 border-y border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {stats.map((stat, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 80} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-[#e5be6b]">{stat.value}</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">{stat.label}</div>
                <p className="text-xs text-slate-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLAR 1: OUR VISION ─── */}
      {(activeTab === 'all' || activeTab === 'vision') && (
        <section id="vision" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div data-aos="fade-right" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-amber-50 border border-[#c5a059]/40 text-[#927027] text-xs font-bold uppercase tracking-widest">
                <Target className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>STRATEGIC DIRECTION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#07132c] leading-tight">
                Our Vision
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                To stand as Telangana’s most dependable capital civil construction partner, shaping modern civic infrastructure that empowers communities and endures for generations.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Benchmark Engineering Quality",
                    desc: "Executing structural reinforced concrete and heavy framing that exceed all state civil benchmarks and seismic resilience standards."
                  },
                  {
                    title: "Regional & Tribal Community Empowerment",
                    desc: "Constructing high-impact educational institutions, student hostels, and municipal administrative centers in rural and tribal districts."
                  },
                  {
                    title: "Sustainable Civil Practices",
                    desc: "Integrating carbon-efficient concrete mixes, eco-conscious riverbed preservation, and long-term water conservation infrastructure."
                  },
                  {
                    title: "Absolute Operational Transparency",
                    desc: "Maintaining seamless client collaboration, verified digital project auditing, and 100% on-time milestone delivery."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-none bg-white border border-slate-200 shadow-xs hover:border-[#c5a059] transition-all">
                    <div className="w-8 h-8 rounded-none bg-amber-100/70 text-[#927027] flex items-center justify-center shrink-0 font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#07132c]">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left" className="lg:col-span-6 relative">
              <div className="relative rounded-none overflow-hidden shadow-xl border border-slate-200 bg-slate-950">
                <img
                  src="/icon_skybridge_resort.jpg"
                  alt="Our Vision Architectural Project"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 text-white space-y-2">
                  <span className="px-3 py-1 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black uppercase tracking-widest">
                    Vision In Action
                  </span>
                  <h3 className="text-2xl font-bold">Engineering Tomorrow's Monuments</h3>
                  <p className="text-xs text-slate-300">Transforming public infrastructure with architectural grace and structural strength.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── PILLAR 2: OUR POLICY ─── */}
      {(activeTab === 'all' || activeTab === 'policy') && (
        <section id="policy" className="w-full bg-slate-100 py-20 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white border border-[#c5a059]/40 text-[#927027] text-xs font-bold uppercase tracking-widest shadow-xs">
                <Scale className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>UNCOMPROMISED STANDARDS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#07132c]">
                Our Policy
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Our operations are governed by three rigorous corporate policies ensuring zero-defect quality, zero-harm site safety, and ethical commercial transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Quality Policy Card */}
              <div data-aos="fade-up" data-aos-delay="50" className="bg-white rounded-none p-8 border border-slate-200 shadow-sm hover:border-[#c5a059] transition-all space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-none bg-amber-50 text-[#927027] flex items-center justify-center border border-[#c5a059]/30">
                    <Award className="w-7 h-7 text-[#c5a059]" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-[#07132c]">Quality Management Policy</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We adhere to strict quality assurance protocols at every stage of civil execution, from raw material procurement to structural handover.
                  </p>
                  <ul className="space-y-2.5 pt-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Certified concrete mix design &amp; mandatory laboratory cube compression testing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Ultrasonic rebar integrity scans &amp; soil compaction validation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Zero-defect handover tolerance for civil, plumbing, and structural finishes.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#927027] uppercase tracking-wider">
                  ISO-Aligned Civil Benchmarks
                </div>
              </div>

              {/* Safety Policy Card */}
              <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-none p-8 border border-slate-200 shadow-sm hover:border-[#c5a059] transition-all space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-none bg-amber-50 text-[#927027] flex items-center justify-center border border-[#c5a059]/30">
                    <HardHat className="w-7 h-7 text-[#c5a059]" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-[#07132c]">Zero-Harm Safety Policy</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The life and health of our engineers, labor force, and neighboring communities take precedence over all operational schedules.
                  </p>
                  <ul className="space-y-2.5 pt-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>100% mandatory PPE protocols across all high-rise and bridge sites.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Daily morning site safety briefings and toolbox safety inductions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Over 25 million safe man-hours logged with zero major fatal occurrences.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#927027] uppercase tracking-wider">
                  National Safety Stewardship
                </div>
              </div>

              {/* Environmental & Governance Policy Card */}
              <div data-aos="fade-up" data-aos-delay="150" className="bg-white rounded-none p-8 border border-slate-200 shadow-sm hover:border-[#c5a059] transition-all space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-none bg-amber-50 text-[#927027] flex items-center justify-center border border-[#c5a059]/30">
                    <Leaf className="w-7 h-7 text-[#c5a059]" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-[#07132c]">Environmental &amp; Ethics Policy</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We practice ethical governance, anti-fraud vigilance, and environmentally sensitive construction across regional watersheds.
                  </p>
                  <ul className="space-y-2.5 pt-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Zero tolerance for fraud; official website domain is iconconstructions.com.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Responsible stream bed preservation and soil erosion containment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>Fair living wages, welfare camps, and equal opportunity for local workforce.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#927027] uppercase tracking-wider">
                  Ethical Governance &amp; Sustainability
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ── PILLAR 3: OUR LEGACY ─── */}
      {(activeTab === 'all' || activeTab === 'legacy') && (
        <section id="legacy" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div data-aos="fade-right" className="lg:col-span-6 relative">
              <div className="relative rounded-none overflow-hidden shadow-xl border border-slate-200 bg-slate-950">
                <img
                  src="/icon_river_bridge.jpg"
                  alt="Our Legacy Bridge Construction"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 text-white space-y-2">
                  <span className="px-3 py-1 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black uppercase tracking-widest">
                    50+ Years In Telangana
                  </span>
                  <h3 className="text-2xl font-bold">Tonkini 10-Span River Bridge</h3>
                  <p className="text-xs text-slate-300">Connecting regional communities and standing against seasonal monsoon torrents.</p>
                </div>
              </div>
            </div>

            <div data-aos="fade-left" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-amber-50 border border-[#c5a059]/40 text-[#927027] text-xs font-bold uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>50+ YEARS OF REGIONAL TRUST</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#07132c] leading-tight">
                Our Legacy
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                For more than five decades since 1975, Icon Constructions has played a cornerstone role in Northern Telangana’s civil transformation.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Our journey began with regional masonry and civil works in Sirpur Town and Kumuram Bheem Asifabad District. Through relentless engineering discipline and bonded contractor excellence, we earned empanelment with government departments including Roads &amp; Buildings (R&amp;B), Panchayat Raj, Tribal Welfare, and Municipal Corporations.
                </p>
                <p>
                  Today, our portfolio includes landmark government administrative headquarters, 100-column residential schools, KGBV model high school campuses, 10-span highway river bridges, and multi-unit cross-drainage culverts.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-none bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-2xl font-black text-[#07132c]">1975</span>
                  <p className="text-xs text-slate-500 font-semibold">Established in Sirpur Town</p>
                </div>
                <div className="p-4 rounded-none bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-2xl font-black text-[#07132c]">100%</span>
                  <p className="text-xs text-slate-500 font-semibold">Project Completion Rate</p>
                </div>
                <div className="p-4 rounded-none bg-white border border-slate-200 shadow-xs space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-black text-[#927027]">Class-1</span>
                  <p className="text-xs text-slate-500 font-semibold">Government Empaneled</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ─── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div data-aos="fade-up" className="bg-[#07132c] text-white rounded-none p-6 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl relative overflow-hidden">
          <div className="space-y-2 sm:space-y-3 relative z-10 text-center md:text-left">
            <span className="text-xs sm:text-sm font-semibold text-[#e5be6b] tracking-wide block uppercase">
              Partner with a 50-year legacy contractor
            </span>
            <h3 className="text-xl sm:text-4xl lg:text-5xl font-sans font-bold text-white leading-tight">
              Experience the Icon standard of engineering.
            </h3>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('projects')}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-none hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer border border-[#d4af37]"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-4 h-4 text-[#07132c]" />
            </button>

            <button
              onClick={() => navigate('contact')}
              className="flex items-center justify-center gap-3 bg-slate-800 text-slate-200 hover:text-white font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-none hover:bg-slate-700 transition-all duration-300 cursor-pointer border border-slate-700"
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER (MODERN UPGRADED 4-COLUMN) ─── */}
      <footer className="bg-[#050e1f] text-white border-t border-slate-800 pt-20 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Top Row: Brand Info + Direct Action */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-5">
              <button onClick={() => navigate('home')} className="flex items-center bg-transparent border-0 cursor-pointer p-0">
                <img src="/logo.png" alt="Icon Constructions Logo" className="h-12 w-auto object-contain" />
              </button>
              <p className="text-xs text-slate-300 leading-relaxed pr-4">
                Icon Constructions is a Class-1 Government Empaneled contractor delivering large-scale civic complexes, multi-span river bridges, educational campuses, and hydraulic infrastructure across Telangana since 1975.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-slate-800/80 border border-slate-700 text-[#e5be6b] text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Class-1 Bonded Government Contractor</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <button onClick={() => navigate('home')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('about')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-bold text-[#c5a059]">
                    About Us (Vision &amp; Legacy)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Our Projects (Full Portfolio)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('expertise')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Expertise &amp; Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('contact')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Contact &amp; Tender Inquiries
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Core Disciplines */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Core Disciplines
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>10-Span Highway River Bridges</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>100-Column School &amp; KGBV Campuses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>MRO Civic &amp; Municipal Headquarters</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>Stream Check Dams &amp; Box Culverts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>PEB Structural Industrial Sheds</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Official Headquarters */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Headquarters
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Sirpur Town, Kumuram Bheem Asifabad District, Telangana, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>+91 (800) 555-ICON</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>inquiries@iconconstructions.com</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('contact')}
                    className="w-full bg-[#c5a059] text-[#07132c] hover:bg-[#d4af37] font-black uppercase tracking-wider text-xs py-2.5 px-4 rounded-none transition-all cursor-pointer border-0"
                  >
                    Submit Tender Inquiry
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Certifications + Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
            <p>© 2026 Icon Constructions Group. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-slate-300">ISO 9001: Quality</span>
              <span className="text-slate-300">ISO 14001: Environment</span>
              <span className="text-slate-300">ISO 45001: Health &amp; Safety</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
