import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Globe,
  ArrowRight,
  X,
  CheckCircle2,
  ClipboardList,
  Wallet,
  Radar,
  MapPin,
  Menu,
  Flag,
  Map,
  Compass,
  MessageCircle,
  Landmark,
  Plane,
  Ship,
} from 'lucide-react'

const NAV_LINKS = ['Services', 'Process', 'Track Application', 'Pricing Catalog', 'About Us']

const services = [
  {
    id: 'united-kingdom',
    title: 'United Kingdom',
    icon: Flag,
    description: 'Family reunification and skilled relocation support for the United Kingdom.',
  },
  {
    id: 'canada',
    title: 'Canada',
    icon: Map,
    description: 'Skilled migration and family sponsorship pathways to Canada.',
  },
  {
    id: 'australia',
    title: 'Australia',
    icon: Compass,
    description: 'Employer-sponsored and skilled migration support for Australia.',
  },
  {
    id: 'turkey',
    title: 'Turkey',
    icon: Globe,
    description: 'Skilled worker and family reunification support for Turkey.',
  },
  {
    id: 'united-states',
    title: 'United States',
    icon: Landmark,
    description: 'Skilled and family immigration support for the United States.',
  },
  {
    id: 'new-zealand',
    title: 'New Zealand',
    icon: Plane,
    description: 'Skilled and family migration support for New Zealand.',
  },
  {
    id: 'france',
    title: 'France',
    icon: Ship,
    description: 'Skilled worker and family reunification support for France.',
  },
]

