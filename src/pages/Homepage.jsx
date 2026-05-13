import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Upload, Download, Link2, Zap, Clock, Lock,
  CheckCircle, ArrowRight, Star,
  ChevronRight, Eye, RefreshCw
} from 'lucide-react';

/* ── Fade-in wrapper ── */
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Data ── */
const features = [
  { icon: Lock, title: 'Secure Encryption', desc: 'AES-256 encryption protects your files at rest and in transit.', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/50' },
  { icon: Zap, title: 'Fast Upload', desc: 'Upload large files up to 30 GB quickly with chunked transfer.', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/50' },
  { icon: Clock, title: 'Temporary Storage', desc: 'Files auto-delete after expiration keeping your storage clean.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50' },
  { icon: Link2, title: 'Easy Sharing', desc: 'Share files with anyone using secure, unique download links.', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/50' },
];

const steps = [
  { icon: Upload, step: '01', title: 'Upload Your File', desc: 'Drag & drop or browse to upload any file up to 30 GB.', color: 'from-purple-600 to-purple-400' },
  { icon: Link2, step: '02', title: 'Generate Secure Link', desc: 'A unique encrypted link is instantly created for your file.', color: 'from-pink-600 to-pink-400' },
  { icon: Download, step: '03', title: 'Share With Anyone', desc: 'Send the link to anyone — no account needed to download.', color: 'from-blue-600 to-blue-400' },
];

const security = [
  { icon: Lock, title: 'End-to-End Encryption', desc: 'AES-256 encryption on every file, every time.' },
  { icon: Eye, title: 'Secure File Access', desc: 'Only link holders can access your files.' },
  { icon: RefreshCw, title: 'Automatic Cleanup', desc: 'Files are deleted automatically after expiry.' },
  { icon: Shield, title: 'Privacy Protection', desc: 'We never read, sell, or share your data.' },
];

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f50057, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-400 text-sm font-medium mb-8">
              <Star size={13} className="fill-purple-400" /> Built with user trust in mind
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            NexVault —{' '}
            <span className="gradient-text">File Sharing</span>
            <br />Made Simple
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload, store, and share files safely with fast performance and end-to-end encryption.
            Files up to <strong className="text-white">30 GB</strong> with automatic cleanup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <button className="btn-primary text-base px-8 py-4 rounded-2xl" onClick={() => navigate('/upload')}>
              <Upload size={18} /> Upload Files <ArrowRight size={16} />
            </button>
            <button className="btn-outline text-base px-8 py-4 rounded-2xl" onClick={() => navigate('/about')}>
              Learn More
            </button>
          </motion.div>

          {/* Hero Cards Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Shield, label: 'AES-256 Encrypted', sub: 'Enterprise-grade security', color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { icon: Zap, label: 'Lightning Fast', sub: 'Optimized CDN delivery', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { icon: Clock, label: 'Auto Cleanup', sub: 'Files expire automatically', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            ].map(({ icon: Icon, label, sub, color, bg }) => (
              <div key={label} className="glass rounded-2xl px-5 py-4 flex items-center gap-3 text-left">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-400 text-sm font-medium mb-5">
              <Zap size={13} /> Platform Features
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Everything You Need to <span className="gradient-text">Share Securely</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Built for speed, security, and simplicity — NexVault handles the hard parts so you don't have to.</p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div className={`card h-full ${border} group cursor-pointer`}>
                  <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon size={26} className={color} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 text-pink-400 text-sm font-medium mb-5">
              <ChevronRight size={13} /> How It Works
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Share Files in <span className="gradient-text">3 Simple Steps</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">No complicated setup. Just upload, get a link, and share.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #6c63ff, transparent)' }} />

            {steps.map(({ icon: Icon, step, title, desc, color }, i) => (
              <FadeUp key={step} delay={i * 0.15}>
                <div className="card text-center group hover:border-purple-500/50 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6c63ff, #f50057)' }}>
                    Step {step}
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mt-4 mb-5 group-hover:scale-110 transition-transform opacity-90`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 text-green-400 text-sm font-medium mb-6">
                <Shield size={13} /> Security First
              </div>
              <h2 className="text-4xl font-black text-white mb-5">
                Enterprise-Level <span className="gradient-text">Security</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                NexVault is built with security at its core. Every file is encrypted, every link is unique, and every upload is protected from the moment it leaves your device.
              </p>
              <button className="btn-primary px-6 py-3" onClick={() => navigate('/upload')}>
                <Upload size={16} /> Start Uploading Securely
              </button>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {security.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card hover:border-green-500/40 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon size={18} className="text-green-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(245,0,87,0.2), rgba(59,130,246,0.15))', border: '1px solid rgba(108,99,255,0.35)' }}>
              {/* Orbs inside CTA */}
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #f50057, transparent)' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-white text-sm font-medium mb-6">
                  <CheckCircle size={13} className="text-green-400" /> Start sharing instantly
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
                  Start Using <span className="gradient-text">NexVault</span> Today
                </h2>
                <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
                  Join thousands of users who trust NexVault for secure, fast, and reliable file sharing.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="btn-primary text-base px-10 py-4 rounded-2xl" onClick={() => navigate('/upload')}>
                    <Upload size={18} /> Upload Files Now
                  </button>
                  <button className="btn-outline text-base px-10 py-4 rounded-2xl" onClick={() => navigate('/about')}>
                    About Us <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
