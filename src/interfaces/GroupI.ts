import UserI from './UserI';

export default interface GroupI {
  _id: string,
  name: string,
  description: string,
  groupIcon: string,
  members: UserI[]
}
