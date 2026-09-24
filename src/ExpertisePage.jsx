import React, { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MapPin, ArrowLeft, Building2, CheckCircle2,
  ChevronDown, ChevronRight, ArrowRight, ArrowUpRight, Search, X, Sliders, Menu,
  Eye, Filter, Sparkles, Phone, Mail, ShieldCheck, Globe, Layers, Award, HardHat
} from 'lucide-react';

const expertiseSectors = [
  {
    id: 'bridges',
    sectorNumber: '01',
    title: 'Multi-Span Highway River Bridges & Pile Foundations',
    tagline: 'Heavy Infrastructure & Hydraulic Crossings',
    categoryName: 'Bridges & Substructures',
    image: '/icon_tonkini_10span_bridge.jpg',
    description: 'Icon Constructions specializes in high-capacity highway river crossings, pre-stressed concrete girder installations, and deep underwater pile foundations engineered to withstand peak seasonal monsoon currents.',
    capabilities: [
      'Multi-span pre-stressed concrete (PSC) girder erection',
      'Deep bored cast-in-situ concrete pile foundations',
      'Hydraulic scour analysis & riverbank gabion wall protection',
      'Heavy load-bearing abutments & elastomeric bridge bearings'
    ],
    highlightProject: 'Tonkini & Sirpur 10-Span Highway River Bridges',
    projectsUnderDiscipline: [
      { sno: '08', name: 'Tonkini – 10 Span Bridge', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '13', name: 'Sirpur – 10 Span Bridge', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '12', name: 'Rasply – 7 Span Bridge', location: 'Kumuram Bheem Asifabad District, Telangana' },
      { sno: '14', name: 'Bridge with 6 Spans – Kondapally', location: 'Kondapally, KB Asifabad District, Telangana' },
      { sno: '07', name: 'Dubbaguda – 3 Span Bridge', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '09', name: 'Navegaon – 2 Span Bridge', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '10', name: 'Pile Foundation & Jacketing – Gudem Bridge', location: 'Gudem, Telangana' },
      { sno: '22', name: 'Box Bridges – 25 Nos.', location: 'Porsa, Maharashtra' }
    ]
  },
  {
    id: 'educational',
    sectorNumber: '02',
    title: 'Educational Campuses, 100-Column Structures & Hostels',
    tagline: 'Institutional & Welfare Infrastructure',
    categoryName: 'Educational & Campuses',
    image: '/icon_school_assembly.jpg',
    description: 'High-capacity institutional complexes engineered for generational durability, including 100-column heavy structural concrete frames, multi-story government high schools, and KGBV tribal residential hostels.',
    capabilities: [
      '100-column high-span structural concrete frame engineering',
      'Ventilated academic classrooms, physics & chemistry science laboratories',
      'Multi-story residential dormitories with safety-first egress',
      'Complete campus utility grids, perimeter security & sports grounds'
    ],
    highlightProject: 'Boys Residential School (100 Columns) & KGBV Campuses',
    projectsUnderDiscipline: [
      { sno: '05', name: 'Boys Residential School – 100 Columns', location: 'Near Sirpur Police Station, Sirpur Town, Telangana' },
      { sno: '03', name: 'High School Building – 2010', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '15', name: 'Jyotiba Phule Building', location: 'Kagaznagar, KB Asifabad District, Telangana' },
      { sno: '16', name: 'Minority Residential Building', location: 'Balagalla, KB Asifabad District, Telangana' },
      { sno: '20', name: 'Kasturba KGBV Building', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '02', name: 'ST Hostel Building – 2009', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '06', name: 'Girls Hostel Building', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '24', name: 'Girls School Buildings – 2 Nos.', location: 'Kumuram Bheem Asifabad District, Telangana' }
    ]
  },
  {
    id: 'civic',
    sectorNumber: '03',
    title: 'Government & Civic Administrative Headquarters',
    tagline: 'Public Administration & Municipal Facilities',
    categoryName: 'Government & Civic',
    image: '/icon_tahasildar_mro.jpg',
    description: 'Official Mandal Revenue Office (MRO) headquarters, sub-collectorate executive wings, integrated municipal wholesale markets, and forest department command centers built to rigorous government specifications.',
    capabilities: [
      'Public administrative suites, archive vaults & revenue registry halls',
      'Multi-tier security perimeters & citizen service concourses',
      'Sanitary municipal market complexes with cold-storage drainage',
      'Government standard RCC framing & architectural all-weather facades'
    ],
    highlightProject: 'MRO Administrative Headquarters & Integrated Markets',
    projectsUnderDiscipline: [
      { sno: '01', name: 'MRO Office Building – 2008', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '25', name: 'Agriculture Building', location: 'Mancherial, Telangana' },
      { sno: '23', name: 'Forest Office Building', location: 'Penchikalpet, KB Asifabad District, Telangana' },
      { sno: '19', name: 'Integrated Market Buildings – 5 Nos.', location: 'Mancherial, Mancherial District, Telangana' },
      { sno: '18', name: 'Three-Floor Buildings – 16 Nos.', location: 'Ramagundam, Telangana' }
    ]
  },
  {
    id: 'hydraulic',
    sectorNumber: '04',
    title: 'Hydraulic Infrastructure, Check Dams & Box Culverts',
    tagline: 'Water Resource Management & Flood Protection',
    categoryName: 'Hydraulic Infrastructure',
    image: '/icon_overflow_check_dam.jpg',
    description: 'Specialized hydraulic civil engineering including stream check dams for groundwater recharge, flood-mitigation retaining walls, and reinforced concrete box culvert networks across highway corridors.',
    capabilities: [
      'Gravity masonry & reinforced concrete check dam construction',
      'High-capacity reinforced RCC box culverts (10+ multi-vent networks)',
      'Spillway channels, silt traps & watershed management systems',
      'Water balancing elevated reservoirs (ELSR) with food-grade lining'
    ],
    highlightProject: 'Sirpur Check Dam & 10-Unit Highway Box Culverts',
    projectsUnderDiscipline: [
      { sno: '11', name: 'Check Dam', location: 'Sirpur Town, KB Asifabad District, Telangana' },
      { sno: '04', name: 'Culverts – 10 Nos.', location: 'Kumuram Bheem Asifabad District, Telangana' },
      { sno: '21', name: 'Box Culverts – 20 Nos.', location: 'Gadchiroli, Maharashtra' }
    ]
  },
  {
    id: 'industrial',
    sectorNumber: '05',
    title: 'Industrial Heavy Sheds & Manufacturing Megahubs',
    tagline: 'Pre-Engineered Structures & High-Bay Facilities',
    categoryName: 'Industrial Sheds & Steel',
    image: '/icon_industrial_steel_sheds.jpg',
    description: 'Pre-engineered industrial steel complexes featuring clear-span trusses, high-clearance overhead gantry crane tracks, and heavy-load concrete floor aprons designed for continuous heavy machinery operations.',
    capabilities: [
      'Pre-engineered structural steel (PEB) fabrication & erection',
      'Overhead traveling gantry crane runways & support columns',
      'Heavy industrial laser-leveled concrete flooring with epoxy coating',
      'Industrial ventilation, fire-suppression networks & loading docks'
    ],
    highlightProject: 'Sirpur Industrial Fabrication Sheds & Modern Megahub',
    projectsUnderDiscipline: [
      { sno: '17', name: 'IIT Sheds', location: 'Kumuram Bheem Asifabad District, Telangana' }
    ]
  }
];

