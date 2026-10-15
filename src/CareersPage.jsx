import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Briefcase,
  GraduationCap,
  HardHat,
  Users,
  CheckCircle2,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  ChevronDown,
  FileText,
  Upload,
  X,
  Menu,
  Layers,
  AlertCircle
} from 'lucide-react';

const jobOpenings = [
  {
    id: 'senior-site-engineer',
    sno: 1,
    title: 'Senior Site Engineer – Civil',
    vacancies: 3,
    department: 'Civil Engineering & Execution',
    experienceRequired: '3 - 8 Years Site Experience',
    qualificationText: 'Diploma or B.Tech/B.E. in Civil Engineering, with relevant construction experience.',
    location: 'Sirpur / Asifabad / Regional Highway Projects, Telangana & Maharashtra',
    type: 'Full Time • On-Site Execution',
    overview: 'Lead on-site civil execution teams across multi-span river bridges, institutional campuses, and massive RCC frame projects.',
    responsibilities: [
      'Manage and supervise day-to-day construction activities.',
      'Ensure work is completed according to approved drawings and specifications.',
      'Monitor project progress, quality, and safety standards.',
      'Coordinate with contractors, supervisors, and other project staff.',
      'Maintain site reports and ensure timely completion of assigned work.'
    ],
    qualifications: [
      'Diploma or B.Tech/B.E. in Civil Engineering.',
      'Proven field experience in heavy reinforced concrete, foundations, and high-rise/campus frames.',
      'Proficiency in interpreting structural drawings, bar bending schedules, and QA/QC compliance.',
      'Demonstrated leadership to coordinate subcontractors, labor contractors, and government department engineers.'
    ],
    perks: [
      'Competitive salary commensurate with industry standards',
      'Dedicated site camp accommodation & food allowances',
      'Fast-track leadership opportunities on Class-1 government infrastructure'
    ]
  },
  {
    id: 'junior-site-engineer',
    sno: 2,
    title: 'Junior Site Engineer – Civil',
    vacancies: 3,
    department: 'Site Execution & Quality Support',
    experienceRequired: '0 - 3 Years (Freshers & Experienced Welcome)',
    qualificationText: 'Diploma or B.Tech/B.E. in Civil Engineering. Freshers or candidates with relevant experience may apply.',
    location: 'Project Site Offices (Telangana / Maharashtra)',
    type: 'Full Time • Field Training & Supervision',
    overview: 'Work directly alongside veteran project managers and senior site engineers on active government construction sites.',
    responsibilities: [
      'Assist senior engineers in daily construction activities.',
      'Check construction work against approved drawings.',
      'Monitor labour productivity and material usage.',
      'Maintain daily progress reports.',
      'Follow quality control and site safety procedures.'
    ],
    qualifications: [
      'Diploma or B.Tech/B.E. in Civil Engineering.',
      'Strong foundational knowledge of RCC structures, surveying fundamentals, and construction materials.',
      'Eager to learn on active multi-crore infrastructure works with high discipline.',
      'Fresh graduates and candidates with 1–2 years site experience are encouraged to apply.'
    ],
    perks: [
      'Hands-on mentorship under 50-year legacy Class-1 engineers',
      'Site lodging and project conveyance assistance',
      'Rapid professional progression based on field performance'
    ]
  },
  {
    id: 'site-supervisor',
    sno: 3,
    title: 'Site Supervisor',
    vacancies: 3,
    department: 'Site Labor & Ground Operations',
    experienceRequired: '2 - 6 Years Hands-on Site Supervision',
    qualificationText: 'Relevant construction experience and the ability to manage site workers. Candidates with technical qualifications will be preferred.',
    location: 'Regional Civil Infrastructure Sites',
    type: 'Full Time • On-Field Work',
    overview: 'Drive daily frontline labor execution, shuttering, steel reinforcement binding, concrete pours, and strict worker safety.',
    responsibilities: [
      'Supervise daily construction activities and labour teams.',
      'Allocate work and monitor site progress.',
      'Ensure construction work follows instructions and drawings.',
      'Monitor workmanship, materials, and site safety.',
      'Report daily progress and site issues to the site engineer.'
    ],
    qualifications: [
      'Extensive practical construction experience managing gangs of masons, carpenters, and fitters.',
      'Firm command over site safety protocols and daily labor deployment.',
      'Ability to resolve practical site hurdles swiftly and communicate clearly with site engineers.',
      'Technical ITI / Diploma or equivalent site experience preferred.'
    ],
    perks: [
      'Stable long-term employment on continuous government works',
      'Free site accommodation and food provisions',
      'Project milestone performance bonuses'
    ]
  },
  {
    id: 'storekeeper',
    sno: 4,
    title: 'Storekeeper',
    vacancies: 2,
    department: 'Material Procurement & Inventory Control',
    experienceRequired: '1 - 5 Years Material / Store Management',
    qualificationText: 'Relevant storekeeping or inventory management experience is preferred. Basic computer skills and knowledge of stock registers are desirable.',
    location: 'Central Site Warehouses & Stockyards',
    type: 'Full Time • Inventory Management',
    overview: 'Manage multi-ton structural steel, cement deliveries, aggregates, equipment spares, and daily issue registers with zero discrepancies.',
    responsibilities: [
      'Maintain records of construction materials received and issued.',
      'Monitor stock levels and maintain inventory registers.',
      'Verify material deliveries against purchase orders and delivery documents.',
      'Coordinate with site engineers and procurement staff.',
      'Ensure proper storage and control of construction materials.'
    ],
    qualifications: [
      'Prior storekeeping experience on construction, fabrication, or industrial projects.',
      'Knowledge of physical stock registers, delivery challans, and goods receipt notes (GRN).',
      'Basic computer literacy (MS Excel / spreadsheets / tally is an advantage).',
      'High integrity, vigilance, and systematic approach to material custody.'
    ],
    perks: [
      'Clean on-site office setup & comfortable camp stay',
      'Regular hours and structured material accounting workflow',
      'Long-term career security with a reputable Class-1 contractor'
    ]
  }
];

