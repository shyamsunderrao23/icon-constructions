import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Building2, Globe, ShieldCheck, CheckCircle2,
  ArrowRight, ArrowLeft, Sparkles, Sliders, X, ChevronRight, Menu,
  MapPin, Phone, Mail, Wrench, Layers, Award, Hammer
} from 'lucide-react';

const expertiseSectors = [
  {
    id: 'bridges',
    sectorNumber: '01',
    title: 'Multi-Span Highway River Bridges & Pile Foundations',
    tagline: 'Heavy Infrastructure & Hydraulic Crossings',
    image: '/icon_river_bridge.jpg',
    description: 'Icon Constructions specializes in high-capacity highway river crossings, pre-stressed concrete girder installations, and deep underwater pile foundations engineered to withstand peak seasonal monsoon currents.',
    capabilities: [
      'Multi-span pre-stressed concrete (PSC) girder erection',
      'Deep bored cast-in-situ concrete pile foundations',
      'Hydraulic scour analysis & riverbank gabion wall protection',
      'Heavy load-bearing abutments & elastomeric bridge bearings'
    ],
    highlightProject: 'Tonkini & Sirpur 10-Span Highway River Bridges'
  },
  {
    id: 'educational',
    sectorNumber: '02',
    title: 'Educational Campuses, 100-Column Structures & Hostels',
    tagline: 'Institutional & Welfare Infrastructure',
    image: '/icon_school_campus.jpg',
    description: 'High-capacity institutional complexes engineered for generational durability, including 100-column heavy structural concrete frames, multi-story government high schools, and KGBV tribal residential hostels.',
    capabilities: [
      '100-column high-span structural concrete frame engineering',
      'Ventilated academic classrooms, physics & chemistry science laboratories',
      'Multi-story residential dormitories with safety-first egress',
      'Complete campus utility grids, perimeter security & sports grounds'
    ],
    highlightProject: 'Boys Residential School (100 Columns) & KGBV Campuses'
  },
  {
    id: 'civic',
    sectorNumber: '03',
    title: 'Government & Civic Administrative Headquarters',
    tagline: 'Public Administration & Municipal Facilities',
    image: '/icon_mro_headquarters.jpg',
    description: 'Official Mandal Revenue Office (MRO) headquarters, sub-collectorate executive wings, integrated municipal wholesale markets, and forest department command centers built to rigorous government specifications.',
    capabilities: [
      'Public administrative suites, archive vaults & revenue registry halls',
      'Multi-tier security perimeters & citizen service concourses',
      'Sanitary municipal market complexes with cold-storage drainage',
      'Government standard RCC framing & architectural all-weather facades'
    ],
    highlightProject: 'MRO Administrative Headquarters & Integrated Markets'
  },
  {
    id: 'hydraulic',
    sectorNumber: '04',
    title: 'Hydraulic Infrastructure, Check Dams & Box Culverts',
    tagline: 'Water Resource Management & Flood Protection',
    image: '/icon_check_dam.jpg',
    description: 'Specialized hydraulic civil engineering including stream check dams for groundwater recharge, flood-mitigation retaining walls, and reinforced concrete box culvert networks across highway corridors.',
    capabilities: [
      'Gravity masonry & reinforced concrete check dam construction',
      'High-capacity reinforced RCC box culverts (10+ multi-vent networks)',
      'Spillway channels, silt traps & watershed management systems',
      'Water balancing elevated reservoirs (ELSR) with food-grade lining'
    ],
    highlightProject: 'Sirpur Check Dam & 10-Unit Highway Box Culverts'
  },
  {
    id: 'industrial',
    sectorNumber: '05',
    title: 'Industrial Heavy Sheds & Manufacturing Megahubs',
    tagline: 'Pre-Engineered Structures & High-Bay Facilities',
    image: '/icon_industrial_shed.jpg',
    description: 'Pre-engineered industrial steel complexes featuring clear-span trusses, high-clearance overhead gantry crane tracks, and heavy-load concrete floor aprons designed for continuous heavy machinery operations.',
    capabilities: [
      'Pre-engineered structural steel (PEB) fabrication & erection',
      'Overhead traveling gantry crane runways & support columns',
      'Heavy industrial laser-leveled concrete flooring with epoxy coating',
      'Industrial ventilation, fire-suppression networks & loading docks'
    ],
    highlightProject: 'Sirpur Industrial Fabrication Sheds & Modern Megahub'
  }
];

