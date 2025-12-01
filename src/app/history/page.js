"use client";
import { useState } from 'react';
import { Search, ArrowDownLeft } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { useLanguage } from '@/context/LanguageContext';

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const { transactions } = useAppData();
  const { t } = useLanguage();

  const allTransactions = transactions;

  // FILTER LOGIC
  // If search is empty, show all. If not, filter by Track Name.
  const filteredData = allTransactions.filter((tx) => 
    tx.track.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tx.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">{t('history.title')}</h1>
      </div>

      {/* SEARCH BAR (Functional) */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder={t('history.searchPlaceholder')} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple outline-none"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {allTransactions.length === 0 ? (
          <div className="glass-panel p-12 rounded-xl text-center">
            <ArrowDownLeft className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">{t('history.noTransactionHistory')}</h3>
            <p className="text-gray-400">{t('history.paymentsWillAppear')}</p>
          </div>
        ) : filteredData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('history.noTransactionsFound')} "{searchTerm}"</p>
        ) : (
          filteredData.map((tx) => (
            <div key={tx.id} className="glass-panel p-4 rounded-xl flex items-center justify-between">
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-400">
                  <ArrowDownLeft size={24} />
                </div>
                <div>
                  <p className="text-white font-bold">{tx.track}</p>
                  <p className="text-xs text-gray-500">{tx.source}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-white">{tx.amount}</p>
                <span className={`text-xs ${tx.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {tx.status === 'Paid' ? t('history.paid') : t('history.pending')}
                </span>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
