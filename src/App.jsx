import React, { useState, useEffect, useRef } from 'react';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import ExpertisePage from './ExpertisePage';
import ContactPage from './ContactPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import {
  Search,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Building2,
  ShieldCheck,
  Award,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Menu,
  Sliders,
  Calendar,
  Sparkles,
  Play,
  Pause,
  Send,
  FileText,
  Star,
  Quote,
  HardHat,
  Clock,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Navigation & UI States
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const getInitialPage = () => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['projects', 'about', 'expertise', 'contact', 'home'].includes(hash)) {
        return hash;
      }
      const saved = localStorage.getItem('icon_page');
      if (['projects', 'about', 'expertise', 'contact', 'home'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // fallback
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['projects', 'about', 'expertise', 'contact', 'home'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ACC Hero Banner Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'
  const [isPlaying, setIsPlaying] = useState(true);

  // GSAP ScrollTrigger Refs for Section 2 Pinned Showcase (5 Expertise Images)
  const section2PinRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const image4Ref = useRef(null);
  const image5Ref = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const badge4Ref = useRef(null);
  const badge5Ref = useRef(null);



  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll (ScrollSmoother Effect)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-out-cubic',
      offset: 40,
    });
  }, []);

  // Refresh AOS animations on slide change
  useEffect(() => {
    AOS.refresh();
  }, [currentSlide]);

  // GSAP ScrollTrigger Pinned 5-Image Expertise Slide-Up Sequence for Section 2
  // Re-initializes reliably whenever user navigates back to 'home'
  useEffect(() => {
    if (currentPage !== 'home') return;

    let ctx;
    const initTimer = setTimeout(() => {
      if (!section2PinRef.current) return;

      ctx = gsap.context(() => {
        // Prevent initial subpixel peeking on mobile viewports
        gsap.set([image2Ref.current, image3Ref.current, image4Ref.current, image5Ref.current], { yPercent: 100.1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section2PinRef.current,
            start: 'top top',
            end: '+=500%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Initially Image 1 zoom & prep
        tl.fromTo(
          image1Ref.current,
          { scale: 1.15 },
          { scale: 1.0, duration: 1, ease: 'none' }
        )
        // Step 2: Image 2 slides up smoothly from bottom (01 -> 02)
        .fromTo(
          image2Ref.current,
          { yPercent: 100.1 },
          { yPercent: 0, duration: 2, ease: 'none' },
          'slide2'
        )
        .to(
          image1Ref.current,
          { scale: 0.92, opacity: 0.5, duration: 2, ease: 'none' },
          'slide2'
        )
        .to(
          badge1Ref.current,
          { opacity: 0, y: -40, duration: 1, ease: 'power1.in' },
          'slide2'
        )
        .fromTo(
          badge2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out' },
          'slide2+=0.8'
        )
        // Step 3: Image 3 slides up smoothly from bottom (02 -> 03)
        .fromTo(
          image3Ref.current,
          { yPercent: 100.1 },
          { yPercent: 0, duration: 2, ease: 'none' },
          'slide3'
        )
        .to(
          image2Ref.current,
          { scale: 0.92, opacity: 0.5, duration: 2, ease: 'none' },
          'slide3'
        )
        .to(
          badge2Ref.current,
          { opacity: 0, y: -40, duration: 1, ease: 'power1.in' },
          'slide3'
        )
        .fromTo(
          badge3Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out' },
          'slide3+=0.8'
        )
        // Step 4: Image 4 slides up smoothly from bottom (03 -> 04)
        .fromTo(
          image4Ref.current,
          { yPercent: 100.1 },
          { yPercent: 0, duration: 2, ease: 'none' },
          'slide4'
        )
        .to(
          image3Ref.current,
          { scale: 0.92, opacity: 0.5, duration: 2, ease: 'none' },
          'slide4'
        )
        .to(
          badge3Ref.current,
          { opacity: 0, y: -40, duration: 1, ease: 'power1.in' },
          'slide4'
        )
        .fromTo(
          badge4Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out' },
          'slide4+=0.8'
        )
        // Step 5: Image 5 slides up smoothly from bottom (04 -> 05)
        .fromTo(
          image5Ref.current,
          { yPercent: 100.1 },
          { yPercent: 0, duration: 2, ease: 'none' },
          'slide5'
        )
        .to(
          image4Ref.current,
          { scale: 0.92, opacity: 0.5, duration: 2, ease: 'none' },
          'slide5'
        )
        .to(
          badge4Ref.current,
          { opacity: 0, y: -40, duration: 1, ease: 'power1.in' },
          'slide5'
        )
        .fromTo(
          badge5Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out' },
          'slide5+=0.8'
        )
        // Step 6: Image 5 subtle scale out before unpinning
        .to(
          image5Ref.current,
          { scale: 1.08, duration: 1.2, ease: 'none' }
        );

        ScrollTrigger.refresh();
      }, section2PinRef);

      AOS.refresh();
    }, 60);

    return () => {
      clearTimeout(initTimer);
      if (ctx) ctx.revert();
    };
  }, [currentPage]);

  // GSAP Horizontal Scroll for Why Choose Icon Constructions Section
  const whyChooseSectionRef = useRef(null);
  const whyChooseTrackRef = useRef(null);

  useEffect(() => {
    if (currentPage !== 'home') return;

    let ctx;
    const timer = setTimeout(() => {
      if (!whyChooseSectionRef.current || !whyChooseTrackRef.current) return;

      ctx = gsap.context(() => {
        const track = whyChooseTrackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth;

        if (totalScroll > 0) {
          gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
              trigger: whyChooseSectionRef.current,
              start: 'top top',
              end: () => `+=${totalScroll + 400}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });
        }

        ScrollTrigger.refresh();
      }, whyChooseSectionRef);
    }, 120);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [currentPage]);





  const heroSlides = [
    {
      id: 1,
      title: "Engaging, elevating and empowering our people",
      subtitle: "Our strength lies in our people, driving growth, innovation, and Icon's legacy of performance.",
      btn1Text: "About Us",
      btn1Link: "#about",
      btn2Text: "Our Projects",
      btn2Link: "#projects",
      image: "/icon_tonkini_10span_bridge.jpg",
      location: "Tonkini 10-Span River Bridge, Sirpur",
      tealBg: "bg-[#07132c]" // Deep Icon Navy
    },
    {
      id: 2,
      title: "Transforming the delivery of capital projects",
      subtitle: "We leverage 50+ years of engineering discipline, technical innovation, and financial strength to build lasting regional infrastructure.",
      btn1Text: "Projects",
      btn1Link: "#projects",
      btn2Text: "Expertise",
      btn2Link: "#expertise",
      image: "/icon_school_assembly.jpg",
      location: "High School Academic Campus, Sirpur Town",
      tealBg: "bg-[#07132c]"
    },
    {
      id: 3,
      title: "Delivering landmark civic & government headquarters",
      subtitle: "Empaneled Class-1 contractor specializing in multi-tier administrative blocks, revenue complexes, and municipal megastructures.",
      btn1Text: "Projects",
      btn1Link: "#projects",
      btn2Text: "Expertise",
      btn2Link: "#expertise",
      image: "/icon_tahasildar_mro.jpg",
      location: "Mandal Revenue Office Headquarters, Sirpur Town",
      tealBg: "bg-[#07132c]"
    },
  ];

  // Slide navigation handlers with swipe direction
  const handleNextSlide = () => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Auto slide ticker
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length, isPlaying, currentSlide]);

  // Real Client Project Execution Record (Top 6 Signature Projects Featured on Home Page)
  const projects = [
    {
      id: 1,
      title: "MRO Office Building – Tahasildar Karyalayam",
      category: "civic",
      categoryName: "Government & Civic",
      image: "/icon_tahasildar_mro.jpg",
      location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
      scale: "MRO Administrative Headquarters",
      year: "2008",
      description: "Official Mandal Revenue Office (Tahasildar) headquarters building engineered for public civil administration, land records, and citizen revenue services."
    },
    {
      id: 2,
      title: "Tonkini 10-Span High-Level Major River Bridge",
      category: "infrastructure",
      categoryName: "Hydraulic Infrastructure",
      image: "/icon_tonkini_10span_bridge.jpg",
      location: "Tonkini River Crossing, Sirpur Region, Telangana",
      scale: "10-Span Major Pre-Stressed Concrete Bridge",
      year: "Completed",
      description: "Critical regional arterial river bridge spanning 10 heavy prestressed concrete spans over the Tonkini riverbed, engineered on deep pile foundations."
    },
    {
      id: 3,
      title: "TSWR Residential School & Junior College (Boys)",
      category: "educational",
      categoryName: "Educational & Campuses",
      image: "/icon_tswrs_campus.jpg",
      location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
      scale: "TSWRS/JC(B) Institutional Campus",
      year: "2012",
      description: "Telangana Social Welfare Residential School and Junior College for Boys campus with grand entrance portico, administrative offices, and academic wings."
    },
    {
      id: 4,
      title: "KGBV CM School of Excellence – Circular Campus",
      category: "educational",
      categoryName: "Educational & Campuses",
      image: "/icon_kgbv_school_of_excellence.jpg",
      location: "Latehar Model Campus Development",
      scale: "Monumental Circular Architectural Wing",
      year: "Completed",
      description: "Award-winning circular institutional building designed with grand colonnaded facade, circular academic atrium, manicured planters, and sports grounds."
    },
    {
      id: 5,
      title: "Pre-Engineered Structural Steel Industrial Sheds",
      category: "industrial",
      categoryName: "Industrial & Fabrication",
      image: "/icon_industrial_steel_sheds.jpg",
      location: "Sirpur Regional Industrial Corridor, Telangana",
      scale: "Multi-Bay Pre-Engineered Steel Sheds",
      year: "Completed",
      description: "Heavy-duty structural steel workshop sheds featuring multi-bay open entries, crane gantry support systems, concrete aprons, and industrial machinery bays."
    },
    {
      id: 6,
      title: "TSWR Residential School & College (Girls) – Grand Arch",
      category: "educational",
      categoryName: "Educational & Campuses",
      image: "/icon_tswrdc_girls_arch.jpg",
      location: "Narketpally, Nalgonda District, Telangana",
      scale: "Grand Entrance Arch & Campus Perimeter",
      year: "Completed",
      description: "Signature monumental entrance arch, security gatehouse, and perimeter enclosure engineered for the Telangana Social Welfare Residential Girls College campus."
    }
  ];

  // Corporate News Items
  const newsItems = [
    {
      date: "August 28, 2026",
      category: "Corporate Announcement",
      title: "Icon Constructions Awarded $650M Landmark Commercial Skyscraper in Downtown Financial Hub",
      excerpt: "Icon Constructions has been selected as the main EPC contractor for the construction of a 72-storey smart office tower."
    },
    {
      date: "July 14, 2026",
      category: "Sustainability",
      title: "Achieving Carbon-Neutral Concrete Delivery Across Capital Infrastructure Sites",
      excerpt: "Through strategic material innovation, Icon Constructions reduces embodied carbon across 2026 building projects by 34%."
    },
    {
      date: "May 02, 2026",
      category: "Industry Recognition",
      title: "Icon Constructions Wins International Safety Stewardship & Engineering Excellence Award",
      excerpt: "Recognized for maintaining over 25 million safe work hours across high-rise and industrial construction sites."
    }
  ];

  const [selectedDisciplineForProjects, setSelectedDisciplineForProjects] = useState('ALL');

  const currentHero = heroSlides[currentSlide];

  const handleNavigate = (page, params = {}) => {
    if (params?.discipline) {
      setSelectedDisciplineForProjects(params.discipline);
    } else if (page === 'projects' && !params?.discipline) {
      setSelectedDisciplineForProjects('ALL');
    }
    setCurrentPage(page);
    try {
      localStorage.setItem('icon_page', page);
      window.location.hash = page === 'home' ? '' : page;
    } catch (e) {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  };

  if (currentPage === 'projects') {
    return (
      <ProjectsPage
        onNavigate={handleNavigate}
        onBack={() => handleNavigate('home')}
        initialDiscipline={selectedDisciplineForProjects}
      />
    );
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'expertise') {
    return <ExpertisePage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#0d214a] font-sans antialiased selection:bg-[#c5a059] selection:text-white">
      
      {/* 1. Metallic Golden Top Notice Bar */}
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

      {/* 2. Header Navbar with Warm Ivory Background (#F8F7F3) - EXACT UNIFORM HEADER */}
      <header className="sticky top-0 z-40 bg-[#F8F7F3] shadow-sm border-b border-slate-200 transition-all duration-300">
        <div className="w-full px-6 sm:px-10 lg:px-14 h-16 sm:h-18 flex items-center justify-between gap-6 relative">

          {/* Logo */}
          <button onClick={() => handleNavigate('home')} className="flex items-center shrink-0 py-0.5 cursor-pointer bg-transparent border-0" title="Return to Home">
            <img
              src="/logo.png"
              alt="Icon Constructions Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </button>

          {/* Desktop Nav */}
          <div className="flex items-center gap-6 xl:gap-8">
            <nav className="hidden lg:flex items-center gap-1 xl:gap-6">
              <button onClick={() => handleNavigate('about')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                About Us
              </button>
              <button onClick={() => handleNavigate('projects')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Projects
              </button>
              <button onClick={() => handleNavigate('expertise')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Expertise
              </button>
              <button onClick={() => handleNavigate('contact')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                Contact Us
              </button>
            </nav>

            <button
              onClick={() => handleNavigate('contact')}
              className="hidden lg:flex items-center gap-2 bg-[#07132c] text-[#e5be6b] hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-none hover:bg-[#0b1e3d] transition-all duration-200 cursor-pointer border border-[#c5a059]/40 shadow-sm"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
              onClick={() => { handleNavigate('home'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { handleNavigate('about'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { handleNavigate('projects'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { handleNavigate('expertise'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Expertise</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => { handleNavigate('contact'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Drawer Footer & Fast Action */}
          <div className="p-5 border-t border-slate-200 bg-[#EFECE6] space-y-3">
            <button 
              onClick={() => { handleNavigate('contact'); setMobileNavOpen(false); }}
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

      {/* Global Search Drawer Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col justify-start pt-20 px-6 sm:px-12 border-b border-slate-200 shadow-2xl">
          <div className="max-w-4xl mx-auto w-full relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-500 hover:text-[#c5a059] text-2xl font-bold flex items-center gap-2"
            >
              <span>ESC</span>
              <X className="w-8 h-8" />
            </button>

            <div className="space-y-6">
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">Global Site Search</span>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search projects, expertise sectors, or corporate news..."
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-[#c5a059] rounded-xl py-5 px-6 pr-12 text-lg sm:text-2xl text-[#0d214a] placeholder:text-slate-400 focus:outline-none shadow-lg"
                  autoFocus
                />
              </div>

              {searchQuery && (
                <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4 max-h-[50vh] overflow-y-auto shadow-xl">
                  <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">Search Results</h4>
                  {projects
                    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 4)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => { setSelectedProjectModal(item); setSearchOpen(false); }}
                        className="p-4 rounded-lg bg-slate-50 hover:bg-[#fef9ee] border border-slate-200 flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div>
                          <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">{item.categoryName}</span>
                          <h5 className="text-sm font-bold text-[#0d214a] group-hover:text-[#a8813a]">{item.title}</h5>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-[#c5a059] shrink-0" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. EXACT ACC GROUP 50/50 SPLIT HERO VIDEO BANNER WITH SMOOTH SWIPE & LOADER */}
      <section className="relative w-full h-[calc(100vh-108px)] min-h-[560px] bg-[#07132c] overflow-hidden flex flex-col lg:flex-row items-stretch">
        
        {/* LEFT SIDE (50% WIDTH): Solid Deep Icon Navy Card */}
        <div className="w-full lg:w-1/2 bg-[#07132c] text-white px-8 sm:px-14 lg:px-20 py-12 lg:py-16 flex flex-col justify-between relative z-10">
          
          {/* Subtle Watermarked Logo Monogram Background Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center overflow-hidden">
            <span className="text-[280px] font-black text-white leading-none tracking-tighter select-none">
              ICON
            </span>
          </div>

          {/* Swipe Container for Left Text Content */}
          <div
            key={`hero-text-${currentSlide}`}
            className={`space-y-6 relative z-10 max-w-xl my-auto ${
              slideDirection === 'next' ? 'animate-hero-swipe-next' : 'animate-hero-swipe-prev'
            }`}
          >
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.18] tracking-tight">
              {currentHero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-lg">
              {currentHero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  const target = currentHero.btn1Link.replace('#', '');
                  if (['about', 'projects', 'expertise', 'contact', 'home'].includes(target)) {
                    handleNavigate(target);
                  }
                }}
                className="px-8 py-3 rounded-none border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-[#07132c] transition-all cursor-pointer inline-flex items-center justify-center min-w-[130px]"
              >
                {currentHero.btn1Text}
              </button>

              <button
                onClick={() => {
                  const target = currentHero.btn2Link.replace('#', '');
                  if (['about', 'projects', 'expertise', 'contact', 'home'].includes(target)) {
                    handleNavigate(target);
                  }
                }}
                className="px-8 py-3 rounded-none bg-[#c5a059] text-white font-bold text-sm hover:bg-[#b58f45] transition-all cursor-pointer inline-flex items-center justify-center min-w-[130px]"
              >
                {currentHero.btn2Text}
              </button>
            </div>

          </div>

          {/* Slider Controls: Prev -- Animated Progress Line Loader -- Next */}
          <div className="pt-8 border-t border-white/20 flex items-center justify-between text-sm font-semibold text-white relative z-10">
            <button
              onClick={handlePrevSlide}
              className="hover:text-[#c5a059] transition-colors font-bold uppercase text-xs tracking-widest cursor-pointer"
            >
              Prev
            </button>

            {/* Dynamic Smooth Animated Progress Line Loader */}
            <div className="flex-grow mx-8 h-[3px] bg-white/25 relative overflow-hidden rounded-full max-w-[220px]">
              <div
                key={`progress-${currentSlide}`}
                className="h-full bg-white animate-progress-fill"
              />
            </div>

            <button
              onClick={handleNextSlide}
              className="hover:text-[#c5a059] transition-colors font-bold uppercase text-xs tracking-widest cursor-pointer"
            >
              Next
            </button>
          </div>

        </div>

        {/* RIGHT SIDE (50% WIDTH): 100% Height HD Image with Clean Border Separator (Zero Shadow) */}
        <div
          key={`hero-img-${currentSlide}`}
          className={`w-full lg:w-1/2 relative h-[380px] sm:h-[460px] lg:h-auto min-h-[420px] overflow-hidden group border-t lg:border-t-0 lg:border-l border-slate-700/80 bg-slate-950 ${
            slideDirection === 'next' ? 'animate-hero-swipe-next' : 'animate-hero-swipe-prev'
          }`}
        >
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Location Badge Pill */}
          {currentHero.location && (
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-[#07132c]/90 backdrop-blur-md border border-[#c5a059]/40 text-white text-xs font-semibold shadow-md">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span className="tracking-wide">{currentHero.location}</span>
            </div>
          )}
        </div>

      </section>

      {/* 4. SECTION 2: GSAP SCROLLTRIGGER PINNED 5-IMAGE FULLSCREEN PROJECT SHOWCASE */}
      <section
        ref={section2PinRef}
        className="relative w-full h-screen h-[100dvh] min-h-[100dvh] max-h-[100dvh] bg-[#07132c] overflow-hidden flex items-center justify-center select-none"
      >
        <div className="relative w-full h-full">
          
          {/* IMAGE 1: Tahasildar & Mandal Revenue Office (MRO) */}
          <div
            ref={image1Ref}
            className="absolute inset-0 w-full h-full overflow-hidden z-10"
          >
            <img
              src="/icon_tahasildar_mro.jpg"
              alt="Tahasildar & Mandal Revenue Office (MRO) - Sirpur Town"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Floating Glassmorphic Badge 1 */}
            <div
              ref={badge1Ref}
              className="absolute bottom-3 sm:bottom-12 left-3 right-3 sm:right-auto sm:left-12 lg:left-16 z-50 p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#07132c]/90 backdrop-blur-xl border border-[#c5a059]/50 text-white max-w-xl shadow-2xl space-y-1.5 sm:space-y-3"
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#f3cf7a] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5be6b]" />
                  01 / 05 • Government & Civic
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-300 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[#c5a059]" /> Sirpur Town, Telangana
                </span>
              </div>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                Mandal Revenue Office (MRO) Headquarters
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                Official Tahasildar administrative headquarters engineered for civic administration, land registry, and public revenue governance with robust reinforced concrete superstructure.
              </p>
              <div className="pt-0.5 sm:pt-1 flex items-center gap-4">
                <button
                  onClick={() => handleNavigate('projects')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#f3cf7a] hover:text-white transition-colors group cursor-pointer"
                >
                  <span>Explore Project Records</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE 2: ST Welfare Residential Hostel Complex */}
          <div
            ref={image2Ref}
            className="absolute inset-0 w-full h-full overflow-hidden z-20"
          >
            <img
              src="/icon_hostel_building.jpg"
              alt="ST Welfare Residential Hostel Building & Security Gate"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Floating Glassmorphic Badge 2 */}
            <div
              ref={badge2Ref}
              className="absolute bottom-3 sm:bottom-12 left-3 right-3 sm:right-auto sm:left-12 lg:left-16 z-50 p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#07132c]/90 backdrop-blur-xl border border-[#c5a059]/50 text-white max-w-xl shadow-2xl space-y-1.5 sm:space-y-3"
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#f3cf7a] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5be6b]" />
                  02 / 05 • Welfare & Hostels
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-300 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[#c5a059]" /> Sirpur Town, Telangana
                </span>
              </div>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                ST Welfare Residential Hostel Complex
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                Multi-capacity student welfare residential building engineered with security boundary walls, gated entry portico, spacious dormitories, and integrated student amenities.
              </p>
              <div className="pt-0.5 sm:pt-1 flex items-center gap-4">
                <button
                  onClick={() => handleNavigate('projects')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#f3cf7a] hover:text-white transition-colors group cursor-pointer"
                >
                  <span>Explore Project Records</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE 3: Government High School Academic Complex & Assembly */}
          <div
            ref={image3Ref}
            className="absolute inset-0 w-full h-full overflow-hidden z-30"
          >
            <img
              src="/icon_school_assembly.jpg"
              alt="Government High School Campus & School Assembly Grounds"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Floating Glassmorphic Badge 3 */}
            <div
              ref={badge3Ref}
              className="absolute bottom-3 sm:bottom-12 left-3 right-3 sm:right-auto sm:left-12 lg:left-16 z-50 p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#07132c]/90 backdrop-blur-xl border border-[#c5a059]/50 text-white max-w-xl shadow-2xl space-y-1.5 sm:space-y-3"
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#f3cf7a] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5be6b]" />
                  03 / 05 • Educational & Campuses
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-300 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[#c5a059]" /> Sirpur Town, Telangana
                </span>
              </div>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                Government High School Academic Campus & Assembly
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                Multi-wing academic campus featuring modern classrooms, shaded assembly courtyards, faculty wings, and sports grounds serving regional student education.
              </p>
              <div className="pt-0.5 sm:pt-1 flex items-center gap-4">
                <button
                  onClick={() => handleNavigate('projects')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#f3cf7a] hover:text-white transition-colors group cursor-pointer"
                >
                  <span>Explore Project Records</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE 4: Institutional Dining Hall & Mess Facility */}
          <div
            ref={image4Ref}
            className="absolute inset-0 w-full h-full overflow-hidden z-40"
          >
            <img
              src="/icon_dining_hall.jpg"
              alt="Institutional Dining Hall & Campus Mess Facility"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Floating Glassmorphic Badge 4 */}
            <div
              ref={badge4Ref}
              className="absolute bottom-3 sm:bottom-12 left-3 right-3 sm:right-auto sm:left-12 lg:left-16 z-50 p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#07132c]/90 backdrop-blur-xl border border-[#c5a059]/50 text-white max-w-xl shadow-2xl space-y-1.5 sm:space-y-3"
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#f3cf7a] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5be6b]" />
                  04 / 05 • Institutional Dining
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-300 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[#c5a059]" /> KB Asifabad Dist, Telangana
                </span>
              </div>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                Institutional Dining Hall & Nutrition Facility
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                Dedicated large-format campus dining hall facility engineered with hygienic food prep kitchens, paved approach pathways, ventilation, and landscaped facades.
              </p>
              <div className="pt-0.5 sm:pt-1 flex items-center gap-4">
                <button
                  onClick={() => handleNavigate('projects')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#f3cf7a] hover:text-white transition-colors group cursor-pointer"
                >
                  <span>Explore Project Records</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE 5: Modern Student Dormitory Complex */}
          <div
            ref={image5Ref}
            className="absolute inset-0 w-full h-full overflow-hidden z-50"
          >
            <img
              src="/icon_dormitory.jpg"
              alt="Modern Student Dormitory & Residential Quarters"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Floating Glassmorphic Badge 5 */}
            <div
              ref={badge5Ref}
              className="absolute bottom-3 sm:bottom-12 left-3 right-3 sm:right-auto sm:left-12 lg:left-16 z-50 p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#07132c]/90 backdrop-blur-xl border border-[#c5a059]/50 text-white max-w-xl shadow-2xl space-y-1.5 sm:space-y-3"
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#f3cf7a] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <HardHat className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5be6b]" />
                  05 / 05 • Student Housing & Dormitories
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-300 bg-white/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-[#c5a059]" /> KB Asifabad Dist, Telangana
                </span>
              </div>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                Modern Student Dormitory & Residential Quarters
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                Heavy reinforced concrete student dormitory building engineered with cross-ventilation, student lodging rooms, secure access corridors, and durable weather-resistant joinery.
              </p>
              <div className="pt-0.5 sm:pt-1 flex items-center gap-4">
                <button
                  onClick={() => handleNavigate('projects')}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#f3cf7a] hover:text-white transition-colors group cursor-pointer"
                >
                  <span>Explore Project Records</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Fullscreen Scroll Cue & Pill */}
          <div className="hidden md:flex items-center gap-2 absolute top-8 right-8 z-50 px-4 py-2 rounded-full bg-[#07132c]/80 backdrop-blur-md border border-[#c5a059]/30 text-white/90 text-xs font-semibold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span>Scroll To Explore 5 Signature Projects</span>
          </div>

        </div>
      </section>

      {/* 6. SECTION 3: OUR EXPERTISE - FULL IMAGE BACKDROP CARDS (EXACT MATCH TO CLIENT REFERENCE) */}
      <section id="expertise" className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div data-aos="fade-up" className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block mb-1">Our Core Disciplines</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0d214a]">Our Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {[
              {
                title: "Bridges &\nSubstructures",
                tag: "STRONGER CONNECTIONS",
                image: "/icon_tonkini_10span_bridge.jpg",
                desc: "Tonkini & Sirpur 10-span river bridges, pile foundations, pier jacketing & 25 box bridges.",
                projects: ["Tonkini 10-Span Bridge", "Sirpur 10-Span Bridge", "Rasply 7-Span Bridge", "Kondapally 6-Span Bridge", "Dubbaguda 3-Span Bridge", "25 Box Bridges (Porsa)"]
              },
              {
                title: "Educational &\nHostels",
                tag: "SPACES FOR BRIGHTER FUTURES",
                image: "/icon_school_assembly.jpg",
                desc: "100-column residential schools, Kasturba KGBV campuses & student hostels.",
                projects: ["Boys Residential School (100 Columns)", "High School Building – 2010", "Jyotiba Phule Building", "Minority Residential Building", "Kasturba KGBV Campus", "ST Hostel Building – 2009"]
              },
              {
                title: "Government &\nCivic Works",
                tag: "INFRASTRUCTURE FOR PEOPLE",
                image: "/icon_tahasildar_mro.jpg",
                desc: "MRO office headquarters, forest department offices & 5 integrated market complexes.",
                projects: ["MRO Office Building – 2008", "Agriculture Building (Mancherial)", "Forest Range Office (Penchikalpet)", "Integrated Market Buildings (5 Nos.)", "Three-Floor Buildings (16 Nos.)"]
              },
              {
                title: "Hydraulic\nInfrastructure",
                tag: "SUSTAINABLE WATER SOLUTIONS",
                image: "/icon_overflow_check_dam.jpg",
                desc: "Sirpur stream diversion check dams & 45+ reinforced highway box culverts.",
                projects: ["Sirpur Stream Check Dam", "10-Unit Culverts Network", "20 Box Culverts (Gadchiroli)", "High-Discharge Box Culverts"]
              },
              {
                title: "Industrial Sheds\n& Steel",
                tag: "PRECISION ENGINEERING",
                image: "/icon_industrial_steel_sheds.jpg",
                desc: "Pre-engineered structural steel sheds (IIT Asifabad) & heavy warehouses.",
                projects: ["IIT Industrial Sheds (KB Asifabad)", "Structural Steel Fabrication Bays", "Heavy Gantry Crane Runways"]
              }
            ].slice(0, 2).map((exp, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate('expertise')}
                data-aos="fade-up"
                data-aos-delay={idx * 120}
                className="relative h-[420px] sm:h-[480px] rounded-none overflow-hidden shadow-lg group cursor-pointer border border-slate-200/60 hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
              >
                {/* Background Full Cover Image (No Shadow Layer) */}
                <img
                  src={exp.image}
                  alt={exp.title.replace('\n', ' ')}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Content Area in Compact Bottom Container */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 z-10 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold text-[#c5a059] uppercase tracking-widest block">
                      {exp.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-sans font-extrabold text-white tracking-tight leading-snug truncate group-hover:text-[#f3d38c] transition-colors">
                      {exp.title.replace('\n', ' ')}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-1 font-normal">
                      {exp.desc}
                    </p>
                  </div>

                  {/* View All Projects Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate('projects', { discipline: exp.title.replace('\n', ' ') });
                    }}
                    className="px-4 py-2 rounded-full bg-[#c5a059] hover:bg-[#e5be6b] text-[#07132c] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 transition-all duration-300 cursor-pointer border border-[#d4af37] shrink-0"
                  >
                    <span>View All Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Capabilities Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => handleNavigate('expertise')}
              className="acc-btn acc-btn--gold text-xs px-6 sm:px-8 py-3 sm:py-3.5 flex items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <span>View All Capabilities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. SECTION 4: OUR PROJECTS - FULL BLEED EDGE-TO-EDGE DISPLAY */}
      <section id="projects" className="py-14 sm:py-20 bg-[#07132c] text-white relative border-t border-slate-800 w-full overflow-hidden">
        <div className="w-full space-y-8 sm:space-y-12">
          
          {/* Section Header (Container Aligned) */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div data-aos="fade-up" className="space-y-3 border-b border-slate-700/60 pb-6 sm:pb-8 text-center md:text-left">
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block">
                LANDMARK CLIENT EXECUTIONS
              </span>
              <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
                Our Projects
              </h2>
              <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Featured signature civil and building projects executed across Sirpur Town &amp; Kumuram Bheem Asifabad District, Telangana.
              </p>
            </div>
          </div>

          {/* Full-Bleed 2-Column Edge-to-Edge Grid (Seamless 0px Gap) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full px-0">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative h-[360px] sm:h-[480px] lg:h-[600px] rounded-none overflow-hidden group shadow-xl hover:shadow-2xl border-0 transition-all duration-500 bg-slate-950"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = "/icon_mro_headquarters.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top Badges */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-none bg-[#07132c]/90 text-[#e5be6b] text-[10px] sm:text-xs font-black uppercase tracking-widest border border-[#c5a059]/40 backdrop-blur-md">
                    {project.categoryName}
                  </span>
                </div>

                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 bg-black/80 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-extrabold text-white border border-white/20">
                  {project.year}
                </div>

                {/* Bottom Info Bar (No Full Dark Shadow Layer On Photo) */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 z-10 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#e5be6b] font-extrabold">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#c5a059]" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-extrabold text-white leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── VIEW MORE PROJECTS – Centered Bottom CTA ── */}
          <div className="flex justify-center px-4 py-8 sm:py-12">
            <button
              id="view-more-projects-btn"
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center justify-center gap-3 sm:gap-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#a8813a] text-[#07132c] text-xs sm:text-base font-black uppercase tracking-widest px-8 sm:px-14 py-4 sm:py-6 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 hover:shadow-[#d4af37]/40 hover:from-[#e5be6b] hover:to-[#d4af37] transition-all duration-300 cursor-pointer border-2 border-[#d4af37] w-full sm:w-auto text-center"
            >
              <span>VIEW MORE PROJECTS</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#07132c] group-hover:translate-x-1.5 transition-transform duration-200 shrink-0" />
            </button>
          </div>

          {/* ── 5. SECTION 5: WHY CHOOSE ICON CONSTRUCTIONS (GSAP PINNED HORIZONTAL SCROLL - WHITE THEME) ─── */}
          <section
            ref={whyChooseSectionRef}
            className="w-full h-screen bg-white text-[#07132c] overflow-hidden relative border-t border-slate-200 flex flex-col justify-between py-6 sm:py-10"
          >
            {/* Pinned Top Bar / Section Header */}
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 z-20 shrink-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#927027] uppercase tracking-widest block">
                    PROVEN ENGINEERING INTEGRITY
                  </span>
                  <h2 className="text-xl sm:text-4xl lg:text-5xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
                    Why Choose Icon Constructions?
                  </h2>
                </div>
              </div>
            </div>

            {/* Horizontal Scrolling Track (Pins & Slides on Scroll) */}
            <div className="w-full overflow-hidden z-10 my-auto py-2">
              <div
                ref={whyChooseTrackRef}
                className="flex items-stretch gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-12 w-max"
              >
                {/* Intro Overview Card */}
                <div className="w-[270px] sm:w-[350px] lg:w-[380px] h-[350px] sm:h-[400px] lg:h-[420px] p-5 sm:p-7 lg:p-8 bg-slate-50 border border-slate-200 rounded-none shrink-0 flex flex-col justify-between shadow-md">
                  <div className="space-y-3 sm:space-y-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded-none bg-[#07132c] text-[#e5be6b] text-[9px] sm:text-[10px] font-black uppercase tracking-widest inline-block">
                      Our Promise
                    </span>
                    <h3 className="text-lg sm:text-2xl font-sans font-bold text-[#07132c] leading-tight">
                      Half a century of bonded engineering discipline.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      From Northern Telangana's deepest river piers to multi-acre residential campuses, we deliver projects built to endure generations.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#927027]">
                    <span>Swipe to explore pillars</span>
                    <ArrowRight className="w-4 h-4 animate-bounce" />
                  </div>
                </div>

                {/* 6 Value Pillar Cards */}
                {[
                  {
                    icon: ShieldCheck,
                    num: "01 / 06",
                    title: "Class-1 Empaneled Government Contractor",
                    desc: "Accredited partner with Roads & Buildings (R&B), Panchayat Raj, Tribal Welfare, and Municipal Corporations for high-stake capital tenders.",
                    metric: "Class-1",
                    metricLabel: "State Empanelment"
                  },
                  {
                    icon: Clock,
                    num: "02 / 06",
                    title: "50+ Years Regional Heritage",
                    desc: "Established in 1975 in Sirpur Town with unmatched local soil mastery, riverbed foundation experience, and deep community trust.",
                    metric: "50+ Years",
                    metricLabel: "Since 1975"
                  },
                  {
                    icon: HardHat,
                    num: "03 / 06",
                    title: "25M+ Safe Man-Hours Logged",
                    desc: "Zero-harm safety policy with rigorous daily toolbox inductions, certified safety stewards, and ISO 45001 worker health standards.",
                    metric: "25M+",
                    metricLabel: "Safe Work Hours"
                  },
                  {
                    icon: CheckCircle2,
                    num: "04 / 06",
                    title: "100% On-Time Handover Guarantee",
                    desc: "Unbroken record of delivering landmark bridges, educational campuses, and civic headquarters strictly within contracted timelines.",
                    metric: "100%",
                    metricLabel: "On-Time Handover"
                  },
                  {
                    icon: Building2,
                    num: "05 / 06",
                    title: "Heavy In-House Machinery & Fleet",
                    desc: "Equipped with automated concrete batching plants, rotary piling rigs, transit mixers, earthmovers, and PEB structural steel workshop.",
                    metric: "In-House",
                    metricLabel: "Heavy Piling Fleet"
                  },
                  {
                    icon: Award,
                    num: "06 / 06",
                    title: "Zero-Defect Quality Assurance",
                    desc: "Mandatory third-party laboratory compression testing, ultrasonic rebar scans, and ISO 9001 certified civil execution benchmarks.",
                    metric: "ISO 9001",
                    metricLabel: "Quality Certified"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="w-[280px] sm:w-[360px] lg:w-[400px] h-[350px] sm:h-[400px] lg:h-[420px] p-5 sm:p-7 lg:p-8 bg-white rounded-none border border-slate-200 hover:border-[#c5a059] hover:shadow-xl transition-all duration-300 shrink-0 flex flex-col justify-between shadow-md group"
                    >
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-slate-100 text-[#07132c] flex items-center justify-center border border-slate-200 group-hover:bg-[#07132c] group-hover:text-[#e5be6b] transition-colors">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-xs font-mono font-bold text-[#927027] tracking-wider">{item.num}</span>
                        </div>
                        <h3 className="text-base sm:text-xl font-bold text-[#07132c] group-hover:text-[#927027] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-black text-[#07132c] block">{item.metric}</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider">{item.metricLabel}</span>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-slate-100 text-slate-500 group-hover:text-[#07132c] group-hover:bg-[#e5be6b] flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Closing CTA Card */}
                <div className="w-[270px] sm:w-[350px] lg:w-[380px] h-[350px] sm:h-[400px] lg:h-[420px] p-5 sm:p-7 lg:p-8 bg-gradient-to-br from-[#07132c] via-[#0b1e3d] to-[#07132c] text-white rounded-none shrink-0 flex flex-col justify-between shadow-xl">
                  <div className="space-y-3 sm:space-y-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded-none bg-[#c5a059] text-[#07132c] text-[9px] sm:text-[10px] font-black uppercase tracking-widest inline-block">
                      Take Action
                    </span>
                    <h3 className="text-lg sm:text-2xl font-sans font-black text-white leading-tight">
                      Ready to build your next capital project?
                    </h3>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Consult with our executive engineers for government tenders, EPC contracts, and public civil works.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="w-full bg-[#c5a059] text-[#07132c] hover:bg-white font-black uppercase tracking-widest text-xs py-3 sm:py-3.5 px-4 rounded-none transition-all cursor-pointer border-0 shadow-lg"
                  >
                    Contact Engineers →
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Subtle Indicator */}
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 z-20 shrink-0">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-200 pt-3">
                <span>Icon Constructions Engineering Integrity</span>
                <span className="text-[#927027] font-semibold">6 Pillar Horizontal Showcase</span>
              </div>
            </div>
          </section>

          {/* ── 6. SECTION 6: CLIENT REVIEWS & TESTIMONIALS (REVIEWS LAST) ─── */}
          <div className="w-full bg-white text-[#07132c] py-24 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div data-aos="fade-up" className="text-center space-y-3 max-w-3xl mx-auto">
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block">
                  AUTHORITY ENDORSEMENTS
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
                  Client Reviews &amp; Testimonials
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-normal">
                  Trusted by Government Executive Engineers, Municipal Authorities, and Infrastructure Stakeholders across Telangana.
                </p>
              </div>

              {/* Desktop 3-Column Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Er. K. Ramana Rao",
                    designation: "Superintending Engineer",
                    department: "Roads & Buildings (R&B) Department, Telangana",
                    project: "Tonkini 10-Span River Bridge Project",
                    review: "Icon Constructions demonstrated extraordinary technical mastery in the execution of the 10-span Tonkini river bridge. Their deep foundation piling and flood-resilience protocols are of the highest standard. Delivered ahead of timeline."
                  },
                  {
                    name: "P. Venkateshwar",
                    designation: "District Welfare Officer",
                    department: "Tribal Welfare Department, Kumuram Bheem Asifabad",
                    project: "ST Residential School & KGBV Campus",
                    review: "The residential school campuses and KGBV student hostels constructed by Icon Constructions stand out for their robust structural quality, student safety provisions, and remarkable finish. A truly dependable bonded contractor."
                  },
                  {
                    name: "M. Srinivas Reddy",
                    designation: "Municipal Commissioner",
                    department: "Civic & Municipal Administration, Sirpur Town",
                    project: "MRO Administrative Headquarters",
                    review: "The MRO Administrative Headquarters building is an architectural landmark in our town. Icon Constructions operated with complete transparency, uncompromising quality standards, and flawless execution."
                  }
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="bg-slate-50 p-8 rounded-none border border-slate-200 hover:border-[#c5a059] hover:bg-white hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Star Rating & Quote Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#d4af37]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-[#c5a059]/40" />
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                        "{rev.review}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 space-y-1">
                      <h4 className="text-sm font-bold text-[#07132c]">{rev.name}</h4>
                      <p className="text-xs font-semibold text-[#927027]">{rev.designation}</p>
                      <p className="text-[11px] text-slate-500">{rev.department}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-none bg-slate-200 text-[#07132c] text-[10px] font-bold uppercase tracking-wider">
                        {rev.project}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile 1-Card per Slide Responsive Carousel */}
              <div className="block md:hidden space-y-6">
                {(() => {
                  const mobileReviews = [
                    {
                      name: "Er. K. Ramana Rao",
                      designation: "Superintending Engineer",
                      department: "Roads & Buildings (R&B) Department, Telangana",
                      project: "Tonkini 10-Span River Bridge Project",
                      review: "Icon Constructions demonstrated extraordinary technical mastery in the execution of the 10-span Tonkini river bridge. Their deep foundation piling and flood-resilience protocols are of the highest standard. Delivered ahead of timeline."
                    },
                    {
                      name: "P. Venkateshwar",
                      designation: "District Welfare Officer",
                      department: "Tribal Welfare Department, Kumuram Bheem Asifabad",
                      project: "ST Residential School & KGBV Campus",
                      review: "The residential school campuses and KGBV student hostels constructed by Icon Constructions stand out for their robust structural quality, student safety provisions, and remarkable finish. A truly dependable bonded contractor."
                    },
                    {
                      name: "M. Srinivas Reddy",
                      designation: "Municipal Commissioner",
                      department: "Civic & Municipal Administration, Sirpur Town",
                      project: "MRO Administrative Headquarters",
                      review: "The MRO Administrative Headquarters building is an architectural landmark in our town. Icon Constructions operated with complete transparency, uncompromising quality standards, and flawless execution."
                    }
                  ];
                  const cur = mobileReviews[activeReviewIndex];

                  return (
                    <div>
                      {/* Active Single Review Card */}
                      <div 
                        key={activeReviewIndex}
                        className="bg-slate-50 p-6 sm:p-8 rounded-none border-2 border-[#c5a059]/40 shadow-lg space-y-5 flex flex-col justify-between min-h-[320px] transition-all duration-300 animate-fadeIn"
                      >
                        <div className="space-y-4">
                          {/* Star Rating & Quote Icon */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[#d4af37]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                              ))}
                            </div>
                            <Quote className="w-7 h-7 text-[#c5a059]/40" />
                          </div>

                          <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed font-sans">
                            "{cur.review}"
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 space-y-1">
                          <h4 className="text-sm font-bold text-[#07132c]">{cur.name}</h4>
                          <p className="text-xs font-semibold text-[#927027]">{cur.designation}</p>
                          <p className="text-[11px] text-slate-500">{cur.department}</p>
                          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-none bg-slate-200 text-[#07132c] text-[10px] font-bold uppercase tracking-wider">
                            {cur.project}
                          </span>
                        </div>
                      </div>

                      {/* Carousel Controls: Prev Button, Dots, Next Button */}
                      <div className="flex items-center justify-between mt-6 px-1">
                        <button
                          onClick={() => setActiveReviewIndex((prev) => (prev === 0 ? mobileReviews.length - 1 : prev - 1))}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-[#c5a059] text-[#07132c] hover:bg-[#c5a059] hover:text-white transition-colors cursor-pointer shadow-sm"
                          aria-label="Previous review"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Pagination Dots & Slide Counter */}
                        <div className="flex items-center gap-2">
                          {mobileReviews.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveReviewIndex(i)}
                              className={`h-2 transition-all duration-300 rounded-none cursor-pointer border-0 ${
                                activeReviewIndex === i ? 'w-6 bg-[#c5a059]' : 'w-2 bg-slate-300'
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                            />
                          ))}
                          <span className="text-[11px] font-bold text-slate-400 ml-2 tracking-wider">
                            0{activeReviewIndex + 1} / 0{mobileReviews.length}
                          </span>
                        </div>

                        <button
                          onClick={() => setActiveReviewIndex((prev) => (prev === mobileReviews.length - 1 ? 0 : prev + 1))}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-[#c5a059] text-[#07132c] hover:bg-[#c5a059] hover:text-white transition-colors cursor-pointer shadow-sm"
                          aria-label="Next review"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 8. MODERN UPGRADED GLOBAL FOOTER (0 BORDER RADIUS, CLEAN 4-COLUMN) ─── */}
      <footer className="bg-[#050e1f] text-white border-t border-slate-800 pt-20 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Top Row: Brand Info + Direct Action */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-5">
              <button onClick={() => handleNavigate('home')} className="flex items-center bg-transparent border-0 cursor-pointer p-0">
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
                  <button onClick={() => handleNavigate('home')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('about')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    About Us (Vision &amp; Legacy)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Our Projects (Full Portfolio)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('expertise')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Expertise &amp; Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('contact')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
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
                    onClick={() => handleNavigate('contact')}
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

      {/* 10. PROPOSAL INQUIRY MODAL */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl relative border border-slate-200 animate-fade-in-up">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-[#0d214a]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">Commercial Inquiry</span>
              <h3 className="text-2xl font-black text-[#0d214a]">Request a Capital Proposal</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry submitted! Our engineering team will reach out within 24 hours.'); setInquiryModalOpen(false); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0d214a] block mb-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs focus:border-[#c5a059] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0d214a] block mb-1">Corporate Email</label>
                  <input required type="email" placeholder="john@company.com" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs focus:border-[#c5a059] outline-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0d214a] block mb-1">Project Overview</label>
                <textarea rows={3} placeholder="Provide details regarding estimated area, location, timeline..." className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs focus:border-[#c5a059] outline-none"></textarea>
              </div>

              <button type="submit" className="w-full acc-btn acc-btn--gold py-3.5 text-xs font-bold uppercase tracking-wider">
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT DETAIL MODAL */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 relative">
              <img src={selectedProjectModal.image} alt={selectedProjectModal.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 text-white">
                <span className="px-2.5 py-0.5 rounded bg-[#c5a059] text-[#07132c] text-[10px] font-black uppercase tracking-widest">
                  {selectedProjectModal.categoryName}
                </span>
                <h3 className="text-xl font-bold mt-1">{selectedProjectModal.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">{selectedProjectModal.description}</p>
              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-semibold">Location</span>
                  <strong className="text-[#0d214a]">{selectedProjectModal.location}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Scale</span>
                  <strong className="text-[#0d214a]">{selectedProjectModal.scale}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Year</span>
                  <strong className="text-[#c5a059]">{selectedProjectModal.year}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
