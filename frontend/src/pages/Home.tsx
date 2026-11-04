import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Users,
  Briefcase,
  Globe,
  ArrowRight,
  Search,
  X,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MessageSquare,
  Sparkles,
  ClipboardList,
  Wallet,
  Radar,
  MapPin,
  Phone,
} from 'lucide-react'

const NAV_LINKS = ['Services', 'Process', 'Track Application', 'Pricing Catalog', 'About Us']

const services = [
  {
    id: 'marriage',
    title: 'Marriage & Family Sponsorship',
    icon: HeartHandshake,
    price: 1850,
    duration: '6-9 months',
    includes: ['Marriage Certificate', 'Birth Certificate', 'Order of Mission verification'],
    description: 'Family reunification and spouse sponsorship programs with full documentation support.',
  },
  {
    id: 'business',
    title: 'Business & Corporate Mobility',
    icon: Briefcase,
    price: 2400,
    duration: '4-7 months',
    includes: ['Business Certificate', 'TIN', 'NRA Tax clearance'],
    description: 'Corporate relocation and skilled business mobility arrangements.',
  },
  {
    id: 'envoy',
    title: 'Ministry & Parliamentary Envoy',
    icon: Globe,
    price: 3200,
    duration: '5-8 months',
    includes: ['Official Delegation tracking', 'Position mapping'],
    description: 'Official diplomatic and parliamentary envoy missions with government coordination.',
  },
  {
    id: 'medical',
    title: 'Medical Referral & Treatment Travel',
    icon: ClipboardList,
    price: 4500,
    duration: '3-6 months',
    includes: ['Medical referral processing', 'Treatment travel coordination'],
    description: 'Medical evacuation and treatment travel coordination worldwide.',
  },
]

