// messages-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { ImageI, MessageI } from '../interfaces/MessageI';

export default function (app: Application): {[key: string]: Model<any>} {
  const modelName = 'messages';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  mongooseClient.Promise = global.Promise;
  
  const BaseMessages = new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  }, { 
    timestamps: true,
    discriminatorKey: 'type'
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }

  const BaseModel = mongooseClient.model(modelName, BaseMessages);

  const MessagesSchema = new Schema({
    message: { type: String, required: true, minLength: 1, maxLength: 256 },
  });

  const ImageSchema = new Schema({
    img: { type: String, required: true }
  });

  const MessageModel = BaseModel.discriminator<MessageI>('message', MessagesSchema);
  const ImageModel = BaseModel.discriminator<ImageI>('image', ImageSchema);

  return {BaseModel, MessageModel, ImageModel};
}
