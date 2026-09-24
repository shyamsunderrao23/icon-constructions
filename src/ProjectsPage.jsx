import React, { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MapPin, ArrowLeft, Calendar, Building2, CheckCircle2,
  ChevronDown, ChevronRight, ArrowRight, ArrowUpRight, Search, X, Sliders, Menu,
  Eye, Filter, Sparkles, Phone, Mail, ShieldCheck, Globe
} from 'lucide-react';

const allProjectsData = [
  // ── OFFICIAL 25 CLIENT BENCHMARK PROJECTS (EXACT S.NO. 1 TO 25) ──
  {
    id: 1,
    officialSno: "01",
    title: "MRO Office Building – 2008",
    alphabetLetter: "M",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_tahasildar_mro.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Mandal Revenue Administrative Headquarters",
    year: "2008",
    status: "Completed",
    description: "Official Mandal Revenue Office (MRO) headquarters engineered for public administration, revenue registry, citizen service halls, and permanent government records."
  },
  {
    id: 2,
    officialSno: "02",
    title: "ST Hostel Building – 2009",
    alphabetLetter: "S",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_hostel_building.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "ST Student Residential Hostel & Gated Campus",
    year: "2009",
    status: "Completed",
    description: "Dedicated Scheduled Tribe Welfare student residential hostel facility providing secure housing, security perimeter gates, study rooms, and hygienic cafeteria."
  },
  {
    id: 3,
    officialSno: "03",
    title: "High School Building – 2010",
    alphabetLetter: "H",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_school_assembly.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Multi-Story Academic High School & Assembly",
    year: "2010",
    status: "Completed",
    description: "Multi-story government high school academic building featuring modern laboratories, central assembly courtyard, ventilated lecture halls, and all-weather exterior weatherproofing."
  },
  {
    id: 4,
    officialSno: "04",
    title: "Culverts – 10 Nos.",
    alphabetLetter: "C",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_4cell_box_culvert.jpg",
    location: "Kumuram Bheem Asifabad District, Telangana",
    scale: "10 Reinforced Concrete Box Culverts Network",
    year: "Completed",
    status: "Completed",
    description: "Strategic hydraulic engineering consisting of 10 heavy reinforced box culverts constructed to withstand torrential monsoon flash floods across the district highway network."
  },
  {
    id: 5,
    officialSno: "05",
    title: "Boys Residential School – 100 Columns",
    alphabetLetter: "B",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_school_campus.jpg",
    location: "Near Sirpur Police Station, Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "100-Column Heavy RCC Structural Frame",
    year: "Completed",
    status: "Completed",
    description: "High-capacity institutional campus featuring a massive 100-column concrete frame, academic lecture halls, library wings, and sports grounds serving tribal youth."
  },
  {
    id: 6,
    officialSno: "06",
    title: "Girls Hostel Building",
    alphabetLetter: "G",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_dining_hall.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Residential Hostels & Modern Dining Mess",
    year: "Completed",
    status: "Completed",
    description: "State-of-the-art government residential campus for girls, providing secure lodging, study lounges, modern dining hall, and hygiene sanitation systems."
  },
  {
    id: 7,
    officialSno: "07",
    title: "Dubbaguda – 3 Span Bridge",
    alphabetLetter: "D",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_river_bridge_concrete.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "3-Span Reinforced Concrete River Bridge",
    year: "Completed",
    status: "Completed",
    description: "3-span reinforced concrete river crossing engineered with heavy submerged circular pier bents and durable crash barriers over flowing river beds."
  },
  {
    id: 8,
    officialSno: "08",
    title: "Tonkini – 10 Span Bridge",
    alphabetLetter: "T",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_tonkini_10span_bridge.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "10-Span Major Pre-Stressed Concrete Bridge",
    year: "Completed",
    status: "Completed",
    description: "Critical regional arterial bridge spanning 10 high-strength prestressed concrete spans over river Tonkini, built on deep pile foundations for all-weather connectivity."
  },
  {
    id: 9,
    officialSno: "09",
    title: "Navegaon – 2 Span Bridge",
    alphabetLetter: "N",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_2cell_box_bridge.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "2-Span Reinforced Concrete Highway Bridge",
    year: "Completed",
    status: "Completed",
    description: "2-span heavy-duty reinforced concrete highway bridge with stone masonry retaining wing walls and high-volume water passage."
  },
  {
    id: 10,
    officialSno: "10",
    title: "Pile Foundation & Jacketing – Gudem Bridge",
    alphabetLetter: "P",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_pier_jacketing_bridge.jpg",
    location: "Gudem, Telangana",
    scale: "Deep Bored Piles & Pier Jacketing Retrofitting",
    year: "Completed",
    status: "Completed",
    description: "Specialized hydraulic substructure retrofitting, circular RCC pier jacketing with heavy reinforcement cages, and deep underwater pile foundation casting in river currents."
  },
  {
    id: 11,
    officialSno: "11",
    title: "Check Dam",
    alphabetLetter: "C",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_overflow_check_dam.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Gravity Concrete Overflow Check Dam & Spillway",
    year: "Completed",
    status: "Completed",
    description: "Stream water conservation check dam engineered with reinforced concrete overflow spillway, stone apron riprap, and groundwater recharge basins."
  },
  {
    id: 12,
    officialSno: "12",
    title: "Rasply – 7 Span Bridge",
    alphabetLetter: "R",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_8span_river_bridge.jpg",
    location: "Kumuram Bheem Asifabad District, Telangana",
    scale: "7-Span High-Capacity River Bridge",
    year: "Completed",
    status: "Completed",
    description: "7-span reinforced concrete river bridge engineered on heavy submerged pier bents, providing high-load connectivity over wide regional riverbeds."
  },
  {
    id: 13,
    officialSno: "13",
    title: "Sirpur – 10 Span Bridge",
    alphabetLetter: "S",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_tonkini_10span_bridge.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "10-Span High-Level Major River Crossing",
    year: "Completed",
    status: "Completed",
    description: "Monumental 10-span high-level major river bridge constructed with pre-stressed concrete girders and heavy load-bearing abutments across Sirpur river basin."
  },
  {
    id: 14,
    officialSno: "14",
    title: "Bridge with 6 Spans – Kondapally",
    alphabetLetter: "B",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_girder_channel_bridge.jpg",
    location: "Kondapally, Kumuram Bheem Asifabad District, Telangana",
    scale: "6-Span Composite Girder Bridge",
    year: "Completed",
    status: "Completed",
    description: "6-span composite steel and concrete bridge with heavy stone-pitched embankment retaining walls, riprap scour protection, and heavy pier substructures."
  },
  {
    id: 15,
    officialSno: "15",
    title: "Jyotiba Phule Building",
    alphabetLetter: "J",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_mjp_residential_school.jpg",
    location: "Kagaznagar, Kumuram Bheem Asifabad District, Telangana",
    scale: "Three-Story Model Residential Campus",
    year: "Completed",
    status: "Completed",
    description: "Mahatma Jyotiba Phule (MJP) three-story government residential educational complex with entrance portico, academic lecture wings, science laboratories, and student lodging."
  },
  {
    id: 16,
    officialSno: "16",
    title: "Minority Residential Building",
    alphabetLetter: "M",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_minority_residential_school.jpg",
    location: "Balagalla, Kumuram Bheem Asifabad District, Telangana",
    scale: "Three-Story Multi-Wing Residential Campus",
    year: "Completed",
    status: "Completed",
    description: "Telangana Minority Residential Educational Society institutional campus with entrance portico, boundary enclosure, student classrooms, laboratories, and hostel wings."
  },
  {
    id: 17,
    officialSno: "17",
    title: "IIT Sheds",
    alphabetLetter: "I",
    category: "industrial",
    categoryName: "Industrial Sheds & Steel",
    image: "/icon_industrial_steel_sheds.jpg",
    location: "Kumuram Bheem Asifabad District, Telangana",
    scale: "Pre-Engineered Structural Steel Workshop Sheds",
    year: "Completed",
    status: "Completed",
    description: "Heavy-duty structural steel workshop sheds featuring multi-bay open entries, overhead gantry crane tracks, concrete aprons, and industrial machinery bays."
  },
  {
    id: 18,
    officialSno: "18",
    title: "Three-Floor Buildings – 16 Nos.",
    alphabetLetter: "T",
    category: "residential",
    categoryName: "Government & Civic / Residential",
    image: "/icon_staff_quarters_apartments.jpg",
    location: "Ramagundam, Telangana",
    scale: "16 Blocks of G+2 Multi-Story Residential Quarters",
    year: "Completed",
    status: "Completed",
    description: "16 blocks of three-floor (G+2) residential staff apartments featuring external stairwells, private balconies, gated boundary walls, and durable RCC construction."
  },
  {
    id: 19,
    officialSno: "19",
    title: "Integrated Market Buildings – 5 Nos.",
    alphabetLetter: "I",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_administrative_block.jpg",
    location: "Mancherial, Mancherial District, Telangana",
    scale: "5 Municipal Integrated Market Complexes",
    year: "Completed",
    status: "Completed",
    description: "5 comprehensive integrated vegetable and meat municipal wholesale market facilities featuring segregated zones, underground drainage systems, and loading bays."
  },
  {
    id: 20,
    officialSno: "20",
    title: "Kasturba KGBV Building",
    alphabetLetter: "K",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_kgbv_residential_campus.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Kasturba Gandhi Balika Vidyalaya Residential Complex",
    year: "Completed",
    status: "Completed",
    description: "KGBV residential school and dormitory complex with architectural detailing, paved courtyard approaches, student recreation grounds, and high-security perimeter."
  },
  {
    id: 21,
    officialSno: "21",
    title: "Box Culverts – 20 Nos.",
    alphabetLetter: "B",
    category: "infrastructure",
    categoryName: "Hydraulic Infrastructure",
    image: "/icon_5cell_box_culvert.jpg",
    location: "Gadchiroli, Maharashtra",
    scale: "20 High-Discharge Reinforced Box Culverts",
    year: "Completed",
    status: "Completed",
    description: "Network of 20 high-discharge reinforced concrete box culvert bridge structures designed for heavy flood flows, all-weather highway traffic clearance, and anti-scour stone pitching."
  },
  {
    id: 22,
    officialSno: "22",
    title: "Box Bridges – 25 Nos.",
    alphabetLetter: "B",
    category: "infrastructure",
    categoryName: "Bridges & Substructures",
    image: "/icon_4cell_box_culvert.jpg",
    location: "Porsa, Maharashtra",
    scale: "25 Reinforced Concrete Highway Box Bridges",
    year: "Completed",
    status: "Completed",
    description: "25 reinforced concrete box bridges engineered for highway cross-drainage, extreme hydraulic discharge, and long-term structural durability across regional corridors."
  },
  {
    id: 23,
    officialSno: "23",
    title: "Forest Office Building",
    alphabetLetter: "F",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_forest_range_office.jpg",
    location: "Penchikalpet, Kumuram Bheem Asifabad District, Telangana",
    scale: "Forest Range Administrative Office Headquarters",
    year: "Completed",
    status: "Completed",
    description: "Official administrative headquarters and forest range office for the Telangana Forest Department (అటవీ రేంజ్ అధికారి కార్యాలయం), engineered with public service desks and security markers."
  },
  {
    id: 24,
    officialSno: "24",
    title: "Girls School Buildings – 2 Nos.",
    alphabetLetter: "G",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_tswrdc_girls_arch.jpg",
    location: "Kumuram Bheem Asifabad District, Telangana",
    scale: "2 Signature Institutional Academic Wings & Grand Porticos",
    year: "Completed",
    status: "Completed",
    description: "2 government institutional girls school academic complexes engineered with monumental entrance arches, ventilated lecture halls, science labs, and secure boundary perimeter."
  },
  {
    id: 25,
    officialSno: "25",
    title: "Agriculture Building",
    alphabetLetter: "A",
    category: "civic",
    categoryName: "Government & Civic",
    image: "/icon_agriculture_dept_mancherial.jpg",
    location: "Mancherial, Telangana",
    scale: "Agriculture Department Administrative Headquarters",
    year: "Completed",
    status: "Completed",
    description: "Official district agricultural department headquarters complex (వ్యవసాయశాఖ కార్యాలయం) featuring farmer service halls, administrative chambers, and security perimeter."
  },

  // ── ADDITIONAL SIGNATURE LANDMARK ACADEMIC & CIVIC EXTENSIONS ──
  {
    id: 26,
    title: "TSWR Residential School & Junior College (Boys)",
    alphabetLetter: "T",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_tswrs_campus.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "TSWRS/JC(B) Institutional Campus",
    year: "2012",
    status: "Completed",
    description: "Telangana Social Welfare Residential School and Junior College for Boys campus with grand entrance portico, administrative chambers, and student academic wings."
  },
  {
    id: 27,
    title: "Academic Classroom Corridor & Art Education Wing",
    alphabetLetter: "A",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_corridor_academic.jpg",
    location: "Sirpur Town Educational Complex, Telangana",
    scale: "Dual-Wing Academic Corridor & Art Department",
    year: "Completed",
    status: "Completed",
    description: "Spacious tiled institutional classroom corridors with tri-color pillars, natural ventilation, art education department, and landscaped inner courtyard."
  },
  {
    id: 28,
    title: "School Main Academic Quadrangle & Campus Facade",
    alphabetLetter: "S",
    category: "educational",
    categoryName: "Educational & Campuses",
    image: "/icon_school_front_campus.jpg",
    location: "Sirpur Town, Kumuram Bheem Asifabad District, Telangana",
    scale: "Full-Length Institutional Academic Wing",
    year: "Completed",
    status: "Completed",
    description: "Long-span institutional school facade with green perimeter canopy, student gathering grounds, and integrated administrative chambers."
  },
  {
    id: 29,
    title: "New Dormitory Block & Residential Facility",
    alphabetLetter: "N",
    category: "educational",
    categoryName: "Educational & Hostels",
    image: "/icon_new_dormitory_block.jpg",
    location: "Kumuram Bheem Asifabad District, Telangana",
    scale: "Reinforced RCC Dormitory Wing",
    year: "Completed",
    status: "Completed",
    description: "Modern single-story residential dormitory block engineered with weatherproofing, cross-ventilation, student living quarters, and landscaped approach."
  },
  {
    id: 30,
    title: "Campus Central Avenue & Infrastructure Pathway",
    alphabetLetter: "C",
    category: "infrastructure",
    categoryName: "Infrastructure & Campuses",
    image: "/icon_campus_avenue.jpg",
    location: "Sirpur Town Regional Campus, Telangana",
    scale: "Paved Internal Arterial Road & Campus Avenue",
    year: "Completed",
    status: "Completed",
    description: "Heavy-duty paved arterial roadway connecting institutional wings, student residential blocks, and lush green landscaped grounds."
  }
];