export default function ExpertisePage({ onNavigate, onBack }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
              <button onClick={() => navigate('about')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                About Us
              </button>
              <button onClick={() => navigate('projects')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Projects
              </button>
              <button className="px-3 py-2 text-xs xl:text-sm font-bold tracking-wide text-[#c5a059] cursor-pointer bg-transparent border-0 border-b-2 border-[#c5a059]">
                Expertise
              </button>
              <button onClick={() => navigate('contact')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Contact Us
              </button>
            </nav>

            <button
              onClick={() => navigate('home')}
              className="hidden lg:flex items-center gap-2 bg-[#07132c] text-[#e5be6b] hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-[#0b1e3d] transition-all duration-200 cursor-pointer border border-[#c5a059]/40 shadow-sm"
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
                <span className="text-[#07132c] font-serif text-sm font-black tracking-wider block">ICON</span>
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
              onClick={() => { navigate('about'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { navigate('projects'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/40 text-left cursor-pointer"
            >
              <span className="font-bold">Expertise</span>
              <ChevronRight className="w-4 h-4 text-[#c5a059]" />
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
      <section className="relative w-full overflow-hidden bg-white pt-16 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 data-aos="fade-up" className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-[#07132c] tracking-tight leading-tight">
            Our Expertise
          </h1>

          <p data-aos="fade-up" data-aos-delay="100" className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Delivering multidisciplinary civil and structural engineering solutions across heavy transport infrastructure, educational campuses, government headquarters, and industrial megastructures.
          </p>
        </div>
      </section>

      {/* ── 5 EXPERTISE SECTORS DEEP DIVE ─── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {expertiseSectors.map((sec, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={sec.id}
              data-aos="fade-up"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Media Card */}
              <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                  <img
                    src={sec.image}
                    alt={sec.title}
                    onError={(e) => {
                      e.currentTarget.src = "/icon_mro_headquarters.jpg";
                    }}
                    className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07132c]/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-xl bg-[#07132c]/90 text-[#e5be6b] text-xs font-black uppercase tracking-widest border border-[#c5a059]/40 backdrop-blur-md">
                      Sector {sec.sectorNumber}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-[11px] font-bold text-[#e5be6b] uppercase tracking-wider block">Key Benchmark Project</span>
                    <h4 className="text-lg font-bold text-white">{sec.highlightProject}</h4>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className={`lg:col-span-6 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="text-xs font-black text-[#927027] uppercase tracking-widest block">
                    {sec.tagline}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#07132c] leading-tight">
                    {sec.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {sec.description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-[#07132c] uppercase tracking-wider">Core Technical Capabilities:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sec.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => navigate('projects')}
                    className="inline-flex items-center gap-2 bg-[#07132c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#0b1e3d] transition-colors cursor-pointer border-0 shadow-md"
                  >
                    <span>View Projects In This Sector</span>
                    <ArrowRight className="w-4 h-4 text-[#c5a059]" />
                  </button>

                  <button
                    onClick={() => navigate('contact')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#927027] hover:underline cursor-pointer bg-transparent border-0"
                  >
                    <span>Request Technical RFP</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ── TECHNICAL EXCELLENCE BANNER ─── */}
      <section className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <Layers className="w-8 h-8 text-[#c5a059] mx-auto" />
              <h3 className="text-lg font-bold text-[#07132c]">Heavy Heavy Machinery Fleet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">In-house inventory of hydraulic piling rigs, transit mixers, mobile batching plants, and tower cranes.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#c5a059] mx-auto" />
              <h3 className="text-lg font-bold text-[#07132c]">Rigorous QA/QC Testing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">On-site destructive &amp; non-destructive concrete cube testing, ultrasonic rebar scans, and soil compaction verification.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <Award className="w-8 h-8 text-[#c5a059] mx-auto" />
              <h3 className="text-lg font-bold text-[#07132c]">Government Certified Class-1</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Fully certified and empaneled with major Telangana state infrastructure corporations and municipal bodies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div data-aos="fade-up" className="bg-[#07132c] text-white rounded-none p-6 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 sm:space-y-3 relative z-10 text-center md:text-left">
            <span className="text-xs sm:text-sm font-semibold text-[#e5be6b] tracking-wide block uppercase">
              Looking for tailored structural execution?
            </span>
            <h3 className="text-xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Consult with our principal civil engineers today.
            </h3>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('contact')}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-none hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer border border-[#d4af37]"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#07132c]" />
            </button>

            <button
              onClick={() => navigate('projects')}
              className="flex items-center justify-center gap-3 bg-slate-800 text-slate-200 hover:text-white font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-none hover:bg-slate-700 transition-all duration-300 cursor-pointer border border-slate-700"
            >
              <span>Our Projects</span>
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
                  <button onClick={() => navigate('about')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    About Us (Vision &amp; Legacy)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Our Projects (Full Portfolio)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('expertise')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-bold text-[#c5a059]">
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
