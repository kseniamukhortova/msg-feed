import { types } from 'mobx-state-tree'
// import { Author } from './author';

export const Message = types.model('Message', {
    id: types.number,
    date: types.string,
    message: types.string,
    userId: types.number
})

export type IMessage = typeof Message.Type