const steps = [
  {
    icon: ClipboardList,
    title: 'Submit Application & Proposed Budget',
    description: 'Online form with passport verification and proposed budget submission.',
  },
  {
    icon: Users,
    title: 'Office Review & Lead Assignment',
    description: 'Official MP/Permanent Secretary endorsement and submission lead assignment.',
  },
  {
    icon: Wallet,
    title: 'In-Person Office Visit & Fee Settlement',
    description: 'In-person settlement unlocks active tracking for the client.',
  },
  {
    icon: Radar,
    title: 'Real-Time Gated Progress Tracking',
    description: 'Color-coded document checklists with Trexo AI WhatsApp alerts.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [passportQuery, setPassportQuery] = useState('')
  const [statusResult, setStatusResult] = useState(false)
  const [showIntake, setShowIntake] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('marriage')
  const [fullName, setFullName] = useState('')
  const [intakePassport, setIntakePassport] = useState('')
  const [price, setPrice] = useState('')
  const [initiationDate, setInitiationDate] = useState('')
  const [completionDate, setCompletionDate] = useState('')
  const [tcAccepted, setTcAccepted] = useState(false)
  const [signature, setSignature] = useState('')
  const [intakeSubmitted, setIntakeSubmitted] = useState(false)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleStatusSearch = (e: FormEvent) => {
    e.preventDefault()
    if (passportQuery.trim().length >= 4) {
      setStatusResult(true)
    }
  }

  const openIntake = (programId: string) => {
    setSelectedProgram(programId)
    setShowIntake(true)
  }

  const closeIntake = () => {
    setShowIntake(false)
    setIntakeSubmitted(false)
  }

  const handleIntakeSubmit = () => {
    if (tcAccepted && signature.trim().length > 1) {
      setIntakeSubmitted(true)
    }
  }

  const navLinkClick = (link: string) => {
    if (link === 'Pricing Catalog') {
      scrollToSection('services')
    } else if (link === 'Track Application') {
      scrollToSection('tracking')
    } else if (link === 'About Us') {
      scrollToSection('about')
    } else {
      scrollToSection(link.toLowerCase().replace(/\s+/g, '-'))
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="sticky top-0 z-50 bg-[#0F172A]/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button onClick={() => scrollToSection('top')} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white font-bold text-lg">M</div>
            <span className="text-white font-bold text-lg tracking-tight">Migration For All</span>
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => navLinkClick(link)} className="text-sm text-slate-300 hover:text-white transition-colors font-medium">
                {link}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Client Portal Login
            </button>
            <button onClick={() => navigate('/client')} className="inline-flex items-center justify-center rounded-full bg-[#059669] hover:bg-[#047857] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#059669]/40 transition-colors">
              Apply Online
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-[#0F172A]">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#059669]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1e3a8a]/60 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#059669]/15 px-4 py-1.5 text-sm font-semibold text-[#34D399] border border-[#059669]/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Enterprise Immigration &amp; Visa Processing
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Streamlined Global Mobility &amp; Visa Solutions
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Transparent, trackable submissions and secure client self-service — powered by expert caseworkers and AI-assisted updates via WhatsApp.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/client')} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#059669] hover:bg-[#047857] px-8 py-3.5 text-white font-semibold shadow-lg shadow-[#059669]/40 transition-all">
                Start Application <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('tracking')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-white font-semibold hover:bg-white/10 transition-all">
                Track Your Status
              </button>
            </div>

            <form onSubmit={handleStatusSearch} className="mt-14 max-w-2xl mx-auto">
              <div className="flex items-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-2 shadow-2xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    value={passportQuery}
                    onChange={(e) => setPassportQuery(e.target.value)}
                    placeholder="Enter Passport Number"
                    className="w-full bg-transparent text-white placeholder-slate-400 outline-none text-sm"
                  />
                </div>
                <button type="submit" className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#059669] hover:bg-[#047857] px-6 py-3 text-white font-semibold transition-colors">
                  <Search className="w-4 h-4" /> Track
                </button>
              </div>
            </form>
            {statusResult && (
              <div className="mt-6 max-w-2xl mx-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-6 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">Passport</p>
                  <p className="font-mono font-semibold text-white">{passportQuery.toUpperCase()}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#059669]/20 px-3 py-1 text-xs font-semibold text-[#34D399] border border-[#059669]/40">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Certified &amp; Paid
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-400">Assigned Submission Lead: Hon. Parliamentary Lead</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-[#059669]/10 px-4 py-1.5 text-sm font-semibold text-[#059669] border border-[#059669]/30">Our Services</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">Visa Processing Services Catalog</h2>
            <p className="mt-4 text-slate-600">Four core offerings with baseline pricing, duration estimates, and key requirements.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const ServiceIcon = service.icon
              return (
                <div key={service.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#059669]/10 flex items-center justify-center text-[#059669] mb-4">
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 flex-1">{service.description}</p>
                  <div className="mt-4 text-sm font-semibold text-[#0F172A]">From {service.price} USD <span className="text-slate-500 font-normal">• {service.duration}</span></div>
                  <ul className="mt-4 space-y-1.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] mr-2 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => openIntake(service.id)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#059669] hover:bg-[#047857] px-4 py-2.5 text-sm font-semibold text-white transition-colors">
                    Select &amp; Apply <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-[#059669]/15 px-4 py-1.5 text-sm font-semibold text-[#34D399] border border-[#059669]/30">How It Works</span>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-slate-400">A transparent, four-step journey from submission to settlement.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.title} className="relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#34D399] mb-4">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#34D399]">Step {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="tracking" className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center rounded-full bg-[#059669]/15 px-4 py-1.5 text-sm font-semibold text-[#34D399] border border-[#059669]/30">Live Preview</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Real-Time Gated Progress Tracking</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">Authenticated clients see color-coded document readiness, assigned leads, and delegation groups in real time.</p>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Assigned Submission Lead</p>
                  <span className="inline-flex items-center rounded-full bg-[#059669]/20 px-3 py-1 text-xs font-semibold text-[#34D399] border border-[#059669]/40">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Hon. Parliamentary Lead
                  </span>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                    <span className="text-sm text-slate-300">Status</span>
                    <span className="inline-flex items-center rounded-full bg-[#F59E0B]/20 px-3 py-1 text-xs font-semibold text-[#FBBF24] border border-[#F59E0B]/40">
                      <Clock className="w-3.5 h-3.5 mr-1.5" /> Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                    <span className="text-sm text-slate-300">Co-Clients / Delegation</span>
                    <span className="text-sm text-white font-medium">2 members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#052e16] to-[#064e3b] border border-[#059669]/30 p-8 sm:p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#059669]/20 flex items-center justify-center text-[#34D399] mb-6">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Trexo AI WhatsApp Integration</h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Automated 24/7 status updates, document reminders, and policy guidance delivered directly via WhatsApp powered by Trexo AI.
            </p>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#059669] hover:bg-[#047857] px-6 py-3 text-white font-semibold">
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#059669]/15 px-4 py-1.5 text-sm font-semibold text-[#34D399] border border-[#059669]/30">Who We Are</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Trusted Global Mobility Partner</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Migration For All (MFA) is an enterprise immigration, visa processing, and travel support organization delivering end-to-end global mobility solutions for individuals, families, and corporations.
              </p>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Our casework teams combine official government liaison expertise with transparent client self-service, supported by AI-assisted WhatsApp communication via Trexo.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#34D399]">10+</p>
                <p className="mt-2 text-sm text-slate-400">Years of processing experience</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#34D399]">4</p>
                <p className="mt-2 text-sm text-slate-400">Core visa programs</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#34D399]">24/7</p>
                <p className="mt-2 text-sm text-slate-400">AI-assisted client support</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#34D399]">100%</p>
                <p className="mt-2 text-sm text-slate-400">Transparent tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">Begin Your Global Mobility Journey</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Transparent tracking, expert casework, and AI-assisted communication — all in one place.</p>
          <button onClick={() => navigate('/client')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#059669] hover:bg-[#047857] px-8 py-3.5 text-white font-semibold shadow-lg shadow-[#059669]/40">
            Apply Online <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="bg-[#0B1120] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white font-bold text-lg">M</div>
              <span className="text-white font-bold text-lg">Migration For All</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">Enterprise immigration, visa processing, and travel support management.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="text-slate-400 hover:text-white">Services</button></li>
              <li><button onClick={() => scrollToSection('process')} className="text-slate-400 hover:text-white">Process</button></li>
              <li><button onClick={() => scrollToSection('tracking')} className="text-slate-400 hover:text-white">Track Application</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-slate-400"><MapPin className="w-4 h-4 mr-2 text-[#059669]" /> Freetown, Sierra Leone</li>
              <li className="flex items-center text-slate-400"><Phone className="w-4 h-4 mr-2 text-[#059669]" /> +232 20 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 Migration For All (MFA). All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <button className="text-slate-400 hover:text-white">Privacy Policy</button>
            <button className="text-slate-400 hover:text-white">Terms of Service</button>
          </div>
        </div>
      </footer>

      {showIntake && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeIntake}>
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A]">Client Intake — Step 1</h3>
              <button onClick={closeIntake} className="p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            {intakeSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-14 h-14 mx-auto text-[#059669] mb-4" />
                <h4 className="text-xl font-bold text-[#0F172A]">Application Submitted</h4>
                <p className="mt-2 text-slate-600">Your intake has been received. Our team will review and assign a submission lead.</p>
                <button onClick={closeIntake} className="mt-6 rounded-full bg-[#059669] hover:bg-[#047857] px-6 py-2.5 text-white font-semibold">Close</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30" placeholder="Full legal name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Passport Number</label>
                  <input value={intakePassport} onChange={(e) => setIntakePassport(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30" placeholder="e.g. A1234567" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Program Selection</label>
                  <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30 bg-white">
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Proposed Price (USD)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30" placeholder="1850" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1">Initiation Date</label>
                    <input type="date" value={initiationDate} onChange={(e) => setInitiationDate(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1">Completion Date</label>
                    <input type="date" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30" />
                  </div>
                </div>
                <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <input type="checkbox" checked={tcAccepted} onChange={(e) => setTcAccepted(e.target.checked)} className="mt-1 w-4 h-4 accent-[#059669]" />
                  <span className="text-sm text-slate-700">I accept the Terms &amp; Conditions and authorize the digital signature below.</span>
                </label>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Digital Signature</label>
                  <input value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30" placeholder="Sign your full name" />
                </div>
                <button
                  onClick={handleIntakeSubmit}
                  className="w-full rounded-full bg-[#059669] hover:bg-[#047857] py-3 text-white font-semibold transition-colors disabled:opacity-50"
                >
                  Submit Intake
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