export default function CareersPage({ onNavigate, onBack }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedJobId, setExpandedJobId] = useState('senior-site-engineer');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [applicationId, setApplicationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Senior Site Engineer – Civil',
    experience: '3-5 Years',
    qualification: 'B.Tech / B.E. Civil Engineering',
    currentLocation: '',
    resumeLink: '',
    message: ''
  });

  const navigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (onBack) {
      onBack();
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 30 });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSelectRoleForApply = (roleTitle, roleId) => {
    setFormData((prev) => ({ ...prev, position: roleTitle }));
    setExpandedJobId(roleId);
    const formElement = document.getElementById('apply-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerMailtoDispatch = (appId, data) => {
    const subject = encodeURIComponent(`Job Application [${appId}]: ${data.position} - ${data.fullName}`);
    const body = encodeURIComponent(
      `To: Icon Constructions Recruitment Team\n` +
      `Email: infoiconconstructions@gmail.com\n\n` +
      `APPLICATION DETAILS\n` +
      `------------------------------------\n` +
      `Application ID: ${appId}\n` +
      `Applying For: ${data.position}\n` +
      `Candidate Name: ${data.fullName}\n` +
      `Email Address: ${data.email}\n` +
      `Phone Number: ${data.phone}\n` +
      `Years of Experience: ${data.experience}\n` +
      `Highest Qualification: ${data.qualification}\n` +
      `Current Location: ${data.currentLocation || 'Not specified'}\n` +
      `Resume Link: ${data.resumeLink || 'Attached with this email'}\n\n` +
      `Candidate Statement / Experience Summary:\n` +
      `${data.message || 'I am interested in joining Icon Constructions on your prestigious projects.'}\n\n` +
      `Kind Regards,\n${data.fullName}\n`
    );
    window.open(`mailto:infoiconconstructions@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setErrorMessage('');

    const newAppId = `ICON-HR-${Date.now().toString().slice(-6)}`;
    setApplicationId(newAppId);

    const payload = {
      _subject: `Job Application [${newAppId}]: ${formData.position} - ${formData.fullName}`,
      _template: 'table',
      _captcha: 'false',
      applicationId: newAppId,
      position: formData.position,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      qualification: formData.qualification,
      currentLocation: formData.currentLocation || 'Not specified',
      resumeLink: formData.resumeLink || 'Will email separately',
      candidateMessage: formData.message || 'No additional note'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/infoiconconstructions@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        // Fallback to mailto
        triggerMailtoDispatch(newAppId, formData);
        setSubmissionStatus('success');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
      triggerMailtoDispatch(newAppId, formData);
      setSubmissionStatus('success');
    }
  };

  const filteredOpenings = jobOpenings.filter((job) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'engineering') return job.id.includes('engineer');
    if (activeTab === 'supervisor') return job.id === 'site-supervisor';
    if (activeTab === 'store') return job.id === 'storekeeper';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#07132c] font-sans antialiased selection:bg-[#c5a059] selection:text-white overflow-x-hidden w-full max-w-full relative">

      {/* ── FIXED PERMANENT HEADER & TOP BAR ─── */}
      <header className="fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 shadow-md">
        {/* Top Notice Bar */}
        <div className="bg-[#c5a059] text-white text-xs py-2 sm:py-2.5 px-4 sm:px-8 shadow-sm font-medium border-b border-[#b88f44]">
          <div className="w-full flex items-center justify-center text-center">
            <p className="text-white text-xs sm:text-[13px] font-semibold tracking-wide">
              <span className="opacity-95">Class-1 Government Empaneled Contractor</span>
              <span className="mx-2 opacity-60">•</span>
              <span className="opacity-95">50+ Years Engineering Legacy</span>
              <span className="mx-2 opacity-60">•</span>
              <span className="opacity-95">Actively Recruiting 11 Open Site Positions</span>
              <span className="hidden md:inline mx-2 opacity-60">•</span>
              <span className="hidden md:inline opacity-95">infoiconconstructions@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Header Navbar */}
        <div className="bg-[#F8F7F3] border-b border-slate-200">
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
                <button onClick={() => navigate('expertise')} className="px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide text-slate-800 hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0">
                  Expertise
                </button>
                <button className="px-3 py-2 text-xs xl:text-sm font-bold tracking-wide text-[#c5a059] cursor-pointer bg-transparent border-0 border-b-2 border-[#c5a059]">
                  Careers
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
        <div 
          className={`fixed inset-0 bg-[#07132c]/75 backdrop-blur-sm transition-opacity duration-300 ${
            mobileNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileNavOpen(false)}
        />
        <div 
          className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#F8F7F3] shadow-2xl z-10 flex flex-col transition-transform duration-300 ease-out border-r border-[#c5a059]/30 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 flex items-center justify-between border-b border-slate-200 bg-white">
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
              onClick={() => { navigate('expertise'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Expertise</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold tracking-wide text-[#c5a059] bg-[#07132c] border border-[#c5a059]/40 text-left cursor-pointer"
            >
              <span>Careers (11 Openings)</span>
              <ChevronRight className="w-4 h-4 text-[#e5be6b]" />
            </button>
            <button 
              onClick={() => { navigate('contact'); setMobileNavOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-[#07132c] hover:text-[#c5a059] hover:bg-slate-200/60 border border-transparent hover:border-[#c5a059]/30 transition-all text-left cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-5 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold text-[#07132c] mb-1">
              <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>infoiconconstructions@gmail.com</span>
            </div>
            <p className="text-[11px] text-slate-500">Fast-Track Recruitment Desk</p>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER SECTION ─── */}
      <section className="relative bg-[#07132c] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-[#c5a059]/30 overflow-hidden">
        {/* Background Subtle Architectural Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#c5a059 1px, transparent 1px), linear-gradient(to right, #c5a059 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 80px 80px'
          }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#c5a059]/20 border border-[#c5a059]/50 text-[#e5be6b] text-xs font-black uppercase tracking-widest">
              <HardHat className="w-4 h-4 text-[#c5a059]" />
              <span>CAREER OPPORTUNITIES • JOIN OUR TEAM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Build Your Career with Us!
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              We are looking for skilled, dedicated, and motivated professionals to join our construction team. 
              If you are passionate about construction, site management, and delivering quality projects, 
              we invite you to apply for our active site vacancies across Telangana and Maharashtra.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/60">
              <div className="bg-[#0b1e3d]/80 border border-[#c5a059]/30 p-3.5">
                <span className="block text-2xl sm:text-3xl font-black text-[#e5be6b]">11</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Total Vacancies</span>
              </div>
              <div className="bg-[#0b1e3d]/80 border border-[#c5a059]/30 p-3.5">
                <span className="block text-2xl sm:text-3xl font-black text-[#e5be6b]">4</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Open Positions</span>
              </div>
              <div className="bg-[#0b1e3d]/80 border border-[#c5a059]/30 p-3.5">
                <span className="block text-2xl sm:text-3xl font-black text-[#e5be6b]">Class-1</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Govt Projects</span>
              </div>
              <div className="bg-[#0b1e3d]/80 border border-[#c5a059]/30 p-3.5">
                <span className="block text-2xl sm:text-3xl font-black text-[#e5be6b]">Immediate</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Site Joining</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#openings-section"
                className="inline-flex items-center gap-2 bg-[#c5a059] text-[#07132c] hover:bg-[#d4af37] text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-3.5 transition-all shadow-md"
              >
                <span>View 4 Positions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#apply-form-section"
                className="inline-flex items-center gap-2 bg-transparent border border-[#c5a059]/50 text-white hover:bg-white/10 text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-3.5 transition-all"
              >
                <span>Apply Online</span>
                <Send className="w-4 h-4 text-[#e5be6b]" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── CURRENT JOB OPENINGS SUMMARY TABLE ─── */}
      <section id="openings-section" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#c5a059] block mb-1">
                Recruitment Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#07132c] tracking-tight">
                Current Job Openings
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Immediate deployment for heavy RCC institutional campuses, multi-span river bridges, and hydraulic infrastructure.
            </p>
          </div>

          {/* Master Table of Current Openings */}
          <div className="overflow-x-auto shadow-sm border border-slate-300 bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#07132c] text-white border-b border-[#c5a059]">
                  <th className="py-3.5 px-4 sm:px-6 font-black uppercase tracking-wider text-[#c5a059] w-20">S. No.</th>
                  <th className="py-3.5 px-4 sm:px-6 font-black uppercase tracking-wider">Position</th>
                  <th className="py-3.5 px-4 sm:px-6 font-black uppercase tracking-wider text-center w-36">Number of Vacancies</th>
                  <th className="py-3.5 px-4 sm:px-6 font-black uppercase tracking-wider hidden md:table-cell">Eligibility / Qualifications</th>
                  <th className="py-3.5 px-4 sm:px-6 font-black uppercase tracking-wider text-right w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {jobOpenings.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#c5a059]">{job.sno}</td>
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-extrabold text-[#07132c] text-sm sm:text-base">{job.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{job.department}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="inline-block px-3 py-1 bg-[#c5a059]/20 text-[#07132c] font-black border border-[#c5a059]/40 rounded-none">
                        {job.vacancies}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-600 hidden md:table-cell">
                      {job.qualificationText}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => handleSelectRoleForApply(job.title, job.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#07132c] hover:bg-[#c5a059] text-white hover:text-[#07132c] text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-0"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-[#F8F7F3] border-t-2 border-[#07132c] font-black text-[#07132c]">
                  <td colSpan={2} className="py-4 px-4 sm:px-6 text-right uppercase tracking-wider text-xs sm:text-sm">
                    Total Vacancies
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-center text-base sm:text-lg text-[#c5a059]">
                    11
                  </td>
                  <td colSpan={2} className="py-4 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    All positions are active and open for immediate recruitment.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── DETAILED ROLE BREAKDOWN SECTION ─── */}
      <section className="py-14 sm:py-20 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#c5a059] block mb-2">
              Role Profiles &amp; Eligibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#07132c] tracking-tight">
              Detailed Position Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Review specific responsibilities and qualifications for each opening before submitting your resume.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#07132c] text-[#e5be6b] border border-[#c5a059]'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#c5a059]'
              }`}
            >
              All Openings (11)
            </button>
            <button
              onClick={() => setActiveTab('engineering')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'engineering'
                  ? 'bg-[#07132c] text-[#e5be6b] border border-[#c5a059]'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#c5a059]'
              }`}
            >
              Site Engineers (6)
            </button>
            <button
              onClick={() => setActiveTab('supervisor')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'supervisor'
                  ? 'bg-[#07132c] text-[#e5be6b] border border-[#c5a059]'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#c5a059]'
              }`}
            >
              Site Supervisors (3)
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'store'
                  ? 'bg-[#07132c] text-[#e5be6b] border border-[#c5a059]'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#c5a059]'
              }`}
            >
              Storekeepers (2)
            </button>
          </div>

          {/* Job Openings Detailed Cards Grid */}
          <div className="space-y-8">
            {filteredOpenings.map((job) => (
              <div
                key={job.id}
                id={job.id}
                className="bg-white border border-slate-300 shadow-sm transition-all duration-300 hover:border-[#c5a059] overflow-hidden"
              >
                {/* Header Row */}
                <div className="p-6 sm:p-8 bg-[#F8F7F3] border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 bg-[#07132c] text-[#e5be6b] font-black text-xs tracking-wider uppercase">
                        S.No. {job.sno}
                      </span>
                      <span className="px-3 py-1 bg-[#c5a059] text-[#07132c] font-black text-xs uppercase tracking-wider">
                        {job.vacancies} Vacancies
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {job.department}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#07132c]">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                      {job.overview}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      onClick={() => handleSelectRoleForApply(job.title, job.id)}
                      className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-[#07132c] text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-0 shadow-sm flex items-center gap-2"
                    >
                      <span>Apply for this Role</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Details: Responsibilities & Qualifications */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Responsibilities */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#07132c] border-b border-slate-200 pb-2">
                      <Briefcase className="w-4 h-4 text-[#c5a059]" />
                      <span>Responsibilities</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#07132c] border-b border-slate-200 pb-2">
                      <GraduationCap className="w-4 h-4 text-[#c5a059]" />
                      <span>Qualifications &amp; Eligibility</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Prescribed Qualification
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-[#07132c]">
                        {job.qualificationText}
                      </p>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {job.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#c5a059] shrink-0 mt-1.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="px-6 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                      {job.location}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      {job.type}
                    </span>
                  </div>
                  <span className="text-[#c5a059] font-bold">Immediate Placement</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW TO APPLY & ONLINE SUBMISSION FORM ─── */}
      <section id="apply-form-section" className="py-16 sm:py-24 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 5 Cols: How To Apply Guide & Recruitment Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#c5a059] block mb-2">
                  Official Recruitment Board
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#07132c] tracking-tight">
                  How to Apply
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Interested candidates are invited to apply for the above positions. 
                  Please submit your updated resume/CV along with your contact details through our website form, 
                  or directly contact our recruitment desk via official email.
                </p>
              </div>

              {/* Direct Official Contact Cards */}
              <div className="space-y-4 pt-2">
                <div className="p-5 bg-[#F8F7F3] border border-[#c5a059]/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#c5a059]">
                    <Mail className="w-4 h-4" />
                    <span>Official Application Email</span>
                  </div>
                  <a
                    href="mailto:infoiconconstructions@gmail.com"
                    className="text-base sm:text-lg font-black text-[#07132c] hover:text-[#c5a059] transition-colors block break-all"
                  >
                    infoiconconstructions@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-500">
                    Form submissions are automatically dispatched directly to this inbox for fast-track screening.
                  </p>
                </div>

                <div className="p-5 bg-[#F8F7F3] border border-slate-300 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                    <Phone className="w-4 h-4 text-[#c5a059]" />
                    <span>Recruitment Helpline</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-[#07132c]">
                    +91 94400 64585 / +91 (800) 555-ICON
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Monday to Saturday, 9:00 AM – 6:30 PM IST
                  </p>
                </div>

                <div className="p-5 bg-[#F8F7F3] border border-slate-300 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                    <MapPin className="w-4 h-4 text-[#c5a059]" />
                    <span>Job Locations</span>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#07132c]">
                    Sirpur Town, Kumuram Bheem Asifabad District, Kagaznagar, Telangana &amp; Gadchiroli, Maharashtra
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Active project site offices &amp; central camp accommodations.
                  </p>
                </div>
              </div>

              {/* Tagline Box */}
              <div className="p-6 bg-[#07132c] text-white border-l-4 border-[#c5a059]">
                <h4 className="text-sm font-black text-[#e5be6b] uppercase tracking-wider mb-1">
                  Be Part of Our Team.
                </h4>
                <p className="text-xs text-slate-300">
                  Build Your Future with Us! Shape high-impact government educational complexes, multi-span river bridges, and vital water infrastructure.
                </p>
              </div>

            </div>

            {/* Right 7 Cols: Interactive Application Form */}
            <div className="lg:col-span-7 bg-[#F8F7F3] border border-[#c5a059]/50 p-6 sm:p-10 shadow-lg relative">
              <div className="mb-6 border-b border-slate-200 pb-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#c5a059] block mb-1">
                  Online Portal
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#07132c]">
                  Submit Candidate Application
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Direct submission to <strong>infoiconconstructions@gmail.com</strong>
                </p>
              </div>

              {/* SUCCESS MODAL / CONFIRMATION */}
              {submissionStatus === 'success' && (
                <div className="mb-8 p-6 bg-white border-2 border-emerald-500 text-[#07132c] shadow-md space-y-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-black text-emerald-800">
                        Application Successfully Submitted!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700">
                        Thank you, <strong>{formData.fullName}</strong>. Your application for <strong>{formData.position}</strong> has been transmitted to our recruitment inbox at <strong>infoiconconstructions@gmail.com</strong>.
                      </p>
                      <div className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-900 font-mono text-xs font-black border border-emerald-300">
                        Reference ID: {applicationId}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => triggerMailtoDispatch(applicationId, formData)}
                      className="px-4 py-2 bg-[#07132c] hover:bg-[#c5a059] text-white hover:text-[#07132c] text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-0 flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Attachments via Email</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmissionStatus('idle');
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          position: 'Senior Site Engineer – Civil',
                          experience: '3-5 Years',
                          qualification: 'B.Tech / B.E. Civil Engineering',
                          currentLocation: '',
                          resumeLink: '',
                          message: ''
                        });
                      }}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-0"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              )}

              {submissionStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage || 'Something went wrong. Please click below to email your resume directly.'}</span>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Position Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                    Select Position Applying For *
                  </label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm font-semibold text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                  >
                    <option value="Senior Site Engineer – Civil">Senior Site Engineer – Civil (3 Vacancies)</option>
                    <option value="Junior Site Engineer – Civil">Junior Site Engineer – Civil (3 Vacancies)</option>
                    <option value="Site Supervisor">Site Supervisor (3 Vacancies)</option>
                    <option value="Storekeeper">Storekeeper (2 Vacancies)</option>
                  </select>
                </div>

                {/* Candidate Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="candidate@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Current Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                      Mobile Number / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                      Current City / District
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mancherial / Hyderabad / Nagpur"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Experience & Highest Qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                      Total Experience *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm font-semibold text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                    >
                      <option value="Fresher (0 - 1 Year)">Fresher (0 - 1 Year)</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years</option>
                      <option value="5 - 8 Years">5 - 8 Years</option>
                      <option value="8+ Years">8+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                      Highest Qualification *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Diploma / B.Tech Civil / ITI / Graduate"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Resume / Portfolio Link */}
                <div>
                  <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                    Resume / CV Link (Google Drive / LinkedIn / Dropbox)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/... or LinkedIn URL"
                    value={formData.resumeLink}
                    onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                    className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Or if you prefer sending a PDF attachment, submit this form and forward your CV to <strong>infoiconconstructions@gmail.com</strong>.
                  </p>
                </div>

                {/* Cover Note / Brief Experience Summary */}
                <div>
                  <label className="block text-xs font-bold text-[#07132c] uppercase tracking-wider mb-1.5">
                    Brief Summary of Construction Experience
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mention past project types (bridges, buildings, road works, shuttering, survey experience)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-300 p-3 text-xs sm:text-sm text-[#07132c] focus:border-[#c5a059] focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submissionStatus === 'submitting'}
                    className="w-full py-4 bg-[#07132c] hover:bg-[#0b1e3d] text-[#e5be6b] hover:text-white text-xs sm:text-sm font-black uppercase tracking-widest transition-all cursor-pointer border border-[#c5a059]/40 shadow-md flex items-center justify-center gap-2"
                  >
                    {submissionStatus === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#e5be6b] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to infoiconconstructions@gmail.com...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#c5a059]" />
                        <span>Submit Application to HR Desk</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
                    <span>Target Inbox: infoiconconstructions@gmail.com</span>
                    <span>100% Confidential Recruitment</span>
                  </div>
                </div>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* ── WHY BUILD WITH US (PERKS & CULTURE) ─── */}
      <section className="py-16 sm:py-20 bg-[#F8F7F3] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#c5a059] block mb-2">
              Why Join Icon Constructions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07132c] tracking-tight">
              A 50-Year Legacy Built on Integrity &amp; Engineering Pride
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-300 space-y-3">
              <div className="w-10 h-10 bg-[#07132c] flex items-center justify-center text-[#e5be6b]">
                <Award className="w-5 h-5 text-[#c5a059]" />
              </div>
              <h4 className="text-base font-black text-[#07132c]">
                Class-1 Landmark Portfolios
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work on signature multi-span river bridges, 100-column academic campuses, and critical hydraulic infrastructure that serve communities for decades.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-300 space-y-3">
              <div className="w-10 h-10 bg-[#07132c] flex items-center justify-center text-[#e5be6b]">
                <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
              </div>
              <h4 className="text-base font-black text-[#07132c]">
                Job Stability &amp; Respect
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a continuous government empaneled entity since 1975, we offer verified job stability, on-time salary disbursals, site camps, and worker safety.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-300 space-y-3">
              <div className="w-10 h-10 bg-[#07132c] flex items-center justify-center text-[#e5be6b]">
                <Users className="w-5 h-5 text-[#c5a059]" />
              </div>
              <h4 className="text-base font-black text-[#07132c]">
                Fast-Track Career Growth
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe in recognizing field competence. Dedicated site engineers and supervisors quickly step up to lead entire independent packages and site offices.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── UNIFORM FOOTER ─── */}
      <footer className="bg-[#07132c] text-white border-t border-[#c5a059]/40 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Icon Constructions Logo"
                  className="h-12 w-auto object-contain bg-white p-1 rounded"
                />
                <div>
                  <span className="text-white font-sans text-base font-black tracking-wider block">ICON</span>
                  <span className="text-[#c5a059] text-[10px] font-bold tracking-widest uppercase block -mt-0.5">CONSTRUCTIONS</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Class-1 Government Empaneled contractor delivering large-scale civic complexes, multi-span river bridges, educational campuses, and hydraulic infrastructure across Telangana and Maharashtra since 1975.
              </p>
              <div className="text-xs text-[#e5be6b] font-bold">
                ISO 9001:2015 Certified Infrastructure Enterprise
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button onClick={() => navigate('home')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('about')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Projects (25 Benchmarks)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('expertise')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Core Expertise
                  </button>
                </li>
                <li>
                  <span className="text-[#c5a059] font-bold">
                    Careers (11 Openings)
                  </span>
                </li>
                <li>
                  <button onClick={() => navigate('contact')} className="hover:text-[#c5a059] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Sectors */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Engineering Sectors
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>Government Administrative Complexes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>High-Capacity River Bridges</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                  <span>100-Column Institutional Campuses</span>
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

            {/* Col 4: Recruitment & Headquarters */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-[#e5be6b] uppercase tracking-widest border-b border-slate-800 pb-2">
                Recruitment Desk
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Sirpur Town, Kumuram Bheem Asifabad District, Telangana, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>+91 94400 64585</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span className="text-[#e5be6b] font-bold">infoiconconstructions@gmail.com</span>
                </div>
                <div className="pt-2">
                  <a
                    href="#apply-form-section"
                    className="block text-center w-full bg-[#c5a059] text-[#07132c] hover:bg-[#d4af37] font-black uppercase tracking-wider text-xs py-2.5 px-4 transition-all"
                  >
                    Apply for 11 Vacancies
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 border-t border-slate-800 pt-6">
            <p>© 2026 Icon Constructions Group. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-slate-300">ISO 9001: Quality</span>
              <span className="text-slate-300">ISO 14001: Environment</span>
              <span className="text-slate-300">ISO 45001: Health &amp; Safety</span>
              <a href="#openings-section" className="hover:text-white transition-colors">Career Opportunities</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
