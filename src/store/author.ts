import { types } from 'mobx-state-tree'

export const Author = types.model('Author', {
    id: types.number,
    name: types.string,
    data: types.frozen
})

export type IAuthor = typeof Author.Type
