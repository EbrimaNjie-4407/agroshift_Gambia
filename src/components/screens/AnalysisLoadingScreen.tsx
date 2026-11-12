/**
 * AgroShift Gambia — Screen 5: Analysing Your Field
 * Faithful to Figma Page 5:
 * - Center card with dual-tone circular progress spinner
 * - 4 live inspection checklist items with animated green checkmarks:
 *   ✓ Reviewing field information
 *   ✓ Checking environmental data
 *   ✓ Applying farmer priorities and limits
 *   ✓ Preparing rotation options
 * - Auto-transitions to Screen 6 (What the Data Says) upon evaluation completion.
 */

import React, { useEffect, useState } from 'react';
import { useAgroShift } from '../../context/AgroShiftContext';
import { Check, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

export const AnalysisLoadingScreen: React.FC = () => {
  const { isEvaluating, evaluationResult, evaluationError, goToStep, runEvaluation } = useAgroShift();
  const [checklistStage, setChecklistStage] = useState(1);

  useEffect(() => {
    // Step-by-step checkmark reveal animation
    const t1 = setTimeout(() => setChecklistStage(2), 400);
    const t2 = setTimeout(() => setChecklistStage(3), 800);
    const t3 = setTimeout(() => setChecklistStage(4), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="py-8 flex justify-center">
      <div className="max-w-2xl w-full bg-[#f0f7f2] border border-[#d4ead8] rounded-3xl p-8 sm:p-12 text-center shadow-xs space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Analysing your field
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
            Reviewing environmental information and comparing possible crop rotation strategies.
          </p>
        </div>

        {/* Central Dual-Tone Radial Spinner (Figma Page 5) */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 animate-spin" viewBox="0 0 100 100">
            {/* Gray background track */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            {/* Orange Arc (Figma Page 5) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#ea580c"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="170"
              strokeLinecap="round"
            />
            {/* Dark Green Arc (Figma Page 5) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#166534"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="120"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Animated Checklist (Figma Page 5) */}
        <div className="max-w-sm mx-auto space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition ${
              checklistStage >= 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>Reviewing field information</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition ${
              checklistStage >= 2 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>Checking environmental data</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition ${
              checklistStage >= 3 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>Applying farmer priorities and limits</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition ${
              checklistStage >= 4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>Preparing rotation options</span>
          </div>
        </div>

        {/* Action Button once ready */}
        <div className="pt-4 flex justify-center">
          {evaluationError ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span>{evaluationError}</span>
              </div>
              <button
                onClick={() => runEvaluation()}
                className="px-6 py-2.5 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Evaluation</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => goToStep('evidence')}
              className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <span>View Data Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
