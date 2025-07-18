export enum MeasurementUnit {
  INCHES = 'INCHES',
  CENTIMETERS = 'CENTIMETERS',
}

export interface MeasurementValues {
  neck?: number;
  chest?: number;
  stomach?: number;
  hip?: number;
  length?: number;
  shoulder?: number;
  sleeve?: number;
  waist?: number;
  // Add other measurement fields as needed
  [key: string]: number | undefined;
}

export interface Measurement {
  id: string;
  customerId: string;
  createdAt: string;
  standardType: string;
  unit: MeasurementUnit;
  values: MeasurementValues;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateMeasurementDTO {
  customerId: string;
  standardType: string;
  unit: MeasurementUnit;
  values: MeasurementValues;
}

export interface UpdateMeasurementDTO {
  standardType?: string;
  unit?: MeasurementUnit;
  values?: MeasurementValues;
}

export interface CreateMeasurementFromScanDTO {
  customerId: string;
  height: string;
  weight: string;
  gender: string;
  age?: string;
  front_image_base64: string;
  profile_image_base64: string;
}

export interface MeasurementScanResponse {
  id: string;
  customerId: string;
  standardType: string;
  unit: MeasurementUnit;
  values: MeasurementValues;
  createdAt: string;
}
