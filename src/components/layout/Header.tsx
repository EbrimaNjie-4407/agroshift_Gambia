/**
 * AgroShift Gambia — Top Header
 * Matching the Figma UI navigation bar with logo, links, backend connection status, and farmer profile.
 */

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useAgroShift } from '../../context/AgroShiftContext';

export const Header: React.FC = () => {
  const { backendHealth, checkHealth, goToStep, currentStep } = useAgroShift();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => goToStep('overview')}
          className="flex items-center cursor-pointer select-none group"
        >
          <div className="w-36 h-14 overflow-hidden flex items-center justify-start">
            <img
              src="/assets/aistudio/logo_agroshift_af326e9b.jpeg"
              alt="AgroShift Gambia"
              className="w-full h-full object-cover object-center transition-opacity group-hover:opacity-90"
            />
          </div>
        </div>

        {/* Center Nav Links (from Figma P1 - shown only on landing page) */}
        {currentStep === 'overview' && (
          <nav className="hidden md:flex items-center gap-1 bg-green-900/90 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
            <button
              onClick={() => goToStep('overview')}
              className={`px-3 py-1 rounded-full transition ${currentStep === 'overview' ? 'bg-white text-green-950 font-semibold shadow-xs' : 'text-green-100 hover:text-white'}`}
            >
              HOME
            </button>
            <button
              onClick={() => goToStep('choose-field')}
              className={`px-3 py-1 rounded-full transition ${currentStep !== 'overview' ? 'bg-white/20 text-white font-semibold' : 'text-green-100 hover:text-white'}`}
            >
              MY FARM
            </button>
            <button
              onClick={() => goToStep('evidence')}
              className="px-3 py-1 rounded-full text-green-100 hover:text-white transition"
            >
              DATA EVIDENCE
            </button>
            <button
              onClick={() => goToStep('strategies')}
              className="px-3 py-1 rounded-full text-green-100 hover:text-white transition"
            >
              STRATEGIES
            </button>
            <button
              onClick={() => alert('AgroShift Gambia evaluates 10-year NASA POWER rain, MODIS NDVI vegetation cover, SMAP soil moisture, and ISRIC SoilGrids data to recommend 3 agronomic crop rotations.')}
              className="px-3 py-1 rounded-full text-green-100 hover:text-white transition"
            >
              HOW IT WORKS
            </button>
          </nav>
        )}

        {/* Right Section: Backend Connection Pill & Farmer Profile */}
        <div className="flex items-center gap-3">
          {/* Live Backend Connection Indicator */}
          <div
            title={`FastAPI Backend: ${backendHealth.url} (${backendHealth.status})`}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80"
          >
            <span className="relative flex h-2 w-2">
              {backendHealth.status === 'online' ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </>
              ) : backendHealth.status === 'checking' ? (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 animate-pulse"></span>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              )}
            </span>
            <span className="font-mono text-[11px] text-gray-700 font-medium">
              {backendHealth.status === 'online' ? 'FastAPI Online' : backendHealth.status === 'checking' ? 'Connecting...' : 'API Offline'}
            </span>
            <button
              onClick={() => checkHealth()}
              className="text-gray-400 hover:text-gray-600 ml-0.5 p-0.5 transition"
              title="Ping Backend Health"
            >
              <RefreshCw className={`w-3 h-3 ${backendHealth.status === 'checking' ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Farmer Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center text-xs font-semibold">
              NJ
            </div>
            <div className="hidden sm:block text-left text-xs leading-tight">
              <p className="font-semibold text-gray-900">Farmer</p>
              <p className="text-[11px] text-gray-500">Brikama Manduar</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
