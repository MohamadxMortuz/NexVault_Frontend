import { Link } from 'react-router-dom';
import { Shield, Globe, AtSign, Briefcase, Heart } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer style={{ background: 'rgba(10,10,15,0.95)', borderTop: '1px solid rgba(108,99,255,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #f50057)' }}>
                <Shield size={18} className="text-white" />
              </div>
              <span className="text-xl font-black gradient-text">NexVault</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Secure file storage and sharing platform with end-to-end encryption and automatic cleanup.
            </p>
            <div className="flex gap-3">
              {[Globe, AtSign, Briefcase].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {[['Home', '/'], ['Upload', '/upload'], ['Download', '/download'], ['Contact', '/contact'], ['About Us', '/about']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">support@nexvault.io</li>
              <li className="text-sm text-gray-400">Mon–Fri, 9am–6pm IST</li>
              <li>
                <Link to="/contact" className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">Send a message →</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 NexVault. All rights reserved.</p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <Heart size={11} className="text-pink-500" /> for secure file sharing
          </p>
        </div>
      </div>
    </footer>
  );
}
