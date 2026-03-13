import mongoose, { model } from 'mongoose';
import { LocationSchema } from './schema';
import { locationType } from './schema';

export default mongoose.models.Location ||
    model<locationType>('Location', LocationSchema, 'locations');
