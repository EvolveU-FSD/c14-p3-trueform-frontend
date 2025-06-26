export interface Vendor {
  id: string;
  name: string;
  contactEmail: string;
  description: string;
  website: string;
}

export type CreateVendorDTO = Omit<Vendor, 'id'>;
export type UpdateVendorDTO = Partial<Vendor>;
