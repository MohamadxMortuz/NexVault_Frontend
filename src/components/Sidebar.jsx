import { Link, useLocation } from 'react-router-dom';
import { Upload, Download, Mail, UserCircle, Info } from 'lucide-react';

const items = [
  { icon: Upload, label: 'Upload File', path: '/upload' },
  { icon: Download, label: 'Download File', path: '/download' },
  { icon: Info, label: 'About Us', path: '/about' },
  { icon: Mail, label: 'Contact Us', path: '/contact' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-64 glass border-r border-white/5 py-6 px-3 z-40">

      <nav className="flex flex-col gap-1 flex-1">
        {items.map(({ icon: Icon, label, path }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} className={active ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"></span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3">
        <div className="card p-3">
          <p className="text-xs text-gray-400 mb-1 font-medium">Storage Used</p>
          <div className="progress-bar mb-1.5"><div className="progress-fill" style={{ width: '0%' }}></div></div>
          <p className="text-xs text-gray-500">0 GB / 30 GB</p>
        </div>
      </div>
    </aside>
  );
}
