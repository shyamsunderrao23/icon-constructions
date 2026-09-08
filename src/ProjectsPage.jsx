import React, { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MapPin, ArrowLeft, Calendar, Building2, CheckCircle2,
  ChevronDown, ChevronRight, ArrowRight, ArrowUpRight, Search, X, Sliders, Menu,
  Eye, Filter, Sparkles, Phone, Mail, ShieldCheck, Globe
} from 'lucide-react';

const allProjectsData = [
  {
    id: 1,
    title: "Administrative Block & Revenue Complex",
    alphabetLetter: "A",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Mandal Revenue Administrative Wing",
    year: "2011",
    status: "Completed",
    description: "Multi-tiered administrative complex engineered for district revenue coordination, citizen service desks, and municipal administration with heavy reinforced framing."
  },
  {
    id: 2,
    title: "Boys Residential School – 100 Columns",
    alphabetLetter: "B",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_school_campus.jpg",
    location: "Near Sirpur Police Station, Sirpur Town, Telangana",
    scale: "100-Column Heavy RCC Structural Framework",
    year: "Completed",
    status: "Completed",
    description: "High-capacity institutional campus featuring a massive 100-column concrete frame, academic lecture halls, library wings, and sports grounds serving tribal youth."
  },
  {
    id: 3,
    title: "Culverts – 10 Nos. Drainage Network",
    alphabetLetter: "C",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_check_dam.jpg",
    location: "Kumuram Bheem Asifabad Highway Corridor, Telangana",
    scale: "10 Reinforced RCC Box Culverts",
    year: "Completed",
    status: "Completed",
    description: "Strategic hydraulic engineering consisting of 10 heavy reinforced box culverts constructed to withstand torrential monsoon flash floods across the district highway network."
  },
  {
    id: 4,
    title: "District Collectorate Sub-Divisional Wing",
    alphabetLetter: "D",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Asifabad District Headquarters, Telangana",
    scale: "Sub-Collector Administrative Headquarters",
    year: "2014",
    status: "Completed",
    description: "Executive administrative offices designed with high-security perimeters, conference halls, and digital record archives for district governance."
  },
  {
    id: 5,
    title: "Engineering Workshop & Equipment Yard",
    alphabetLetter: "E",
    category: "industrial",
    categoryName: "Industrial & Campuses",
    image: "/icon_industrial_shed.jpg",
    location: "Sirpur Industrial Zone, Telangana",
    scale: "Industrial Heavy Fabrication Facility",
    year: "2017",
    status: "Completed",
    description: "Pre-engineered structural steel industrial shed featuring high-clearance overhead crane tracks, reinforced concrete apron flooring, and heavy machinery bays."
  },
  {
    id: 6,
    title: "Forest Department Divisional Headquarters",
    alphabetLetter: "F",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Kagaznagar - Sirpur Forest Range, Telangana",
    scale: "Forest Conservation & Divisional Office",
    year: "2016",
    status: "Completed",
    description: "Eco-integrated administrative building designed for the Telangana Forest Department, including wildlife monitoring command hubs and field officer facilities."
  },
  {
    id: 7,
    title: "Girls Hostel Building – KGBV Campus",
    alphabetLetter: "G",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_waterfront_estate.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "KGBV Residential Student Campus",
    year: "Completed",
    status: "Completed",
    description: "State-of-the-art government residential campus for girls, providing secure lodging, study lounges, hygiene sanitation systems, and modern dining quarters."
  },
  {
    id: 8,
    title: "High School Academic Complex – 2010",
    alphabetLetter: "H",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_skybridge_resort.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Multi-Story Academic High School",
    year: "2010",
    status: "Completed",
    description: "Multi-story government high school academic building featuring modern laboratories, ventilated lecture halls, and all-weather exterior weatherproofing."
  },
  {
    id: 9,
    title: "Integrated Veg & Meat Modern Market Complex",
    alphabetLetter: "I",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Sirpur Town Central Market Hub, Telangana",
    scale: "Multi-Zone Municipal Wholesale Market",
    year: "2018",
    status: "Completed",
    description: "Sanitary municipal retail and wholesale commercial facility featuring segregated sections, underground drainage systems, and automated cold-storage provisions."
  },
  {
    id: 10,
    title: "KGBV Model Residential School Campus",
    alphabetLetter: "K",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_school_campus.jpg",
    location: "Kouthala Mandal, Kumuram Bheem District, Telangana",
    scale: "Model High School & Hostels",
    year: "2015",
    status: "Completed",
    description: "Comprehensive educational complex constructed under tribal development initiatives with dedicated faculty housing, science laboratories, and library facilities."
  },
  {
    id: 11,
    title: "Landmark Commercial Office Tower",
    alphabetLetter: "L",
    category: "industrial",
    categoryName: "Industrial & Campuses",
    image: "/icon_landmark_tower.jpg",
    location: "Regional Commercial Corridor, Telangana",
    scale: "G+7 Grade-A Commercial Landmark",
    year: "2019",
    status: "Completed",
    description: "Modern commercial tower with glass curtain facade, energy-efficient HVAC engineering, and multi-level parking for corporate tenants and government offices."
  },
  {
    id: 12,
    title: "MRO Office Building – 2008",
    alphabetLetter: "M",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "MRO Administrative Headquarters",
    year: "2008",
    status: "Completed",
    description: "Official Mandal Revenue Office headquarters engineered for public administration, revenue registry, citizen service halls, and permanent government records."
  },
  {
    id: 13,
    title: "Modern Industrial Manufacturing Megahub",
    alphabetLetter: "M",
    category: "industrial",
    categoryName: "Industrial & Campuses",
    image: "/icon_industrial_megahub.jpg",
    location: "Kumuram Bheem Industrial Corridor, Telangana",
    scale: "High-Bay Industrial Production Facility",
    year: "2022",
    status: "Completed",
    description: "Heavy-duty manufacturing complex spanning extensive square footage, engineered for heavy robotics, overhead gantry cranes, and continuous logistical flow."
  },
  {
    id: 14,
    title: "Panchayat Raj Community Hall",
    alphabetLetter: "P",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Dahegaon Mandal, Asifabad District, Telangana",
    scale: "Civic Gathering & Assembly Hall",
    year: "2013",
    status: "Completed",
    description: "Large span civic assembly facility with acoustic ceiling treatments, public dais, and community training centers serving rural regional councils."
  },
  {
    id: 15,
    title: "Regional Stream Check Dam & Retaining Walls",
    alphabetLetter: "R",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_check_dam.jpg",
    location: "Vattivagu Stream Basin, Asifabad District, Telangana",
    scale: "Water Storage & Stream Check Dam",
    year: "Completed",
    status: "Completed",
    description: "Gravity masonry and reinforced concrete check dam with spillway gates designed to recharge underground aquifers and ensure year-round rural water availability."
  },
  {
    id: 16,
    title: "ST Hostel Building – 2009",
    alphabetLetter: "S",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_landmark_tower.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "ST Student Residential Hostel",
    year: "2009",
    status: "Completed",
    description: "Dedicated Scheduled Tribe Welfare student residential hostel facility providing secure housing, solar water heating, study rooms, and hygienic cafeteria."
  },
  {
    id: 17,
    title: "Skybridge Institutional Academic Center",
    alphabetLetter: "S",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_skybridge_resort.jpg",
    location: "Kumuram Bheem District, Telangana",
    scale: "Connected Dual-Wing Academic Campus",
    year: "2020",
    status: "Completed",
    description: "Architectural campus featuring an elevated structural steel skybridge linking administrative and academic wings with seismic-resistant construction."
  },
  {
    id: 18,
    title: "Tonkini 10-Span High-Level River Bridge",
    alphabetLetter: "T",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_river_bridge.jpg",
    location: "Tonkini River Crossing, Sirpur Region, Telangana",
    scale: "10-Span Major Pre-Stressed Concrete Bridge",
    year: "Completed",
    status: "Completed",
    description: "Critical regional arterial bridge spanning 10 high-strength prestressed concrete spans over river Tonkini, built on deep pile foundations for all-weather connectivity."
  },
  {
    id: 19,
    title: "Veterinary Hospital & Research Wing",
    alphabetLetter: "V",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_mro_headquarters.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "District Animal Care Hospital",
    year: "2021",
    status: "Completed",
    description: "Government veterinary medical facility equipped with clinical surgical suites, diagnostics, medicine dispensaries, and livestock care barns."
  },
  {
    id: 20,
    title: "Water Supply Overhead RCC Reservoir",
    alphabetLetter: "W",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_check_dam.jpg",
    location: "Asifabad Rural Water Grid, Telangana",
    scale: "Elevated Water Balancing Reservoir (ELSR)",
    year: "2012",
    status: "Completed",
    description: "Elevated high-capacity water balancing reservoir engineered with reinforced concrete staging and specialized food-grade internal waterproofing."
  },
  {
    id: 21,
    title: "Zilla Parishad High School Science Wing",
    alphabetLetter: "Z",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_school_campus.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Advanced Physics & Chemistry Labs",
    year: "2012",
    status: "Completed",
    description: "Modern educational annex featuring specialized biology, chemistry, and computer laboratories built to state secondary education benchmarks."
  }
];

