/**
 * AgroShift Gambia — Screen 4: Farmer Priorities & Limits
 * Faithful to Figma Page 4:
 * - Left card: Your Priorities (5 sliders with icons, % label, and numeric box)
 *   1. Conserve Water (Droplet)
 *   2. Improve Soil Health (Leaf)
 *   3. Increase Food Production (Sprout)
 *   4. Generate Income (Database/Coins)
 *   5. Reduce Labour (Users)
 * - Right card: Practical Constraints (4 dropdowns: Water source, Seed, Labour, Budget)
 * - Bottom action: "Start Analysis →" triggering live decision-engine evaluation
 */

import React from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import {
  Droplets,
  Leaf,
  Sprout,
  Coins,
  Users,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

const WATER_SOURCES = [
  'Rain-fed only',
  'Well / Borehole',
  'River / Stream',
  'Supplemental irrigation',
] as const;

const SEED_AVAILABILITY = [
  'High / Certified',
  'Medium / Local market',
  'Low / Saved seed only',
] as const;

const LABOUR_AVAILABILITY = [
  'Abundant family labour',
  'Moderate hired labour',
  'Scarce / Family only',
] as const;

const BUDGET_LEVELS = [
  'Low / Minimal input',
  'Moderate',
  'High / Commercial inputs',
] as const;

export const PrioritiesLimitsScreen: React.FC = () => {
  const {
    priorities,
    setPriorities,
    constraints,
    setConstraints,
    prevStep,
    runEvaluation,
    isEvaluating,
  } = useAgroShift();

  const handlePriorityChange = (key: keyof typeof priorities, val: number) => {
    setPriorities({ ...priorities, [key]: val });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column Card: Your Priorities (Figma Page 4) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900">Your Priorities</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Allocate weights to help the engine rank strategy trade-offs to your goals.
            </p>
          </div>

          <div className="space-y-5">
            {/* 1. Conserve Water */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 font-medium text-gray-900">
                  <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Conserve Water</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{priorities.conserve_water}%</span>
                  <div className="w-10 h-7 rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center font-mono text-xs text-gray-700">
                    {priorities.conserve_water}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priorities.conserve_water}
                onChange={(e) => handlePriorityChange('conserve_water', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-800"
              />
            </div>

            {/* 2. Improve Soil Health */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 font-medium text-gray-900">
                  <Leaf className="w-4 h-4 text-green-700 shrink-0" />
                  <span>Improve Soil Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{priorities.improve_soil_health}%</span>
                  <div className="w-10 h-7 rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center font-mono text-xs text-gray-700">
                    {priorities.improve_soil_health}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priorities.improve_soil_health}
                onChange={(e) => handlePriorityChange('improve_soil_health', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-800"
              />
            </div>

            {/* 3. Increase Food Production */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 font-medium text-gray-900">
                  <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Increase Food Production</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{priorities.increase_food_production}%</span>
                  <div className="w-10 h-7 rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center font-mono text-xs text-gray-700">
                    {priorities.increase_food_production}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priorities.increase_food_production}
                onChange={(e) => handlePriorityChange('increase_food_production', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-800"
              />
            </div>

            {/* 4. Generate Income */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 font-medium text-gray-900">
                  <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Generate Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{priorities.generate_income}%</span>
                  <div className="w-10 h-7 rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center font-mono text-xs text-gray-700">
                    {priorities.generate_income}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priorities.generate_income}
                onChange={(e) => handlePriorityChange('generate_income', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-800"
              />
            </div>

            {/* 5. Reduce Labour */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5 font-medium text-gray-900">
                  <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Reduce Labour</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{priorities.reduce_labour}%</span>
                  <div className="w-10 h-7 rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center font-mono text-xs text-gray-700">
                    {priorities.reduce_labour}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priorities.reduce_labour}
                onChange={(e) => handlePriorityChange('reduce_labour', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-800"
              />
            </div>
          </div>
        </div>

        {/* Right Column Card: Practical Constraints (Figma Page 4) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-gray-900">Practical Constraints</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Hard constraints checked by the engine before scoring candidates.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Water source
              </label>
              <select
                value={constraints.water_source}
                onChange={(e) => setConstraints({ ...constraints, water_source: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-800"
              >
                {WATER_SOURCES.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Seed availability
              </label>
              <select
                value={constraints.seed_availability}
                onChange={(e) => setConstraints({ ...constraints, seed_availability: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-800"
              >
                {SEED_AVAILABILITY.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Labour availability
              </label>
              <select
                value={constraints.labour_availability}
                onChange={(e) => setConstraints({ ...constraints, labour_availability: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-800"
              >
                {LABOUR_AVAILABILITY.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Budget level
              </label>
              <select
                value={constraints.budget_level}
                onChange={(e) => setConstraints({ ...constraints, budget_level: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-800"
              >
                {BUDGET_LEVELS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
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
          onClick={runEvaluation}
          disabled={isEvaluating}
          className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{isEvaluating ? 'Evaluating...' : 'Start Analysis'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
