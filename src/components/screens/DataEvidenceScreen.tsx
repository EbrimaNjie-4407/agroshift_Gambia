/**
 * AgroShift Gambia — Screen 6: What the Data Says
 * Faithful to Figma Page 6:
 * - Filter dropdowns: "Last 10 years" & "View: Charts"
 * - Left column: 5 metric cards (Rainfall, Temperature, Soil Moisture, Vegetation NDVI, Soil Properties)
 * - Right column:
 *   - Seasonal Trend line chart with tabs (Rainfall, Temperature, NDVI, Soil Moisture)
 *   - Data Sources & Details provenance box (NASA POWER, MODIS, SMAP, SoilGrids)
 * - Bottom action: "View Rotation Options →"
 */

import React, { useState } from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import {
  Droplets,
  Thermometer,
  Leaf,
  Sprout,
  Waves,
  Info,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

// Monthly rainfall reference profile for Brikama Manduar (Jan-Dec mm)
const RAINFALL_TREND = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Apr', value: 2 },
  { month: 'May', value: 25 },
  { month: 'Jun', value: 165 },
  { month: 'Jul', value: 285 },
  { month: 'Aug', value: 340 },
  { month: 'Sep', value: 260 },
  { month: 'Oct', value: 90 },
  { month: 'Nov', value: 5 },
  { month: 'Dec', value: 0 },
];

const TEMP_TREND = [
  { month: 'Jan', value: 31 },
  { month: 'Feb', value: 34 },
  { month: 'Mar', value: 36 },
  { month: 'Apr', value: 37 },
  { month: 'May', value: 35 },
  { month: 'Jun', value: 33 },
  { month: 'Jul', value: 31 },
  { month: 'Aug', value: 30 },
  { month: 'Sep', value: 31 },
  { month: 'Oct', value: 32 },
  { month: 'Nov', value: 33 },
  { month: 'Dec', value: 31 },
];

const NDVI_TREND = [
  { month: 'Jan', value: 0.35 },
  { month: 'Feb', value: 0.30 },
  { month: 'Mar', value: 0.27 },
  { month: 'Apr', value: 0.25 },
  { month: 'May', value: 0.26 },
  { month: 'Jun', value: 0.38 },
  { month: 'Jul', value: 0.62 },
  { month: 'Aug', value: 0.74 },
  { month: 'Sep', value: 0.76 },
  { month: 'Oct', value: 0.65 },
  { month: 'Nov', value: 0.46 },
  { month: 'Dec', value: 0.39 },
];

const SMAP_TREND = [
  { month: 'Jan', value: 0.12 },
  { month: 'Feb', value: 0.10 },
  { month: 'Mar', value: 0.09 },
  { month: 'Apr', value: 0.08 },
  { month: 'May', value: 0.10 },
  { month: 'Jun', value: 0.16 },
  { month: 'Jul', value: 0.22 },
  { month: 'Aug', value: 0.29 },
  { month: 'Sep', value: 0.26 },
  { month: 'Oct', value: 0.21 },
  { month: 'Nov', value: 0.15 },
  { month: 'Dec', value: 0.13 },
];

