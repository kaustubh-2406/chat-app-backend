// groups-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import GroupI from '../interfaces/GroupI';

export default function (app: Application): Model<GroupI> {
  const modelName = 'groups';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    groupIcon: { type: String, default: '' },

    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    owner: { type: Schema.Types.ObjectId, ref: 'users' }

    // entertainment, knowlege.. would implment after consulting
    // tags: [{ type: String }]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<GroupI>(modelName, schema);
}
