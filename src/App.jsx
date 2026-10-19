import React, { useState, useEffect, useRef } from 'react';
import ProjectsPage from './ProjectsPage';
import OngoingProjectsPage from './OngoingProjectsPage';
import AboutPage from './AboutPage';
import ExpertisePage from './ExpertisePage';
import CareersPage from './CareersPage';
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
  Layers,
  Eye,
  Briefcase,
  Volume2,
  VolumeX,
  Maximize2,
  Truck,
  Wrench,
  Compass,
  Calculator,
  Cpu,
  BarChart3,
  Ruler,
  FileCheck,
  Activity
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
  const [chilakapallyPhoto, setChilakapallyPhoto] = useState(0);
  const [goribkapellyPhoto, setGoribkapellyPhoto] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [activeLifecycleStep, setActiveLifecycleStep] = useState(0);
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const getInitialPage = () => {
    try {
      const cleanHash = window.location.hash.replace(/[#/]/g, '').toLowerCase();
      if (['projects', 'about', 'expertise', 'careers', 'contact', 'ongoing', 'ongoing-projects', 'home'].includes(cleanHash)) {
        return cleanHash === 'ongoing-projects' ? 'ongoing' : cleanHash;
      }
      const saved = localStorage.getItem('icon_page');
      if (['projects', 'about', 'expertise', 'careers', 'contact', 'ongoing', 'home'].includes(saved)) {
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
      const cleanHash = window.location.hash.replace(/[#/]/g, '').toLowerCase();
      if (cleanHash === 'ongoing' || cleanHash === 'ongoing-projects') {
        setCurrentPage('ongoing');
      } else if (['projects', 'about', 'expertise', 'careers', 'contact', 'home'].includes(cleanHash)) {
        setCurrentPage(cleanHash);
      } else if (!cleanHash) {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ACC Hero Banner Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'
  const [isPlaying, setIsPlaying] = useState(true);
  const heroVideoRef = useRef(null);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(true);
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState(true);

  const toggleHeroVideoPlay = () => {
    if (heroVideoRef.current) {
      if (isHeroVideoPlaying) {
        heroVideoRef.current.pause();
        setIsHeroVideoPlaying(false);
      } else {
        heroVideoRef.current.play();
        setIsHeroVideoPlaying(true);
      }
    }
  };

  const toggleHeroVideoMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isHeroVideoMuted;
      setIsHeroVideoMuted(!isHeroVideoMuted);
    }
  };

  // GSAP ScrollTrigger Refs for Section 2 Pinned Showcase (5 Expertise Images) - Desktop/Laptop
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

  // GSAP ScrollTrigger Sequence for Section 2 (Desktop & Laptop only, hidden on Mobile & Tablet)
  // Re-initializes reliably whenever user navigates back to 'home'
  useEffect(() => {
    if (currentPage !== 'home') return;

    let mm;
    const initTimer = setTimeout(() => {
      mm = gsap.matchMedia();

      // DESKTOP & LAPTOP (>= 1024px): Vertical Slide-Up Pinned Sequence
      mm.add("(min-width: 1024px)", () => {
        if (!section2PinRef.current || !image1Ref.current) return;

        // Prevent initial subpixel peeking on viewports
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
      });

      ScrollTrigger.refresh();
      AOS.refresh();
    }, 80);

    return () => {
      clearTimeout(initTimer);
      if (mm) mm.revert();
    };
  }, [currentPage]);

  // GSAP Horizontal Scroll for Why Choose Icon Constructions Section
  const whyChooseSectionRef = useRef(null);
  const whyChooseTrackContainerRef = useRef(null);
  const whyChooseTrackRef = useRef(null);

  const handleWhyChoosePrev = () => {
    const container = whyChooseTrackContainerRef.current || whyChooseTrackRef.current?.parentElement;
    if (window.innerWidth < 768) {
      if (container) {
        container.scrollBy({ left: -290, behavior: 'smooth' });
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(window.scrollY - 380);
      } else {
        window.scrollBy({ top: -380, behavior: 'smooth' });
      }
    }
  };

  const handleWhyChooseNext = () => {
    const container = whyChooseTrackContainerRef.current || whyChooseTrackRef.current?.parentElement;
    if (window.innerWidth < 768) {
      if (container) {
        container.scrollBy({ left: 290, behavior: 'smooth' });
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(window.scrollY + 380);
      } else {
        window.scrollBy({ top: 380, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (currentPage !== 'home') return;

    let mm;
    let ro;
    
    // Allow DOM, fonts, and parent images to render layout
    const timer = setTimeout(() => {
      const section = whyChooseSectionRef.current;
      const track = whyChooseTrackRef.current;
      if (!section || !track) return;

      mm = gsap.matchMedia();

      // Pinned GSAP Horizontal Scroll on Desktop and Tablet (>= 768px)
      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () => {
          if (!track) return 0;
          return Math.max(0, track.scrollWidth - window.innerWidth + 120);
        };

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80px',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        return () => {
          horizontalTween.kill();
        };
      });

      // Clear GSAP transform on mobile viewports (< 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.set(track, { clearProps: "transform,x" });
      });

      // ResizeObserver to automatically refresh trigger points whenever images or layout shift
      ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(track);
      ro.observe(section);

      ScrollTrigger.refresh();
    }, 150);

    const handleWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleWindowLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleWindowLoad);
      if (ro) ro.disconnect();
      if (mm) mm.revert();
    };
  }, [currentPage]);





  const heroSlides = [
    {
      id: 1,
      title: "Engineering landmark residential & civic towers",
      subtitle: "Delivering modern multi-tower residential complexes, high-rise townships, and institutional infrastructure with Class-1 execution standards.",
      btn1Text: "About Us",
      btn1Link: "#about",
      btn2Text: "Our Projects",
      btn2Link: "#projects",
      image: "/icon_ramagundam_panorama.jpg",
      location: "Ramagundam Multi-Tower Residential Complex, Telangana",
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
    {
      id: 4,
      title: "Constructing premier educational campuses & academic wings",
      subtitle: "Empaneled Class-1 contractor specializing in modern institutional complexes, academic faculties, and student welfare facilities.",
      btn1Text: "Projects",
      btn1Link: "#projects",
      btn2Text: "Expertise",
      btn2Link: "#expertise",
      image: "/icon_tswrs_campus.jpg",
      location: "TSWR Residential Campus, Sirpur Town",
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
    }, 10000);
    return () => clearInterval(timer);
  }, [heroSlides.length, isPlaying, currentSlide]);

  // Real Client Project Execution Record (Top Signature Projects Featured on Home Page - Buildings on Top, Bridges Down)
  const projects = [
    {
      id: 101,
      title: "Ramagundam Multi-Tower Residential Complex – Towers 1, 2 & 3",
      category: "civic",
      categoryName: "Residential & Civic Towers",
      image: "/icon_ramagundam_panorama.jpg",
      location: "Ramagundam, Peddapalli District, Telangana",
      scale: "G+5 Multi-Tower High-Rise Residential Township",
      year: "2026 (Active Execution)",
      description: "Flagship multi-tower township project comprising Tower-1, Tower-2, and Tower-3. Engineered with heavy reinforced concrete framed structures, G+5 residential storeys, deep pile foundations, internal core stairwells, cantilevered balconies, and modern exterior architectural facade finishing."
    },
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
      id: 3,
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
      id: 4,
      title: "TSWR Residential School & College (Girls) – Grand Arch",
      category: "educational",
      categoryName: "Educational & Campuses",
      image: "/icon_tswrdc_girls_arch.jpg",
      location: "Narketpally, Nalgonda District, Telangana",
      scale: "Grand Entrance Arch & Campus Perimeter",
      year: "Completed",
      description: "Signature monumental entrance arch, security gatehouse, and perimeter enclosure engineered for the Telangana Social Welfare Residential Girls College campus."
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
      title: "Tonkini 10-Span High-Level Major River Bridge",
      category: "infrastructure",
      categoryName: "Hydraulic Infrastructure",
      image: "/icon_tonkini_10span_bridge.jpg",
      location: "Tonkini River Crossing, Sirpur Region, Telangana",
      scale: "10-Span Major Pre-Stressed Concrete Bridge",
      year: "Completed",
      description: "Critical regional arterial river bridge spanning 10 heavy prestressed concrete spans over the Tonkini riverbed, engineered on deep pile foundations."
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

  const currentHero = heroSlides[currentSlide] || heroSlides[0];

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

  if (currentPage === 'ongoing') {
    return (
      <OngoingProjectsPage
        onNavigate={handleNavigate}
        onBack={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'expertise') {
    return <ExpertisePage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'careers') {
    return <CareersPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#0d214a] font-sans antialiased selection:bg-[#c5a059] selection:text-white overflow-x-hidden w-full max-w-full relative">
      
      {/* 1 & 2. Fixed Permanent Top Bar + Header Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 shadow-md">
        {/* Metallic Golden Top Notice Bar */}
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

        {/* Header Navbar with Warm Ivory Background (#F8F7F3) - EXACT UNIFORM HEADER */}
        <div className="bg-[#F8F7F3] border-b border-slate-200">
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
                <button onClick={() => handleNavigate('ongoing')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 flex items-center gap-1.5">
                  <span>Ongoing</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <button onClick={() => handleNavigate('expertise')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                  Expertise
                </button>
                <button onClick={() => handleNavigate('careers')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                  Careers
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
        </div>
      </header>

      {/* Header Height Spacer for Fixed Header */}
      <div className="h-[96px] sm:h-[104px] lg:h-[108px] w-full shrink-0" aria-hidden="true" />

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
              onClick={() => { handleNavigate('ongoing'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>Ongoing Projects</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
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
              onClick={() => { handleNavigate('careers'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Careers (11 Openings)</span>
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

      {/* 3. FULL-WIDTH IMMERSIVE HERO VIDEO BANNER WITH CINEMATIC SHADE & BRAND TYPOGRAPHY */}
      <section className="relative w-full min-h-[580px] sm:min-h-[660px] lg:h-[calc(100vh-108px)] lg:min-h-[680px] bg-[#07132c] overflow-hidden flex items-center">
        {/* Background Video */}
        <video
          ref={heroVideoRef}
          src="/home-banner-video.mp4"
          autoPlay
          loop
          muted={isHeroVideoMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle Light Shade Overlay (Light Tint) */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07132c]/50 via-transparent to-black/25 pointer-events-none" />

        {/* Hero Foreground Content - Aligned directly beneath header logo */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16 flex flex-col justify-center">
          
          {/* Main Title & Slogan */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mb-4 sm:mb-6 drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
            Icon Constructions
            <span className="block mt-2 sm:mt-3 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#f3cf7a] drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
              Engineering Landmarks & Civil Superstructures Across Telangana
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            For five decades, Icon Constructions has delivered high-capacity river bridges, civic administrative headquarters, premier educational campuses, and residential towers with uncompromised engineering integrity and precision execution.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleNavigate('projects')}
              className="px-6 sm:px-8 py-3 bg-[#c5a059] hover:bg-[#b58f45] text-[#07132c] font-bold text-xs sm:text-sm tracking-wide rounded-none transition-all shadow-2xl hover:shadow-[#c5a059]/40 flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavigate('about')}
              className="px-6 sm:px-8 py-3 bg-[#07132c]/70 hover:bg-white hover:text-[#07132c] text-white border border-white/50 font-bold text-xs sm:text-sm tracking-wide rounded-none transition-all backdrop-blur-md cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span>About Our Legacy</span>
            </button>

            <button
              onClick={() => handleNavigate('contact')}
              className="px-5 sm:px-6 py-3 text-white hover:text-[#f3cf7a] font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4 decoration-[#c5a059] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            >
              <span>Contact Us</span>
            </button>
          </div>

        </div>
      </section>

      {/* 4. SECTION 2: GSAP SCROLLTRIGGER PINNED 5-IMAGE FULLSCREEN PROJECT SHOWCASE (DESKTOP & LAPTOP ONLY, HIDDEN ON MOBILE & TABLET) */}
      <section
        ref={section2PinRef}
        className="hidden lg:flex relative w-full h-screen h-[100dvh] min-h-[100dvh] max-h-[100dvh] bg-[#07132c] overflow-hidden items-center justify-center select-none"
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

      {/* ── PRECISION ENGINEERING LIFECYCLE (WHITE THEME • LEFT-ALIGNED MODERN UI) ─── */}
      <section className="w-full bg-white text-[#07132c] py-20 sm:py-28 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Left-Aligned Header Block with Right-Side Authority Highlights */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-200">
            <div data-aos="fade-up" className="max-w-3xl space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#927027] text-xs font-bold tracking-widest uppercase">
                <HardHat className="w-3.5 h-3.5 text-[#927027]" />
                <span>Class-1 Execution Protocols</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
                Precision Engineering Lifecycle: <br className="hidden sm:inline" />
                <span className="text-[#927027]">
                  How Icon Builds to Last 100+ Years
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                From deep sub-surface geotechnical drilling to final non-destructive testing, every Icon civil project follows a strict 4-phase monolithic execution standard validated against Indian Standard (IS) codes.
              </p>
            </div>

            {/* Quick Authority Metric Badges */}
            <div className="shrink-0 flex items-center gap-4 text-left">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[140px]">
                <span className="text-2xl font-black text-[#07132c] block font-sans">4 Phases</span>
                <span className="text-xs text-slate-500 font-medium">Monolithic Protocol</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[140px]">
                <span className="text-2xl font-black text-[#927027] block font-sans">IS Codes</span>
                <span className="text-xs text-slate-500 font-medium">IS 456, 1892, 2911</span>
              </div>
            </div>
          </div>

          {/* Interactive Phase Selector Tabs (White & Slate Theme with High-Contrast Active State) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { step: '01', title: 'Geotechnical & Soil Profiling', subtitle: 'Strata Boring & SBC Analysis' },
              { step: '02', title: 'Deep Piling & Raft Base', subtitle: 'Bored Rotary Foundation' },
              { step: '03', title: 'Superstructure & Formwork', subtitle: 'M40 Monolithic RCC' },
              { step: '04', title: 'Quality Commissioning', subtitle: 'NABL & Class-1 Handover' }
            ].map((tab, idx) => {
              const isActive = activeLifecycleStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLifecycleStep(idx)}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 relative group cursor-pointer ${
                    isActive
                      ? 'bg-[#07132c] text-white border-[#07132c] shadow-xl shadow-[#07132c]/10'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black tracking-wider ${isActive ? 'text-[#e5be6b]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      PHASE {tab.step}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_8px_#c5a059]" />
                    )}
                  </div>
                  <h4 className={`text-sm sm:text-base font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-[#07132c] group-hover:text-black'}`}>
                    {tab.title}
                  </h4>
                  <p className={`text-[11px] sm:text-xs font-normal line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tab.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Display Card (Crisp White/Slate Container) */}
          {(() => {
            const stages = [
              {
                step: '01',
                title: 'Geotechnical Core Exploration & Soil Boring',
                category: 'Subsurface Analysis',
                codeStandard: 'IS 1892 & IS 2131 Compliant',
                summary: 'Every structure begins with deep rotary core drilling up to 30 meters below natural ground level to establish Safe Bearing Capacity (SBC) and eliminate unpredicted settlement.',
                deliverables: [
                  'Continuous SPT N-value recording across strata',
                  'Groundwater sulphate & chloride aggressive soil testing',
                  'Seismic Zone III/IV dynamic response profiling',
                  'Zero differential settlement foundation design'
                ],
                metric: '100%',
                metricLabel: 'Core Sample Recovery Rate',
                metricSub: 'Validated at government certified soil labs',
                image: '/ongoing_palagutta_1.jpg',
                caption: 'Rotary foundation core excavation and trenching on active site'
              },
              {
                step: '02',
                title: 'Deep Rotary Bored Piling & Monolithic Raft Foundations',
                category: 'Foundation Engineering',
                codeStandard: 'IS 2911 & IRC 78 Certified',
                summary: 'Cast-in-situ bored piling socketed into solid bedrock layers, anchored with high-yield Fe550D rebar cages and poured monolithically using high-slump tremie pipes.',
                deliverables: [
                  '1000mm to 1500mm diameter hydraulic rotary pile bores',
                  'Continuous tremie pours to eliminate cold joints',
                  'Corrosion-resistant high-ductility Fe550D rebar cages',
                  'Cross-hole ultrasonic sonic logging (CSL) verified'
                ],
                metric: '450+ T',
                metricLabel: 'Individual Pile Working Load',
                metricSub: 'Tested under vertical static load protocols',
                image: '/ongoing_palagutta_2.jpg',
                caption: 'Heavy pile cap steel binding and monolithic shuttering'
              },
              {
                step: '03',
                title: 'Seismic Superstructure Framing & High-Pressure Shuttering',
                category: 'Monolithic RCC Framework',
                codeStandard: 'IS 456:2000 Structural Standard',
                summary: 'Precision-engineered modular steel and aluminum formwork combined with computer-batched M35/M40 concrete ensures millimeter plumb accuracy and zero void defects.',
                deliverables: [
                  'Engineered high-pressure formwork with zero deflection',
                  'Continuous 36-meter hydraulic boom pump casting',
                  'Millimeter laser total station column-beam alignment',
                  'Multi-layer curing membrane and temperature logging'
                ],
                metric: 'M40',
                metricLabel: 'High-Durability Design Grade',
                metricSub: 'Formulated with automated moisture compensation',
                image: '/icon_ramagundam_structural.jpg',
                caption: 'Reinforced concrete framing with monolithic beam-column junction ties'
              },
              {
                step: '04',
                title: 'Multi-Tier Quality Testing & Class-1 Civic Handover',
                category: 'Quality Commissioning',
                codeStandard: 'Telangana R&B Class-1 Bonded',
                summary: 'Before official civic handover, every cubic meter undergoes non-destructive ultrasonic pulse testing, core compression testing, and joint authority inspections.',
                deliverables: [
                  'NABL-accredited 7-day and 28-day concrete cube crush tests',
                  'Non-destructive rebound hammer structural audits',
                  'Comprehensive As-Built CAD documentation & warranty',
                  'Formal handover certificate signed by Executive Engineers'
                ],
                metric: '0-Defect',
                metricLabel: 'Authority Handover Clearance',
                metricSub: '100% compliance with government tender specifications',
                image: '/icon_mro_headquarters.jpg',
                caption: 'Fully commissioned multi-storey administrative headquarters'
              }
            ];

            const currentStage = stages[activeLifecycleStep];

            return (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
                  
                  {/* Left: Stage Information */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-md bg-[#c5a059]/15 text-[#927027] text-xs font-bold uppercase tracking-wider">
                        Phase {currentStage.step} • {currentStage.category}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-white text-slate-700 text-xs font-mono border border-slate-200">
                        {currentStage.codeStandard}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black text-[#07132c] leading-tight">
                      {currentStage.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {currentStage.summary}
                    </p>

                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-bold text-[#927027] uppercase tracking-wider">
                        Engineering Deliverables &amp; Protocols:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentStage.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-[#927027] shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700 font-medium leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setInquiryModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#07132c] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c5a059] hover:text-[#07132c] shadow-md transition-all cursor-pointer"
                      >
                        <span>Request Technical Spec Sheet</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleNavigate('ongoing')}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[#07132c] text-xs font-bold tracking-wider transition-all cursor-pointer"
                      >
                        <span>View In-Progress Projects</span>
                        <ArrowUpRight className="w-4 h-4 text-[#927027]" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Real Site Visual & Stat Badge */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] shadow-md group">
                      <img
                        src={currentStage.image}
                        alt={currentStage.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07132c] via-transparent to-transparent opacity-75" />
                      
                      <div className="absolute bottom-4 left-4 right-4 text-xs text-white bg-[#07132c]/85 backdrop-blur-md p-3 rounded-lg border border-white/10">
                        <span className="font-semibold text-[#e5be6b] block mb-0.5">Live Construction Verification</span>
                        <p className="text-[11px] text-slate-200 font-normal">{currentStage.caption}</p>
                      </div>
                    </div>

                    {/* Metric Callout Card */}
                    <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-2xl sm:text-3xl font-sans font-black text-[#07132c] block">
                          {currentStage.metric}
                        </span>
                        <span className="text-xs font-bold text-slate-800 block">
                          {currentStage.metricLabel}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {currentStage.metricSub}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-[#927027]" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── HEAVY PLANT, FLEET & TECHNICAL INFRASTRUCTURE (WHITE THEME) ─── */}
      <section className="w-full bg-white text-[#07132c] py-20 sm:py-28 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div data-aos="fade-up" className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#927027] text-xs font-bold tracking-widest uppercase">
                <Truck className="w-3.5 h-3.5 text-[#927027]" />
                <span>In-House Industrial Assets</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
                Heavy Plant Machinery &amp; Mobilization Fleet
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Direct ownership of advanced construction plant eliminates third-party supply chain bottlenecks, giving Icon full control over concrete pouring cycles, piling schedules, and rapid project delivery.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => handleNavigate('expertise')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-[#07132c] text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                <span>Full Machinery Inventory</span>
                <ArrowUpRight className="w-4 h-4 text-[#927027]" />
              </button>
            </div>
          </div>

          {/* 6 High-Impact Capability Cards Grid (White Theme) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: 'Computerized Batching Plants',
                capacity: '60 m³/hr Batch Capacity',
                desc: 'Microprocessor-controlled concrete batching with digital aggregate load cells, automatic moisture probes, and admixture dosing for consistent M35/M40 grades.',
                tag: '0% Batching Variance'
              },
              {
                icon: Wrench,
                title: 'Hydraulic Rotary Piling Rigs',
                capacity: 'Up to 1500mm Bored Diameter',
                desc: 'Heavy crawler piling rigs capable of drilling through hardest granite stratas and deep river silt beds for bridge piers and high-load foundation piles.',
                tag: 'Bedrock Penetration'
              },
              {
                icon: Truck,
                title: 'High-Reach Boom Pumps & Placers',
                capacity: '36-Meter Vertical Reach',
                desc: 'Truck-mounted hydraulic placing booms enabling continuous, high-volume monolithic concrete pours across multi-storey slabs and deep river pier caps.',
                tag: 'Monolithic Placement'
              },
              {
                icon: Compass,
                title: 'Leica 3D Total Station Optical Survey',
                capacity: '±1mm Accuracy Tolerance',
                desc: 'Millimeter-precision laser total stations and RTK satellite GPS contour rovers for precise foundation coordinates, bridge span axes, and boundary alignments.',
                tag: 'Millimeter Precision'
              },
              {
                icon: FileCheck,
                title: 'NABL Certified Field Testing Lab',
                capacity: '2000 kN Automated Crushing',
                desc: 'Fully equipped mobile site laboratories for 7-day/28-day cube compression testing, ultrasonic pulse velocity, slump cone audits, and soil compaction verification.',
                tag: 'On-Site NABL Standards'
              },
              {
                icon: Activity,
                title: 'Heavy Earthmoving & Compaction Fleet',
                capacity: '45+ Dedicated Heavy Units',
                desc: 'In-house fleet of Komatsu & JCB hydraulic excavators, 12-ton vibratory soil compactors, and high-capacity tippers ready for immediate remote mobilization.',
                tag: 'Immediate Mobilization'
              }
            ].map((plant, pIdx) => {
              const PlantIcon = plant.icon;
              return (
                <div
                  key={pIdx}
                  data-aos="fade-up"
                  data-aos-delay={pIdx * 100}
                  className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-[#927027] hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-6 text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#927027] group-hover:bg-[#07132c] group-hover:text-[#e5be6b] transition-colors">
                        <PlantIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                        {plant.tag}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-[#927027] block mb-1">
                        {plant.capacity}
                      </span>
                      <h4 className="text-lg font-bold text-[#07132c] group-hover:text-[#927027] transition-colors">
                        {plant.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {plant.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#927027]" />
                      <span className="font-medium text-slate-700">100% Company Owned</span>
                    </span>
                    <span className="font-mono text-slate-400">ASSET-0{pIdx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fleet Metric Band (White / Light Slate) */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-xs">
            <div>
              <span className="text-3xl sm:text-4xl font-sans font-black text-[#07132c] block">45+</span>
              <span className="text-xs font-bold text-[#927027] uppercase tracking-wider block mt-1">Heavy Machinery Units</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Excavators, Rigs &amp; Compactors</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-sans font-black text-[#07132c] block">100%</span>
              <span className="text-xs font-bold text-[#927027] uppercase tracking-wider block mt-1">Direct Fleet Ownership</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Zero reliance on middlemen</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-sans font-black text-[#07132c] block">24/7</span>
              <span className="text-xs font-bold text-[#927027] uppercase tracking-wider block mt-1">Maintenance Dispatch</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Dedicated mechanical engineers</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-sans font-black text-[#07132c] block">0 hrs</span>
              <span className="text-xs font-bold text-[#927027] uppercase tracking-wider block mt-1">Batching Supply Delays</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Dedicated continuous supply</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. SECTION 5: WHY CHOOSE ICON CONSTRUCTIONS (GSAP PINNED HORIZONTAL SCROLL - WHITE THEME) ─── */}
      <section
        ref={whyChooseSectionRef}
        className="w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white text-[#07132c] overflow-hidden relative border-t border-slate-200 flex flex-col justify-between pt-4 pb-4 sm:pt-6 sm:pb-6"
      >
        {/* Pinned Top Bar / Section Header */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 z-20 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-3 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#927027] uppercase tracking-widest block">
                PROVEN ENGINEERING INTEGRITY
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
                Why Choose Icon Constructions?
              </h2>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs text-slate-500 font-medium mr-2">
                Scroll or use controls to view all 6 pillars
              </span>
              <button
                type="button"
                onClick={handleWhyChoosePrev}
                aria-label="Previous Pillar"
                className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#07132c] hover:bg-[#07132c] hover:text-[#e5be6b] active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleWhyChooseNext}
                aria-label="Next Pillar"
                className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#07132c] hover:bg-[#07132c] hover:text-[#e5be6b] active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Track (Pins & Slides on Scroll) */}
        <div
          ref={whyChooseTrackContainerRef}
          className="w-full overflow-x-auto md:overflow-hidden z-10 my-auto py-2 scroll-smooth scrollbar-none touch-pan-x"
        >
          <div
            ref={whyChooseTrackRef}
            className="flex flex-nowrap items-stretch gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-12 w-max will-change-transform"
          >
            {/* Intro Overview Card */}
            <div className="w-[270px] sm:w-[340px] lg:w-[360px] h-[340px] sm:h-[370px] lg:h-[390px] p-5 sm:p-7 bg-slate-50 border border-slate-200 rounded-none shrink-0 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
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
                  className="w-[270px] sm:w-[340px] lg:w-[370px] h-[340px] sm:h-[370px] lg:h-[390px] p-5 sm:p-7 bg-white rounded-none border border-slate-200 hover:border-[#c5a059] hover:shadow-xl transition-all duration-300 shrink-0 flex flex-col justify-between shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-none bg-slate-100 text-[#07132c] flex items-center justify-center border border-slate-200 group-hover:bg-[#07132c] group-hover:text-[#e5be6b] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#927027] tracking-wider">{item.num}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#07132c] group-hover:text-[#927027] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm font-black text-[#07132c] block">{item.metric}</span>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider">{item.metricLabel}</span>
                    </div>
                    <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-500 group-hover:text-[#07132c] group-hover:bg-[#e5be6b] flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Closing CTA Card */}
            <div className="w-[270px] sm:w-[340px] lg:w-[360px] h-[340px] sm:h-[370px] lg:h-[390px] p-5 sm:p-7 bg-gradient-to-br from-[#07132c] via-[#0b1e3d] to-[#07132c] text-white rounded-none shrink-0 flex flex-col justify-between shadow-xl">
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

          {/* ── NEW SECTION C: REGIONAL INFRASTRUCTURE FOOTPRINT & KEY EXECUTION HUBS ─── */}
          <section className="w-full bg-white text-[#07132c] py-24 sm:py-32 relative border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div data-aos="fade-up" className="max-w-3xl space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#927027] text-xs font-bold tracking-widest uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#927027]" />
                  <span>Territorial Execution Presence</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
                  Regional Infrastructure Footprint &amp; Command Hubs
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                  With permanently stationed project managers, machinery yards, and testing depots throughout Northern Telangana and the Godavari River basin, Icon delivers rapid site mobilization across remote districts.
                </p>
              </div>

              {/* Hub Tabs */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 border-b border-slate-200 pb-4">
                {[
                  { name: 'Kumuram Bheem Asifabad & Sirpur Hub', count: '48+ Sites' },
                  { name: 'Mancherial & Godavari River Basin', count: '35+ Sites' },
                  { name: 'Ramagundam & Peddapalli Industrial Hub', count: '26+ Sites' },
                  { name: 'Northern Telangana Connectivity Network', count: '40+ Spans' }
                ].map((hub, hIdx) => {
                  const isActive = activeHubIndex === hIdx;
                  return (
                    <button
                      key={hIdx}
                      onClick={() => setActiveHubIndex(hIdx)}
                      className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                        isActive
                          ? 'bg-[#07132c] text-[#e5be6b] shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#07132c] border border-slate-200'
                      }`}
                    >
                      <span>{hub.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-[#c5a059] text-[#07132c] font-black' : 'bg-white text-slate-600 border border-slate-200'}`}>
                        {hub.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Hub Card Display */}
              {(() => {
                const hubs = [
                  {
                    name: 'Kumuram Bheem Asifabad & Sirpur Command Hub',
                    tagline: 'Flagship Remote Civic & River Bridge Infrastructure',
                    description: 'Our primary northern district operation overseeing multi-acre tribal welfare model residential schools, high-level river bridges, remote 33/11kV electrical sub-stations, and civil administrative complexes.',
                    stats: [
                      { label: 'Completed / Active Sites', val: '48+ Projects' },
                      { label: 'Major River Bridges', val: '10-Span Tonkini' },
                      { label: 'Built-Up Institutional Area', val: '4,20,000+ sq.ft' },
                      { label: 'Key Department Client', val: 'R&B, Tribal Welfare & TGSPDCL' }
                    ],
                    projects: [
                      'Tonkini 10-Span Heavy River Bridge (Penchikalpet)',
                      'KGBV Model Residential School Campus (Asifabad)',
                      'Sirpur Town Model High School Complex',
                      'Chilakapally & Goribkapelly Sub-Station Civil Infrastructure'
                    ],
                    image: '/icon_tonkini_10span_bridge.jpg',
                    imageCaption: 'Tonkini 10-span river bridge connecting remote mandals over perennial waters'
                  },
                  {
                    name: 'Mancherial & Godavari River Basin Operations',
                    tagline: 'High-Density Educational Corridors & Urban Drainage',
                    description: 'Directing multi-storey educational wings, municipal administrative headquarters, and high-capacity concrete drainage infrastructure across the industrial Godavari basin.',
                    stats: [
                      { label: 'Delivered Projects', val: '35+ Projects' },
                      { label: 'Educational Classrooms', val: '180+ Completed' },
                      { label: 'Arterial Paved Roads', val: '45+ Kilometers' },
                      { label: 'Key Department Client', val: 'Samagra Shiksha & Municipal Admin' }
                    ],
                    projects: [
                      'Mancherial Model High School Multi-Storey Wings',
                      'Sub-Divisional Revenue Headquarters (MRO Complex)',
                      'Heavy Reinforced Stormwater Canal Lining',
                      'Municipal CC Road Infrastructure Networks'
                    ],
                    image: '/icon_school_front_campus.jpg',
                    imageCaption: 'Mancherial Model High School multi-tier reinforced concrete structure'
                  },
                  {
                    name: 'Ramagundam & Peddapalli Industrial Hub',
                    tagline: 'Structural Staff Housing & Heavy Foundation Engineering',
                    description: 'Executing high-load residential quarters, reinforced concrete utility trenches, retaining walls, and monolithic multi-storey housing for industrial workforce sectors.',
                    stats: [
                      { label: 'Delivered Housing Blocks', val: '26+ Buildings' },
                      { label: 'Average Construction Grade', val: 'M35 / M40 Concrete' },
                      { label: 'Foundation Standard', val: 'Bored Piles in Hard Strata' },
                      { label: 'Key Department Client', val: 'Public Housing & Industrial Welfare' }
                    ],
                    projects: [
                      'Ramagundam Structural Residential Quarters',
                      'Township Staff Quarters & Dormitory Facilities',
                      'Heavy Retaining Walls & Earth Stabilization',
                      'Integrated Water Supply & Overhead Storage Towers'
                    ],
                    image: '/icon_ramagundam_structural.jpg',
                    imageCaption: 'Heavy multi-tier structural residential quarters at Ramagundam'
                  },
                  {
                    name: 'Northern Telangana Connectivity Network',
                    tagline: 'State Highway Bridges, Box Culverts & Causeways',
                    description: 'Specialized mobile bridge construction teams carrying heavy girder casting beds, pre-stressing equipment, and rapid flood-relief box culvert formwork across state roads.',
                    stats: [
                      { label: 'Total Bridge Spans', val: '40+ Spans Cast' },
                      { label: 'High-Level Crossings', val: '12 Major Bridges' },
                      { label: 'Box Culverts Executed', val: '85+ Installations' },
                      { label: 'Key Department Client', val: 'State Highways & PR Engineering' }
                    ],
                    projects: [
                      'Prestressed Concrete Girder High-Level Bridges',
                      'High-Flood Submersible Causeway Crossings',
                      'Multi-Cell Reinforced Concrete Box Culverts',
                      'All-Weather Heavy Industrial Access Corridors'
                    ],
                    image: '/icon_8span_river_bridge.jpg',
                    imageCaption: 'High-load arterial bridge superstructure engineered for extreme monsoon flood flows'
                  }
                ];

                const currentHub = hubs[activeHubIndex];

                return (
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-100 text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      
                      {/* Left: Hub Information */}
                      <div className="lg:col-span-7 space-y-6">
                        <div>
                          <span className="text-xs font-bold text-[#927027] uppercase tracking-wider block mb-1">
                            {currentHub.tagline}
                          </span>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black text-[#07132c] leading-tight">
                            {currentHub.name}
                          </h3>
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                          {currentHub.description}
                        </p>

                        {/* 4 Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 py-2">
                          {currentHub.stats.map((stat, sIdx) => (
                            <div key={sIdx} className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 shadow-sm">
                              <span className="text-lg sm:text-2xl font-sans font-black text-[#07132c] block">
                                {stat.val}
                              </span>
                              <span className="text-[11px] sm:text-xs text-slate-500 font-medium block mt-0.5">
                                {stat.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Signature Projects in this Hub */}
                        <div className="space-y-2.5">
                          <span className="text-xs font-bold text-[#07132c] uppercase tracking-wider block">
                            Signature Executions in this District:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currentHub.projects.map((proj, pIdx) => (
                              <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
                                <span>{proj}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => handleNavigate('ongoing')}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#07132c] text-[#e5be6b] hover:bg-[#0c1f44] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                          >
                            <span>Inspect Active Sites in this Hub</span>
                            <ArrowRight className="w-4 h-4 text-[#e5be6b]" />
                          </button>
                          <button
                            onClick={() => handleNavigate('projects')}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-sm"
                          >
                            <span>View All Completed Works</span>
                            <ExternalLink className="w-4 h-4 text-[#927027]" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Real Visual */}
                      <div className="lg:col-span-5 relative">
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] shadow-lg group">
                          <img
                            src={currentHub.image}
                            alt={currentHub.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          <div className="absolute bottom-4 left-4 right-4 text-xs text-white bg-slate-900/80 backdrop-blur-md p-3 rounded-lg border border-white/10 shadow-lg">
                            <span className="font-semibold text-[#e5be6b] block mb-0.5">District Landmark Execution</span>
                            <p className="text-[11px] text-slate-300 font-normal">{currentHub.imageCaption}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

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
                  <button onClick={() => handleNavigate('ongoing')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium flex items-center gap-1.5">
                    <span>Ongoing Projects (Live Sites)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('expertise')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Expertise &amp; Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('careers')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 text-inherit font-medium">
                    Careers (11 Openings)
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

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const name = e.target.elements[0]?.value || '';
              const email = e.target.elements[1]?.value || '';
              const overview = e.target.elements[2]?.value || '';
              const waText = 
`*NEW CAPITAL PROPOSAL INQUIRY - ICON CONSTRUCTIONS*
----------------------------------------
*Name:* ${name || 'Not specified'}
*Email:* ${email || 'Not specified'}
*Overview:* ${overview || 'General technical consultation requested.'}
----------------------------------------
_Sent from Icon Constructions Website_`;
              const waUrl = `https://api.whatsapp.com/send?phone=919966180827&text=${encodeURIComponent(waText)}`;
              window.open(waUrl, '_blank', 'noopener,noreferrer');
              alert('Inquiry formatted and dispatched to WhatsApp (+91 9966180827)!'); 
              setInquiryModalOpen(false); 
            }} className="space-y-4">
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

              <button type="submit" className="w-full acc-btn acc-btn--gold py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp (+91 9966180827)</span>
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
