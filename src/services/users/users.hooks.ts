import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { setField } from 'feathers-authentication-hooks';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const setUserId = setField({
  from: 'params.user._id',
  as: 'data.userId'
});
const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.userId'
});

export default {
  before: {
    all: [],
    find: [ authenticate('jwt'), setUserId ],
    get: [ authenticate('jwt'), setUserId ],
    create: [ hashPassword('password') ],
    update: [ 
      hashPassword('password'),  
      authenticate('jwt'),
      setUserId,
      limitToUser,
    ],
    patch: [ 
      hashPassword('password'),  
      authenticate('jwt'), 
      setUserId, 
      limitToUser 
    ],
    remove: [ 
      authenticate('jwt'), 
      setUserId, 
      limitToUser 
    ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
