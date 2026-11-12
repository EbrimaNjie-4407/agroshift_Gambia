/**
 * AgroShift Gambia — Printable Farmer Report Modal
 * Generates an official, clean 1-page field report suitable for printing
 * or export by farmers and Department of Agriculture extension officers.
 */

import React from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import { Printer, X, Sprout, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PrintableFarmerReportModalProps {
  onClose: () => void;
}

export const PrintableFarmerReportModal: React.FC<PrintableFarmerReportModalProps> = ({ onClose }) => {
  const {
    fieldDetails,
    location,
    cropHistory,
    farmingSystem,
    priorities,
    constraints,
    evaluationResult,
    fieldData,
  } = useAgroShift();

  const handlePrint = () => {
    window.print();
  };

  const recommendedStrategy =
    evaluationResult?.strategies?.find((s) => s.id === 'A') ||
    evaluationResult?.strategies?.[0];

  const features = fieldData?.features || {};

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8 space-y-6">
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
            <h3 className="font-bold text-gray-900 text-base">AgroShift Farmer Field Report</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="space-y-6 text-gray-800" id="farmer-report-document">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b-2 border-green-800">
            <div>
              <div className="flex items-center gap-2">
                <Sprout className="w-6 h-6 text-green-800" />
                <h1 className="text-xl font-bold text-gray-900">AgroShift Gambia</h1>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Crop-Rotation Decision Support for Rain-fed Farmers</p>
            </div>
            <div className="text-right text-xs">
              <p className="font-bold text-gray-900">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-gray-500 font-mono text-[11px]">ID: {evaluationResult?.field_id || 'field-001'}</p>
            </div>
          </div>

          {/* Section 1: Field & Farmer Information */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-gray-500 block text-[11px]">Field Name</span>
              <span className="font-bold text-gray-900">{fieldDetails.name}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">District & Region</span>
              <span className="font-bold text-gray-900">{location.district}, {location.region}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Field Size & Type</span>
              <span className="font-bold text-gray-900">{fieldDetails.size_ha} ha ({fieldDetails.field_type})</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Soil (Observed)</span>
              <span className="font-bold text-gray-900">{fieldDetails.observed_soil}</span>
            </div>
          </div>

          {/* Section 2: 3-Season History & Environmental Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 space-y-2">
              <p className="font-bold text-gray-900">Recorded Crop History</p>
              <div className="space-y-1 text-gray-700">
                <p>• <strong>Season 1 (2022/23):</strong> {cropHistory.season_1}</p>
                <p>• <strong>Season 2 (2023/24):</strong> {cropHistory.season_2}</p>
                <p>• <strong>Season 3 (2024/25):</strong> {cropHistory.season_3}</p>
                <p>• <strong>Intercropping:</strong> {farmingSystem.intercropping ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 space-y-2">
              <p className="font-bold text-gray-900">NASA & SoilGrids Evidence</p>
              <div className="space-y-1 text-gray-700">
                <p>• <strong>MERRA-2 Rain:</strong> {features.rain_total_mm?.merra2_mean ?? 1170} mm (10-yr mean)</p>
                <p>• <strong>Max Dry Spell (Jul-Sep):</strong> {features.dry_spell_max_days?.value ?? 4} days</p>
                <p>• <strong>Soil pH & SOC:</strong> pH {features.ph?.value ?? 5.3} · SOC {features.soc?.value ?? 8.1} g/kg</p>
                <p>• <strong>Slope & Relief:</strong> {features.slope_pct?.value ?? 0.8}% (gentle plain)</p>
              </div>
            </div>
          </div>

          {/* Section 3: Recommended Strategy (Option A) */}
          {recommendedStrategy && (
            <div className="p-5 rounded-xl border-2 border-green-800 bg-green-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-green-800 uppercase tracking-wider block">
                    Recommended Crop Rotation
                  </span>
                  <h3 className="font-bold text-gray-900 text-base">{recommendedStrategy.name}</h3>
                </div>
                <span className="px-2.5 py-1 bg-green-800 text-white rounded text-xs font-bold">
                  Score: {recommendedStrategy.score}/100
                </span>
              </div>

              {/* 3 Season Plan */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                {recommendedStrategy.sequence.map((seq, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-green-200">
                    <span className="text-[10px] font-semibold text-gray-400 block">{seq.season}</span>
                    <strong className="text-gray-900 text-xs block mt-0.5">{seq.crop}</strong>
                    <span className="text-[10px] text-green-700">{seq.months || 'Rainy season'}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-700 leading-relaxed pt-1">
                <strong>Agronomic Justification:</strong> {recommendedStrategy.why}
              </p>
            </div>
          )}

          {/* Section 4: Risks for Local Review */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5 text-xs text-amber-950">
            <p className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Prior To Field Execution — Check With Agricultural Extension:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
              <li>Confirm local cowpea variety germination rate at Brikama agricultural depot.</li>
              <li>Inspect field edges for Striga weed seedbanks prior to early cereal sowing.</li>
              <li>Ensure family or community harvest labour is reserved for late October lifting.</li>
            </ul>
          </div>

          {/* Scientific Disclaimer */}
          <div className="pt-2 border-t border-gray-200 text-[10px] text-gray-500 leading-relaxed italic">
            <strong>Disclaimer:</strong> {evaluationResult?.disclaimer || 'AgroShift Gambia provides decision-support guidance based on historical environmental data. It does not warrant or guarantee agricultural yield outcomes.'}
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="flex justify-end pt-3 border-t border-gray-100 no-print">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
