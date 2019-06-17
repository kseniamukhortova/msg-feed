import { types } from 'mobx-state-tree'

export const Author = types.model('Author', {
    id: types.number,
    bio: types.string
})

export type IAuthor = typeof Author.Type
