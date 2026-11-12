/**
 * AgroShift Gambia — TypeScript Domain Types & API Contracts
 * Reflects the FastAPI backend models and the 9-screen Figma UI workflow.
 */

export type ScreenStep =
  | 'overview'           // Page 1: Hero Landing
  | 'choose-field'       // Page 2: Step 1 Choose a Field & Polygon Map
  | 'field-details'      // Page 3: Step 2 Field Info & 3-Season History
  | 'priorities-limits'  // Page 4: Step 3 Farmer Priorities & Practical Constraints
  | 'analysis'           // Page 5: Step 4 Loading / Inspection Animation
  | 'evidence'           // Page 6: Step 5 What the Data Says (Environmental Dashboard)
  | 'strategies'         // Page 7: Step 6 Three Options Overview (Current, Option A, Option B)
  | 'strategy-detail'    // Page 8: Step 7 Strategy Deep Dive (8 sections & calendar)
  | 'compare-report';    // Page 9: Step 8 Strategic Comparison, Trade-off Plot & Farmer Report

export type StrategyId = 'current' | 'A' | 'B';

export type FeasibilityStatus = 'Feasible' | 'Conditional' | 'Rejected' | 'Passed';

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unassessed';

export interface LocationData {
  district: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  coordinates?: [number, number];
  boundary_geojson?: any;
}

export interface FeatureItem {
  value: number | string | null;
  range?: [number, number] | null;
  rank?: number | string | null;
  unit?: string | null;
  dataset?: string | null;
  datasets?: string[] | null;
  merra2_mean?: number | null;
  merra2_range?: [number, number] | null;
  imerg_mean?: number | null;
  imerg_range?: [number, number] | null;
  year_2026_status?: {
    year: number;
    in_reference_period: boolean;
    merra2_rain_mm?: number | null;
    imerg_rain_mm?: number | null;
    merra2_longest_dry_spell_d?: number | null;
    imerg_missing_days?: number;
    imerg_spell_missing_days?: number;
    status: string;
  } | null;
  elevation_m?: number | null;
  topsoil_0_5cm?: number | null;
  sand_pct?: number | null;
  clay_pct?: number | null;
  surface_value?: number | null;
  resolution?: string | null;
  period?: string | null;
  data_type?: string | null;
  quality_filter?: string | null;
  confidence?: ConfidenceLevel;
  notes?: string | null;
}

export type FeaturesMap = Record<string, FeatureItem>;

export interface FieldDetails {
  name: string;
  size_ha: number;
  field_type: 'Upland' | 'Lowland' | 'Fallow' | 'Homestead';
  observed_soil: string;
}

export interface CropHistory {
  season_1: string; // 2022/2023
  season_2: string; // 2023/2024
  season_3: string; // 2024/2025
}

export interface FarmingSystem {
  intercropping: boolean;
  farmer_observations: string;
}

export interface FarmerPriorities {
  conserve_water: number;        // e.g. 20
  improve_soil_health: number;   // e.g. 30
  increase_food_production: number; // e.g. 20
  generate_income: number;       // e.g. 20
  reduce_labour: number;         // e.g. 10
}

export interface PracticalConstraints {
  water_source: 'Rain-fed only' | 'Well / Borehole' | 'River / Stream' | 'Supplemental irrigation';
  seed_availability: 'High / Certified' | 'Medium / Local market' | 'Low / Saved seed only';
  labour_availability: 'Abundant family labour' | 'Moderate hired labour' | 'Scarce / Family only';
  budget_level: 'Low / Minimal input' | 'Moderate' | 'High / Commercial inputs';
}

export interface EvaluationRequest {
  field_id: string;
  location?: Partial<LocationData>;
  field_details: FieldDetails;
  crop_history: CropHistory;
  farming_system: FarmingSystem;
  priorities: FarmerPriorities;
  constraints: PracticalConstraints;
}

export interface StrategyCriterion {
  name: string;
  score: number;
  weight: number;
}

export interface SequenceItem {
  season: string;
  year?: string;
  crop: string;
  type?: string;
  months?: string;
}

export interface EvidenceItem {
  feature: string;
  source: string;
  observation: string;
}

export interface EvaluatedConstraint {
  name: string;
  status: 'Passed' | 'Advisory Warning' | 'Conditional' | 'Rejected' | 'Verified';
  details: string;
}

export interface ConstraintsCheck {
  passed: boolean;
  evaluated_constraints: EvaluatedConstraint[];
}

export interface Strategy {
  id: StrategyId;
  name: string;
  role?: 'reference' | 'primary_alternative' | 'secondary_alternative';
  score: number;
  score_range: [number, number];
  rank: number;
  feasibility_status: FeasibilityStatus;
  confidence: ConfidenceLevel;
  criteria: StrategyCriterion[];
  sequence: SequenceItem[];
  why: string;
  evidence: EvidenceItem[];
  benefits: string[];
  trade_offs: string[];
  gaps: string[];
  risks_for_local_review: string[];
}

export interface EvaluationResponse {
  field_id: string;
  evaluation_timestamp: string;
  location: LocationData;
  features: FeaturesMap;
  constraints_check: ConstraintsCheck;
  strategies: Strategy[];
  weights: Record<string, number>;
  farmer_inputs?: {
    field_details: FieldDetails;
    crop_history: CropHistory;
    farming_system: FarmingSystem;
    priorities: FarmerPriorities;
    constraints: PracticalConstraints;
  };
  disclaimer: string;
}

export interface FieldData {
  field_id: string;
  location: LocationData;
  features: FeaturesMap;
  strategies?: Strategy[];
  weights?: Record<string, number>;
  constraints?: Record<string, any>;
  disclaimer?: string;
}

export interface BackendHealth {
  status: 'online' | 'offline' | 'checking';
  url: string;
  lastChecked: string | null;
  error?: string | null;
}
