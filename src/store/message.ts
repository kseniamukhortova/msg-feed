import { types } from 'mobx-state-tree'
// import { Author } from './author';

export const Message = types.model('Message', {
    id: types.number,
    date: types.number,
    text: types.string,
    authorId: types.string,
    authorName: types.string,
})

export type IMessage = typeof Message.Type

