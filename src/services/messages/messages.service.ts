// Initializes the `messages` service on path `/messages`
import { ServiceAddons } from '@feathersjs/feathers';
import createService from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Messages } from './messages.class';
import createModel from '../../models/messages.model';
import hooks from './messages.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'messages': Messages & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const {BaseModel: Messages, MessageModel, ImageModel} = createModel(app);

  const options = {
    Model: Messages,
    discriminators: [MessageModel, ImageModel],
    paginate: app.get('paginate')
  };

  app.use('/messages', createService(options));
  const service = app.service('messages');

  service.hooks(hooks);
}
