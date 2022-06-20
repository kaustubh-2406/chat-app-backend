// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import UserI from '../interfaces/UserI';

export default function (app: Application): Model<UserI> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
  
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, required: true },
    status: { type: String, default: '', required: true },
    avatar: {type: String, default: ''},
    // dm: { type: [{ type: Schema.Types.ObjectId, ref: 'dm' }] },
    // groups: { type: [{ type: Schema.Types.ObjectId, ref: 'groups' }] },
  
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<UserI>(modelName, schema);
}
