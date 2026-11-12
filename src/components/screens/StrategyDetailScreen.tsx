/**
 * AgroShift Gambia — Screen 8: Strategy Detail
 * Faithful to Figma Page 8:
 * - Strategy Switcher Tabs: Current Rotation | Option A | Option B
 * - Left vertical 8-section navigation:
 *   1. Sequence
 *   2. Why Suggested
 *   3. Evidence
 *   4. Benefits
 *   5. Trade-offs
 *   6. Gaps
 *   7. Risks for Local Review
 *   8. Confidence
 * - Right content pane: Seasonal timeline calendar (Jan-Dec) and section-specific details
 * - Bottom action: "View Comparison →"
 */

import React, { useState } from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';
import { StrategyId } from '../../types/agroshift';

const DETAIL_SECTIONS = [
  { id: 1, label: '1. Sequence' },
  { id: 2, label: '2. Why Suggested' },
  { id: 3, label: '3. Evidence' },
  { id: 4, label: '4. Benefits' },
  { id: 5, label: '5. Trade-offs' },
  { id: 6, label: '6. Gaps' },
  { id: 7, label: '7. Risks for Local Review' },
  { id: 8, label: '8. Confidence' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const StrategyDetailScreen: React.FC = () => {
  const {
    evaluationResult,
    selectedStrategyId,
    setSelectedStrategyId,
    activeDetailSection,
    setActiveDetailSection,
    goToStep,
  } = useAgroShift();

  const strategies = evaluationResult?.strategies || [];
  const activeStrategy =
    strategies.find((s) => s.id === selectedStrategyId) ||
    strategies[0] || {
      id: 'A',
      name: 'Option A: Legume-Cereal Nitrogen Restoring Rotation',
      score: 88,
      confidence: 'medium',
      sequence: [],
      why: 'Pending decision-engine evaluation.',
      evidence: [],
      benefits: [],
      trade_offs: [],
      gaps: [],
      risks_for_local_review: [],
    };

  return (
    <div className="space-y-6">
      {/* Top Strategy Switcher Bar (Figma Page 8) */}
      <div className="bg-gray-100 p-1.5 rounded-xl flex items-center gap-2 max-w-xl">
        <button
          onClick={() => setSelectedStrategyId('current')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition cursor-pointer ${
            selectedStrategyId === 'current'
              ? 'bg-green-800 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Current Rotation
        </button>

        <button
          onClick={() => setSelectedStrategyId('A')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition cursor-pointer ${
            selectedStrategyId === 'A'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Option A (Rank #1)
        </button>

        <button
          onClick={() => setSelectedStrategyId('B')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition cursor-pointer ${
            selectedStrategyId === 'B'
              ? 'bg-green-800 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Option B (Rank #2)
        </button>
      </div>

      {/* Main Grid: Left 8-Section Nav & Right Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sub-Navigation (Figma Page 8) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-3 shadow-xs space-y-1">
          {DETAIL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveDetailSection(sec.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeDetailSection === sec.id
                  ? 'bg-green-50 text-green-800 border-l-4 border-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Right Content Pane (Figma Page 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs space-y-6">
          {/* SECTION 1: Sequence & Timeline */}
          {activeDetailSection === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">1. Sequence</h3>
                <p className="text-xs text-gray-500 mt-1">Crop sequence and timing for this strategy.</p>
              </div>

              {/* Seasonal Timeline Calendar */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 tracking-wider uppercase">
                  <span>Seasonal Timeline · Example</span>
                  <span className="text-green-700 font-medium">Brikama Rain-Fed Season</span>
                </div>

                {/* Timeline Gantt Bar (Jan-Dec) */}
                <div className="space-y-1.5 pt-2">
                  <div className="grid grid-cols-12 gap-1 text-[10px] font-mono text-gray-400 text-center">
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>

                  {/* Multi-colored timeline segments */}
                  <div className="grid grid-cols-12 h-9 rounded-lg overflow-hidden border border-gray-300">
                    <div className="col-span-2 bg-gray-100 flex items-center justify-center text-[9px] text-gray-400">Dry</div>
                    <div className="col-span-2 bg-amber-100/70 border-l border-amber-200 flex items-center justify-center text-[9px] text-amber-800 font-medium">Land Prep</div>
                    <div className="col-span-5 bg-green-600 text-white flex items-center justify-center text-[10px] font-bold shadow-inner">
                      Rain-Fed Vegetative Cycle
                    </div>
                    <div className="col-span-3 bg-amber-500 text-white flex items-center justify-center text-[9px] font-bold">
                      Harvest & Stover
                    </div>
                  </div>
                </div>

                {/* Strategy Sequence Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  {activeStrategy.sequence.map((step, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 text-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {step.season}
                      </span>
                      <p className="font-bold text-gray-900 text-sm mt-0.5">{step.crop}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{step.type} · {step.months || 'Rainy season'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: Why Suggested */}
          {activeDetailSection === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">2. Why Suggested</h3>
                <p className="text-xs text-gray-500 mt-1">Agronomic rationale and constraint balance.</p>
              </div>
              <div className="p-5 rounded-xl bg-green-50/60 border border-green-200 text-sm text-gray-800 leading-relaxed">
                {activeStrategy.why}
              </div>
            </div>
          )}

          {/* SECTION 3: Evidence */}
          {activeDetailSection === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">3. Evidence</h3>
                <p className="text-xs text-gray-500 mt-1">Direct environmental features supporting this recommendation.</p>
              </div>
              <div className="space-y-3">
                {activeStrategy.evidence.map((ev, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-green-800">
                      <span>Feature: {ev.feature}</span>
                      <span className="text-gray-400 font-normal">{ev.source}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{ev.observation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: Benefits */}
          {activeDetailSection === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">4. Benefits</h3>
                <p className="text-xs text-gray-500 mt-1">Agronomic advantages for soil, yield stability, and income.</p>
              </div>
              <ul className="space-y-2.5">
                {activeStrategy.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 5: Trade-offs */}
          {activeDetailSection === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">5. Trade-offs</h3>
                <p className="text-xs text-gray-500 mt-1">Realistic management compromises to anticipate.</p>
              </div>
              <ul className="space-y-2.5">
                {activeStrategy.trade_offs.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 6: Gaps */}
          {activeDetailSection === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">6. Data Gaps & Limitations</h3>
                <p className="text-xs text-gray-500 mt-1">Known resolution and measurement limitations in pilot datasets.</p>
              </div>
              <ul className="space-y-2.5">
                {activeStrategy.gaps.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 7: Risks for Local Review */}
          {activeDetailSection === 7 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">7. Risks for Local Review</h3>
                <p className="text-xs text-gray-500 mt-1">Items requiring field confirmation by Gambian agricultural extension officers.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                {activeStrategy.risks_for_local_review.map((r, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{r}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 8: Confidence */}
          {activeDetailSection === 8 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">8. Confidence Assessment</h3>
                <p className="text-xs text-gray-500 mt-1">Transparency regarding data resolution and model certainty.</p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 text-xs text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Confidence Rating:</span>
                  <span className="font-bold text-green-800 uppercase px-2 py-0.5 bg-green-100 rounded">
                    {activeStrategy.confidence} Confidence
                  </span>
                </div>
                <p className="leading-relaxed">
                  Under AgroShift scientific rules, rainfall-derived strategies do not exceed Medium confidence because satellite and reanalysis data represent spatial grid averages rather than continuous on-farm weather stations. Recommendations should be validated by local extension agents before planting.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => goToStep('strategies')}
          className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Options</span>
        </button>

        <button
          onClick={() => goToStep('compare-report')}
          className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <span>View Comparison</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
