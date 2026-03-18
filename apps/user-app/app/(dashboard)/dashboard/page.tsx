"use client";
import React, { useState, useEffect } from 'react';
import { Wallet, Shield, Zap, Globe, ArrowRight, CheckCircle, Menu, X } from 'lucide-react';

export default function MudraLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Transfers",
      description: "Send money in seconds to anyone, anywhere in India"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Military-grade encryption keeps your money safe"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Acceptance",
      description: "Pay at millions of merchants across the country"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/30 backdrop-blur-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <svg width="32" height="32" viewBox="0 0 400 300" className="w-8 h-8">
              <g>
                <path d="M300,230 L100,230 C100,230 100,240 120,240 L380,240 C380,240 380,230 360,230 Z" fill="#4F46E5" stroke="none"/>
                <rect x="160" y="80" width="180" height="120" rx="8" fill="white" stroke="#1E3A5F" strokeWidth="6"/>
                <rect x="220" y="100" width="100" height="80" rx="4" fill="none" stroke="#E0E0E0" strokeWidth="2"/>
                <rect x="170" y="110" width="30" height="30" rx="4" fill="#4F46E5"/>
                <text x="210" y="130" fontFamily="Arial" fontSize="20" fill="#1E3A5F" fontWeight="bold">MudRa</text>
                <path d="M280,60 L340,120 L380,80 C380,80 360,60 340,60 L300,60 C300,60 280,60 280,80 Z" fill="white" stroke="#1E3A5F" strokeWidth="6"/>
                <circle cx="360" cy="210" r="8" fill="#1E3A5F"/>
                <path d="M365,205 L370,210 L365,215" fill="none" stroke="#1E3A5F" strokeWidth="2"/>
              </g>
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Mudra
            </span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
          
            {/* <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              Get Started
            </button> */}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-black/40 backdrop-blur-lg px-6 py-4 space-y-4">
            <a href="#features" className="block hover:text-pink-400 transition">Features</a>
            <a href="#security" className="block hover:text-pink-400 transition">Security</a>
        
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2 rounded-full">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Money,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of payments with Mudra. Fast, secure, and incredibly simple.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          
            <button className="border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </div>

          <div className="pt-12 flex justify-center gap-12 text-sm">
            <div>
              <div className="text-3xl font-bold text-blue-400">10M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400">₹500Cr+</div>
              <div className="text-gray-400">Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose <span className="text-blue-400">Mudra</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Your Security is Our <span className="text-blue-400">Priority</span>
              </h2>
              <p className="text-gray-300 text-lg">
                We use cutting-edge technology to protect your money and personal information at every step.
              </p>
              
              <div className="space-y-4">
                {['256-bit encryption', 'Two-factor authentication', 'Real-time fraud detection'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <Shield className="w-full h-64 text-blue-400 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300">
            Join millions of Indians managing their money smarter with Mudra
          </p>
          <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-5 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2">
            Download Mudra
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 400 300" className="w-6 h-6">
              <g>
                <path d="M300,230 L100,230 C100,230 100,240 120,240 L380,240 C380,240 380,230 360,230 Z" fill="#4F46E5" stroke="none"/>
                <rect x="160" y="80" width="180" height="120" rx="8" fill="white" stroke="#1E3A5F" strokeWidth="6"/>
                <rect x="220" y="100" width="100" height="80" rx="4" fill="none" stroke="#E0E0E0" strokeWidth="2"/>
                <rect x="170" y="110" width="30" height="30" rx="4" fill="#4F46E5"/>
                <text x="210" y="130" fontFamily="Arial" fontSize="20" fill="#1E3A5F" fontWeight="bold">MudRa</text>
                <path d="M280,60 L340,120 L380,80 C380,80 360,60 340,60 L300,60 C300,60 280,60 280,80 Z" fill="white" stroke="#1E3A5F" strokeWidth="6"/>
                <circle cx="360" cy="210" r="8" fill="#1E3A5F"/>
                <path d="M365,205 L370,210 L365,215" fill="none" stroke="#1E3A5F" strokeWidth="2"/>
              </g>
            </svg>
            <span className="text-xl font-bold text-white">Mudra</span>
          </div>
          <p>© 2026 Mudra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}