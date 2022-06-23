## Users CRUD
- [x] create users model
- [ ] update user model to include dm and group

## Messages CRUD
- [x] create messages model
- [x] message model
- [ ] image model

- [x] configure discriminator to change the info bw text and image
- [ ] update message model to include groupid or dmid

## Image upload service  
- [x] Basic implementation
- [ ] save avatars to /public/avatars/:userId
- [ ] save group icons to /public/groups/:groupId
- [ ] save images  to /public/images/id

## DM service
- [ ] create dm (direct-messaging) model

## Groups service
- [x] create groups model
- [x] restricted updation and deletion to owner
- [ ] GET request, populate members field with actual users..

**Points to keep in mind**: 
- only owners can add members, update group info and delete the group.

### FURTHER SCOPE
- [ ] big files upload 
- [ ] sticker and gifs 