const alphabetList = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export default function ProjectsPage({ onNavigate, onBack, initialDiscipline = 'ALL' }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedDiscipline, setSelectedDiscipline] = useState(initialDiscipline);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  const navigate = (page, params) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else if (onBack) {
      onBack();
    }
  };

  useEffect(() => {
    if (initialDiscipline) {
      setSelectedDiscipline(initialDiscipline);
    }
  }, [initialDiscipline]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 30 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter projects based on Discipline, Search Query and Alphabet Letter
  const filteredProjects = useMemo(() => {
    return allProjectsData.filter((project) => {
      // 1. Discipline Filter
      if (selectedDiscipline && selectedDiscipline !== 'ALL') {
        const d = selectedDiscipline.toLowerCase();
        const cat = (project.categoryName || '').toLowerCase();
        const pCat = (project.category || '').toLowerCase();
        
        let matchesDiscipline = false;
        if (d.includes('bridge')) {
          matchesDiscipline = cat.includes('bridge') || pCat.includes('bridge') || pCat.includes('infra');
        } else if (d.includes('educat') || d.includes('hostel') || d.includes('school') || d.includes('campus')) {
          matchesDiscipline = cat.includes('educat') || cat.includes('hostel') || cat.includes('campus') || pCat.includes('educat');
        } else if (d.includes('civic') || d.includes('gov') || d.includes('mro')) {
          matchesDiscipline = cat.includes('gov') || cat.includes('civic') || pCat.includes('civic');
        } else if (d.includes('hydraul') || d.includes('water') || d.includes('dam') || d.includes('culvert')) {
          matchesDiscipline = cat.includes('hydraul') || cat.includes('culvert') || cat.includes('dam');
        } else if (d.includes('industr') || d.includes('steel') || d.includes('shed')) {
          matchesDiscipline = cat.includes('industr') || cat.includes('steel') || cat.includes('shed') || pCat.includes('industr');
        } else {
          matchesDiscipline = cat.includes(d) || pCat.includes(d);
        }

        if (!matchesDiscipline) return false;
      }

      // 2. Alphabet Filter (checks first letter of title)
      if (selectedLetter !== 'ALL') {
        const firstLetter = project.title.trim().charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) {
          return false;
        }
      }

      // 3. Search Query Filter
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
  }, [searchQuery, selectedLetter, selectedDiscipline]);

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

      {/* ── HEADER / NAVBAR (Clean White Theme) ─── */}
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

      {/* ── 1. CENTERED HERO & SEARCH (z-30 ensures floating dropdown is always on top) ─── */}
      <section className="relative z-30 w-full overflow-visible bg-white pt-8 pb-6 px-2 sm:px-4 lg:px-8 border-b border-slate-200">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto text-center space-y-4">

          {/* Centered Main Title */}
          <h1 data-aos="fade-up" className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#07132c] tracking-tight leading-tight">
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

            {/* ── 2.5 DISCIPLINE CATEGORY FILTER (RESPONSIVE MOBILE SELECTOR + DESKTOP TABS) ─── */}
            <div className="pt-1 w-full">
              
              {/* Custom Filter Dropdown ONLY for Responsive / Mobile (< md) */}
              <div className="md:hidden w-full text-left relative z-40">
                <div className="flex items-center justify-between px-1 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#07132c] flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Filter by Sector:</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#c5a059] bg-[#07132c] px-2.5 py-0.5 border border-[#c5a059]/40">
                    {filteredProjects.length} Projects
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
                      {selectedDiscipline && selectedDiscipline !== 'ALL'
                        ? selectedDiscipline
                        : 'All Projects (Complete Portfolio)'}
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

                {/* Custom Dropdown Floating Overlay Menu (Overlaps Project List Smoothly without Moving Content) */}
                <div
                  className={`absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border-2 border-[#c5a059] shadow-2xl divide-y divide-slate-100 transition-all duration-300 origin-top ease-out ${
                    mobileDropdownOpen
                      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                      : 'opacity-0 -translate-y-2 scale-95 pointer-events-none invisible'
                  }`}
                >
                  {[
                    { id: 'ALL', label: 'All Projects (Complete Portfolio)' },
                    { id: 'Bridges & Substructures', label: 'Bridges & Substructures' },
                    { id: 'Educational & Hostels', label: 'Educational & Hostels' },
                    { id: 'Government & Civic', label: 'Government & Civic' },
                    { id: 'Hydraulic Infrastructure', label: 'Hydraulic Infrastructure' },
                    { id: 'Industrial Sheds & Steel', label: 'Industrial & Steel' }
                  ].map((item) => {
                    const isSelected = selectedDiscipline === item.id || (item.id === 'ALL' && (!selectedDiscipline || selectedDiscipline === 'ALL'));
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedDiscipline(item.id);
                          setSelectedLetter('ALL');
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
                  {[
                    { id: 'ALL', label: 'All Projects' },
                    { id: 'Bridges & Substructures', label: 'Bridges & Substructures' },
                    { id: 'Educational & Hostels', label: 'Educational & Hostels' },
                    { id: 'Government & Civic', label: 'Government & Civic' },
                    { id: 'Hydraulic Infrastructure', label: 'Hydraulic Infrastructure' },
                    { id: 'Industrial Sheds & Steel', label: 'Industrial & Steel' }
                  ].map((tab) => {
                    const isActive = selectedDiscipline === tab.id || (tab.id === 'ALL' && (!selectedDiscipline || selectedDiscipline === 'ALL'));
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedDiscipline(tab.id);
                          setSelectedLetter('ALL');
                        }}
                        className={`flex-1 h-[44px] sm:h-[46px] px-3 sm:px-4 rounded-none text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer border-r border-slate-200 last:border-r-0 whitespace-nowrap ${
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

            {/* ── 3. A TO Z ALPHABETICAL FILTER BAR ─── */}
            <div className="pt-1 w-full">
              <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-stretch justify-start w-full min-w-[750px] sm:min-w-[850px] md:min-w-[950px] border border-slate-200 rounded-none overflow-hidden bg-white shadow-xs">
                  {alphabetList.map((letter) => {
                    const isActive = selectedLetter === letter;
                    const hasItems = letter === 'ALL' || availableLetters.has(letter);

                    return (
                      <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`${
                          letter === 'ALL' ? 'min-w-[54px] sm:min-w-[64px] flex-[1.4]' : 'min-w-[28px] sm:min-w-[36px] flex-1'
                        } h-[42px] sm:h-[48px] px-1 rounded-none text-xs sm:text-sm md:text-base font-normal transition-all duration-150 flex items-center justify-center cursor-pointer border-r border-slate-200 last:border-r-0 ${
                          isActive
                            ? 'bg-[#07132c] text-[#e5be6b] font-black border-2 border-[#c5a059] shadow-sm relative z-10'
                            : hasItems
                            ? 'bg-white text-slate-700 hover:bg-slate-50 hover:text-[#07132c]'
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

            {/* Active Discipline Filter Notification Banner */}
            {selectedDiscipline && selectedDiscipline !== 'ALL' && (
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-amber-50/80 border border-[#c5a059]/40 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-600 font-medium">Discipline Filter:</span>
                  <span className="font-black text-[#07132c] bg-white px-2.5 py-0.5 border border-[#c5a059]/50 shadow-xs">
                    {selectedDiscipline}
                  </span>
                  <span className="text-slate-600">({filteredProjects.length} projects displayed)</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedDiscipline('ALL');
                    setSelectedLetter('ALL');
                  }}
                  className="font-bold text-[#07132c] hover:text-[#c5a059] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>Reset Discipline</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── 4. FULL-BLEED EDGE-TO-EDGE 0-BORDER-RADIUS 0-GAP GRID (WHITE BACKGROUND) ─── */}
      <div className="w-full px-0 py-0 overflow-hidden bg-white relative z-10">

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full px-0 bg-white">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProjectModal(project)}
                className="relative h-[440px] sm:h-[520px] lg:h-[600px] rounded-none overflow-hidden group shadow-none border-0 transition-all duration-500 bg-white cursor-pointer"
              >
                {/* Full Background Image (No Shadow Layer) */}
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = "/icon_mro_headquarters.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                  {project.officialSno && (
                    <span className="px-3 py-2 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black tracking-wider uppercase shadow-md">
                      #{project.officialSno}
                    </span>
                  )}
                  <span className="px-4 py-2 rounded-none bg-[#07132c]/90 text-[#e5be6b] text-xs font-black uppercase tracking-widest border border-[#c5a059]/40 backdrop-blur-md">
                    {project.categoryName}
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-10 bg-black/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold text-white border border-white/20">
                  {project.year}
                </div>

                {/* Bottom Overlay Info in crisp bottom container */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 z-10 space-y-2">
                  {/* Location with Pin */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#e5be6b] font-extrabold">
                    <MapPin className="w-4 h-4 shrink-0 text-[#c5a059]" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  {/* Main Title */}
                  <div className="flex items-center gap-6">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-extrabold text-white leading-snug group-hover:text-[#f3d38c] transition-colors">
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
              
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-none bg-black/70 text-white hover:bg-[#c5a059] hover:text-[#07132c] transition-colors cursor-pointer border border-white/20"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 inset-x-0 p-5 bg-[#07132c]/90 backdrop-blur-md border-t border-[#c5a059]/40 text-white space-y-1.5">
                <div className="flex items-center gap-2">
                  {selectedProjectModal.officialSno && (
                    <span className="px-3 py-1 rounded-none bg-white text-[#07132c] text-xs font-black tracking-wider uppercase">
                      Official Register #{selectedProjectModal.officialSno}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-none bg-[#c5a059] text-[#07132c] text-xs font-black uppercase tracking-widest">
                    {selectedProjectModal.categoryName}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-black text-white mt-1 leading-tight">
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
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-white">
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
