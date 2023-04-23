import { Document } from 'mongoose';

export interface Route extends Document {
  name: string;
  author: string;
  origin: string;
  dayCreated: Date;
  geoJSON: object;
  createdAt: Date;
  updatedAt: Date;
}