import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, CheckCircle, Copy, Clock, Trash2, CloudUpload, Shield, Zap, Lock, History, HardDrive, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:5001/api';

const fmt = (b) => b > 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b > 1e6 ? (b / 1e6).toFixed(2) + ' MB' : (b / 1024).toFixed(1) + ' KB';

const fileIcon = (name = '') => {
  const ext = name.split('.').pop().toLowerCase();
  const map = { pdf: '📄', zip: '🗜️', rar: '🗜️', mp4: '🎬', mov: '🎬', mp3: '🎵', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', docx: '📝', doc: '📝', xlsx: '📊', xls: '📊', txt: '📃', js: '⚙️', py: '🐍', html: '🌐' };
  return map[ext] || '📁';
};

const steps = ['Select File', 'Fill Details', 'Upload'];

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({ name: '', desc: '', expiry: 'after-download' });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [speed, setSpeed] = useState('');
  const [uploaded, setUploaded] = useState(0);
  const inputRef = useRef();
  const startTime = useRef(null);
  const { token } = useAuth();

  const currentStep = file ? (uploading || done ? 2 : 1) : 0;

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setForm(p => ({ ...p, name: p.name || f.name })); }
  }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setForm(p => ({ ...p, name: p.name || f.name })); }
  };

  const validate = () => {
    const errs = {};
    if (!file) errs.file = 'Please select a file.';
    if (!form.name.trim()) errs.name = 'File name is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpload = () => {
    if (!validate()) return;
    const currentToken = token();
    if (!currentToken) { setUploadError('You are not logged in. Please sign in again.'); return; }

    setUploading(true);
    setProgress(0);
    setUploaded(0);
    setSpeed('');
    setUploadError('');
    startTime.current = Date.now();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', form.name);
    formData.append('description', form.desc);
    formData.append('expiry', form.expiry);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API}/files/upload`);
    xhr.setRequestHeader('Authorization', `Bearer ${currentToken}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setProgress(pct);
        setUploaded(e.loaded);
        const elapsed = (Date.now() - startTime.current) / 1000;
        if (elapsed > 0) {
          const bps = e.loaded / elapsed;
          setSpeed(bps > 1e6 ? (bps / 1e6).toFixed(1) + ' MB/s' : (bps / 1024).toFixed(0) + ' KB/s');
        }
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        setDone({ name: data.file.originalName, size: data.file.size, link: data.file.shareLink, expiry: form.expiry });
      } else if (xhr.status === 401) {
        setUploadError('Session expired. Please log out and sign in again.');
      } else {
        try { setUploadError(JSON.parse(xhr.responseText).error || 'Upload failed.'); }
        catch { setUploadError('Upload failed. Please try again.'); }
      }
    };

    xhr.onerror = () => { setUploading(false); setUploadError('Cannot connect to server. Make sure the backend is running on port 5001.'); };
    xhr.send(formData);
  };

  const copyLink = () => { navigator.clipboard.writeText(done.link); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const t = token();
    if (!t) return;
    fetch(`${API}/files/my-files`, { headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.json())
      .then(data => setHistory(data.files || []))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const deleteFile = async (id) => {
    try {
      await fetch(`${API}/files/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
      setHistory(prev => prev.filter(f => f.id !== id));
    } catch {}
  };

  const fmt2 = (b) => b > 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b > 1e6 ? (b / 1e6).toFixed(2) + ' MB' : (b / 1024).toFixed(1) + ' KB';

  const reset = () => { setFile(null); setForm({ name: '', desc: '', expiry: 'after-download' }); setDone(null); setProgress(0); setErrors({}); setUploadError(''); setSpeed(''); setUploaded(0); };

  return (
    <div className="min-h-screen pb-16 px-6" style={{ paddingTop: '6rem' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 badge badge-purple mb-4">
            <Upload size={13} /> Upload
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Upload Your <span className="gradient-text">File</span></h1>
          <p className="text-gray-400">Securely upload files up to 30 GB with AES-256 encryption.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-8 animate-fade-up">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  i < currentStep ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : i === currentStep ? 'text-white shadow-lg shadow-purple-500/40' : 'bg-white/5 text-gray-500'
                }`}
                  style={i === currentStep ? { background: 'linear-gradient(135deg,#6c63ff,#f50057)' } : {}}>
                  {i < currentStep ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium transition-colors ${i <= currentStep ? 'text-white' : 'text-gray-600'}`}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-0.5 flex-1 mx-2 rounded-full transition-all duration-500 mb-4"
                  style={{ background: i < currentStep ? 'linear-gradient(90deg,#00c853,#00e676)' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          ))}
        </div>

        {done ? (
          /* ── Success ── */
          <div className="card animate-fade-up text-center py-10" style={{ border: '1px solid rgba(0,230,118,0.3)' }}>
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="relative w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle size={44} className="text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Upload Successful!</h2>
            <p className="text-gray-400 mb-2 text-sm">
              <span className="text-2xl mr-2">{fileIcon(done.name)}</span>
              <strong className="text-white">{done.name}</strong> · {fmt(done.size)}
            </p>

            {/* Animated complete bar */}
            <div className="mx-auto max-w-xs mb-6">
              <div className="progress-bar h-2">
                <div className="progress-fill" style={{ width: '100%', background: 'linear-gradient(90deg,#00c853,#00e676)' }} />
              </div>
            </div>

            <div className="glass rounded-2xl p-4 mb-5 text-left">
              <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Share Link</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 text-purple-300 text-sm break-all">{done.link}</code>
                <button onClick={copyLink} className={`btn-outline px-3 py-2 text-xs flex-shrink-0 ${copied ? 'text-green-400 border-green-500/40' : ''}`}>
                  {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
              {done.expiry === 'after-download'
                ? <><Trash2 size={14} className="text-red-400" /> Deletes after first download</>
                : <><Clock size={14} className="text-yellow-400" /> Deletes after {done.expiry}</>}
            </div>
            <button onClick={reset} className="btn-primary"><Upload size={16} /> Upload Another File</button>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-up delay-100">

            {/* Drop Zone */}
            <div
              className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 ${
                dragging ? 'border-purple-500 bg-purple-500/10 scale-[1.01]' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/3'
              } ${errors.file ? 'border-red-500/50' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input ref={inputRef} type="file" className="hidden" onChange={handleFile} />
              {file ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-3xl">
                    {fileIcon(file.name)}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{file.name}</p>
                    <p className="text-gray-400 text-sm">{fmt(file.size)}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-2 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all ${dragging ? 'bg-purple-500/20 scale-110' : 'bg-purple-500/10'}`}>
                    <CloudUpload size={36} className="text-purple-400" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">Drag & drop your file here</p>
                  <p className="text-gray-400 text-sm mb-4">or click to browse from your computer</p>
                  <span className="badge badge-purple">Supports all file types · Up to 30 GB</span>
                </>
              )}
            </div>
            {errors.file && <p className="text-red-400 text-xs -mt-3">{errors.file}</p>}

            {/* Form */}
            <div className="card space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">File Name *</label>
                <input className={`input-field ${errors.name ? 'border-red-500/60' : ''}`} placeholder="Enter a display name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                <textarea className="input-field resize-none" rows={2} placeholder="Optional description..." value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Expiry</label>
                <select className="input-field" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: e.target.value }))}>
                  <option value="after-download">🗑️ Delete after download</option>
                  <option value="24h">⏰ Delete after 24 hours</option>
                  <option value="7d">📅 Delete after 7 days</option>
                  <option value="never">♾️ Keep indefinitely</option>
                </select>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {uploading && (
              <div className="card overflow-hidden" style={{ border: '1px solid rgba(108,99,255,0.3)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full" />
                    <span className="text-white font-semibold text-sm">Uploading...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {speed && <span className="text-xs text-purple-400 font-mono">{speed}</span>}
                    <span className="text-purple-400 font-black text-lg">{progress}%</span>
                  </div>
                </div>

                {/* Animated gradient bar */}
                <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #6c63ff, #f50057, #6c63ff)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s linear infinite',
                    }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-60 transition-all duration-300"
                    style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#6c63ff,#f50057)' }} />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{fmt(uploaded)} uploaded</span>
                  <span>{fmt(file?.size)} total</span>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm flex items-center gap-2">
                <X size={16} className="flex-shrink-0" /> {uploadError}
              </div>
            )}

            {/* Security badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: 'AES-256 Encrypted', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: Zap, label: 'Fast Transfer', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                { icon: Lock, label: 'Secure Link', color: 'text-green-400', bg: 'bg-green-500/10' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div key={label} className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon size={15} className={color} />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{label}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary w-full justify-center py-4 text-base" onClick={handleUpload} disabled={uploading}>
              {uploading
                ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Uploading {progress}%</>
                : <><Upload size={18} /> Upload File</>}
            </button>
          </div>
        )}

        {/* Upload History */}
        <div className="card mt-6 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <History size={16} className="text-purple-400" /> Upload History
            </h2>
            <span className="badge badge-purple">{history.length} files</span>
          </div>
          {history.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3 opacity-20">📭</div>
              <p className="text-gray-500 text-sm">No uploads yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map(f => (
                <div key={f.id} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'rgba(108,99,255,0.1)' }}>
                    {fileIcon(f.originalName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{f.originalName}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-gray-500"><HardDrive size={11} /> {fmt2(f.size)}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Download size={11} /> {f.downloads || 0} downloads</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={11} /> {new Date(f.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteFile(f.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
                    title="Delete file"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}
