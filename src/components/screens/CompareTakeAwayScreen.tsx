/**
 * AgroShift Gambia — Screen 9: Compare & Take Away
 * Faithful to Figma Page 9:
 * - Top header with Download Report & Share buttons
 * - Strategic Comparison matrix table (Criteria vs Current vs Option A vs Option B)
 * - Trade-off View 2D scatter plot (Water Demand vs Soil Health)
 * - "Our Recommendation" banner with sun icon
 * - "Get Your Farmer Report →" action triggering printable 1-page report
 */

import React, { useState } from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import { ArrowLeft, Download, Share2, Sun, FileText, CheckCircle2 } from 'lucide-react';
import { PrintableFarmerReportModal } from './PrintableFarmerReportModal';

export const CompareTakeAwayScreen: React.FC = () => {
  const { evaluationResult, prevStep } = useAgroShift();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [copyShareMessage, setCopyShareMessage] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyShareMessage(true);
    setTimeout(() => setCopyShareMessage(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Tag and Action Bar (Figma Page 9) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            Example Strategies · For Local Review
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Download Report</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-500" />
            <span>{copyShareMessage ? 'Copied Link!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Two Column Grid: Comparison Table (Left) & Trade-off View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Strategic Comparison Table (Figma Page 9) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Strategic Comparison</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-semibold">
                    <th className="py-2.5 pr-4 text-green-900 font-bold">Criteria</th>
                    <th className="py-2.5 px-3">Current</th>
                    <th className="py-2.5 px-3 text-amber-700 font-bold">Option A</th>
                    <th className="py-2.5 px-3 text-green-800 font-bold">Option B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Soil Health</td>
                    <td className="py-3 px-3 text-gray-600">Good</td>
                    <td className="py-3 px-3 font-semibold text-green-700">Very Good</td>
                    <td className="py-3 px-3 text-gray-700">Good</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Water Use</td>
                    <td className="py-3 px-3 text-gray-600">Moderate</td>
                    <td className="py-3 px-3 text-gray-700">Moderate</td>
                    <td className="py-3 px-3 font-semibold text-green-700">Low</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Nitrogen Control</td>
                    <td className="py-3 px-3 text-gray-600">Low</td>
                    <td className="py-3 px-3 text-gray-600">Low</td>
                    <td className="py-3 px-3 text-gray-600">Very Low</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Erosion Risk</td>
                    <td className="py-3 px-3 text-gray-600">Low</td>
                    <td className="py-3 px-3 text-gray-600">Low</td>
                    <td className="py-3 px-3 text-gray-600">Low</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Labour Fit</td>
                    <td className="py-3 px-3 text-gray-600">Moderate</td>
                    <td className="py-3 px-3 font-semibold text-green-700">High</td>
                    <td className="py-3 px-3 text-gray-700">Moderate</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Income Potential</td>
                    <td className="py-3 px-3 text-gray-700">Good</td>
                    <td className="py-3 px-3 font-semibold text-green-700">Very Good</td>
                    <td className="py-3 px-3 text-gray-700">Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Trade-off View 2D Scatter Plot (Figma Page 9) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-gray-900">Trade-off View</h3>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-medium text-gray-600 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Option A
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                Option B
              </span>
            </div>

            {/* 2D Coordinate Scatter Plot */}
            <div className="relative border border-gray-200 rounded-xl p-4 bg-gray-50/30">
              <span className="text-[10px] text-gray-400 font-semibold absolute top-2 left-2">
                Soil Health
              </span>
              <span className="text-[9px] text-gray-400 absolute top-7 left-2">High</span>
              <span className="text-[9px] text-gray-400 absolute top-24 left-2">Medium</span>
              <span className="text-[9px] text-gray-400 absolute bottom-7 left-2">Low</span>

              {/* 2x2 Grid Area */}
              <div className="ml-12 mr-2 my-6 h-40 border border-gray-300 bg-white relative">
                {/* Horizontal & Vertical grid crosshair lines */}
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-200" />
                <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-gray-200" />

                {/* Point 1: Current Practice (Gray: Medium Water, Medium-Low Soil Health) */}
                <div
                  className="absolute w-3.5 h-3.5 rounded-full bg-gray-400 border-2 border-white shadow-xs transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '55%', top: '45%' }}
                  title="Current: Medium Water, Moderate Soil"
                />

                {/* Point 2: Option A (Orange: Medium Water, High Soil Health) */}
                <div
                  className="absolute w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '72%', top: '25%' }}
                  title="Option A: Balanced Water, High Soil Health"
                />

                {/* Point 3: Option B (Green: Low Water, Medium Soil Health) */}
                <div
                  className="absolute w-3.5 h-3.5 rounded-full bg-green-600 border-2 border-white shadow-xs transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '42%', top: '55%' }}
                  title="Option B: Low Water Demand, Good Resilience"
                />
              </div>

              {/* X Axis Labels */}
              <div className="ml-12 mr-2 flex justify-between text-[9px] text-gray-400 pt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
              <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                Water Demand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Recommendation Banner (Figma Page 9) */}
      <div className="bg-[#f0f7f2] border border-[#d6ebd9] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700 shadow-xs">
          <Sun className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-gray-800">
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">Our Recommendation</h4>
          <p className="leading-relaxed text-gray-700">
            Option A offers the best balance for your priorities, especially if you want to improve soil health while keeping water use moderate.
          </p>
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
          onClick={() => setShowPrintModal(true)}
          className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Get Your Farmer Report</span>
        </button>
      </div>

      {/* Printable Report Modal */}
      {showPrintModal && (
        <PrintableFarmerReportModal onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
};