export default function ExpertisePage({ onNavigate, onBack }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSectorModal, setSelectedSectorModal] = useState(null);

  const navigate = (page, params) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else if (onBack) {
      onBack();
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 30 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filtered Sectors
  const filteredSectors = useMemo(() => {
    return expertiseSectors.filter((sector) => {
      // Search matching
      const matchesSearch =
        !searchQuery.trim() ||
        sector.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sector.projectsUnderDiscipline.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category matching
      const matchesCategory =
        selectedCategory === 'ALL' || sector.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categoryTabs = [
    { id: 'ALL', label: 'View All' },
    { id: 'bridges', label: 'Bridges & Substructures' },
    { id: 'educational', label: 'Educational & Hostels' },
    { id: 'civic', label: 'Government & Civic' },
    { id: 'hydraulic', label: 'Hydraulic Infrastructure' },
    { id: 'industrial', label: 'Industrial & Steel' }
  ];

  return (
    <div className="min-h-screen bg-white text-[#07132c] font-sans antialiased selection:bg-[#c5a059] selection:text-white">

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
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200 transition-all duration-300">
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
        <div 
          className={`fixed inset-0 bg-[#07132c]/75 backdrop-blur-sm transition-opacity duration-300 ${
            mobileNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileNavOpen(false)}
        />

        <div 
          className={`fixed inset-y-0 left-0 w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-out border-r border-slate-200 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
            <img src="/logo.png" alt="Icon Constructions Logo" className="h-9 w-auto object-contain" />
            <button 
              onClick={() => setMobileNavOpen(false)} 
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#07132c] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
            <button 
              onClick={() => { navigate('home'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-50 transition-all text-left cursor-pointer"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { navigate('about'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-50 transition-all text-left cursor-pointer"
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { navigate('projects'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-50 transition-all text-left cursor-pointer"
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
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-50 transition-all text-left cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <button 
              onClick={() => { navigate('contact'); setMobileNavOpen(false); }}
              className="w-full bg-[#07132c] hover:bg-[#0b1e3d] text-[#e5be6b] font-black uppercase tracking-widest text-xs py-3.5 px-4 shadow-md transition-all cursor-pointer border border-[#c5a059]/40 flex items-center justify-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 1. HERO BANNER WITH SEARCH & CATEGORY FILTER (z-30 ensures floating dropdown is always on top) ─── */}
      <section className="relative z-30 w-full overflow-visible bg-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="w-full max-w-5xl mx-auto text-center space-y-6">

          {/* Top Tagline */}
          <div data-aos="fade-up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#c5a059] text-xs font-bold uppercase tracking-widest">
            <HardHat className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>CORE ENGINEERING DISCIPLINES</span>
          </div>

          {/* Centered Main Title */}
          <h1 data-aos="fade-up" className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
            Our Expertise
          </h1>

          <p data-aos="fade-up" data-aos-delay="50" className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Delivering multidisciplinary civil and structural engineering solutions across heavy transport infrastructure, educational campuses, government headquarters, and industrial megastructures.
          </p>

          {/* ── 2. SEARCH BAR & DISCIPLINE TABS ─── */}
          <div data-aos="fade-up" data-aos-delay="100" className="pt-2 w-full space-y-4">
            
            {/* Search Input Box */}
            <div className="max-w-4xl mx-auto relative flex items-center bg-white border border-slate-300 hover:border-[#c5a059] focus-within:border-[#c5a059] focus-within:ring-2 focus-within:ring-[#c5a059]/15 rounded-none shadow-xs transition-all duration-300 px-5 py-2.5">
              <Search className="w-5 h-5 text-[#c5a059] shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search disciplines by keyword, capabilities, or projects..."
                className="w-full bg-transparent text-[#07132c] placeholder-slate-400 text-sm sm:text-base outline-none py-1 font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-[#07132c] hover:bg-slate-100 transition-colors mr-2 cursor-pointer bg-transparent border-0"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs sm:text-sm text-slate-500 shrink-0">
                <span className="font-mono bg-slate-100 px-2.5 py-0.5 rounded-none text-[#07132c] font-medium">
                  {filteredSectors.length}
                </span>
                <span>sectors</span>
              </div>
            </div>

            {/* ── DISCIPLINE CATEGORY FILTER (RESPONSIVE MOBILE SELECTOR + DESKTOP TABS) ─── */}
            <div className="pt-1 w-full">
              {/* Custom Filter Dropdown ONLY for Responsive / Mobile (< md) */}
              <div className="md:hidden w-full text-left relative z-40">
                <div className="flex items-center justify-between px-1 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#07132c] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Filter by Sector:</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#c5a059] bg-[#07132c] px-2.5 py-0.5 border border-[#c5a059]/40">
                    {filteredSectors.length} Sectors
                  </span>
                </div>

                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full bg-white text-[#07132c] text-sm font-bold border-2 border-[#c5a059] py-3.5 px-4 flex items-center justify-between shadow-sm cursor-pointer transition-all relative z-50"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] shrink-0" />
                    <span className="truncate font-black text-[#07132c]">
                      {categoryTabs.find((c) => c.id === selectedCategory)?.label || 'All Sectors (5 Core)'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#c5a059] transition-transform duration-300 shrink-0 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Backdrop Click Outside to Smoothly Close */}
                {mobileDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300"
                    onClick={() => setMobileDropdownOpen(false)}
                  />
                )}

                {/* Custom Dropdown Floating Overlay Menu (Overlaps Sector List Smoothly without Moving Content) */}
                <div
                  className={`absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border-2 border-[#c5a059] shadow-2xl divide-y divide-slate-100 transition-all duration-300 origin-top ease-out ${
                    mobileDropdownOpen
                      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                      : 'opacity-0 -translate-y-2 scale-95 pointer-events-none invisible'
                  }`}
                >
                  {categoryTabs.map((item) => {
                    const isSelected = selectedCategory === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(item.id);
                          setMobileDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3.5 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#07132c] text-[#e5be6b]'
                            : 'bg-white text-slate-800 hover:bg-slate-50 hover:text-[#07132c]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#e5be6b] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Filter Tabs (>= md) */}
              <div className="hidden md:block w-full">
                <div className="flex items-stretch justify-start w-full border border-slate-200 rounded-none overflow-hidden bg-white shadow-xs">
                  {categoryTabs.map((tab) => {
                    const isActive = selectedCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`flex-1 h-[46px] sm:h-[48px] px-3 sm:px-4 rounded-none text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer border-r border-slate-200 last:border-r-0 whitespace-nowrap ${
                          isActive
                            ? 'bg-[#07132c] text-[#e5be6b] font-black border-2 border-[#c5a059] shadow-sm relative z-10'
                            : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-[#07132c]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. FULL-BLEED EDGE-TO-EDGE 0-BORDER-RADIUS 0-GAP GRID (WHITE BACKGROUND) ─── */}
      <div className="w-full px-0 py-0 overflow-hidden bg-white relative z-10">

        {/* Empty State */}
        {filteredSectors.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto bg-white p-8 my-10 rounded-none border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-none bg-slate-100 border-2 border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#07132c]">No Disciplines Found</h3>
              <p className="text-xs text-slate-500">
                No expertise sectors match your current search query.
              </p>
            </div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
              className="bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-none shadow-md hover:scale-105 transition-all cursor-pointer border border-[#d4af37]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Full-Bleed 2-Column Edge-to-Edge Grid (0 Gap, 0 Border Radius, Pure White Background) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full px-0 bg-white">
            {filteredSectors.map((sec) => (
              <div
                key={sec.id}
                onClick={() => navigate('projects', { discipline: sec.categoryName })}
                className="relative h-[440px] sm:h-[520px] lg:h-[600px] rounded-none overflow-hidden group shadow-none border-0 transition-all duration-500 bg-white cursor-pointer"
              >
                {/* Full Background Image (No Shadow Layer) */}
                <img
                  src={sec.image}
                  alt={sec.title}
                  onError={(e) => {
                    e.currentTarget.src = "/icon_mro_headquarters.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                  <span className="px-3 py-2 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black tracking-wider uppercase shadow-md">
                    Sector {sec.sectorNumber}
                  </span>
                  <span className="px-4 py-2 rounded-none bg-[#07132c]/90 text-[#e5be6b] text-xs font-black uppercase tracking-widest border border-[#c5a059]/40 backdrop-blur-md">
                    {sec.categoryName}
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-10 bg-black/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold text-white border border-white/20">
                  {sec.projectsUnderDiscipline.length} Projects
                </div>

                {/* Bottom Overlay Info in crisp bottom container */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 z-10 space-y-2">
                  {/* Location / Tagline */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#e5be6b] font-extrabold">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-[#c5a059]" />
                    <span className="truncate">{sec.tagline}</span>
                  </div>

                  {/* Main Title & Action Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-extrabold text-white leading-snug group-hover:text-[#f3d38c] transition-colors">
                      {sec.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('projects', { discipline: sec.categoryName });
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#c5a059] hover:bg-[#e5be6b] text-[#07132c] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all duration-300 cursor-pointer border border-[#d4af37] shrink-0 self-start sm:self-center"
                    >
                      <span>View All Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── 4. SECTOR DETAILS MODAL (MATCHING PROJECT MODAL PATTERN) ─── */}
      {selectedSectorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#07132c]">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
              <img
                src={selectedSectorModal.image}
                alt={selectedSectorModal.title}
                onError={(e) => {
                  e.currentTarget.src = "/icon_mro_headquarters.jpg";
                }}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={() => setSelectedSectorModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-none bg-black/70 text-white hover:bg-[#c5a059] hover:text-[#07132c] transition-colors cursor-pointer border border-white/20"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 inset-x-0 p-5 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 text-white space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black tracking-wider uppercase">
                    Sector {selectedSectorModal.sectorNumber}
                  </span>
                  <span className="px-3 py-1 rounded-none bg-white text-[#07132c] text-xs font-black uppercase tracking-widest">
                    {selectedSectorModal.categoryName}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-white mt-1 leading-tight">
                  {selectedSectorModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              
              {/* Highlight Benchmark */}
              <div className="p-4 rounded-none bg-amber-50/80 border border-[#c5a059]/40 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#c5a059] shrink-0" />
                <div>
                  <span className="text-[10px] font-black text-[#927027] uppercase tracking-wider block">Key Landmark Execution</span>
                  <p className="text-sm font-bold text-[#07132c]">{selectedSectorModal.highlightProject}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#07132c] uppercase tracking-wider border-b border-slate-200 pb-2">
                  Discipline Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedSectorModal.description}
                </p>
              </div>

              {/* Core Technical Capabilities */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-[#07132c] uppercase tracking-wider border-b border-slate-200 pb-2">
                  Core Technical Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedSectorModal.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5 p-3 rounded-none bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Under This Discipline */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-[#07132c] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>Official Projects Executed Under This Discipline ({selectedSectorModal.projectsUnderDiscipline.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedSectorModal.projectsUnderDiscipline.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-3 p-3 rounded-none bg-slate-50 border border-slate-200"
                    >
                      <span className="shrink-0 px-2 py-0.5 rounded-none text-[10px] font-black bg-[#c5a059]/20 text-[#84631d]">
                        #{proj.sno}
                      </span>
                      <div className="space-y-0.5 min-w-0">
                        <h5 className="text-xs font-bold text-[#07132c] truncate">
                          {proj.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-[#c5a059] shrink-0" />
                          <span>{proj.location}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => { setSelectedSectorModal(null); navigate('projects'); }}
                  className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#07132c] hover:bg-[#0b1e3d] text-[#e5be6b] font-black uppercase tracking-wider text-xs transition-colors cursor-pointer border border-[#c5a059]/40 flex items-center justify-center gap-2"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setSelectedSectorModal(null); navigate('contact'); }}
                  className="w-full sm:w-auto px-6 py-3 rounded-none bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] text-xs font-black uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer border border-[#d4af37] shadow-md text-center"
                >
                  Request Technical Consultation
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── 5. TECHNICAL EXCELLENCE BANNER ─── */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="bg-white p-6 sm:p-8 rounded-none border border-slate-200 shadow-sm space-y-3">
              <Layers className="w-8 h-8 text-[#c5a059] mx-auto" />
              <h3 className="text-lg font-bold text-[#07132c]">Heavy Machinery Fleet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">In-house inventory of hydraulic piling rigs, transit mixers, mobile batching plants, and tower cranes.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-none border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#c5a059] mx-auto" />
              <h3 className="text-lg font-bold text-[#07132c]">Rigorous QA/QC Testing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">On-site destructive &amp; non-destructive concrete cube testing, ultrasonic rebar scans, and soil compaction verification.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-none border border-slate-200 shadow-sm space-y-3">
              <Award className="w-8 h-8 text-[#c5a059] mx-auto" />
              <h3 className="text-lg font-bold text-[#07132c]">Government Certified Class-1</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Fully certified and empaneled with major Telangana state infrastructure corporations and municipal bodies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM CTA ─── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div data-aos="fade-up" className="bg-[#07132c] text-white rounded-none p-6 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 sm:space-y-3 relative z-10 text-center md:text-left">
            <span className="text-xs sm:text-sm font-semibold text-[#e5be6b] tracking-wide block uppercase">
              Looking for tailored structural execution?
            </span>
            <h3 className="text-xl sm:text-4xl lg:text-5xl font-sans font-bold text-white leading-tight">
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

      {/* ── 7. FOOTER (MODERN UPGRADED 4-COLUMN) ─── */}
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
