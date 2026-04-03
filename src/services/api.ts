const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/';

export interface DecodeResult {
  Variable: string;
  Value: string;
  VariableId?: number;
  // Add other fields if needed
}

export interface DecodeResponse {
  Results: DecodeResult[];
  Message?: string;
}

export interface Variable {
  ID: number;
  Name: string;
  Description: string;
}

export interface VariablesResponse {
  Results: Variable[];
}

export const decodeVin = async (vin: string): Promise<DecodeResponse> => {
  const response = await fetch(`${BASE_URL}vehicles/decodevin/${vin}?format=json`);
  if (!response.ok) throw new Error('Failed to decode VIN');
  return response.json();
};

export const getVariables = async (): Promise<VariablesResponse> => {
  const response = await fetch(`${BASE_URL}vehicles/getvehiclevariablelist?format=json`);
  if (!response.ok) throw new Error('Failed to fetch variables');
  return response.json();
};