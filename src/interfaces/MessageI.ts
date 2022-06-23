export type MessageType = 'image' | 'message';

export interface ImageI {
  _id: string,
  url: string,
  type: 'image',
}

export interface MessageI {
  _id: string,
  message: string,
  type: 'message',
}
