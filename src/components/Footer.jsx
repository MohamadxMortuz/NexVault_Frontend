import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="glass border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #f50057)' }}>
                <Shield size={18} className="text-white" />
              </div>
              <span className="text-xl font-black gradient-text">NexVault</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Secure File Sharing Platform. Upload and share files up to 30 GB with automatic cleanup.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.linkedin.com/in/mohamad-mortuz/" target="_blank" rel="noreferrer noopener" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                <FaLinkedin size={16} />
              </a>
              <a href="https://github.com/MohamadxMortuz" target="_blank" rel="noreferrer noopener" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all">
                <FaGithub size={16} />
              </a>
              <a href="mailto:starkxjarvis1@gmail.com" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all">
                <SiGmail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              {[['Upload File', '/upload'], ['Download File', '/download'], ['About Us', '/about'], ['Contact Us', '/contact']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Help Center'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 NexVault. All rights reserved.</p>
          <p className="text-xs text-gray-600">Built with ❤️ for secure file sharing</p>
        </div>
      </div>
    </footer>
  );
}
