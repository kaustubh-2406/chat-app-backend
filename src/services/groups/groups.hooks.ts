import { HookContext } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { NotAuthenticated } from '@feathersjs/errors';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

async function addOwnerId(context:HookContext) {
  const id = context.params.user?._id;
  context.data.owner = id;
  return context;
}

async function ensureOwner(context: HookContext) {
  const groupId = context.id;
  const userId = context.params.user?._id;
  const { owner } = await context.app.service('users').get(groupId);
  
  if (owner === userId) return context;
  throw new NotAuthenticated('Only owners can update or delete the group info');
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [addOwnerId],
    update: [ensureOwner],
    patch:  [ensureOwner],
    remove: [ensureOwner]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
