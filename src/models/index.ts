import mongoose, {
  HydratedDocument,
  SchemaDefinition,
  SchemaDefinitionType,
  Model,
  Schema,
} from 'mongoose';
import { IUser } from '../types/interfaces/user.interface';
import { user } from './user.model';

type MongooseMethods = {
  [name: string]: (
    this: HydratedDocument<any, any, any>,
    ...args: any[]
  ) => any;
};

function createModel<T>(model: {
  collection: string;
  schema: SchemaDefinition<SchemaDefinitionType<T>>;
  methods?: MongooseMethods;
  statics?: MongooseMethods;
}): Model<T, any, any, any> {
  const modelSchema = new Schema<T>(model.schema, {
    timestamps: true,
    collation: { locale: 'en', strength: 2 },
  });

  modelSchema.methods = model.methods || {};
  modelSchema.statics = model.statics || {};

  return mongoose.model<T>(model.collection, modelSchema);
}

export default {
  userCollection: createModel<IUser>(user),
};
