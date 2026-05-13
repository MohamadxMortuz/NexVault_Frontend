import { useState, useEffect, useRef } from 'react';
import { Download, Search, FileText, AlertCircle, CheckCircle, Clock, Trash2, HardDrive, Zap, Shield, Copy, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL;

const fmt = (b) => {
  if (!b) return '—';
  return b > 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b > 1e6 ? (b / 1e6).toFixed(2) + ' MB' : (b / 1024).toFixed(1) + ' KB';
};

const fileIcon = (name = '') => {
  const ext = name.split('.').pop().toLowerCase();
  const map = { pdf: '📄', zip: '🗜️', rar: '🗜️', mp4: '🎬', mov: '🎬', mp3: '🎵', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', docx: '📝', doc: '📝', xlsx: '📊', xls: '📊', txt: '📃', js: '⚙️', py: '🐍', html: '🌐' };
  return map[ext] || '📁';
};

export default function DownloadPage() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(null);
  const [found, setFound] = useState(null);
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [dlHistory, setDlHistory] = useState([]);

  const fetchDlHistory = () => {
    fetch(`${API}/files/download-history`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.json())
      .then(data => setDlHistory(data.history || []))
      .catch(() => {});
  };
  const [downloadingId, setDownloadingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const copyLink = (shareLink, id) => {
    navigator.clipboard.writeText(`${window.location.origin}/share/${shareLink}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const [dlProgress, setDlProgress] = useState(0);
  const [dlSpeed, setDlSpeed] = useState('');
  const [dlLoaded, setDlLoaded] = useState(0);
  const [dlTotal, setDlTotal] = useState(0);
  const startTime = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API}/files/my-files`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.json())
      .then(data => { setFiles(data.files || []); setLoadingFiles(false); })
      .catch(() => setLoadingFiles(false));
    fetchDlHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshFiles = () => {
    fetch(`${API}/files/my-files`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.json())
      .then(data => setFiles(data.files || []));
  };

  const extractShareLink = (val) => {
    if (val.includes('/share/')) return val.split('/share/')[1];
    if (val.includes('/d/')) return val.split('/d/')[1];
    return val.trim();
  };

  const deleteFile = async (id) => {
    try {
      await fetch(`${API}/files/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
      setFiles(prev => prev.filter(f => f.id !== id));
    } catch {}
  };

  const triggerDownload = (shareLink, fileName, fileSize, fileId = null) => {
    setDownloadingId(shareLink);
    setDlProgress(0);
    setDlLoaded(0);
    setDlTotal(fileSize || 0);
    setDlSpeed('');
    startTime.current = Date.now();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/files/download/${shareLink}`);
    xhr.setRequestHeader('Authorization', `Bearer ${token()}`);
    xhr.responseType = 'blob';

    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setDlProgress(pct);
        setDlLoaded(e.loaded);
        setDlTotal(e.total);
        const elapsed = (Date.now() - startTime.current) / 1000;
        if (elapsed > 0) {
          const bps = e.loaded / elapsed;
          setDlSpeed(bps > 1e6 ? (bps / 1e6).toFixed(1) + ' MB/s' : (bps / 1024).toFixed(0) + ' KB/s');
        }
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setDlProgress(100);
        const url = URL.createObjectURL(xhr.response);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setStatus('success');
        setFound(prev => prev || { originalName: fileName });
        setTimeout(() => { setDownloadingId(null); setDlProgress(0); refreshFiles(); fetchDlHistory(); }, 2000);
      } else {
        setStatus('error');
        setDownloadingId(null);
        setDlProgress(0);
      }
    };

    xhr.onerror = () => { setStatus('error'); setDownloadingId(null); setDlProgress(0); };
    xhr.send();
  };

  const handleDownloadByInput = async () => {
    const val = input.trim();
    if (!val) { setStatus('error'); setFound(null); return; }
    const shareLink = extractShareLink(val);
    setStatus('loading');
    setFound(null);
    try {
      const res = await fetch(`${API}/files/info/${shareLink}`);
      if (!res.ok) { setStatus('error'); setFound(null); return; }
      const info = await res.json();
      setFound({ originalName: info.originalName, size: info.size });
      triggerDownload(shareLink, info.originalName, info.size);
    } catch {
      setStatus('error');
      setFound(null);
    }
  };

  const filtered = files.filter(f => f.originalName?.toLowerCase().includes(search.toLowerCase()));
  const activeDownload = downloadingId !== null;

  return (
    <div className="min-h-screen pb-16 px-6" style={{ paddingTop: '6rem' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 badge badge-green mb-4">
            <Download size={13} /> Download
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Download <span className="gradient-text">File</span></h1>
          <p className="text-gray-400">Paste a share link or pick from your uploaded files below.</p>
        </div>

        {/* Active Download Progress — full width banner */}
        {activeDownload && (
          <div className="mb-6 card animate-fade-up overflow-hidden" style={{ border: '1px solid rgba(0,200,83,0.3)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="animate-spin inline-block w-4 h-4 border-2 border-green-500/30 border-t-green-500 rounded-full" />
                <span className="text-white font-semibold text-sm">Downloading...</span>
                {found?.originalName && (
                  <span className="text-gray-400 text-sm truncate max-w-[180px]">{found.originalName}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {dlSpeed && <span className="text-xs text-green-400 font-mono flex items-center gap-1"><Zap size={11} />{dlSpeed}</span>}
                <span className="text-green-400 font-black text-lg">{dlProgress}%</span>
              </div>
            </div>

            {/* Animated gradient bar */}
            <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                style={{
                  width: `${dlProgress}%`,
                  background: 'linear-gradient(90deg,#00c853,#00e676,#00c853)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s linear infinite',
                }}
              />
              <div className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-50 transition-all duration-300"
                style={{ width: `${dlProgress}%`, background: 'linear-gradient(90deg,#00c853,#00e676)' }} />
            </div>

            {dlTotal > 0 && (
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{fmt(dlLoaded)} downloaded</span>
                <span>{fmt(dlTotal)} total</span>
              </div>
            )}
          </div>
        )}

        {/* Success banner */}
        {status === 'success' && !activeDownload && found && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl animate-fade-up" style={{ background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,230,118,0.25)' }}>
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-green-400 font-semibold text-sm">Download complete!</p>
              <p className="text-green-400/70 text-xs">{found.originalName} — saved to your Downloads folder.</p>
            </div>
          </div>
        )}

        {/* Input Card */}
        <div className="card mb-6 animate-fade-up delay-100">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Search size={16} className="text-purple-400" /> Enter Download Link
          </h2>
          <div className="flex gap-3">
            <input
              className="input-field flex-1"
              placeholder="Paste share link or share ID"
              value={input}
              onChange={e => { setInput(e.target.value); setStatus(null); }}
              onKeyDown={e => e.key === 'Enter' && handleDownloadByInput()}
            />
            <button className="btn-success px-6 whitespace-nowrap" onClick={handleDownloadByInput} disabled={status === 'loading' || activeDownload}>
              {status === 'loading'
                ? <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
                : <><Download size={16} /> Download</>}
            </button>
          </div>

          {status === 'error' && (
            <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-semibold text-sm">File not found</p>
                <p className="text-red-400/70 text-xs">The link is invalid or the file has been deleted.</p>
              </div>
            </div>
          )}
        </div>

        {/* My Files */}
        <div className="card animate-fade-up delay-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-purple-400" /> My Uploaded Files
            </h2>
            <span className="badge badge-purple">{files.length} files</span>
          </div>

          <div className="relative mb-4">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className="input-field pl-10" placeholder="Search by file name..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {loadingFiles ? (
            <div className="text-center py-12 space-y-3">
              <span className="animate-spin inline-block w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full" />
              <p className="text-gray-500 text-sm">Loading your files...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3 opacity-20">📭</div>
              <p className="text-gray-500 text-sm">{search ? 'No files match your search' : 'No files uploaded yet'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(file => {
                const shareLink = file.shareLink?.split('/share/')[1] || file.shareLink;
                const isThis = downloadingId === shareLink;
                return (
                  <div key={file.id} className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{ border: isThis ? '1px solid rgba(0,230,118,0.4)' : '1px solid rgba(255,255,255,0.05)', background: isThis ? 'rgba(0,200,83,0.05)' : 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: 'rgba(108,99,255,0.1)' }}>
                        {fileIcon(file.originalName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{file.originalName}</p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-gray-500"><HardDrive size={11} /> {fmt(file.size)}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-500"><Download size={11} /> {file.downloads || 0} downloads</span>
                          <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={11} /> {new Date(file.uploadedAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-500"><Shield size={11} className="text-purple-400" /> Encrypted</span>
                        </div>
                      </div>
                      <button
                        className={`btn-outline px-3 py-2 text-xs flex-shrink-0 ${copiedId === file.id ? 'text-green-400 border-green-500/40' : ''}`}
                        onClick={() => copyLink(shareLink, file.id)}
                        title="Copy share link"
                      >
                        {copiedId === file.id ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Share</>}
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
                        onClick={() => deleteFile(file.id)}
                        disabled={activeDownload}
                        title="Delete file"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        className="btn-success px-4 py-2 text-xs flex-shrink-0"
                        onClick={() => { setFound({ originalName: file.originalName }); triggerDownload(shareLink, file.originalName, file.size, file.id); }}
                        disabled={activeDownload}
                      >
                        {isThis
                          ? <span className="animate-spin w-3 h-3 border-2 border-black/30 border-t-black rounded-full" />
                          : <><Download size={13} /> Download</>}
                      </button>
                    </div>

                    {/* Per-file inline progress bar */}
                    {isThis && (
                      <div className="px-4 pb-3">
                        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                            style={{
                              width: `${dlProgress}%`,
                              background: 'linear-gradient(90deg,#00c853,#00e676,#00c853)',
                              backgroundSize: '200% 100%',
                              animation: 'shimmer 1.5s linear infinite',
                            }} />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-600">
                          <span>{fmt(dlLoaded)}</span>
                          <span className="text-green-400 font-mono">{dlProgress}% {dlSpeed && `· ${dlSpeed}`}</span>
                          <span>{fmt(dlTotal)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Download History */}
        <div className="card mt-6 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <History size={16} className="text-green-400" /> Download History
            </h2>
            <span className="badge badge-green">{dlHistory.length} downloads</span>
          </div>
          {dlHistory.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3 opacity-20">📭</div>
              <p className="text-gray-500 text-sm">No downloads yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dlHistory.map((entry, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'rgba(0,200,83,0.08)' }}>
                    {fileIcon(entry.fileName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{entry.fileName}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-gray-500"><HardDrive size={11} /> {fmt(entry.fileSize)}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={11} /> {new Date(entry.downloadedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-400 flex-shrink-0">
                    <CheckCircle size={13} /> Downloaded
                  </span>
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
