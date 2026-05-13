import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Users, Lock, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', avatar: 'AR', color: 'from-purple-600 to-purple-400' },
  { name: 'Priya Sharma', role: 'Lead Engineer', avatar: 'PS', color: 'from-pink-600 to-pink-400' },
  { name: 'Jordan Lee', role: 'Security Architect', avatar: 'JL', color: 'from-blue-600 to-blue-400' },
  { name: 'Sam Chen', role: 'Product Designer', avatar: 'SC', color: 'from-green-600 to-green-400' },
];

const values = [
  { icon: Lock, title: 'Security First', desc: 'Every decision we make starts with security. Your files are encrypted before they ever leave your device.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Zap, title: 'Speed & Reliability', desc: 'We obsess over performance. Fast uploads, instant links, and 99.9% uptime — always.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Heart, title: 'User-Centric', desc: 'We build for real people. Simple, intuitive, and powerful — no technical knowledge required.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Globe, title: 'Open & Transparent', desc: 'No hidden fees, no data selling, no surprises. We believe in radical transparency.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24 text-center overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-400 text-sm font-medium mb-8">
              <Users size={13} /> About NexVault
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Built for <span className="gradient-text">Secure Sharing</span>,<br />Designed for Everyone
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              NexVault was born from a simple idea: file sharing should be fast, private, and effortless. We're a team of engineers and designers passionate about making security accessible to everyone.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-16 border border-purple-500/20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 text-pink-400 text-sm font-medium mb-6">
                <Shield size={13} /> Our Mission
              </div>
              <h2 className="text-3xl font-black text-white mb-5">
                Making Privacy <span className="gradient-text">the Default</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We believe privacy shouldn't be a premium feature. NexVault provides enterprise-grade encryption to everyone — from individuals sharing personal files to businesses transferring sensitive documents.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our platform is built on the principle that your files belong to you. We never read, analyze, or monetize your data. Period.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: '2024' },
                  { label: 'Team Size', value: '12+' },
                  { label: 'Countries', value: '40+' },
                  { label: 'Uptime', value: '99.9%' },
                ].map(({ label, value }) => (
                  <div key={label} className="card text-center">
                    <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                    <div className="text-sm text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Our <span className="gradient-text">Core Values</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">The principles that guide every feature we build and every decision we make.</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div className="card h-full group hover:border-purple-500/50">
                  <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={color} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Meet the <span className="gradient-text">Team</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">The people behind NexVault, dedicated to building the most secure file sharing platform.</p>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, avatar, color }, i) => (
              <FadeUp key={name} delay={i * 0.1}>
                <div className="card text-center group hover:border-purple-500/50">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 text-white font-black text-lg group-hover:scale-110 transition-transform`}>
                    {avatar}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{name}</h4>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden text-center px-8 py-16"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(245,0,87,0.2))', border: '1px solid rgba(108,99,255,0.35)' }}>
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                  Ready to <span className="gradient-text">Get Started?</span>
                </h2>
                <p className="text-gray-300 mb-8">Join thousands of users who trust NexVault for secure file sharing.</p>
                <button className="btn-primary px-8 py-4 text-base rounded-2xl" onClick={() => navigate('/upload')}>
                  Upload Your First File <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
