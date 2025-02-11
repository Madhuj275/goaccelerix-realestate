export type Lead = {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  notes?: string;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
};

export type Document = {
  _id: string;
  name: string;
  url: string;
  leadId: string;
  createdAt: string;
};

export type Property = {
  _id: string;
  type: 'residential' | 'commercial' | 'land';
  title: string;
  description: string;
  location: string;
  price: number;
  size: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  status: 'available' | 'sold' | 'rented';
  images: string[];
  createdAt: string;
  updatedAt: string;
};