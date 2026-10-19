import React, { useState, useEffect, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MapPin, ArrowLeft, Calendar, Building2, CheckCircle2,
  ChevronDown, ChevronRight, ArrowRight, ArrowUpRight, Search, X, Sliders, Menu,
  Eye, Filter, Sparkles, Phone, Mail, ShieldCheck, Globe, Activity, HardHat,
  Clock, Layers, Maximize2, AlertCircle, Compass, ChevronLeft, Check,
  Share2, Award, Zap
} from 'lucide-react';

// ── COMPREHENSIVE ONGOING PROJECTS DATA (FLAGSHIP DEVELOPMENTS) ──
const ongoingProjectsData = [
  {
    id: 'ibrahimpalle',
    title: 'Ibrahimpalle Luxury Villa & Architectural Estate',
    subName: 'Ibrahimpalle Estate',
    location: 'Ibrahimpalle, Telangana',
    category: 'residential',
    categoryLabel: 'Architectural Villas & Residential Estates',
    status: 'Phase 1 • Active Superstructure & Facade Execution',
    progress: 74,
    targetCompletion: 'Q4 2026',
    scale: '28,500 Sq.Ft Built-Up Area • Contemporary Villa & Residential Towers',
    leadEngineer: 'Er. Rajeshwar Rao (Senior Project Director)',
    description:
      'Contemporary architectural villa and multi-tier residential estate construction featuring bespoke terracotta brick jaali facade screens, reinforced concrete perimeter frames, pitched engineered roofing, multi-tier staging scaffolding, monolithic column shafts, cantilevered balconies, and curated landscape development across the Ibrahimpalle site.',
    specifications: [
      'Terracotta Jaali Facade',
      'Architectural Concrete Fins',
      'Pitched Roof Engineering',
      'Multi-Tier Scaffolding Grid',
      'Cantilever Balconies',
      'M30 Grade RCC Frame',
      'AAC Block Masonry',
      'Curated Estate Landscaping'
    ],
    milestones: [
      { name: 'Substructure & Plinth Grid', status: 'Completed', percent: 100 },
      { name: 'RCC Framing & Roof Slopes', status: 'Completed', percent: 100 },
      { name: 'Terracotta Screen & Facade', status: 'In Progress', percent: 85 },
      { name: 'Tower Superstructure & Core Shafts', status: 'In Progress', percent: 80 },
      { name: 'Internal MEP & Plumbing Grid', status: 'In Progress', percent: 65 },
      { name: 'Landscaping & Hardscape Development', status: 'In Progress', percent: 50 }
    ],
    photos: [
      {
        src: '/ongoing_ibrahimpalle_1.jpg',
        label: 'Front Elevation',
        tag: 'Contemporary Villa Front Elevation with Terracotta Screen & Sloped Roof'
      },
      {
        src: '/ongoing_ibrahimpalle_2.jpg',
        label: 'Architectural Facade',
        tag: 'Dynamic Exterior Angle with Clay Tile Jaali Work & Landscaped Garden'
      },
      {
        src: '/ongoing_ibrahimpalle_3.jpg',
        label: 'Side Elevation',
        tag: 'Side Elevation Highlighting Cantilevered Balconies & Stone Cladding'
      },
      {
        src: '/ongoing_ibrahimpalle_4.jpg',
        label: 'Entrance Portico',
        tag: 'Entrance Portico & Integrated Driveway Paving'
      },
      {
        src: '/ongoing_ibrahimpalle_5.jpg',
        label: 'Courtyard & Pergola',
        tag: 'Rear Courtyard Perspective & Terrace Pergola Framing'
      },
      {
        src: '/ongoing_ibrahimpalle_6.jpg',
        label: 'Twilight Ambiance',
        tag: 'Twilight Architectural Lighting & Custom Landscape Features'
      },
      {
        src: '/icon_ramagundam_panorama.jpg',
        label: 'Superstructure Master Panorama',
        tag: 'Master Panoramic View of Multi-Storey Residential Towers Framing'
      },
      {
        src: '/icon_ramagundam_tower1.jpg',
        label: 'Tower Facade & Balconies',
        tag: 'G+5 Multi-Story Finished Elevation & Engineered Balcony Railings'
      },
      {
        src: '/icon_ramagundam_tower2.jpg',
        label: 'Residential Wing Elevation',
        tag: 'Completed Structural Elevation with Modern Balconies & Palm Courtyard'
      },
      {
        src: '/icon_ramagundam_tower3.jpg',
        label: 'Masonry & Core Shaft Staging',
        tag: 'Heavy Multi-Tier Scaffolding, AAC Block Masonry & Core Shaft Casting'
      },
      {
        src: '/icon_ramagundam_structural.jpg',
        label: 'RCC Framing & Beam Girders',
        tag: 'Sequential Concrete Framing, Beam Girders & Staging Across Complex'
      }
    ]
  },
  {
    id: 'palagutta',
    title: 'Palagutta Heavy Civil & Foundation Infrastructure',
    subName: 'Palagutta Infrastructure',
    location: 'Palagutta, Telangana',
    category: 'civil',
    categoryLabel: 'Heavy Civil & Foundation Infrastructure',
    status: 'Groundwork, Raft Shuttering & Plinth Grid',
    progress: 65,
    targetCompletion: 'Q2 2027',
    scale: '32-Acre Regional Footprint • High-Load Raft Foundation & Column Pedestals',
    leadEngineer: 'Er. K. V. Sharma (Chief Civil Engineer)',
    description:
      'Large-scale infrastructure civil works encompassing deep ground beam grid excavation, heavy reinforced column cages, high-precision modular formwork shuttering array, continuous grade beam monolithic pours, laser-levelled plinths, and extensive structural foundation casting across the Palagutta site.',
    specifications: [
      'Foundation Shuttering Array',
      'Column Rebar Cages',
      'Ground Beam Grid',
      'Modular Formwork Assembly',
      'Plinth Wall Monolithic Casting',
      'Column Pedestals Elevation',
      'Subgrade Drainage Trenches',
      'M35 High-Density Concrete'
    ],
    milestones: [
      { name: 'Site Leveling & Deep Excavation', status: 'Completed', percent: 100 },
      { name: 'Column Footing Rebar Cages', status: 'Completed', percent: 100 },
      { name: 'Raft Shuttering Array Execution', status: 'In Progress', percent: 80 },
      { name: 'Plinth Wall & Modular Formwork', status: 'In Progress', percent: 70 },
      { name: 'Grade Beam Monolithic Pour', status: 'In Progress', percent: 60 },
      { name: 'Subsurface Retaining Walls & Trenches', status: 'In Progress', percent: 40 }
    ],
    photos: [
      {
        src: '/ongoing_palagutta_1.jpg',
        label: 'Deep Excavation',
        tag: 'Deep Foundation Excavation & High-Strength RCC Column Footings'
      },
      {
        src: '/ongoing_palagutta_2.jpg',
        label: 'Grade Beam Rebar',
        tag: 'Grade Beam Reinforcement & Continuous Concrete Pour Sequence'
      },
      {
        src: '/ongoing_palagutta_3.jpg',
        label: 'Formwork Shuttering',
        tag: 'Precision Formwork Shuttering Array for Load-Bearing Column Piers'
      },
      {
        src: '/ongoing_palagutta_4.jpg',
        label: 'Retaining Excavation',
        tag: 'Heavy Industrial Machinery Excavating Subgrade Retaining Wall Trenches'
      },
      {
        src: '/ongoing_palagutta_5.jpg',
        label: 'Drainage Channels',
        tag: 'Subsurface Water Drainage Channels & Soil Stabilization Grid'
      },
      {
        src: '/ongoing_nemalipalle_1.jpg',
        label: 'Plinth Wall Casting',
        tag: 'Plinth Wall Casting & Vertical Starter Reinforcement'
      },
      {
        src: '/ongoing_nemalipalle_2.jpg',
        label: 'Modular Formwork',
        tag: 'Modular Formwork Shuttering & Structural Rebar Cages'
      },
      {
        src: '/ongoing_nemalipalle_3.jpg',
        label: 'Foundation Grid',
        tag: 'Extensive Foundation Slabs & Grade Beam Grid'
      },
      {
        src: '/ongoing_chilakapally_1.jpg',
        label: 'Plinth & Grid Casting',
        tag: 'Overview of Reinforced Concrete Plinth & Foundation Grid Casting'
      },
      {
        src: '/ongoing_chilakapally_2.jpg',
        label: 'Trench Rebar Grid',
        tag: 'Structural Rebar Layout & Trench Foundation Grid'
      },
      {
        src: '/ongoing_goribkapelly_1.jpg',
        label: 'Footing Formwork',
        tag: 'Column Footing Grid & Formwork Shuttering Execution'
      },
      {
        src: '/ongoing_goribkapelly_2.jpg',
        label: 'Pedestals Elevation',
        tag: 'Column Pedestals Elevation & Subgrade Works'
      }
    ]
  }
];

