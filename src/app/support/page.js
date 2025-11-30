"use client";
import { useState } from 'react';
import { Mail, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do royalty splits work?",
      a: "When you upload a track, you define ownership percentages for each collaborator. These splits are locked into a smart contract and cannot be changed without consensus from all parties."
    },
    {
      q: "How long do payouts take?",
      a: "Payouts are instant once earnings are received. Traditional royalty systems take 3-6 months, but Harmoniq distributes payments within seconds using blockchain technology."
    },
    {
      q: "What wallets are supported?",
      a: "We currently support Ethereum wallets like MetaMask, WalletConnect, and Coinbase Wallet. More chains and wallets will be added soon."
    },
    {
      q: "Is my data secure?",
      a: "Yes! All ownership records are stored on the blockchain, making them immutable and transparent. Your personal data is encrypted and we never share it with third parties."
    },
    {
      q: "Can I change splits after uploading?",
      a: "No. Once a split is registered on the blockchain, it cannot be altered. This ensures fairness and prevents disputes. Always double-check before submitting."
    }
  ];

  return (
    <div className="pt-24 min-h-screen max-w-6xl mx-auto px-6 pb-16">
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="text-white">Support</span> Center
        </h1>
        <p className="text-xl text-gray-300">Get help with your account, payments, and more.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-neon-cyan" size={28} />
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
          </div>
          <p className="text-gray-300 mb-6">Having trouble with your wallet or uploads? Send us a message.</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors"
            />
            <textarea
              rows="5"
              placeholder="Describe your issue..."
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors resize-none"
            ></textarea>
            <button className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Help Resources */}
        <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="text-neon-purple" size={28} />
            <h2 className="text-2xl font-bold text-white">Quick Help</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-neon-purple/50 transition-colors cursor-pointer">
              <h3 className="font-bold text-white mb-2">Email Support</h3>
              <p className="text-sm text-gray-300">support@harmoniq.io</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-neon-cyan/50 transition-colors cursor-pointer">
              <h3 className="font-bold text-white mb-2">Documentation</h3>
              <p className="text-sm text-gray-300">Learn how to use the platform step-by-step</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-neon-purple/50 transition-colors cursor-pointer">
              <h3 className="font-bold text-white mb-2">Community Discord</h3>
              <p className="text-sm text-gray-300">Join our Discord for real-time support</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-neon-cyan" size={28} />
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-black/30 border border-white/10 rounded-lg overflow-hidden hover:border-neon-cyan/30 transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-bold text-white">{faq.q}</span>
                <ChevronDown
                  className={`text-neon-cyan transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-gray-300 border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
