import { useState } from 'react';
import { Mail, Send, CheckCircle, MapPin, MessageSquare, Globe, AtSign, Briefcase, ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How long are files stored?', a: 'Files can be set to delete after download, after 24 hours, 7 days, or kept indefinitely based on your selection.' },
  { q: 'Is there a file size limit?', a: 'NexVault supports files up to 30 GB per upload. Contact us for enterprise plans with higher limits.' },
  { q: 'Are my files encrypted?', a: 'Yes. All files are encrypted with AES-256 at rest and in transit using TLS 1.3.' },
  { q: 'Do I need an account to upload?', a: 'No account is required for basic uploads. Create an account to manage your files and access advanced features.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${open ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/8 bg-white/2'}`}>
      <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(!open)}>
        <span className="text-sm font-semibold text-white">{q}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ml-3 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 badge badge-purple mb-4">
            <Mail size={13} /> Contact
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Contact <span className="gradient-text">Us</span></h1>
          <p className="text-gray-400">Have a question or need support? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Info + FAQ */}
          <div className="lg:col-span-2 space-y-5">

            <div className="card animate-fade-up delay-100">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <MapPin size={15} className="text-purple-400" /> Get In Touch
              </h3>
              {[
                { icon: Mail, label: 'Email', value: 'support@nexvault.io', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: MessageSquare, label: 'Live Chat', value: 'Mon–Fri, 9am–6pm IST', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: Globe, label: 'GitHub', value: 'github.com/nexvault', color: 'text-gray-300', bg: 'bg-white/5' },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors group cursor-pointer mb-2">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={color} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{label}</p>
                    <p className="text-sm text-white">{value}</p>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[Globe, AtSign, Briefcase].map((Icon, i) => (
                    <button key={i} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all">
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card animate-fade-up delay-200">
              <h3 className="text-sm font-bold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 animate-fade-up delay-200">
            <div className="card h-full">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Send size={17} className="text-purple-400" /> Send a Message
              </h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mb-5">
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Thanks <strong className="text-white">{form.name}</strong>! We'll get back to you at <strong className="text-purple-400">{form.email}</strong> within 24 hours.
                  </p>
                  <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        className={`input-field ${errors.name ? 'border-red-500/60' : ''}`}
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                      <input
                        type="email"
                        className={`input-field ${errors.email ? 'border-red-500/60' : ''}`}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Subject</label>
                    <select
                      className="input-field"
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    >
                      <option value="">Select a topic...</option>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Bug Report</option>
                      <option>Feature Request</option>
                      <option>Enterprise / Billing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Message * <span className="text-gray-600 normal-case font-normal">({form.message.length}/1000)</span>
                    </label>
                    <textarea
                      className={`input-field resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                      rows={6}
                      maxLength={1000}
                      placeholder="Describe your issue or question in detail..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base" disabled={sending}>
                    {sending
                      ? <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Sending...</>
                      : <><Send size={17} /> Send Message</>}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    We typically respond within <strong className="text-purple-400">24 hours</strong> on business days.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
