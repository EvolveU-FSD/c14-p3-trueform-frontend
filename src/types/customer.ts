export interface Customer {
  id: string;
  name: string;
  email: string;
  firebaseUid?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface CreateCustomerDTO {
  name: string;
  email: string;
  firebaseUid?: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  email?: string;
  lastLogin?: string;
}
