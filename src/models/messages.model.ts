// messages-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): {[key: string]: Model<any>} {
  const modelName = 'messages';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  mongooseClient.Promise = global.Promise;
  
  const options = { discriminatorKey: 'type' };

  const BaseMessages = new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  }, { 
    timestamps: true,
    ...options
  });
  const BaseModel = mongooseClient.model(modelName, BaseMessages);

  const MessagesSchema = new Schema({
    message: { type: String, required: true, minLength: 1, maxLength: 256 },
  });

  const ImageSchema = new Schema({
    img: { type: String, required: true }
  });

  const MessageModel = BaseModel.discriminator('message', MessagesSchema);
  const ImageModel = BaseModel.discriminator('image', ImageSchema);

  // I dont know whi this section breaks the code in this model 
  // while others work absolutely fine with it.. 
  // but if it work it should be the solution :)
  // if (mongooseClient.modelNames().includes(modelName)) {
  //   (mongooseClient as any).deleteModel(modelName);
  // }

  return {BaseModel, MessageModel, ImageModel};
}