export default function OngoingProjectsPage({ onNavigate, onBack }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'mosaic'
  
  // Lightbox Modal State
  const [activeLightbox, setActiveLightbox] = useState(null); // { project, photoIndex }
  
  // Site Visit / Tender Inquiry Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProjectName, setInquiryProjectName] = useState('All Ongoing Projects');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryFormData, setInquiryFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    natureOfRequest: 'Site Visit & Technical Inspection',
    message: ''
  });

  const navigate = (page, params) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else if (onBack) {
      onBack();
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 30 });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightbox) return;
      if (e.key === 'Escape') {
        setActiveLightbox(null);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (activeLightbox.photoIndex + 1) % activeLightbox.project.photos.length;
        setActiveLightbox({ ...activeLightbox, photoIndex: nextIdx });
      } else if (e.key === 'ArrowLeft') {
        const prevIdx =
          (activeLightbox.photoIndex - 1 + activeLightbox.project.photos.length) %
          activeLightbox.project.photos.length;
        setActiveLightbox({ ...activeLightbox, photoIndex: prevIdx });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return ongoingProjectsData.filter((project) => {
      // 1. Category Filter
      if (selectedCategory !== 'ALL' && project.category !== selectedCategory) {
        return false;
      }
      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = project.title.toLowerCase().includes(q);
        const inSub = project.subName.toLowerCase().includes(q);
        const inLoc = project.location.toLowerCase().includes(q);
        const inDesc = project.description.toLowerCase().includes(q);
        const inSpecs = project.specifications.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSub && !inLoc && !inDesc && !inSpecs) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Aggregate all photos for Mosaic View
  const allPhotosFlat = useMemo(() => {
    const list = [];
    ongoingProjectsData.forEach((project) => {
      project.photos.forEach((photo, idx) => {
        list.push({
          ...photo,
          project,
          photoIndex: idx
        });
      });
    });
    return list;
  }, []);

  const openInquiryModal = (projectName = 'All Ongoing Projects') => {
    setInquiryProjectName(projectName);
    setInquirySubmitted(false);
    setInquiryModalOpen(true);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setInquirySubmitted(false);
      setInquiryFormData({
        name: '',
        phone: '',
        email: '',
        organization: '',
        natureOfRequest: 'Site Visit & Technical Inspection',
        message: ''
      });
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#07132c] font-sans antialiased selection:bg-[#c5a059] selection:text-white overflow-x-hidden w-full max-w-full relative">

      {/* ── 1. FIXED PERMANENT HEADER & TOP BAR ─── */}
      <header className="fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 shadow-md">
        {/* Golden Notice Bar */}
        <div className="bg-[#c5a059] text-white text-xs py-2 sm:py-2.5 px-4 sm:px-8 shadow-sm font-medium border-b border-[#b88f44]">
          <div className="w-full flex items-center justify-center text-center">
            <p className="text-white text-xs sm:text-[13px] font-semibold tracking-wide flex items-center justify-center flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                <span className="opacity-95 font-bold">Active On-Site Works</span>
              </span>
              <span className="opacity-60">•</span>
              <span className="opacity-95">Class-1 Government Empaneled Contractor</span>
              <span className="hidden md:inline opacity-60">•</span>
              <span className="hidden md:inline opacity-95">50+ Years Engineering Legacy</span>
              <span className="hidden lg:inline opacity-60">•</span>
              <span className="hidden lg:inline opacity-95">Official Portal: iconconstructions.com</span>
            </p>
          </div>
        </div>

        {/* Header Navbar */}
        <div className="bg-[#F8F7F3] border-b border-slate-200">
          <div className="w-full px-6 sm:px-10 lg:px-14 h-16 sm:h-18 flex items-center justify-between gap-6 relative">

            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center shrink-0 py-0.5 cursor-pointer bg-transparent border-0"
              title="Return to Home"
            >
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

                <button
                  onClick={() => navigate('projects')}
                  className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0"
                >
                  Projects
                </button>

                <button
                  className="px-3 py-2 text-xs xl:text-sm font-bold tracking-wide text-[#c5a059] cursor-pointer bg-transparent border-0 border-b-2 border-[#c5a059] flex items-center gap-1.5"
                >
                  <span>Ongoing Projects</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>

                <button
                  onClick={() => navigate('expertise')}
                  className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0"
                >
                  Expertise
                </button>

                <button
                  onClick={() => navigate('careers')}
                  className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0"
                >
                  Careers
                </button>

                <button
                  onClick={() => navigate('contact')}
                  className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0"
                >
                  Contact Us
                </button>
              </nav>

              {/* Back to Home CTA */}
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
        </div>
      </header>

      {/* ── MOBILE NAV DRAWER ─── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-6 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 bg-transparent border-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-3">
                <button
                  onClick={() => { navigate('home'); setMobileNavOpen(false); }}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer bg-transparent border-0"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { navigate('about'); setMobileNavOpen(false); }}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer bg-transparent border-0"
                >
                  <span>About Us</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { navigate('projects'); setMobileNavOpen(false); }}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer bg-transparent border-0"
                >
                  <span>Projects</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  className="w-full text-left py-2.5 px-3 text-sm font-bold text-[#c5a059] bg-amber-50/70 border-l-4 border-[#c5a059] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Ongoing Projects</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#c5a059]" />
                </button>
                <button
                  onClick={() => { navigate('expertise'); setMobileNavOpen(false); }}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer bg-transparent border-0"
                >
                  <span>Expertise</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { navigate('careers'); setMobileNavOpen(false); }}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer bg-transparent border-0"
                >
                  <span>Careers</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { navigate('contact'); setMobileNavOpen(false); }}
                  className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer bg-transparent border-0"
                >
                  <span>Contact Us</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => { openInquiryModal('All Sites'); setMobileNavOpen(false); }}
                className="w-full bg-[#07132c] text-[#e5be6b] font-bold text-xs uppercase tracking-wider py-3 flex items-center justify-center gap-2 cursor-pointer border border-[#c5a059]/40"
              >
                <span>Request Site Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="text-[11px] text-slate-500 text-center">
                Icon Constructions Group • Sirpur Town, Telangana
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. HERO SECTION ─── */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 bg-[#07132c] text-white overflow-hidden border-b border-slate-800">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-5">
            {/* Live Beacon Pill */}
            <div data-aos="fade-down" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Live On-Site Developments &amp; Active Civil Works</span>
            </div>

            {/* Main Title */}
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-[1.1]"
            >
              Ongoing <span className="text-[#e5be6b]">Projects</span>
            </h1>

            {/* Description */}
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed"
            >
              Explore our active construction sites, structural frameworks, high-rise residential towers, and regional infrastructure civil works across Telangana. Engineered with rigorous quality control, precision formwork, and Class-1 compliance.
            </p>

            {/* Quick Stat Bar */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800"
            >
              <div className="bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-[#f3cf7a]">2 Flagship</div>
                <div className="text-xs text-slate-300 font-medium">Development Sites</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-[#f3cf7a]">450+</div>
                <div className="text-xs text-slate-300 font-medium">Skilled Manpower</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-[#f3cf7a]">2.4M+</div>
                <div className="text-xs text-slate-300 font-medium">Sq.Ft Under Execution</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-300 font-medium">Zero-Harm Safety Record</div>
              </div>
            </div>

            {/* Quick Location Pills */}
            <div data-aos="fade-up" data-aos-delay="300" className="flex items-center gap-2 flex-wrap pt-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Locations:</span>
              {['Ibrahimpalle', 'Palagutta'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSearchQuery(loc)}
                  className="px-2.5 py-1 text-xs bg-slate-800/80 hover:bg-[#c5a059] text-slate-200 hover:text-[#07132c] border border-slate-700 transition-colors cursor-pointer rounded-none font-medium flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#e5be6b]" />
                  <span>{loc}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. FILTER, SEARCH & VIEW SWITCHER TOOLBAR ─── */}
      <section className="sticky top-[100px] sm:top-[108px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
              {[
                { id: 'ALL', label: 'All Active Sites (2)' },
                { id: 'residential', label: 'Ibrahimpalle (Villas & Estates)' },
                { id: 'civil', label: 'Palagutta (Heavy Civil & Foundations)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-[#07132c] text-[#f3cf7a] border-[#07132c] shadow-sm'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input & View Toggle */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Search */}
              <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search ongoing sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#c5a059] focus:bg-white text-[#07132c] placeholder:text-slate-400 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer border-0 bg-transparent"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center border border-slate-200 p-0.5 bg-slate-100 shrink-0">
                <button
                  onClick={() => setViewMode('cards')}
                  title="Detailed Site Cards View"
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-0 ${
                    viewMode === 'cards'
                      ? 'bg-white text-[#07132c] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 bg-transparent'
                  }`}
                >
                  Site Cards
                </button>
                <button
                  onClick={() => setViewMode('mosaic')}
                  title="Edge-to-Edge Photo Stream"
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-0 ${
                    viewMode === 'mosaic'
                      ? 'bg-white text-[#07132c] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 bg-transparent'
                  }`}
                >
                  All Photos ({allPhotosFlat.length})
                </button>
              </div>

            </div>

          </div>

          {/* Active Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 mt-2">
            <div>
              Showing <span className="font-bold text-[#07132c]">{filteredProjects.length}</span> of {ongoingProjectsData.length} Ongoing Developments
              {searchQuery && (
                <span className="ml-2 font-medium text-[#c5a059]">
                  matching "{searchQuery}"
                </span>
              )}
            </div>
            <button
              onClick={() => openInquiryModal('All Sites')}
              className="text-[#c5a059] hover:text-[#927027] font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-transparent border-0"
            >
              <span>Schedule Site Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. MAIN CONTENT AREA ─── */}
      <main className="py-12 sm:py-16 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── VIEW MODE 1: DETAILED SITE CARDS ─── */}
        {viewMode === 'cards' && (
          <div className="space-y-14 sm:space-y-20">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 p-8 space-y-4">
                <AlertCircle className="w-12 h-12 text-[#c5a059] mx-auto" />
                <h3 className="text-xl font-bold text-[#07132c]">No ongoing projects found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  No active developments match your search criteria. Try clearing the filter or search terms.
                </p>
                <button
                  onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                  className="px-5 py-2.5 bg-[#07132c] text-[#f3cf7a] text-xs font-bold uppercase tracking-wider cursor-pointer border-0"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project, pIdx) => (
                <article
                  key={project.id}
                  id={project.id}
                  data-aos="fade-up"
                  className="bg-white border border-slate-200/90 shadow-sm hover:border-[#c5a059] transition-all duration-300 overflow-hidden"
                >
                  
                  {/* Card Header Bar */}
                  <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-[#07132c] text-[#f3cf7a] text-xs font-black uppercase tracking-wider">
                          Site: {project.subName}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{project.status}</span>
                        </span>
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                          Target Handover: {project.targetCompletion}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-3xl font-black text-[#0d214a] tracking-tight">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                        <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
                        <span>{project.location}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">{project.scale}</span>
                      </div>
                    </div>

                    {/* Progress Percentage Badge */}
                    <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 bg-white md:bg-transparent p-3 md:p-0 border md:border-0 border-slate-200">
                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-black text-[#07132c]">
                          {project.progress}%
                        </div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
                          Execution Progress
                        </div>
                      </div>
                      <div className="w-28 sm:w-36 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#c5a059] to-[#07132c] h-full transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery Grid (3 per row desktop, 2 tablet, 1 mobile) */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                        <Eye className="w-4 h-4 text-[#c5a059]" />
                        <span>On-Site Media Stream ({project.photos.length} Captured Angles)</span>
                      </div>
                      <span className="text-xs text-slate-400 italic hidden sm:inline">
                        Click any photo to expand into high-resolution lightbox
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {project.photos.map((photo, photoIdx) => (
                        <div
                          key={photoIdx}
                          onClick={() => setActiveLightbox({ project, photoIndex: photoIdx })}
                          className="relative h-[240px] sm:h-[280px] lg:h-[320px] bg-slate-950 overflow-hidden group cursor-pointer border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <img
                            src={photo.src}
                            alt={`${project.title} - ${photo.label}`}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                          {/* Top Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-2.5 py-1 bg-[#07132c]/90 text-[#f3cf7a] text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-[#c5a059]/40 shadow-sm">
                              Image {photoIdx + 1} • {photo.label}
                            </span>
                          </div>

                          {/* Bottom Expand Pill */}
                          <div className="absolute bottom-3 right-3 z-10">
                            <span className="px-3 py-1 bg-[#07132c]/90 text-white text-[11px] font-bold group-hover:bg-[#c5a059] group-hover:text-[#07132c] transition-colors flex items-center gap-1.5 shadow-md">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Expand</span>
                            </span>
                          </div>

                          {/* Bottom Tag Preview on hover */}
                          <div className="absolute bottom-3 left-3 right-24 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-[11px] text-slate-200 line-clamp-1 font-medium drop-shadow-sm">
                              {photo.tag}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Project Technical Description & Specs */}
                    <div className="pt-6 border-t border-slate-100 space-y-5">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Scope description */}
                        <div className="lg:col-span-2 space-y-3">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Executive Site Scope &amp; Engineering Specifications
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Specification Tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.specifications.map((spec, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Milestone Tracker & Lead Engineer */}
                        <div className="bg-slate-50 p-4 border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="text-xs font-bold text-[#07132c] uppercase tracking-wider">
                              Phase Milestones
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">Status</span>
                          </div>

                          <div className="space-y-2">
                            {project.milestones.map((ms, mIdx) => (
                              <div key={mIdx} className="space-y-1">
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="text-slate-700 font-medium">{ms.name}</span>
                                  <span
                                    className={`font-bold ${
                                      ms.status === 'Completed'
                                        ? 'text-emerald-700'
                                        : 'text-[#c5a059]'
                                    }`}
                                  >
                                    {ms.percent}%
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      ms.status === 'Completed' ? 'bg-emerald-600' : 'bg-[#c5a059]'
                                    }`}
                                    style={{ width: `${ms.percent}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                            <span className="font-semibold text-slate-800">Lead: </span>
                            <span>{project.leadEngineer}</span>
                          </div>
                        </div>

                      </div>

                      {/* Card Action Row */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>ISO 9001 / Class-1 Quality Standard Monitored</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openInquiryModal(project.title)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#07132c] hover:bg-[#c5a059] text-white hover:text-[#07132c] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-0 shadow-sm"
                          >
                            <span>Inquire for Site Specifications</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                </article>
              ))
            )}
          </div>
        )}

        {/* ── VIEW MODE 2: COMPLETE PHOTO MOSAIC (ALL PHOTOS) ─── */}
        {viewMode === 'mosaic' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0d214a]">
                  Complete Construction Media Stream
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  All active on-site photographs captured across all 6 active development zones.
                </p>
              </div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                {allPhotosFlat.length} High-Resolution Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allPhotosFlat.map((item, flatIdx) => (
                <div
                  key={flatIdx}
                  onClick={() => setActiveLightbox({ project: item.project, photoIndex: item.photoIndex })}
                  className="group relative h-64 bg-slate-950 overflow-hidden cursor-pointer border border-slate-200 hover:border-[#c5a059] shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={item.src}
                    alt={item.tag}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 bg-[#07132c]/90 text-[#f3cf7a] text-[10px] font-bold uppercase tracking-wider border border-[#c5a059]/40">
                      {item.project.subName}
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-2.5 inset-x-2.5 z-10 space-y-1">
                    <div className="text-[11px] font-bold text-white line-clamp-1">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                      {item.tag}
                    </div>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1.5 bg-[#c5a059] text-[#07132c]">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ── 5. ENGINEERING QUALITY & SAFETY PROTOCOL BANNER ─── */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 border-t border-slate-800 relative overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#e5be6b] uppercase tracking-widest block">
              RIGOROUS QUALITY GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Every Ongoing Site Operates Under Stringent Class-1 Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We apply standardized engineering workflows, ultrasonic concrete testing, laser leveling, structural cube strength checks, and zero-harm safety management to every active development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/60 p-6 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#e5be6b]">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Zero-Harm Safety</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Daily toolbox meetings, complete PPE enforcement, heavy shoring audits, and certified safety marshals on all active grounds.
              </p>
            </div>

            <div className="bg-slate-800/60 p-6 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#e5be6b]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">7 &amp; 28-Day Cube Tests</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standardized concrete test cylinders crushed to verify M30/M35 design strength with third-party accredited lab certificates.
              </p>
            </div>

            <div className="bg-slate-800/60 p-6 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#e5be6b]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Total Station Precision</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sub-millimeter Leica &amp; Trimble electronic surveying for axis alignment, column plumb verification, and beam camber control.
              </p>
            </div>

            <div className="bg-slate-800/60 p-6 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#e5be6b]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Government Empaneled</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Class-1 Super-Specialist rating across Irrigation &amp; CAD, Roads &amp; Buildings (R&amp;B), and Panchayat Raj engineering departments.
              </p>
            </div>
          </div>

          {/* Quick CTA strip */}
          <div className="p-6 bg-gradient-to-r from-[#07132c] to-[#12284c] border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-base font-bold text-white">Need an on-site technical inspection or tender documents?</div>
              <div className="text-xs text-slate-300">Our senior engineering directors facilitate structured site visits for government and commercial clients.</div>
            </div>
            <button
              onClick={() => openInquiryModal('General Tender Inquiry')}
              className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-[#07132c] text-xs font-black uppercase tracking-wider transition-colors shrink-0 cursor-pointer border-0 shadow-md"
            >
              Request Site Visit
            </button>
          </div>

        </div>
      </section>

      {/* ── 6. INTERACTIVE LIGHTBOX MODAL ─── */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4">
          <div className="relative w-full max-w-6xl max-h-[96vh] flex flex-col bg-[#07132c] border border-[#c5a059]/40 text-white shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#050e20] border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="px-2 py-0.5 bg-[#c5a059] text-[#07132c] text-[10px] font-black uppercase tracking-wider shrink-0">
                  {activeLightbox.project.subName}
                </span>
                <span className="text-xs sm:text-sm font-bold truncate">
                  {activeLightbox.project.title}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                <span className="text-xs text-[#e5be6b] font-medium hidden sm:inline">
                  Photo {activeLightbox.photoIndex + 1} of {activeLightbox.project.photos.length}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-none cursor-pointer border-0 transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display with Navigation Controls */}
            <div className="relative flex-1 flex items-center justify-center bg-black min-h-[300px] sm:min-h-[440px] max-h-[65vh] overflow-hidden">
              <img
                src={activeLightbox.project.photos[activeLightbox.photoIndex].src}
                alt={activeLightbox.project.photos[activeLightbox.photoIndex].tag}
                className="max-w-full max-h-[65vh] object-contain select-none"
              />

              {/* Prev Button */}
              {activeLightbox.project.photos.length > 1 && (
                <button
                  onClick={() => {
                    const prevIdx =
                      (activeLightbox.photoIndex - 1 + activeLightbox.project.photos.length) %
                      activeLightbox.project.photos.length;
                    setActiveLightbox({ ...activeLightbox, photoIndex: prevIdx });
                  }}
                  className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-black/60 hover:bg-[#c5a059] text-white hover:text-[#07132c] transition-colors cursor-pointer border border-white/20"
                  title="Previous Photo (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {activeLightbox.project.photos.length > 1 && (
                <button
                  onClick={() => {
                    const nextIdx =
                      (activeLightbox.photoIndex + 1) % activeLightbox.project.photos.length;
                    setActiveLightbox({ ...activeLightbox, photoIndex: nextIdx });
                  }}
                  className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-black/60 hover:bg-[#c5a059] text-white hover:text-[#07132c] transition-colors cursor-pointer border border-white/20"
                  title="Next Photo (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Footer & Technical Caption */}
            <div className="p-4 sm:p-5 bg-[#050e20] border-t border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-[#f3cf7a]">
                    {activeLightbox.project.photos[activeLightbox.photoIndex].label}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {activeLightbox.project.photos[activeLightbox.photoIndex].tag}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      openInquiryModal(
                        `${activeLightbox.project.title} - ${activeLightbox.project.photos[activeLightbox.photoIndex].label}`
                      );
                    }}
                    className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#07132c] font-black text-xs uppercase tracking-wider cursor-pointer border-0 transition-colors"
                  >
                    Inquire About Site
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {activeLightbox.project.photos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800 scrollbar-none">
                  {activeLightbox.project.photos.map((th, thIdx) => (
                    <button
                      key={thIdx}
                      onClick={() => setActiveLightbox({ ...activeLightbox, photoIndex: thIdx })}
                      className={`relative w-16 h-12 shrink-0 overflow-hidden border-2 cursor-pointer transition-all ${
                        thIdx === activeLightbox.photoIndex
                          ? 'border-[#c5a059] scale-105'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={th.src} alt={th.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── 7. SITE VISIT / TENDER INQUIRY MODAL ─── */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-300 text-[#07132c] shadow-2xl p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-wider block">
                  OFFICIAL SITE INQUIRY &amp; AUDIT REQUEST
                </span>
                <h3 className="text-xl font-black text-[#0d214a]">
                  Schedule Site Inspection
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Target Project: <span className="font-bold text-[#07132c]">{inquiryProjectName}</span>
                </p>
              </div>
              <button
                onClick={() => setInquiryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer bg-transparent border-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#07132c]">Inquiry Transmitted Successfully</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Our chief project director will review your inspection request and coordinate logistics within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={inquiryFormData.name}
                    onChange={(e) => setInquiryFormData({ ...inquiryFormData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#c5a059] bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={inquiryFormData.phone}
                      onChange={(e) => setInquiryFormData({ ...inquiryFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#c5a059] bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={inquiryFormData.email}
                      onChange={(e) => setInquiryFormData({ ...inquiryFormData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#c5a059] bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Organization / Department
                  </label>
                  <input
                    type="text"
                    placeholder="Government Dept, Contractor, or Commercial Firm"
                    value={inquiryFormData.organization}
                    onChange={(e) => setInquiryFormData({ ...inquiryFormData, organization: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#c5a059] bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nature of Request
                  </label>
                  <select
                    value={inquiryFormData.natureOfRequest}
                    onChange={(e) => setInquiryFormData({ ...inquiryFormData, natureOfRequest: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#c5a059] bg-slate-50 focus:bg-white"
                  >
                    <option>Site Visit &amp; Technical Inspection</option>
                    <option>Tender Specifications &amp; BOQ Inquiries</option>
                    <option>Subcontracting &amp; Material Supply Vendor</option>
                    <option>Quality Audit &amp; Material Testing Verification</option>
                    <option>Commercial Client Discussion</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Message / Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide preferred visit dates, team size, or specific technical topics..."
                    value={inquiryFormData.message}
                    onChange={(e) => setInquiryFormData({ ...inquiryFormData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#c5a059] bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 cursor-pointer bg-transparent border-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#07132c] hover:bg-[#c5a059] text-white hover:text-[#07132c] text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-0 shadow-sm"
                  >
                    Transmit Request
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ── 8. FOOTER ─── */}
      <footer className="bg-[#050e20] text-white pt-16 pb-12 border-t border-slate-800">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">

            {/* Col 1: Brand & Credentials */}
            <div className="lg:col-span-4 space-y-4">
              <button
                onClick={() => navigate('home')}
                className="flex items-center bg-transparent border-0 cursor-pointer p-0"
              >
                <img src="/logo.png" alt="Icon Constructions" className="h-12 w-auto object-contain brightness-0 invert" />
              </button>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Empaneled Class-1 Government Contractor delivering landmark civic infrastructure, multi-span bridges, educational campuses, and active developments across Telangana for over 50 years.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>6 Active Construction Sites</span>
                </span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Explore Portal
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button onClick={() => navigate('home')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('about')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Our Projects
                  </button>
                </li>
                <li>
                  <button className="text-[#c5a059] font-bold cursor-pointer bg-transparent border-0">
                    Ongoing Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('expertise')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Core Expertise
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('careers')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('contact')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Active Ongoing Sites */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Active Sites
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>Ibrahimpalle Luxury Villa &amp; Architectural Estate</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>Palagutta Heavy Civil &amp; Foundation Infrastructure</span>
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
                    onClick={() => openInquiryModal('General Tender Inquiry')}
                    className="w-full bg-[#c5a059] text-[#07132c] hover:bg-[#d4af37] font-black uppercase tracking-wider text-xs py-2.5 px-4 rounded-none transition-all cursor-pointer border-0"
                  >
                    Submit Site Inquiry
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
              <span className="text-slate-400">Class-1 Empaneled</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
