/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import fs from 'fs-blob-store';
import blobService from 'feathers-blob';
import { Application } from '@feathersjs/express';
import uploadHooks from './upload.hooks';
import path from 'path';

const blobStorage = fs(path.join(__dirname, '../../../public/uploads'));
// const avatarStorage = fs(path.join(__dirname, '../../../public/avatar'));
// const imageStorage = fs(path.join(__dirname, '../../../public/image'));
// const stickerStorage = fs(path.join(__dirname, '../../../public/stickers'));

// returns object with uri size contenttype and id, 
// id is the part we need to show in the ui..
export default function (app: Application): void {
  // Initialize our service with any options it requires
  app.use('/uploads', blobService({ Model: blobStorage }));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(uploadHooks);  
}
