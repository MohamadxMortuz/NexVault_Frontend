import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle, Mail, Shield, LogOut, Edit3, CheckCircle,
  FileUp, Download, Clock, HardDrive, Lock, Eye, EyeOff
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.fullName || '');
  const [saved, setSaved] = useState(false);

  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passErrors, setPassErrors] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passSaved, setPassSaved] = useState(false);

  const links = JSON.parse(localStorage.getItem('nv_links') || '[]');
  const totalUploads = links.length;
  const totalDownloads = links.reduce((acc, l) => acc + (l.downloads || 0), 0);

  const handleSaveName = () => {
    if (!name.trim()) return;
    const users = JSON.parse(localStorage.getItem('nv_users') || '[]');
    const updated = users.map(u => u.id === user.id ? { ...u, fullName: name } : u);
    localStorage.setItem('nv_users', JSON.stringify(updated));
    const updatedUser = { ...user, fullName: name };
    localStorage.setItem('nv_user', JSON.stringify(updatedUser));
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const errs = {};
    const users = JSON.parse(localStorage.getItem('nv_users') || '[]');
    const found = users.find(u => u.id === user.id);
    if (found?.password !== passForm.current) errs.current = 'Current password is incorrect.';
    if (passForm.newPass.length < 6) errs.newPass = 'New password must be at least 6 characters.';
    if (passForm.newPass !== passForm.confirm) errs.confirm = 'Passwords do not match.';
    setPassErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const updatedUsers = users.map(u => u.id === user.id ? { ...u, password: passForm.newPass } : u);
    localStorage.setItem('nv_users', JSON.stringify(updatedUsers));
    setPassForm({ current: '', newPass: '', confirm: '' });
    setPassSaved(true);
    setTimeout(() => setPassSaved(false), 3000);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const joinDate = user?.id ? new Date(user.id).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 badge badge-purple mb-4">
            <UserCircle size={13} /> Profile
          </div>
          <h1 className="text-4xl font-black text-white mb-2">My <span className="gradient-text">Profile</span></h1>
          <p className="text-gray-400">Manage your account details and security settings.</p>
        </div>

        {/* Profile Card */}
        <div className="card mb-6 animate-fade-up delay-100">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #f50057)' }}>
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {editMode ? (
                <div className="flex items-center gap-3">
                  <input
                    className="input-field text-lg font-bold"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="btn-primary px-4 py-2 text-sm whitespace-nowrap">Save</button>
                  <button onClick={() => { setEditMode(false); setName(user?.fullName); }}
                    className="btn-outline px-4 py-2 text-sm">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white truncate">{user?.fullName}</h2>
                  <button onClick={() => setEditMode(true)}
                    className="text-gray-500 hover:text-purple-400 transition-colors">
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Mail size={13} className="text-gray-500" />
                <span className="text-sm text-gray-400">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={13} className="text-gray-500" />
                <span className="text-xs text-gray-500">Joined {joinDate}</span>
              </div>
            </div>
          </div>

          {saved && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
              <CheckCircle size={15} /> Name updated successfully!
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/5">
            {[
              { icon: FileUp, label: 'Uploads', value: totalUploads, color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { icon: Download, label: 'Downloads', value: totalDownloads, color: 'text-green-400', bg: 'bg-green-500/10' },
              { icon: HardDrive, label: 'Storage', value: '30 GB', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="text-center">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-2`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="card mb-6 animate-fade-up delay-200">
          <div className="card-title mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Shield size={15} className="text-purple-400" />
            </div>
            <span className="font-bold text-white">Account Information</span>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Full Name', value: user?.fullName },
              { label: 'Email Address', value: user?.email },
              { label: 'Account ID', value: `#${user?.id}` },
              { label: 'Member Since', value: joinDate },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <span className="text-sm text-gray-400">{label}</span>
                <span className="text-sm font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="card mb-6 animate-fade-up delay-300">
          <div className="card-title mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <Lock size={15} className="text-pink-400" />
            </div>
            <span className="font-bold text-white">Change Password</span>
          </div>

          {passSaved && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
              <CheckCircle size={15} /> Password changed successfully!
            </div>
          )}

          <form onSubmit={handleChangePassword} noValidate className="space-y-4">
            {[
              { label: 'Current Password', key: 'current', show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
              { label: 'New Password', key: 'newPass', show: showNew, toggle: () => setShowNew(!showNew) },
              { label: 'Confirm New Password', key: 'confirm', show: showNew, toggle: () => setShowNew(!showNew) },
            ].map(({ label, key, show, toggle }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={show ? 'text' : 'password'}
                    className={`input-field pl-10 pr-10 ${passErrors[key] ? 'border-red-500/60' : ''}`}
                    placeholder="••••••••"
                    value={passForm[key]}
                    onChange={e => setPassForm(p => ({ ...p, [key]: e.target.value }))}
                  />
                  <button type="button" onClick={toggle}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {passErrors[key] && <p className="text-red-400 text-xs mt-1">{passErrors[key]}</p>}
              </div>
            ))}
            <button type="submit" className="btn-primary px-6 py-2.5 text-sm">
              <Lock size={15} /> Update Password
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="card border-red-500/20 animate-fade-up delay-400">
          <div className="card-title mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <LogOut size={15} className="text-red-400" />
            </div>
            <span className="font-bold text-white">Sign Out</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">You will be redirected to the login page.</p>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all">
            <LogOut size={15} /> Sign Out of NexVault
          </button>
        </div>

      </div>
    </div>
  );
}