const steps = [
  {
    icon: ClipboardList,
    title: 'Tell us about your plans',
    description: 'Share a few details about your travel plans and the support you need.',
  },
  {
    icon: Users,
    title: 'We review your details',
    description: 'Our team reviews your information and follows up about the next steps.',
  },
  {
    icon: Wallet,
    title: 'Get your documents in order',
    description: 'We help you understand the paperwork and any fees for your application.',
  },
  {
    icon: Radar,
    title: 'Follow your application',
    description: 'Sign in to check your application progress and see what needs attention.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    setMobileMenuOpen(false)
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
    <div className="min-h-screen bg-[#F5F1E8] text-[#292D27]">
      <header className="sticky top-0 z-50 border-b border-[#292D27]/10 bg-[#FBF9F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-2 sm:gap-4">
          <button onClick={() => scrollToSection('top')} className="flex items-center gap-2 sm:gap-3" aria-label="Migration For All home">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#36594A] flex items-center justify-center text-white font-bold text-lg">M</div>
            <span className="whitespace-nowrap text-[0.95rem] sm:text-lg text-[#292D27] font-bold tracking-tight">Migration For All</span>
          </button>
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => navLinkClick(link)} className="text-sm text-[#62665E] hover:text-[#36594A] transition-colors font-medium">
                {link}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => navigate('/login')} className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#292D27]/20 px-5 py-2.5 text-sm font-semibold text-[#292D27] hover:border-[#36594A]/50 hover:bg-white transition-colors">
              Client Portal Login
            </button>
            <button onClick={() => navigate('/client')} className="inline-flex items-center justify-center rounded-full bg-[#36594A] hover:bg-[#294638] px-3 sm:px-5 py-2.5 text-sm font-semibold text-white transition-colors">
              Apply Online
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#292D27]/20 text-[#292D27]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-[#292D27]/10 bg-[#FBF9F4] px-4 py-3" aria-label="Mobile navigation">
            <div className="mx-auto max-w-7xl grid gap-1">
              {NAV_LINKS.map((link) => (
                <button key={link} onClick={() => navLinkClick(link)} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-[#555A52] hover:bg-white hover:text-[#36594A]">
                  {link}
                </button>
              ))}
              <button onClick={() => { setMobileMenuOpen(false); navigate('/login') }} className="sm:hidden rounded-lg px-3 py-3 text-left text-sm font-semibold text-[#36594A] hover:bg-white">
                Client Portal Login
              </button>
            </div>
          </nav>
        )}
      </header>

      <section id="top" className="bg-[#F5F1E8]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-[#8A593D]">Migration For All · Freetown, Sierra Leone</p>
            <h1 className="mt-5 max-w-lg font-serif text-[2.7rem] leading-[1.08] tracking-[-0.035em] text-[#292D27] sm:text-6xl">
              A big move is personal. <span className="text-[#476A52]">Getting help should be, too.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#62665E] sm:text-lg sm:leading-8">
              Reuniting with family, travelling for treatment or planning a move for work? We’ll help you understand the paperwork and take the next step at your own pace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate('/client')} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#36594A] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#294638]">
                Get started <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => scrollToSection('process')} className="inline-flex items-center justify-center rounded-md border border-[#292D27]/20 bg-transparent px-6 py-3.5 font-semibold text-[#292D27] transition-colors hover:bg-white/60">
                See how we can help
              </button>
            </div>
            <div className="mt-9 border-t border-[#292D27]/15 pt-6">
              <p className="text-sm text-[#555A52]">Already have an application?</p>
              <button onClick={() => navigate('/login')} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#36594A] underline decoration-[#A8B49E] underline-offset-4 transition-colors hover:text-[#294638]">
                Sign in to check your progress <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <figure className="relative">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85"
              alt="Friends sitting together and sharing a view on a trip"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-[#62665E]">
              <span>Every journey starts with a reason that matters to you.</span>
              <span className="shrink-0 text-xs text-[#8A593D]">Illustrative photo</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="services" className="bg-[#FBF9F4] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-[#8A593D]">How we can help</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#292D27] sm:text-4xl">Support for the plans you’re making</h2>
            <p className="mt-4 text-[#62665E]">Choose the kind of support you’re looking for. We’ll help you work out what comes next.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const ServiceIcon = service.icon
              return (
                <div key={service.id} className="flex flex-col border-t-2 border-[#A8B49E] bg-[#F5F1E8] p-6 text-left transition-colors hover:border-[#36594A]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#E7E4D9] text-[#476A52]">
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-[#292D27]">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#62665E]">{service.description}</p>
                  <button onClick={() => openIntake(service.id)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#36594A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#294638]">
                    Select &amp; Apply <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#E7E4D9] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#8A593D]">What to expect</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#292D27] sm:text-4xl">One step at a time</h2>
            <p className="mt-4 text-[#62665E]">We’ll help you understand the process before you move ahead.</p>
          </div>
          <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.title} className="border-t border-[#292D27]/20 py-6 sm:px-5 lg:px-6 first:sm:pl-0 lg:first:pl-0">
                  <div className="flex items-center gap-3 text-[#476A52]">
                    <StepIcon className="h-5 w-5" />
                    <span className="text-sm font-semibold">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#292D27]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#62665E]">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="tracking" className="bg-[#FBF9F4] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold text-[#8A593D]">When you’re ready</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#292D27] sm:text-4xl">Check in on your application.</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[#62665E]">The client portal gives you one place to review your documents, see updates and keep track of what’s next.</p>
              <button onClick={() => navigate('/login')} className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#36594A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#294638]">
                Sign in to your portal <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="lg:col-span-2">
              <div className="border-y border-[#292D27]/15 py-3">
                <p className="mb-2 text-sm font-semibold text-[#8A593D]">Inside your client portal</p>
                <ul className="divide-y divide-[#292D27]/10">
                  <li className="flex items-center gap-3 py-4">
                    <ClipboardList className="h-5 w-5 shrink-0 text-[#476A52]" />
                    <span className="text-sm text-[#4F554D]">Review your document checklist</span>
                  </li>
                  <li className="flex items-center gap-3 py-4">
                    <Users className="h-5 w-5 shrink-0 text-[#476A52]" />
                    <span className="text-sm text-[#4F554D]">See who is working with you</span>
                  </li>
                  <li className="flex items-center gap-3 py-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#476A52]" />
                    <span className="text-sm text-[#4F554D]">Keep up with application updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#36594A] py-14 text-white sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#E7C59D]">A little help goes a long way</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">You don’t have to figure it all out at once.</h2>
              <p className="mt-4 max-w-xl leading-7 text-white/80">
                Get reminders about documents and updates as your application moves along. And when you need to check in, your client portal is there for you.
              </p>
            </div>
            <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center gap-2 justify-self-start rounded-md border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10 md:justify-self-end">
              Visit the client portal <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#F5F1E8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div className="max-w-lg">
              <p className="text-sm font-semibold text-[#8A593D]">A note from our team</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-[#292D27] sm:text-4xl">There’s a person behind every application.</h2>
            </div>
            <div className="max-w-2xl border-l-2 border-[#A8B49E] pl-6 sm:pl-8">
              <p className="text-lg leading-8 text-[#4F554D]">
                Migration For All helps individuals, families and organizations prepare for travel and relocation. We know the paperwork can feel like a lot, so we focus on clear information, careful coordination and helping you understand what comes next.
              </p>
              <p className="mt-5 text-base leading-7 text-[#62665E]">
                Starting with a question is perfectly fine. Look through our services, or create an account when you’re ready to begin.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => navigate('/client')} className="inline-flex items-center gap-2 rounded-md bg-[#36594A] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#294638]">
                  Create an account <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => scrollToSection('services')} className="inline-flex items-center rounded-md px-4 py-3 font-semibold text-[#36594A] underline decoration-[#A8B49E] underline-offset-4 hover:text-[#294638]">
                  Browse services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FBF9F4] py-16 text-center sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#8A593D]">Whenever you’re ready</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#292D27] sm:text-4xl">Let’s take the first step.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#62665E]">Create an account to start your application and keep your details together.</p>
          <button onClick={() => navigate('/client')} className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#36594A] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#294638]">
            Get started online <ArrowRight className="h-5 w-5" />
          </button>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/232000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#36594A] px-7 py-3.5 font-semibold text-[#36594A] transition-colors hover:bg-[#36594A] hover:text-white"
            >
              <MessageCircle className="h-5 w-5" /> Contact us on WhatsApp
            </a>
            <p className="text-sm text-[#777A71]">24/7 client support — we’re here whenever you need us.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#292D27] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#55715A] text-lg font-bold text-white">M</div>
              <span className="text-white font-bold text-lg">Migration For All</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">Practical help with travel, paperwork and what comes next.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="text-white/65 hover:text-white">Services</button></li>
              <li><button onClick={() => scrollToSection('process')} className="text-white/65 hover:text-white">Process</button></li>
              <li><button onClick={() => scrollToSection('tracking')} className="text-white/65 hover:text-white">Track Application</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-white/65"><MapPin className="mr-2 h-4 w-4 text-[#C7A47D]" /> Freetown, Sierra Leone</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© 2026 Migration For All (MFA). All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <button className="text-white/65 hover:text-white">Privacy Policy</button>
            <button className="text-white/65 hover:text-white">Terms of Service</button>
          </div>
        </div>
      </footer>

      {showIntake && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeIntake}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-md bg-[#FBF9F4] p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#292D27]">Client Intake — Step 1</h3>
              <button onClick={closeIntake} className="rounded-full p-2 hover:bg-[#E7E4D9]">
                <X className="w-5 h-5 text-[#62665E]" />
              </button>
            </div>
            {intakeSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[#476A52]" />
                <h4 className="text-xl font-bold text-[#292D27]">Application Submitted</h4>
                <p className="mt-2 text-[#62665E]">Your intake has been received. Our team will review and assign a submission lead.</p>
                <button onClick={closeIntake} className="mt-6 rounded-md bg-[#36594A] px-6 py-2.5 font-semibold text-white hover:bg-[#294638]">Close</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#292D27]">Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20" placeholder="Full legal name" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#292D27]">Passport Number</label>
                  <input value={intakePassport} onChange={(e) => setIntakePassport(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20" placeholder="e.g. A1234567" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#292D27]">Program Selection</label>
                  <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20">
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#292D27]">Proposed Price (USD)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20" placeholder="1850" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-[#292D27]">Initiation Date</label>
                    <input type="date" value={initiationDate} onChange={(e) => setInitiationDate(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-[#292D27]">Completion Date</label>
                    <input type="date" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20" />
                  </div>
                </div>
                <label className="flex items-start gap-3 rounded-md border border-[#292D27]/15 bg-[#F5F1E8] p-4">
                  <input type="checkbox" checked={tcAccepted} onChange={(e) => setTcAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-[#36594A]" />
                  <span className="text-sm text-[#4F554D]">I accept the Terms &amp; Conditions and authorize the digital signature below.</span>
                </label>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#292D27]">Digital Signature</label>
                  <input value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full rounded-md border border-[#292D27]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#36594A] focus:ring-2 focus:ring-[#36594A]/20" placeholder="Sign your full name" />
                </div>
                <button
                  onClick={handleIntakeSubmit}
                  className="w-full rounded-md bg-[#36594A] py-3 font-semibold text-white transition-colors hover:bg-[#294638] disabled:opacity-50"
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
