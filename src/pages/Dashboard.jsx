import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, Download, Mail, Shield, Zap, Clock, Trash2,
  Users, HardDrive, FileUp, ArrowDown, Lock, Smile
} from 'lucide-react';

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(Math.floor(start));
        if (start >= target) clearInterval(timer);
      }, 16);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

const stats = [
  { icon: FileUp, label: 'Files Uploaded', value: 5000, suffix: '+', color: 'from-purple-600 to-purple-400' },
  { icon: ArrowDown, label: 'Total Downloads', value: 12000, suffix: '+', color: 'from-pink-600 to-pink-400' },
  { icon: HardDrive, label: 'Storage Used', value: 30, suffix: ' GB', color: 'from-blue-600 to-blue-400' },
  { icon: Users, label: 'Active Users', value: 1200, suffix: '+', color: 'from-green-600 to-green-400' },
];

const features = [
  { icon: Upload, title: 'Large File Upload', desc: 'Upload files up to 30 GB with chunked transfer and resume support.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Lock, title: 'Secure Sharing', desc: 'End-to-end encryption ensures your files stay private and protected.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Clock, title: 'Temporary Storage', desc: 'Files are stored temporarily and automatically cleaned up after use.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Trash2, title: 'Auto Deletion', desc: 'Set files to delete after download or after a specified time period.', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Zap, title: 'Fast Downloads', desc: 'Optimized CDN delivery ensures lightning-fast download speeds globally.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Smile, title: 'User Friendly', desc: 'Clean, intuitive interface designed for both technical and non-technical users.', color: 'text-green-400', bg: 'bg-green-500/10' },
];

function StatCard({ icon: Icon, label, value, suffix, color, delay }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className={`card animate-fade-up delay-${delay}`}>
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 opacity-90`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="text-3xl font-black text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-400 font-medium">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* BG Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f50057, transparent)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 badge badge-purple mb-6 animate-fade-up">
            <Shield size={13} />
            Secure · Fast · Reliable
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-up delay-100">
            NexVault<br />
            <span className="gradient-text">with Smart Storage</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
            NexVault allows users to upload and share files up to <strong className="text-white">30 GB</strong> quickly
            and securely using temporary storage with automatic cleanup.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-300">
            <button className="btn-primary text-base px-8 py-3.5" onClick={() => navigate('/upload')}>
              <Upload size={18} /> Upload File
            </button>
            <button className="btn-outline text-base px-8 py-3.5" onClick={() => navigate('/download')}>
              <Download size={18} /> Download File
            </button>
            <button className="btn-outline text-base px-8 py-3.5" onClick={() => navigate('/contact')}>
              <Mail size={18} /> Contact Us
            </button>
          </div>

          {/* Floating badge */}
          <div className="mt-16 flex justify-center animate-float">
            <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Shield size={18} className="text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">AES-256 Encrypted</p>
                <p className="text-xs text-gray-400">All files protected end-to-end</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Platform <span className="gradient-text">Statistics</span></h2>
            <p className="text-gray-400">Real-time numbers from our growing platform</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={(i + 1) * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Why Choose <span className="gradient-text">NexVault?</span></h2>
            <p className="text-gray-400">Everything you need for secure, fast file sharing</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div key={title} className={`card animate-fade-up delay-${(i % 5 + 1) * 100}`}>
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(245,0,87,0.15))', border: '1px solid rgba(108,99,255,0.3)' }}>
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #6c63ff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f50057 0%, transparent 50%)' }} />
            <h2 className="text-3xl font-black text-white mb-3 relative z-10">Ready to get started?</h2>
            <p className="text-gray-300 mb-8 relative z-10">Upload your first file in seconds. No account required.</p>
            <button className="btn-primary text-base px-10 py-4 relative z-10" onClick={() => navigate('/upload')}>
              <Upload size={18} /> Start Uploading Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