export const DataEvidenceScreen: React.FC = () => {
  const { fieldData, nextStep, prevStep } = useAgroShift();
  const [activeTab, setActiveTab] = useState<'Rainfall' | 'Temperature' | 'NDVI' | 'Soil Moisture'>('Rainfall');
  const [selectedSourceModal, setSelectedSourceModal] = useState<string | null>(null);

  const features = fieldData?.features || {};
  const rainTotal = features.rain_total_mm?.merra2_mean ?? 1170.3;
  const imergTotal = features.rain_total_mm?.imerg_mean ?? 1111.5;
  const maxDrySpell = features.dry_spell_max_days?.value ?? 4;
  const soilPh = features.ph?.value ?? 5.3;
  const soilSoc = features.soc?.value ?? 8.1;
  const modisNdvi = features.ndvi_cover_nov_jun?.value ?? 0.31;
  const smapMoisture = features.soil_moisture_regional?.value ?? 0.252;

  // Select active chart series
  const chartData =
    activeTab === 'Rainfall'
      ? RAINFALL_TREND
      : activeTab === 'Temperature'
      ? TEMP_TREND
      : activeTab === 'NDVI'
      ? NDVI_TREND
      : SMAP_TREND;

  const yMax =
    activeTab === 'Rainfall'
      ? 350
      : activeTab === 'Temperature'
      ? 45
      : activeTab === 'NDVI'
      ? 1.0
      : 0.4;

  return (
    <div className="space-y-6">
      {/* Top Filter Controls (Figma Page 6) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <select className="px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 shadow-xs focus:outline-none">
            <option>Last 10 years (2015 - 2025)</option>
            <option>2025 Wet Season</option>
            <option>2024 Wet Season</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select className="px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 shadow-xs focus:outline-none">
            <option>View: Charts</option>
            <option>View: Tables</option>
          </select>
        </div>
      </div>

      {/* Main Grid: 5 Metrics Cards (Left) & Trend + Sources (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Indicator Cards (Figma Page 6) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Card 1: Rainfall */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-center justify-between hover:border-gray-300 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Rainfall</p>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">
                  {rainTotal} mm <span className="text-xs font-normal text-gray-500">/ season</span>
                </p>
                <p className="text-[11px] text-gray-500">MERRA-2: {rainTotal} mm · IMERG: {imergTotal} mm</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSourceModal('NASA POWER')}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Temperature */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-center justify-between hover:border-gray-300 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Temperature</p>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">
                  34°C <span className="text-xs font-normal text-gray-500">max / 21°C min</span>
                </p>
                <p className="text-[11px] text-gray-500">NASA POWER agroclimatology</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSourceModal('NASA POWER')}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Soil Moisture */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-center justify-between hover:border-gray-300 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Soil Moisture</p>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">
                  {smapMoisture} m³/m³
                </p>
                <p className="text-[11px] text-gray-500">SMAP L4 subsoil rootzone assimilation</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSourceModal('SMAP')}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Vegetation (NDVI) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-center justify-between hover:border-gray-300 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Vegetation (NDVI)</p>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">
                  {modisNdvi} <span className="text-xs font-normal text-gray-500">index</span>
                </p>
                <p className="text-[11px] text-gray-500">Nov-Jun landscape background cover</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSourceModal('MODIS (NDVI)')}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Card 5: Soil Properties */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-center justify-between hover:border-gray-300 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Soil Properties</p>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">
                  pH {soilPh} · SOC {soilSoc} g/kg
                </p>
                <p className="text-[11px] text-gray-500">ISRIC SoilGrids 2.0 (57% sand, 12% clay)</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSourceModal('Global Soil Maps')}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Seasonal Trend Line Chart & Data Sources */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Card: Seasonal Trend Line Chart (Figma Page 6) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-gray-900">Seasonal Trend (Example)</h3>

              {/* Metric Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
                {(['Rainfall', 'Temperature', 'NDVI', 'Soil Moisture'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === tab
                        ? 'bg-green-800 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-56 w-full pt-4 relative">
              {/* Y Axis Gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400 font-mono pb-6 pr-2">
                <div className="border-b border-gray-100 w-full flex justify-between">
                  <span>{Math.round(yMax)}</span>
                </div>
                <div className="border-b border-gray-100 w-full flex justify-between">
                  <span>{Math.round(yMax * 0.66)}</span>
                </div>
                <div className="border-b border-gray-100 w-full flex justify-between">
                  <span>{Math.round(yMax * 0.33)}</span>
                </div>
                <div className="border-b border-gray-200 w-full flex justify-between">
                  <span>0</span>
                </div>
              </div>

              {/* SVG Line and Points */}
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 150">
                {/* Connecting Polyline */}
                <polyline
                  fill="none"
                  stroke="#166534"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartData
                    .map((d, i) => {
                      const x = 20 + i * (460 / 11);
                      const y = 140 - (d.value / yMax) * 130;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* Data Points */}
                {chartData.map((d, i) => {
                  const x = 20 + i * (460 / 11);
                  const y = 140 - (d.value / yMax) * 130;
                  return (
                    <g key={i} className="group">
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#166534"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition hover:r-6 cursor-pointer"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* X Axis Month Labels */}
              <div className="flex justify-between text-[11px] font-medium text-gray-500 pt-2 px-2">
                {chartData.map((d) => (
                  <span key={d.month}>{d.month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Card: Data Sources & Details (Figma Page 6) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900">Data Sources & Details</h3>

            <div className="divide-y divide-gray-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900">NASA POWER</span>
                  <span className="text-gray-500 ml-4">Weather data (MERRA-2 & GPM IMERG)</span>
                </div>
                <button onClick={() => setSelectedSourceModal('NASA POWER')} className="text-gray-400 hover:text-gray-700">
                  <Info className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900">MODIS (NDVI)</span>
                  <span className="text-gray-500 ml-4">Vegetation index (250m composite)</span>
                </div>
                <button onClick={() => setSelectedSourceModal('MODIS (NDVI)')} className="text-gray-400 hover:text-gray-700">
                  <Info className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900">SMAP</span>
                  <span className="text-gray-500 ml-4">Soil moisture (~9km regional assimilation)</span>
                </div>
                <button onClick={() => setSelectedSourceModal('SMAP')} className="text-gray-400 hover:text-gray-700">
                  <Info className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900">Global Soil Maps</span>
                  <span className="text-gray-500 ml-4">Soil properties (ISRIC SoilGrids 2.0)</span>
                </div>
                <button onClick={() => setSelectedSourceModal('Global Soil Maps')} className="text-gray-400 hover:text-gray-700">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provenance Details Modal */}
      {selectedSourceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h4 className="font-bold text-gray-900 text-base">{selectedSourceModal} Provenance</h4>
              <button
                onClick={() => setSelectedSourceModal(null)}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
              {selectedSourceModal === 'NASA POWER' && (
                <>
                  <p><strong>Datasets:</strong> MERRA-2 (0.5° × 0.625°) and GPM IMERG (0.1°).</p>
                  <p><strong>Rainfall Window:</strong> June 1 to October 31. Dry-spell window: July 1 to September 30.</p>
                  <p><strong>Scientific Integrity:</strong> MERRA-2 and IMERG are kept separate as ranges. 2026 IMERG has 47 trailing missing days (16 in July-Sept) and is preserved as incomplete without zero-filling.</p>
                </>
              )}
              {selectedSourceModal === 'MODIS (NDVI)' && (
                <>
                  <p><strong>Product:</strong> MOD13Q1 250m 16-day composites.</p>
                  <p><strong>Footprint:</strong> ~6.25 hectares per pixel. 219 usable observations (80.51%).</p>
                  <p><strong>Interpretation:</strong> Represents landscape background vegetation greenness around the farm, NOT direct single-crop stress or yield.</p>
                </>
              )}
              {selectedSourceModal === 'SMAP' && (
                <>
                  <p><strong>Product:</strong> SMAP L4_SM Geophysical assimilation (version 8.1).</p>
                  <p><strong>Resolution:</strong> ~9 km EASE-Grid 2.0. Mid-month snapshots July-October (2015-2025).</p>
                  <p><strong>Limitation:</strong> Nearest grid cell centroid is 6.168 km from the pilot field. Regional moisture context only.</p>
                </>
              )}
              {selectedSourceModal === 'Global Soil Maps' && (
                <>
                  <p><strong>Source:</strong> ISRIC SoilGrids 2.0 (250m resolution, median Q0.5).</p>
                  <p><strong>Properties:</strong> pH 5.3 (moderately acidic), SOC 8.1 g/kg (topsoil 10.1 g/kg), sand 57%, clay 12%.</p>
                  <p><strong>Limitation:</strong> Statistical machine-learning predictions, not laboratory field assays. Silt fraction not extracted.</p>
                </>
              )}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSourceModal(null)}
                className="px-4 py-2 bg-green-800 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
          <span>View Rotation Options</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