const alphabetList = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export default function ProjectsPage({ onNavigate, onBack }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

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

  // Filter projects based on Search Query and Alphabet Letter
  const filteredProjects = useMemo(() => {
    return allProjectsData.filter((project) => {
      // 1. Alphabet Filter (checks first letter of title)
      if (selectedLetter !== 'ALL') {
        const firstLetter = project.title.trim().charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesLocation = project.location.toLowerCase().includes(query);
        const matchesCategory = project.categoryName.toLowerCase().includes(query);
        const matchesScale = project.scale.toLowerCase().includes(query);
        const matchesYear = project.year.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCategory && !matchesScale && !matchesYear && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedLetter]);

  // Set of letters that actually have projects for visual styling
  const availableLetters = useMemo(() => {
    const letters = new Set();
    allProjectsData.forEach((p) => {
      const letter = p.title.trim().charAt(0).toUpperCase();
      letters.add(letter);
    });
    return letters;
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLetter('ALL');
  };

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

      {/* ── HEADER / NAVBAR (Warm Ivory Theme) ─── */}
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
              <button
                onClick={() => navigate('about')}
                className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0"
              >
                About Us
              </button>

              <button className="px-3 py-2 text-xs xl:text-sm font-bold tracking-wide text-[#c5a059] cursor-pointer bg-transparent border-0 border-b-2 border-[#c5a059]">
                Projects
              </button>

              <button
                onClick={() => navigate('expertise')}
                className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0"
              >
                Expertise
              </button>

              <button onClick={() => navigate('contact')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Contact Us
              </button>
            </nav>

            {/* Back to Home Button */}
            <button
              onClick={() => navigate('home')}
              className="hidden lg:flex items-center gap-2 bg-[#07132c] text-[#e5be6b] hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-none hover:bg-[#0b1e3d] transition-all duration-200 cursor-pointer border border-[#c5a059]/40 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            {/* Mobile toggle */}
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
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/40 text-left cursor-pointer"
            >
              <span className="font-bold">Projects</span>
              <ChevronRight className="w-4 h-4 text-[#c5a059]" />
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

      {/* ── 1. CENTERED HERO & SEARCH ─── */}
      <section className="relative w-full overflow-hidden bg-white pt-8 pb-6 px-2 sm:px-4 lg:px-8 border-b border-slate-200">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto text-center space-y-4">

          {/* Centered Main Title */}
          <h1 data-aos="fade-up" className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#07132c] tracking-tight leading-tight">
            Our Projects
          </h1>

          {/* ── 2. SEARCH BAR & A-Z FILTER ─── */}
          <div data-aos="fade-up" data-aos-delay="100" className="pt-2 w-full space-y-4">
            
            {/* Search Input Box */}
            <div className="max-w-4xl mx-auto relative flex items-center bg-white border border-slate-300 hover:border-[#c5a059] focus-within:border-[#c5a059] focus-within:ring-2 focus-within:ring-[#c5a059]/15 rounded-none shadow-xs transition-all duration-300 px-5 py-2.5">
              <Search className="w-5 h-5 text-[#c5a059] shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, location, or year..."
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
                  {filteredProjects.length}
                </span>
                <span>projects</span>
              </div>
            </div>

            {/* ── 3. A TO Z ALPHABETICAL FILTER BAR (Clean, non-bold letters & thin box) ─── */}
            <div className="pt-1 w-full">
              <div className="w-full overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300">
                <div className="flex items-stretch justify-start w-full min-w-[950px] border border-slate-200 rounded-none overflow-hidden bg-white shadow-xs">
                  {alphabetList.map((letter) => {
                    const isActive = selectedLetter === letter;
                    const hasItems = letter === 'ALL' || availableLetters.has(letter);

                    return (
                      <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`${
                          letter === 'ALL' ? 'min-w-[64px] sm:min-w-[72px] flex-[1.4]' : 'min-w-[34px] sm:min-w-[42px] flex-1'
                        } h-[46px] sm:h-[48px] px-1 rounded-none text-xs sm:text-sm md:text-base font-normal transition-all duration-150 flex items-center justify-center cursor-pointer border-r border-slate-200 last:border-r-0 ${
                          isActive
                            ? 'bg-[#c5a059] text-white border-r-[#b88f44] font-medium'
                            : hasItems
                            ? 'bg-white text-slate-700 hover:bg-[#07132c] hover:text-[#e5be6b]'
                            : 'bg-slate-50 text-slate-400 hover:text-slate-600'
                        }`}
                        title={letter === 'ALL' ? 'View All' : `Filter by letter ${letter}`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. FULL-BLEED EDGE-TO-EDGE 0-BORDER-RADIUS 0-GAP GRID ─── */}
      <div className="w-full px-0 py-0 overflow-hidden bg-slate-950">

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto bg-white p-8 my-10 rounded-none border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-none bg-slate-100 border-2 border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#07132c]">No Projects Found</h3>
              <p className="text-xs text-slate-500">
                No projects match your current filter "{selectedLetter}".
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-none shadow-md hover:scale-105 transition-all cursor-pointer border border-[#d4af37]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Full-Bleed 2-Column Edge-to-Edge Grid (0 Gap, 0 Border Radius, Left-to-Right Full Width) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full px-0">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProjectModal(project)}
                className="relative h-[440px] sm:h-[520px] lg:h-[600px] rounded-none overflow-hidden group shadow-none border-0 transition-all duration-500 bg-slate-950 cursor-pointer"
              >
                {/* Full Background Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = "/icon_mro_headquarters.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* High Contrast Gradient Overlay for Clear Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 rounded-none bg-[#07132c]/90 text-[#e5be6b] text-xs font-black uppercase tracking-widest border border-[#c5a059]/40 backdrop-blur-md">
                    {project.categoryName}
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-10 bg-black/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold text-white">
                  {project.year}
                </div>

                {/* Bottom Overlay Info (Clean, No Description, No Button) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10 space-y-3">
                  {/* Location with Pin */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#e5be6b] font-extrabold">
                    <MapPin className="w-4 h-4 shrink-0 text-[#c5a059]" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  {/* Main Title */}
                  <div className="flex items-center gap-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-white leading-snug group-hover:text-[#f3d38c] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── 5. PROJECT DETAILS MODAL ─── */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#07132c]">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                onError={(e) => {
                  e.currentTarget.src = "/icon_mro_headquarters.jpg";
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-4 right-4 p-2 rounded-none bg-black/70 text-white hover:bg-[#c5a059] hover:text-[#07132c] transition-colors cursor-pointer border border-white/20"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black uppercase tracking-widest">
                  {selectedProjectModal.categoryName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white mt-2 leading-tight">
                  {selectedProjectModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-none border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#927027] uppercase tracking-wider block">Location</span>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#07132c] font-semibold">
                    <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>{selectedProjectModal.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#927027] uppercase tracking-wider block">Project Scope</span>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#07132c] font-semibold">
                    <Building2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>{selectedProjectModal.scale}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#927027] uppercase tracking-wider block">Execution Year</span>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#07132c] font-semibold">
                    <Calendar className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>{selectedProjectModal.year}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#927027] uppercase tracking-wider block">Project Status</span>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-600 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedProjectModal.status} &amp; Handed Over</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#07132c] uppercase tracking-widest">Engineering &amp; Structural Summary</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProjectModal.description}
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-6 py-3 sm:py-2.5 rounded-none bg-slate-100 text-slate-700 hover:text-[#07132c] hover:bg-slate-200 text-xs font-bold uppercase tracking-wider cursor-pointer border border-slate-200 text-center"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setSelectedProjectModal(null);
                    navigate('contact');
                  }}
                  className="px-6 py-3 sm:py-2.5 rounded-none bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] text-xs font-black uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer border border-[#d4af37] shadow-md text-center"
                >
                  Contact For Similar Project
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── 6. BOTTOM BANNER & RETURN CTA ─── */}
      <div className="w-full bg-[#07132c] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-[#e5be6b] tracking-wide block uppercase">
              Have a high-scale civil engineering requirement?
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
              Let's build something landmark together!
            </h3>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('contact')}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-none hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer border border-[#d4af37]"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-[#07132c]" />
            </button>

            <button
              onClick={() => navigate('home')}
              className="flex items-center justify-center gap-3 bg-slate-800 text-slate-200 hover:text-white font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-none hover:bg-slate-700 transition-all duration-300 cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 7. MODERN UPGRADED GLOBAL FOOTER (0 BORDER RADIUS, CLEAN 4-COLUMN) ─── */}
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
                  <button onClick={() => navigate('projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-bold text-[#c5a059]">
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
