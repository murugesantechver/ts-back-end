import { Document, Model, Types } from 'mongoose';
import { IUser } from '../types/interfaces/user.interface';
import db from '../models/index';
function init<T>(
  dbCollection: Model<
    T,
    any,
    any,
    any,
    Document<unknown, any, T> &
      Omit<T & Required<{ _id: Types.ObjectId }>, never>,
    any
  >
): Model<
  T,
  T,
  any,
  any,
  Document<unknown, any, T> &
    Omit<T & Required<{ _id: Types.ObjectId }>, never>,
  any
> {
  return dbCollection;
}

const userCollection = init<IUser>(db.userCollection);

export { userCollection };
