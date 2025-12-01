"use client";
import { useState } from 'react';
import { Play, Plus, Trash2, X, Users, Wallet, Music } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useAppData } from '@/context/AppDataContext';
import { useLanguage } from '@/context/LanguageContext';

export default function MyTracks() {
  const { addToast } = useToast();
  const { tracks, addTrack, deleteTrack } = useAppData();
  const { t } = useLanguage();
  const [showUpload, setShowUpload] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ title: '', genre: '' });
  
  // Collaborator State (The Split Entity)
  const [splits, setSplits] = useState([{ id: 1, name: 'Me (Owner)', wallet: '0x123...', pct: 100 }]);

  // Add a new collaborator row
  const addCollaborator = () => {
    setSplits([...splits, { id: Date.now(), name: '', wallet: '', pct: 0 }]);
  };

  // Update a collaborator's percentage
  const updateSplit = (id, field, value) => {
    setSplits(splits.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Handle the final submission
  const handleUpload = () => {
    if (!formData.title) return addToast(t('tracks.titleRequired'), "error");

    // Validate Total Percentage = 100%
    const totalPct = splits.reduce((sum, s) => sum + Number(s.pct), 0);
    if (totalPct !== 100) {
      return addToast(`${t('tracks.splitsMustEqual')} ${totalPct}%`, "error");
    }

    const newTrack = {
      title: formData.title,
      role: t('tracks.master'),
      splits: splits,
      status: t('tracks.live')
    };

    addTrack(newTrack);
    setFormData({ title: '', genre: '' });
    setSplits([{ id: Date.now(), name: 'Me (Owner)', wallet: '0x123...', pct: 100 }]);
    setShowUpload(false);

    addToast(t('tracks.trackMinted'), "success");
    addToast(t('tracks.smartContractDeployed'), "info");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl font-bold text-white">{t('tracks.title')}</h1>
        <button 
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all"
        >
          {showUpload ? <X size={20} /> : <Plus size={20} />} 
          {showUpload ? t('tracks.cancel') : t('tracks.uploadNew')}
        </button>
      </div>

      {/* 🟢 ADVANCED UPLOAD FORM */}
      {showUpload && (
        <div className="glass-panel p-6 rounded-2xl mb-8 animate-fade-up border border-neon-cyan/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Metadata Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-neon-cyan">{t('tracks.trackMetadata')}</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder={t('tracks.trackTitle')} 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none"
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder={t('tracks.genre')} 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none"
                />
              </div>
            </div>

            {/* Split Registry Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-neon-purple">{t('tracks.ownershipSplits')}</h3>
                <button onClick={addCollaborator} className="text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded hover:bg-white/20">
                  <Plus size={12}/> {t('tracks.addPerson')}
                </button>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {splits.map((split, index) => (
                  <div key={split.id} className="flex gap-2 items-center">
                    <div className="bg-black/40 p-3 rounded-lg flex-1 border border-white/5">
                      <input 
                        placeholder={t('tracks.walletName')} 
                        value={split.name}
                        onChange={(e) => updateSplit(split.id, 'name', e.target.value)}
                        className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-600"
                        readOnly={index === 0} 
                      />
                    </div>
                    <div className="relative w-24">
                      <input 
                        type="number" 
                        value={split.pct}
                        onChange={(e) => updateSplit(split.id, 'pct', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-center font-bold focus:border-neon-purple outline-none" 
                      />
                      <span className="absolute right-2 top-3 text-gray-500 text-xs">%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total Calculator */}
              <div className="mt-4 flex justify-between text-sm font-bold">
                <span className="text-gray-400">{t('tracks.totalAllocation')}</span>
                <span className={`${
                  splits.reduce((acc, curr) => acc + Number(curr.pct), 0) === 100 
                  ? 'text-green-400' 
                  : 'text-red-400'
                }`}>
                  {splits.reduce((acc, curr) => acc + Number(curr.pct), 0)}%
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleUpload}
            className="w-full mt-8 py-4 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-xl shadow-lg hover:shadow-neon-cyan/50 transition-all"
          >
            {t('tracks.mintNft')}
          </button>
        </div>
      )}

      {/* TRACK LIST */}
      <div className="space-y-4">
        {tracks.length === 0 ? (
          <div className="glass-panel p-12 rounded-xl text-center">
            <Music className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">{t('tracks.noTracksYet')}</h3>
            <p className="text-gray-400 mb-6">{t('tracks.uploadFirstTrack')}</p>
            <button
              onClick={() => setShowUpload(true)}
              className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              {t('tracks.uploadYourFirst')}
            </button>
          </div>
        ) : (
          tracks.map((track) => (
          <div key={track.id} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-up">
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Play size={20} className="ml-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{track.title}</h3>
                <p className="text-xs text-gray-400">{track.role} • {track.status}</p>
              </div>
            </div>

            {/* Visual Split Bar */}
            <div className="w-full md:w-1/3 flex h-2 bg-gray-800 rounded-full overflow-hidden">
              {track.splits.map((split, i) => (
                <div 
                  key={i} 
                  style={{ width: `${split.pct}%` }} 
                  className={`h-full ${i === 0 ? 'bg-neon-purple' : 'bg-neon-cyan'} relative group cursor-help`}
                >
                  <div className="absolute bottom-4 left-0 bg-black text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {split.name}: {split.pct}%
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-white"><Wallet size={18} /></button>
              <button
                onClick={() => {
                  deleteTrack(track.id);
                  addToast(t('tracks.trackDeleted'), "success");
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
