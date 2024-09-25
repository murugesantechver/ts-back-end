import mongoose from 'mongoose';

export type ObjectID = mongoose.Types.ObjectId;

export interface JWTDecoded {
  userId: ObjectID;
}
