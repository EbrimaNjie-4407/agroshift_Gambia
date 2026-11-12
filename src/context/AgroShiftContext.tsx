/**
 * AgroShift Gambia — Shared Application Context
 * Governs navigation steps, farmer input state, NASA feature retrieval,
 * backend health monitoring, and decision engine evaluation results.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  BackendHealth,
  CropHistory,
  EvaluationRequest,
  EvaluationResponse,
  FarmerPriorities,
  FarmingSystem,
  FieldData,
  FieldDetails,
  LocationData,
  PracticalConstraints,
  ScreenStep,
  StrategyId,
} from '../types/agroshift';
import { agroShiftApi, API_BASE_URL, ApiError } from '../services/api';

const DEFAULT_LOCATION: LocationData = {
  district: 'Brikama Manduar',
  region: 'West Coast Region',
  country: 'The Gambia',
  latitude: 13.24890667,
  longitude: -16.61527333,
  coordinates: [13.24890667, -16.61527333],
};

const DEFAULT_FIELD_DETAILS: FieldDetails = {
  name: 'Brikama Manduar Pilot Field',
  size_ha: 2.5,
  field_type: 'Upland',
  observed_soil: 'Sandy loam',
};

const DEFAULT_CROP_HISTORY: CropHistory = {
  season_1: '', // Most recent season
  season_2: '', // Second previous season
  season_3: '', // Third previous season
};

const DEFAULT_FARMING_SYSTEM: FarmingSystem = {
  intercropping: false,
  farmer_observations: 'Sandy loam topsoil, noted early season dry spells in July.',
};

const DEFAULT_PRIORITIES: FarmerPriorities = {
  conserve_water: 20,
  improve_soil_health: 30,
  increase_food_production: 20,
  generate_income: 20,
  reduce_labour: 10,
};

const DEFAULT_CONSTRAINTS: PracticalConstraints = {
  water_source: 'Rain-fed only',
  seed_availability: 'Medium / Local market',
  labour_availability: 'Moderate hired labour',
  budget_level: 'Low / Minimal input',
};

const STEP_ORDER: ScreenStep[] = [
  'overview',
  'choose-field',
  'field-details',
  'priorities-limits',
  'analysis',
  'evidence',
  'strategies',
  'strategy-detail',
  'compare-report',
];

interface AgroShiftContextType {
  // Navigation
  currentStep: ScreenStep;
  goToStep: (step: ScreenStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  stepIndex: number;
  totalSteps: number;

  // Farmer Inputs
  selectedFieldId: string;
  setSelectedFieldId: (id: string) => void;
  location: LocationData;
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
  fieldDetails: FieldDetails;
  setFieldDetails: React.Dispatch<React.SetStateAction<FieldDetails>>;
  cropHistory: CropHistory;
  setCropHistory: React.Dispatch<React.SetStateAction<CropHistory>>;
  farmingSystem: FarmingSystem;
  setFarmingSystem: React.Dispatch<React.SetStateAction<FarmingSystem>>;
  priorities: FarmerPriorities;
  setPriorities: React.Dispatch<React.SetStateAction<FarmerPriorities>>;
  constraints: PracticalConstraints;
  setConstraints: React.Dispatch<React.SetStateAction<PracticalConstraints>>;

  // Backend Health & Cached Field Data
  backendHealth: BackendHealth;
  checkHealth: () => Promise<void>;
  fieldData: FieldData | null;
  isLoadingFieldData: boolean;
  fieldDataError: string | null;
  loadFieldData: (fieldId?: string) => Promise<void>;

  // Evaluation Execution
  isEvaluating: boolean;
  evaluationResult: EvaluationResponse | null;
  evaluationError: string | null;
  runEvaluation: () => Promise<void>;
  useOfflineFallback: () => Promise<void>;

  // Results Navigation
  selectedStrategyId: StrategyId;
  setSelectedStrategyId: (id: StrategyId) => void;
  activeDetailSection: number;
  setActiveDetailSection: (section: number) => void;
}

const AgroShiftContext = createContext<AgroShiftContextType | undefined>(undefined);

export const AgroShiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentStep, setCurrentStep] = useState<ScreenStep>('overview');

  // Input states
  const [selectedFieldId, setSelectedFieldId] = useState<string>('field-001');
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOCATION);
  const [fieldDetails, setFieldDetails] = useState<FieldDetails>(DEFAULT_FIELD_DETAILS);
  const [cropHistory, setCropHistory] = useState<CropHistory>(DEFAULT_CROP_HISTORY);
  const [farmingSystem, setFarmingSystem] = useState<FarmingSystem>(DEFAULT_FARMING_SYSTEM);
  const [priorities, setPriorities] = useState<FarmerPriorities>(DEFAULT_PRIORITIES);
  const [constraints, setConstraints] = useState<PracticalConstraints>(DEFAULT_CONSTRAINTS);

  // Backend state
  const [backendHealth, setBackendHealth] = useState<BackendHealth>({
    status: 'checking',
    url: API_BASE_URL || '(Local Proxy /api)',
    lastChecked: null,
  });
  const [fieldData, setFieldData] = useState<FieldData | null>(null);
  const [isLoadingFieldData, setIsLoadingFieldData] = useState<boolean>(false);
  const [fieldDataError, setFieldDataError] = useState<string | null>(null);

  // Evaluation state
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResponse | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  // Strategy exploration state
  const [selectedStrategyId, setSelectedStrategyId] = useState<StrategyId>('A');
  const [activeDetailSection, setActiveDetailSection] = useState<number>(1);

  // Navigation helpers
  const stepIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length;

  const goToStep = useCallback((step: ScreenStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextStep = useCallback(() => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEP_ORDER.length) {
      goToStep(STEP_ORDER[nextIdx]);
    }
  }, [stepIndex, goToStep]);

  const prevStep = useCallback(() => {
    const prevIdx = stepIndex - 1;
    if (prevIdx >= 0) {
      goToStep(STEP_ORDER[prevIdx]);
    }
  }, [stepIndex, goToStep]);

  // Health check handler
  const checkHealth = useCallback(async () => {
    setBackendHealth((prev) => ({ ...prev, status: 'checking' }));
    try {
      const res = await agroShiftApi.checkHealth();
      if (res.status === 'healthy') {
        setBackendHealth({
          status: 'online',
          url: API_BASE_URL || '(Local Proxy /api)',
          lastChecked: new Date().toLocaleTimeString(),
        });
      } else {
        setBackendHealth({
          status: 'offline',
          url: API_BASE_URL || '(Local Proxy /api)',
          lastChecked: new Date().toLocaleTimeString(),
          error: `Unexpected status: ${res.status}`,
        });
      }
    } catch (err: any) {
      setBackendHealth({
        status: 'offline',
        url: API_BASE_URL || '(Local Proxy /api)',
        lastChecked: new Date().toLocaleTimeString(),
        error: err.message,
      });
    }
  }, []);

  // Field data loader
  const loadFieldData = useCallback(async (fieldId: string = 'field-001') => {
    setIsLoadingFieldData(true);
    setFieldDataError(null);
    try {
      const data = await agroShiftApi.getField(fieldId);
      setFieldData(data);
    } catch (err: any) {
      // If live getField fails, attempt static fallback
      try {
        const fallback = await agroShiftApi.getFallback(fieldId);
        setFieldData(fallback);
      } catch (fallbackErr: any) {
        setFieldDataError(err.message || 'Unable to load field data from backend.');
      }
    } finally {
      setIsLoadingFieldData(false);
    }
  }, []);

  // Run full evaluation
  const runEvaluation = useCallback(async () => {
    setIsEvaluating(true);
    setEvaluationError(null);
    setCurrentStep('analysis'); // Show loading screen

    const payload: EvaluationRequest = {
      field_id: selectedFieldId,
      location,
      field_details: fieldDetails,
      crop_history: cropHistory,
      farming_system: farmingSystem,
      priorities,
      constraints,
    };

    try {
      // Simulate at least 1.5s for realistic inspection animation checklist
      const [result] = await Promise.all([
        agroShiftApi.evaluateField(payload),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);

      setEvaluationResult(result);
      if (result.features) {
        setFieldData((prev) => ({
          field_id: result.field_id,
          location: result.location,
          features: result.features,
          strategies: result.strategies,
          disclaimer: result.disclaimer,
        }));
      }
      // Transition to evidence screen
      setCurrentStep('evidence');
    } catch (err: any) {
      setEvaluationError(err.message || 'Decision engine evaluation failed.');
      // Keep on analysis step or show retry button
    } finally {
      setIsEvaluating(false);
    }
  }, [selectedFieldId, location, fieldDetails, cropHistory, farmingSystem, priorities, constraints]);

  // Use offline fallback if backend is unreachable
  const useOfflineFallback = useCallback(async () => {
    setIsEvaluating(true);
    setEvaluationError(null);
    try {
      const fallback = await agroShiftApi.getFallback(selectedFieldId);
      if (fallback.strategies && fallback.strategies.length > 0) {
        setEvaluationResult({
          field_id: fallback.field_id,
          evaluation_timestamp: new Date().toISOString(),
          location: fallback.location,
          features: fallback.features,
          constraints_check: {
            passed: true,
            evaluated_constraints: [
              { name: 'Water Source Feasibility', status: 'Passed', details: 'Rain-fed season compatible' },
              { name: 'Offline Pilot Demonstration', status: 'Verified', details: 'Using pre-calculated pilot recommendations' },
            ],
          },
          strategies: fallback.strategies,
          weights: fallback.weights || {},
          disclaimer: fallback.disclaimer || 'Offline pilot fallback demonstration.',
        });
        setCurrentStep('evidence');
      } else {
        setEvaluationError('Fallback data does not contain evaluated strategies.');
      }
    } catch (err: any) {
      setEvaluationError(`Fallback failed: ${err.message}`);
    } finally {
      setIsEvaluating(false);
    }
  }, [selectedFieldId]);

  // Initial mount: check health and preload field data
  useEffect(() => {
    checkHealth();
    loadFieldData(selectedFieldId);
  }, [checkHealth, loadFieldData, selectedFieldId]);

  return (
    <AgroShiftContext.Provider
      value={{
        currentStep,
        goToStep,
        nextStep,
        prevStep,
        stepIndex,
        totalSteps,
        selectedFieldId,
        setSelectedFieldId,
        location,
        setLocation,
        fieldDetails,
        setFieldDetails,
        cropHistory,
        setCropHistory,
        farmingSystem,
        setFarmingSystem,
        priorities,
        setPriorities,
        constraints,
        setConstraints,
        backendHealth,
        checkHealth,
        fieldData,
        isLoadingFieldData,
        fieldDataError,
        loadFieldData,
        isEvaluating,
        evaluationResult,
        evaluationError,
        runEvaluation,
        useOfflineFallback,
        selectedStrategyId,
        setSelectedStrategyId,
        activeDetailSection,
        setActiveDetailSection,
      }}
    >
      {children}
    </AgroShiftContext.Provider>
  );
};

export const useAgroShift = (): AgroShiftContextType => {
  const context = useContext(AgroShiftContext);
  if (!context) {
    throw new Error('useAgroShift must be used within an AgroShiftProvider');
  }
  return context;
};
