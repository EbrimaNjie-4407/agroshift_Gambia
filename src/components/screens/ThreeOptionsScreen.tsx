/**
 * AgroShift Gambia — Screen 7: Three Options
 * Faithful to Figma Page 7:
 * - 3 side-by-side strategy cards:
 *   1. Current Rotation (Dark green header, "Reference" badge)
 *   2. Option A (Warm orange header, "Alternative rotation", priority-aligned)
 *   3. Option B (Dark green header, "Alternative rotation", risk-mitigated)
 * - Each card displays 3-season flow with arrows, criteria checks (Soil health, Water use, Erosion risk),
 *   and "View Details" button.
 * - Bottom action: "Next: Compare →"
 */

import React from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import { ArrowLeft, ArrowRight, ArrowDown, Check } from 'lucide-react';
import { StrategyId } from '../../types/agroshift';

export const ThreeOptionsScreen: React.FC = () => {
  const {
    evaluationResult,
    goToStep,
    prevStep,
    nextStep,
    setSelectedStrategyId,
    cropHistory,
  } = useAgroShift();

  const strategies = evaluationResult?.strategies || [];
  const currentStrategy = strategies.find((s) => s.id === 'current');
  const optionAStrategy = strategies.find((s) => s.id === 'A');
  const optionBStrategy = strategies.find((s) => s.id === 'B');

  const handleViewDetails = (id: StrategyId) => {
    setSelectedStrategyId(id);
    goToStep('strategy-detail');
  };

  return (
    <div className="space-y-6">
      {/* 3 Strategy Cards Grid (Figma Page 7) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* CARD 1: Current Rotation (Reference) */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Dark Green */}
            <div className="bg-[#166534] text-white p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Current Rotation</h3>
                <span className="bg-white text-green-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Reference
                </span>
              </div>
              <p className="text-xs text-green-100/90">Your current practice for this field.</p>
            </div>

            {/* Sequence 3 Seasons */}
            <div className="p-6 space-y-4">
              <div className="space-y-2 text-center">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 1</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {currentStrategy?.sequence[0]?.crop || cropHistory.season_1}
                  </p>
                </div>

                <div className="flex justify-center text-green-700 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 2</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {currentStrategy?.sequence[1]?.crop || cropHistory.season_2}
                  </p>
                </div>

                <div className="flex justify-center text-green-700 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 3</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {currentStrategy?.sequence[2]?.crop || cropHistory.season_3}
                  </p>
                </div>
              </div>

              {/* Impact Criteria Checkmarks */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Soil health</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {currentStrategy?.score && currentStrategy.score > 70 ? 'Good' : 'Moderate'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Water use</span>
                  </div>
                  <span className="font-semibold text-gray-800">Moderate</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Erosion risk</span>
                  </div>
                  <span className="font-semibold text-gray-800">Low</span>
                </div>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <div className="p-6 pt-0">
            <button
              onClick={() => handleViewDetails('current')}
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold rounded-lg text-xs transition cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>

        {/* CARD 2: Option A (Warm Orange Header) */}
        <div className="bg-white rounded-2xl border-2 border-amber-500 overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            {/* Header: Warm Orange */}
            <div className="bg-[#ea580c] text-white p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Option A</h3>
                <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Rank #1
                </span>
              </div>
              <p className="text-xs text-amber-100/90">Alternative rotation based on your priorities.</p>
            </div>

            {/* Sequence 3 Seasons */}
            <div className="p-6 space-y-4">
              <div className="space-y-2 text-center">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 1</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {optionAStrategy?.sequence[0]?.crop || 'Cowpea (Dual-Purpose)'}
                  </p>
                </div>

                <div className="flex justify-center text-amber-600 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 2</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {optionAStrategy?.sequence[1]?.crop || 'Early Millet (Souna)'}
                  </p>
                </div>

                <div className="flex justify-center text-amber-600 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 3</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {optionAStrategy?.sequence[2]?.crop || 'Groundnut + Sesame Intercrop'}
                  </p>
                </div>
              </div>

              {/* Impact Criteria Checkmarks */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Soil health</span>
                  </div>
                  <span className="font-semibold text-green-800">Very Good</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Water use</span>
                  </div>
                  <span className="font-semibold text-gray-800">Moderate</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Erosion risk</span>
                  </div>
                  <span className="font-semibold text-gray-800">Low</span>
                </div>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <div className="p-6 pt-0">
            <button
              onClick={() => handleViewDetails('A')}
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold rounded-lg text-xs transition cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>

        {/* CARD 3: Option B (Dark Green Header) */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Dark Green */}
            <div className="bg-[#166534] text-white p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Option B</h3>
                <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Rank #2
                </span>
              </div>
              <p className="text-xs text-green-100/90">Alternative rotation based on your priorities.</p>
            </div>

            {/* Sequence 3 Seasons */}
            <div className="p-6 space-y-4">
              <div className="space-y-2 text-center">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 1</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {optionBStrategy?.sequence[0]?.crop || 'Sorghum (Grain & Fodder)'}
                  </p>
                </div>

                <div className="flex justify-center text-green-700 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 2</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {optionBStrategy?.sequence[1]?.crop || 'Groundnut'}
                  </p>
                </div>

                <div className="flex justify-center text-green-700 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season 3</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {optionBStrategy?.sequence[2]?.crop || 'Cowpea / Fallow Rest'}
                  </p>
                </div>
              </div>

              {/* Impact Criteria Checkmarks */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Soil health</span>
                  </div>
                  <span className="font-semibold text-gray-800">Good</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Water use</span>
                  </div>
                  <span className="font-semibold text-green-800">Low</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>Erosion risk</span>
                  </div>
                  <span className="font-semibold text-gray-800">Low</span>
                </div>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <div className="p-6 pt-0">
            <button
              onClick={() => handleViewDetails('B')}
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold rounded-lg text-xs transition cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={prevStep}
          className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={nextStep}
          className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Compare</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
